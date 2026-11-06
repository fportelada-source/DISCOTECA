// "Levar tudo": monta no navegador um .zip com tudo que a pessoa construiu na Hilla
// (planilhas CSV, backup.json restaurável, fotos das audições e, se quiser, as capas).
// Precisa de API_URL e apiFetch da página. O jszip.min.js só carrega quando usa.
(function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const p2 = n => String(n).padStart(2, '0');
  const hojeTxt = () => { const d = new Date(); return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`; };
  const espera = ms => new Promise(ok => setTimeout(ok, ms));

  function carregarJSZip() {
    if (window.JSZip) return Promise.resolve(window.JSZip);
    return new Promise((ok, erro) => {
      const s = document.createElement('script');
      s.src = 'jszip.min.js?v=1'; s.onload = () => ok(window.JSZip); s.onerror = () => erro(new Error('jszip'));
      document.head.appendChild(s);
    });
  }

  // CSV que abre direto no Excel em português (ponto e vírgula + BOM) e no Google Planilhas.
  function csv(cabecalho, linhas) {
    const cel = v => {
      if (v == null) return '';
      const s = String(v);
      return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    return '﻿' + [cabecalho, ...linhas].map(l => l.map(cel).join(';')).join('\r\n') + '\r\n';
  }
  const simNao = v => v ? 'sim' : '';
  const nomeArquivo = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 60) || 'sem_nome';

  async function json(rota) {
    const r = await apiFetch(API_URL + rota);
    if (!r.ok) throw new Error(rota + ' ' + r.status);
    return r.json();
  }

  // Capa: direto da fonte; se o site não deixar, pelo repasse do servidor (que limita
  // pedidos por minuto: se recusar, espera e tenta de novo uma vez).
  async function baixarImagem(url) {
    if (!url || !/^https:\/\//.test(url)) return null;
    const pega = async (u) => { try { const r = await fetch(u, { mode: 'cors' }); return r.ok ? r : (r.status === 429 ? 'espera' : null); } catch (e) { return null; } };
    let r = await pega(url);
    if (!r || r === 'espera') {
      const proxy = API_URL + '/capa_proxy?url=' + encodeURIComponent(url);
      r = await pega(proxy);
      if (r === 'espera') { await espera(20000); r = await pega(proxy); }
    }
    if (!r || r === 'espera') return null;
    const b = await r.blob();
    return b.size && /^image\//.test(b.type) ? b : null;
  }
  const extensao = b => /png/.test(b.type) ? 'png' : /webp/.test(b.type) ? 'webp' : 'jpg';

  async function montar(comCapas, prog, cancelado) {
    const JSZip = await carregarJSZip();
    prog({ etapa: 'Buscando seus dados…' });
    const [tudo, backup, conq] = await Promise.all([json('/exportar_meus_dados'), json('/backup_dados'), json('/conquistas').catch(() => ({ conquistas: [] }))]);
    const zip = new JSZip(), raiz = zip.folder('hilla_' + hojeTxt());
    const colecao = tudo.colecao || [], recs = tudo.wishlist_e_recomendacoes || [], aud = tudo.audicoes || [];
    const porId = {}; colecao.forEach(d => { porId[d.id] = d; });

    // ---- planilhas ----
    raiz.file('prateleira.csv', csv(
      ['Artista', 'Álbum', 'Formato', 'Ano do lançamento', 'Ano original', 'Gênero', 'Condição da mídia', 'Condição da capa', 'Preço pago (R$)', 'Data em que entrou', 'Data da compra', 'Favorito', 'Avaliação', 'Tags', 'Notas', 'Código de barras', 'Link da capa', 'Arquivo da capa'],
      colecao.map(d => [d.artista, d.album, d.formato, d.ano_lancamento, d.ano_original, d.genero, d.condicao_midia, d.condicao_capa, d.preco, d.data_adicao, d.data_compra, simNao(d.favorito), d.avaliacao, d.tags, d.notas, d.codigo_barras, d.capa_url, ''])));
    raiz.file('wishlist.csv', csv(
      ['Artista', 'Álbum', 'Prioridade', 'Situação', 'Data da compra', 'Notas', 'Origem', 'Data em que entrou', 'Link da capa'],
      recs.map(w => [w.artista, w.album, w.tier, w.comprado ? 'comprado' : 'na wishlist', w.data_compra, w.nota, w.origem, w.data_adicao, w.capa_url])));
    raiz.file('audicoes.csv', csv(
      ['Data', 'Hora', 'Artista', 'Álbum', 'Formato', 'Nota', 'Primeiro giro', 'Origem', 'Foto'],
      aud.map(a => [a.data, a.hora, a.artista, a.album, (porId[a.colecao_id] || {}).formato, a.nota, simNao(a.first_spin), a.origem, a.foto_arquivo ? 'fotos_audicoes/' + a.data + '_' + nomeArquivo(a.album) + '_' + a.id + '.jpg' : ''])));
    const desbloq = (conq.conquistas || []).filter(c => c.nivel > 0);
    raiz.file('conquistas.csv', csv(['Conquista', 'Nível', 'Categoria', 'Desbloqueada em'], desbloq.map(c => [c.rotulo || c.nome, c.nivel + ' de ' + c.niveis, c.categoria, c.desbloqueada_em])));
    raiz.file('backup.json', JSON.stringify(backup, null, 1));
    raiz.file('todos_os_dados.json', JSON.stringify(tudo, null, 1));
    if (cancelado()) return null;

    // ---- fotos das audições ----
    const comFoto = aud.filter(a => a.foto_url);
    const fotos = raiz.folder('fotos_audicoes'); let fotosOk = 0; const fotosFalha = [];
    for (let j = 0; j < comFoto.length; j++) {
      if (cancelado()) return null;
      const a = comFoto[j];
      prog({ fotos: [j, comFoto.length] });
      try { const r = await fetch(a.foto_url); if (!r.ok) throw 0; fotos.file(a.data + '_' + nomeArquivo(a.album) + '_' + a.id + '.jpg', await r.blob()); fotosOk++; }
      catch (e) { fotosFalha.push(`${a.data}  ${a.artista} - ${a.album}`); }
    }
    prog({ fotos: [comFoto.length, comFoto.length] });

    // ---- capas (opcional) ----
    const capasFalha = []; let capasOk = 0;
    if (comCapas) {
      const pasta = raiz.folder('capas'), usados = {};
      const comCapa = colecao.filter(d => d.capa_url);
      colecao.filter(d => !d.capa_url).forEach(d => capasFalha.push(`${d.artista} - ${d.album} (sem capa na Hilla)`));
      let j = 0, feitos = 0;
      const trabalhar = async () => {
        while (j < comCapa.length) {
          if (cancelado()) return;
          const d = comCapa[j++];
          const b = await baixarImagem(d.capa_url);
          if (b) {
            let n = nomeArquivo(d.artista) + '-' + nomeArquivo(d.album) + (d.formato ? '-' + nomeArquivo(d.formato) : '');
            if (usados[n]) n += '-' + d.id; usados[n] = 1;
            const arq = n + '.' + extensao(b);
            pasta.file(arq, b); d._arquivo_capa = 'capas/' + arq; capasOk++;
          } else capasFalha.push(`${d.artista} - ${d.album}`);
          prog({ capas: [++feitos, comCapa.length] });
        }
      };
      prog({ capas: [0, comCapa.length] });
      await Promise.all([trabalhar(), trabalhar(), trabalhar()]);   // 3 de cada vez
      if (cancelado()) return null;
      // refaz a prateleira com a coluna do arquivo da capa preenchida
      raiz.file('prateleira.csv', csv(
        ['Artista', 'Álbum', 'Formato', 'Ano do lançamento', 'Ano original', 'Gênero', 'Condição da mídia', 'Condição da capa', 'Preço pago (R$)', 'Data em que entrou', 'Data da compra', 'Favorito', 'Avaliação', 'Tags', 'Notas', 'Código de barras', 'Link da capa', 'Arquivo da capa'],
        colecao.map(d => [d.artista, d.album, d.formato, d.ano_lancamento, d.ano_original, d.genero, d.condicao_midia, d.condicao_capa, d.preco, d.data_adicao, d.data_compra, simNao(d.favorito), d.avaliacao, d.tags, d.notas, d.codigo_barras, d.capa_url, d._arquivo_capa || ''])));
    }

    // ---- LEIA-ME ----
    const leia = [
      'HILLA: TUDO QUE VOCÊ CONSTRUIU',
      'Gerado em ' + new Date().toLocaleString('pt-BR'),
      '',
      'prateleira.csv     Seus discos: ' + colecao.length + '. Abre no Excel, no Google Planilhas ou no Numbers.',
      'wishlist.csv       Sua wishlist, com o que já foi comprado: ' + recs.length + ' itens.',
      'audicoes.csv       Tudo que você registrou ter ouvido: ' + aud.length + ' audições.',
      'conquistas.csv     As conquistas que você desbloqueou: ' + desbloq.length + '.',
      'fotos_audicoes/    As fotos das suas audições: ' + fotosOk + '.',
      comCapas ? 'capas/             As capas dos seus discos: ' + capasOk + '.' : 'capas/             Não incluídas (você escolheu "Só texto").',
      'backup.json        Para voltar para a Hilla: Configurações > Restaurar backup.',
      'todos_os_dados.json  Tudo que a Hilla guarda sobre você, em formato técnico.',
      '',
      'Os arquivos .csv usam ponto e vírgula como separador.',
    ];
    if (fotosFalha.length) leia.push('', 'Fotos que não foi possível baixar:', ...fotosFalha.map(s => '  ' + s));
    if (comCapas && capasFalha.length) leia.push('', 'Discos que ficaram sem capa:', ...capasFalha.map(s => '  ' + s));
    raiz.file('LEIA-ME.txt', '﻿' + leia.join('\r\n') + '\r\n');

    prog({ etapa: 'Compactando…' });
    return zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
      m => prog({ zip: Math.round(m.percent) }));
  }

  // ---------- modal ----------
  function abrir() {
    if (document.getElementById('levarTudoModal')) return;
    const el = document.createElement('div');
    el.id = 'levarTudoModal'; el.className = 'lt-ov';
    el.innerHTML = `<div class="lt-md" role="dialog" aria-modal="true" aria-labelledby="ltTit">
      <div class="lt-escolha">
        <h2 id="ltTit">Levar tudo</h2><p class="lt-sub">Um arquivo .zip com tudo que você construiu na Hilla.</p>
        <label class="lt-op"><input type="radio" name="ltModo" value="texto"><i class="lt-rd"></i><span><b>Só texto</b><small>Planilhas e backup. Rápido e leve.</small></span></label>
        <label class="lt-op"><input type="radio" name="ltModo" value="capas" checked><i class="lt-rd"></i><span><b>Com capas</b><small>Inclui a imagem de cada disco. Pode levar alguns minutos<span class="lt-est"></span>.</small></span></label>
        <p class="lt-nota">As fotos das suas audições vão nas duas opções.</p>
        <button type="button" class="lt-go">Baixar .zip</button><button type="button" class="lt-cn">Cancelar</button>
      </div>
      <div class="lt-andamento" hidden>
        <h2>Preparando seu arquivo…</h2><p class="lt-sub">Mantenha esta tela aberta.</p>
        <div class="lt-bar"><i></i></div><div class="lt-lst" aria-live="polite"></div>
        <button type="button" class="lt-cn">Cancelar</button>
      </div>
    </div>`;
    document.body.appendChild(el);
    apiFetch(API_URL + '/colecao').then(r => r.json()).then(d => {   // estimativa de tamanho
      const q = Array.isArray(d) ? d.filter(x => x.capa_url).length : 0;
      if (q) el.querySelector('.lt-est').textContent = ` (cerca de ${Math.max(1, Math.round(q * 0.13))} MB para ${q} ${q === 1 ? 'capa' : 'capas'})`;
    }).catch(() => {});
    const fechar = () => { el.remove(); document.removeEventListener('keydown', tecla); };
    let rodando = false, cancelado = false;
    const tecla = e => { if (e.key === 'Escape') { cancelado = true; fechar(); } };
    document.addEventListener('keydown', tecla);
    el.addEventListener('click', e => { if (e.target === el && !rodando) fechar(); });
    el.querySelectorAll('.lt-cn').forEach(b => b.addEventListener('click', () => { cancelado = true; fechar(); }));
    el.querySelector('.lt-go').focus();
    el.querySelector('.lt-go').addEventListener('click', async () => {
      const comCapas = el.querySelector('input[name=ltModo]:checked').value === 'capas';
      el.querySelector('.lt-escolha').hidden = true; el.querySelector('.lt-andamento').hidden = false;
      rodando = true;
      const bar = el.querySelector('.lt-bar i'), lst = el.querySelector('.lt-lst');
      const st = { etapa: 'Buscando seus dados…', fotos: null, capas: null, zip: null };
      const pinta = () => {
        const f = st.fotos, c = st.capas;
        const partes = [], peso = comCapas ? [10, 20, 60, 10] : [20, 60, 0, 20];
        let p = st.fotos || st.capas || st.zip != null ? peso[0] : 3;
        if (f) p += f[1] ? peso[1] * f[0] / f[1] : peso[1];
        if (c) p += c[1] ? peso[2] * c[0] / c[1] : peso[2];
        if (st.zip != null) p = 100 - peso[3] + peso[3] * st.zip / 100;
        bar.style.width = Math.min(100, Math.round(p)) + '%';
        if (st.fotos || st.capas || st.zip != null) partes.push('Planilhas prontas');
        if (f) partes.push(f[1] ? `Fotos das audições: ${f[0]} de ${f[1]}` : 'Nenhuma foto de audição');
        if (c) partes.push(`Capas: ${c[0]} de ${c[1]}`);
        if (st.zip != null) partes.push('Compactando…');
        else if (!partes.length) partes.push(st.etapa);
        lst.innerHTML = partes.map(esc).join('<br>');
      };
      pinta();
      try {
        const blob = await montar(comCapas, x => { Object.assign(st, x); pinta(); }, () => cancelado);
        if (!blob || cancelado) return;
        const url = URL.createObjectURL(blob), a = document.createElement('a');
        a.href = url; a.download = `hilla_${hojeTxt()}.zip`; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 30000);
        el.querySelector('.lt-andamento h2').textContent = 'Pronto!';
        el.querySelector('.lt-andamento .lt-sub').textContent = 'O arquivo foi baixado. Ele fica na pasta de downloads.';
        bar.style.width = '100%';
        el.querySelector('.lt-andamento .lt-cn').textContent = 'Fechar';
      } catch (e) {
        if (cancelado) return;
        el.querySelector('.lt-andamento h2').textContent = 'Não deu certo';
        el.querySelector('.lt-andamento .lt-sub').textContent = 'Não foi possível montar o arquivo agora. Seus dados estão guardados. Tente de novo em instantes.';
        el.querySelector('.lt-andamento .lt-cn').textContent = 'Fechar';
      } finally { rodando = false; }
    });
  }

  window.HillaLevarTudo = { abrir, _csv: csv };
})();
