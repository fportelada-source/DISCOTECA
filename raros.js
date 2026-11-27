// Discos raros — selo na Coleção, filtro "Raros", bloco no disco e convite
// "Será que a sua é ela?". Os números vêm do Discogs (quantos têm, quantos
// querem, quantos à venda), checados por trás no servidor (/raros).
(function () {
  'use strict';
  const NOMES = { raro: 'Raro', muito_raro: 'Muito raro', rarissimo: 'Raríssimo' };
  const PAISES = { Brazil: 'Brasil', US: 'EUA', UK: 'Reino Unido', Japan: 'Japão', Germany: 'Alemanha', France: 'França',
    Italy: 'Itália', Argentina: 'Argentina', Portugal: 'Portugal', Europe: 'Europa', Uruguay: 'Uruguai', Mexico: 'México',
    Spain: 'Espanha', Canada: 'Canadá', Netherlands: 'Holanda', Peru: 'Peru', Venezuela: 'Venezuela', Colombia: 'Colômbia',
    Chile: 'Chile', Sweden: 'Suécia', Australia: 'Austrália', 'UK & Europe': 'Reino Unido e Europa', 'USA & Canada': 'EUA e Canadá' };
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => Number(n || 0).toLocaleString('pt-BR');
  const pais = p => PAISES[p] || p || '';
  const selo = (nivel, extra) => NOMES[nivel] ? `<span class="rar-selo rar-${nivel}${extra ? ' ' + extra : ''}">${NOMES[nivel]}</span>` : '';

  let raros = {}, pode = {}, ativo = false, dados = null;

  const css = document.createElement('style');
  css.textContent = `
    .rar-selo { display: inline-block; font: 700 10px 'Inter', sans-serif; letter-spacing: 1.1px; text-transform: uppercase; padding: 4px 9px; border-radius: 999px; line-height: 1.2; white-space: nowrap; }
    .rar-raro { border: 1.2px solid #C9A24C; color: #D9B968; background: rgba(16,16,16,.88); }
    .rar-muito_raro { border: 1.2px solid #C9A24C; color: #E6C877; background: #3a301a; }
    .rar-rarissimo { background: linear-gradient(90deg,#E6C877,#A9843A); color: #101010; }
    .album-card .art { position: relative; }
    .album-card .rar-selo.na-capa { position: absolute; left: 8px; bottom: 8px; z-index: 3; }
    #formatPills .pill.pill-raros { border-color: #C9A24C; color: #E6C877; opacity: 1; display: inline-flex; align-items: center; gap: 6px; }
    #formatPills .pill.pill-raros.active { background: #C9A24C; color: #101010; }
    #formatPills .pill.pill-raros i { font-style: normal; font-size: 11px; background: #101010; color: #E6C877; border-radius: 999px; padding: 0 7px; }
    .rar-view { display: flex; gap: 40px; align-items: flex-start; flex-wrap: wrap; }
    .rar-view .rar-col { flex: 1 1 520px; min-width: 0; }
    .rar-view .rar-lado { flex: 0 1 360px; min-width: 260px; }
    .rar-sec { font: 600 12px 'Inter', sans-serif; letter-spacing: 2.5px; color: #C9A24C; margin: 8px 0 12px; text-transform: uppercase; }
    .rar-intro { font-size: 13.5px; color: var(--ink-soft); line-height: 1.5; margin: 0 0 16px; max-width: 640px; }
    .rar-pode { display: flex; gap: 12px; align-items: center; background: var(--card); border: 1px solid var(--card-line); border-radius: 12px; padding: 12px; margin-bottom: 10px; cursor: pointer; }
    .rar-pode .cv { width: 48px; height: 48px; border-radius: 8px; background: #1f1d1a center/cover; flex: none; }
    .rar-pode b { display: block; font-size: 14px; }
    .rar-pode span { font-size: 12px; color: var(--ink-soft); }
    .rar-pode .ir { margin-left: auto; font-weight: 600; font-size: 13px; color: #D9B968; }
    .rar-fonte { font-size: 12px; color: #777; margin: 14px 0 36px; }
    .rar-vazio { color: var(--ink-soft); font-size: 14px; line-height: 1.5; padding: 20px 0; }
    .rar-box { margin: 0 0 14px; background: var(--card); border: 1px solid var(--card-line); border-radius: 14px; padding: 14px 16px; }
    .rar-box.convite { border-color: rgba(201,162,76,.45); }
    .rar-box .lin { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid var(--card-line); font-size: 14px; color: #cfcac2; }
    .rar-box .lin:last-of-type { border-bottom: 0; }
    .rar-box .lin b { color: var(--paper); }
    .rar-box .tt { font-weight: 700; font-size: 15px; margin: 8px 0 2px; }
    .rar-box .ds { font-size: 13px; color: var(--ink-soft); line-height: 1.45; }
    .rar-box .nota { font-size: 12px; color: #777; margin-top: 8px; }
    .rar-box .nota a { color: #D9B968; }
    .rar-btn { display: block; width: 100%; text-align: center; font: 600 14px 'Inter', sans-serif; padding: 11px; border-radius: 10px; margin-top: 10px; cursor: pointer; border: 1px solid #3a3a3a; background: transparent; color: var(--paper); }
    .rar-btn.prim { background: #C9A24C; border-color: #C9A24C; color: #101010; }
    .rar-btn:disabled { opacity: .6; cursor: wait; }
    .rar-lista { position: fixed; inset: 0; z-index: 3000; background: rgba(0,0,0,.7); display: flex; align-items: center; justify-content: center; padding: 16px; }
    .rar-lista .caixa { background: #151413; border: 1px solid var(--card-line); border-radius: 16px; width: 100%; max-width: 520px; max-height: 80vh; display: flex; flex-direction: column; }
    .rar-lista .cab { padding: 16px 18px; border-bottom: 1px solid var(--card-line); display: flex; justify-content: space-between; align-items: center; gap: 12px; }
    .rar-lista .cab b { font-size: 15px; }
    .rar-lista .cab button { background: none; border: 0; color: var(--ink-soft); font-size: 22px; cursor: pointer; line-height: 1; }
    .rar-lista .corpo { overflow: auto; padding: 6px 10px 12px; }
    .rar-lista .dica { font-size: 12.5px; color: var(--ink-soft); padding: 8px 8px 4px; line-height: 1.45; }
    .rar-lista .ed { display: block; width: 100%; text-align: left; background: none; border: 0; border-bottom: 1px solid var(--card-line); color: var(--paper); padding: 11px 8px; cursor: pointer; font: 400 14px 'Inter', sans-serif; }
    .rar-lista .ed:hover { background: rgba(255,255,255,.03); }
    .rar-lista .ed small { display: block; color: var(--ink-soft); font-size: 12px; margin-top: 2px; }
  `;
  document.head.appendChild(css);

  function api(caminho, opcoes) { return apiFetch(API_URL + caminho, opcoes).then(r => r.json()); }

  // ---------- dados ----------
  function carregar() {
    return api('/raros').then(d => {
      if (!d || !Array.isArray(d.raros)) return;
      dados = d;
      raros = {}; pode = {};
      d.raros.forEach(x => { raros[x.id] = x; });
      d.pode_ser_raro.forEach(x => { pode[x.id] = x; });
      montarPill();
      decorarCards();
      if (ativo) renderizar();
    }).catch(() => {});
  }

  // ---------- filtro "Raros" ----------
  function montarPill() {
    const box = document.getElementById('formatPills');
    if (!box) return;
    let pill = box.querySelector('.pill-raros');
    // aparece sempre (com a coleção checando, vazia de raros ou não); o número só conta raros de verdade
    if (!dados || !dados.total) { if (pill) pill.remove(); if (ativo) sair(); return; }
    const n = Object.keys(raros).length;
    if (!pill) {
      pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'pill pill-raros';
      pill.addEventListener('click', e => { e.stopPropagation(); ativo ? voltarParaTudo() : entrar(); });
      box.appendChild(pill);
    }
    pill.innerHTML = n ? `Raros <i>${n}</i>` : 'Raros';
    pill.classList.toggle('active', ativo);
  }

  function entrar() {
    ativo = true;
    document.querySelectorAll('#formatPills .pill').forEach(p => p.classList.toggle('active', p.classList.contains('pill-raros')));
    renderizar();
  }
  function sair() {
    ativo = false;
    const p = document.querySelector('#formatPills .pill-raros'); if (p) p.classList.remove('active');
  }
  function voltarParaTudo() {
    sair();
    const tudo = document.querySelector('#formatPills .pill[data-formato=""]');
    if (tudo) tudo.click(); else if (typeof aplicarFiltros === 'function') aplicarFiltros();
  }
  // clicar em outro filtro sai do modo Raros (o próprio filtro da página redesenha a prateleira)
  document.addEventListener('click', e => {
    const p = e.target.closest && e.target.closest('#formatPills .pill');
    if (p && !p.classList.contains('pill-raros') && ativo) sair();
  }, true);

  function capaEstilo(url) { return url ? ` style="background-image:url('${esc(url)}')"` : ''; }

  function renderizar() {
    const box = document.getElementById('colecao-container');
    const lista = document.getElementById('listView');
    if (!box || !dados) return;
    if (lista) lista.style.display = 'none';
    box.style.display = '';
    const rs = dados.raros, ps = dados.pode_ser_raro;
    const cards = rs.map(x => `
      <div class="album-card" data-id="${x.id}" onclick="editarDisco('${x.id}')">
        <div class="art" style="background:#1f1d1a center/cover${x.capa_url ? ` url('${esc(x.capa_url)}')` : ''}">${selo(x.nivel, 'na-capa')}</div>
        <div class="info"><div class="title">${esc(x.album)}</div><div class="artist">${esc(x.artista)}</div>
        <div class="meta"><span>${esc([pais(x.pais), x.ano].filter(Boolean).join(', '))}</span></div></div>
      </div>`).join('');
    const podes = ps.map(x => `
      <div class="rar-pode" onclick="editarDisco('${x.id}')">
        <div class="cv"${capaEstilo(x.capa_url)}></div>
        <div><b>${esc(x.album)}</b><span>${esc(x.artista)}</span></div><div class="ir">Descobrir</div>
      </div>`).join('');
    const checando = dados.checados < dados.total;
    const situacao = checando
      ? `<p class="rar-intro"><b style="color:var(--paper)">Estamos olhando sua coleção: ${fmt(dados.checados)} de ${fmt(dados.total)} discos.</b> Pode levar um tempo, porque o Discogs limita as consultas. Você recebe um aviso quando terminar.</p>`
      : (!rs.length && !ps.length ? '<p class="rar-intro"><b style="color:var(--paper)">Nenhum raro por enquanto.</b> A checagem se repete todo mês: um disco comum hoje pode virar raro.</p>' : '');
    box.innerHTML = `
      ${situacao}
      <p class="rar-intro">Comparamos sua coleção de vinil com o Discogs: um disco é raro quando pouca gente tem, muita gente quer e quase ninguém vende.</p>
      <div class="rar-view">
        <div class="rar-col">
          <div class="rar-sec">Seus raros · ${rs.length}</div>
          ${rs.length ? `<div class="col-grid">${cards}</div>` : `<div class="rar-vazio">${ps.length ? 'Nenhum disco raro confirmado ainda. Os da lista "Pode ser raro" dependem de você descobrir qual é a sua edição.' : (checando ? 'Nenhum raro até agora.' : 'Nenhum disco raro na sua coleção hoje.')}</div>`}
          <div class="rar-fonte">Dados do Discogs. Atualizado todo mês.</div>
        </div>
        ${ps.length ? `<div class="rar-lado"><div class="rar-sec">Pode ser raro · ${ps.length}</div>
          <p class="rar-intro" style="margin-bottom:12px">Esses discos têm uma edição brasileira rara. Será que a sua é ela?</p>${podes}</div>` : ''}
      </div>`;
  }

  // a prateleira redesenha os cards toda hora: coloca o selo depois de cada desenho
  function decorarCards() {
    document.querySelectorAll('#colecao-container .album-card[data-id]').forEach(card => {
      const r = raros[card.dataset.id];
      const art = card.querySelector('.art');
      if (!art || art.querySelector('.rar-selo')) return;
      if (r) art.insertAdjacentHTML('beforeend', selo(r.nivel, 'na-capa'));
    });
  }
  const alvo = document.getElementById('colecao-container');
  if (alvo) new MutationObserver(() => {
    if (ativo && !alvo.querySelector('.rar-view')) { ativo = false; montarPill(); }
    decorarCards();
  }).observe(alvo, { childList: true });

  // ---------- no disco (modal) ----------
  function blocoDisco(id) {
    const r = raros[id], p = pode[id];
    if (r) {
      const vezes = r.tem ? Math.floor(r.quer / r.tem) : 0;
      return `<div class="rar-box" id="rarBox">${selo(r.nivel)}
        <div class="tt">Edição: ${esc([pais(r.pais), r.ano].filter(Boolean).join(', ') || 'identificada')}</div>
        <div class="lin"><span>Têm essa edição</span><b>${fmt(r.tem)}</b></div>
        <div class="lin"><span>Querem</span><b>${fmt(r.quer)}</b></div>
        <div class="lin"><span>À venda agora</span><b>${fmt(r.venda)}</b></div>
        <div class="nota">${vezes >= 2 ? `${vezes} vezes mais gente quer do que tem. ` : ''}Dados do Discogs${r.link ? ` · <a href="${esc(r.link)}" target="_blank" rel="noopener">ver edição</a>` : ''}.</div></div>`;
    }
    if (p) {
      return `<div class="rar-box convite" id="rarBox">
        <div class="tt" style="margin-top:0">Esse disco tem uma edição brasileira rara.</div>
        <div class="ds">Será que a sua é ela? Descubra qual é a sua edição.</div>
        <button type="button" class="rar-btn prim" data-rar="scan">Escanear código de barras</button>
        <button type="button" class="rar-btn" data-rar="lista">Escolher na lista de edições</button>
        <input type="file" accept="image/*" capture="environment" data-rar="foto" style="display:none">
        <div class="nota" data-rar="status">Disco antigo sem código de barras? Use a lista e compare com o selo do disco.</div></div>`;
    }
    return '';
  }

  function mostrarNoModal() {
    const modal = document.getElementById('modalAdicionar');
    const id = (document.getElementById('campo-id') || {}).value;
    const antigo = document.getElementById('rarBox'); if (antigo) antigo.remove();
    if (!modal || !modal.classList.contains('open') || !id) return;
    const html = blocoDisco(id);
    if (!html) return;
    const ancora = document.getElementById('form-adicionar');
    ancora.insertAdjacentHTML('beforebegin', html);
    const box = document.getElementById('rarBox');
    box.style.margin = '14px 0 0';
    ligarConvite(box, id);
  }
  const modalEl = document.getElementById('modalAdicionar');
  if (modalEl) new MutationObserver(mostrarNoModal).observe(modalEl, { attributes: true, attributeFilter: ['class'] });

  function status(box, texto) { const s = box.querySelector('[data-rar="status"]'); if (s) s.textContent = texto; }

  function resultado(box, id, d) {
    const disco = d && d.disco;
    if (disco && disco.nivel) {
      HillaNav && HillaNav.aviso && HillaNav.aviso(`Seu disco é ${NOMES[disco.nivel]}!`);
    } else {
      status(box, disco && disco.tem != null
        ? `Sua edição foi encontrada (${fmt(disco.tem)} pessoas têm). Não é das raras, mas agora o Hilla sabe qual é a sua.`
        : 'Não consegui conferir essa edição no Discogs agora. Tente de novo mais tarde.');
    }
    carregar().then(() => { if (disco && disco.nivel) mostrarNoModal(); });
  }

  function ligarConvite(box, id) {
    const foto = box.querySelector('[data-rar="foto"]');
    if (!foto) return;
    box.querySelector('[data-rar="scan"]').addEventListener('click', () => foto.click());
    foto.addEventListener('change', e => {
      const arq = e.target.files && e.target.files[0];
      if (!arq) return;
      status(box, 'Lendo o código de barras da foto...');
      new Html5Qrcode('barcode-reader-oculto').scanFile(arq, false)
        .then(codigo => {
          status(box, `Código lido: ${codigo}. Procurando sua edição no Discogs...`);
          const campo = document.getElementById('campo-codigo-barras'); if (campo) campo.value = codigo;
          return apiFetch(API_URL + `/editar_disco/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ codigo_barras: codigo }) })
            .then(() => api(`/raros/checar/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }))
            .then(d => resultado(box, id, d));
        })
        .catch(() => status(box, 'Não consegui ler um código de barras nessa foto. Tente de novo, mais perto e com boa luz.'))
        .finally(() => { e.target.value = ''; });
    });
    box.querySelector('[data-rar="lista"]').addEventListener('click', () => abrirLista(box, id));
  }

  function abrirLista(box, id) {
    const capa = document.createElement('div');
    capa.className = 'rar-lista';
    capa.innerHTML = `<div class="caixa" role="dialog" aria-label="Escolha sua edição"><div class="cab"><b>Qual é a sua edição?</b><button type="button" aria-label="Fechar">&times;</button></div>
      <div class="corpo"><div class="dica">Carregando as edições do Discogs...</div></div></div>`;
    document.body.appendChild(capa);
    const fechar = () => capa.remove();
    capa.addEventListener('click', e => { if (e.target === capa) fechar(); });
    capa.querySelector('.cab button').addEventListener('click', fechar);
    const corpo = capa.querySelector('.corpo');
    api(`/raros/edicoes/${id}`).then(d => {
      const eds = (d && d.edicoes) || [];
      if (!eds.length) { corpo.innerHTML = '<div class="dica">Não encontrei as edições desse disco no Discogs.</div>'; return; }
      corpo.innerHTML = `<div class="dica">Compare com o selo e a contracapa do seu disco: país, ano, gravadora e número de catálogo. As brasileiras aparecem primeiro.</div>` +
        eds.map(e => `<button type="button" class="ed" data-id="${e.id}">${esc([pais(e.pais), e.ano].filter(Boolean).join(', ') || 'Sem país e ano')}
          <small>${esc([e.gravadora, e.catno, e.formato].filter(Boolean).join(' · '))}</small></button>`).join('');
      corpo.querySelectorAll('.ed').forEach(b => b.addEventListener('click', () => {
        corpo.innerHTML = '<div class="dica">Conferindo sua edição no Discogs...</div>';
        api(`/raros/checar/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ release_id: Number(b.dataset.id) }) })
          .then(r => { fechar(); resultado(box, id, r); })
          .catch(() => { corpo.innerHTML = '<div class="dica">Não deu para conferir agora. Tente de novo em instantes.</div>'; });
      }));
    }).catch(() => { corpo.innerHTML = '<div class="dica">Não deu para carregar as edições agora. Tente de novo em instantes.</div>'; });
  }

  setInterval(() => { if (dados && dados.checados < dados.total && document.visibilityState === 'visible') carregar(); }, 60000);

  // ---------- abrir pela notificação: colecao.html?raros=1&disco=ID ----------
  const q = new URLSearchParams(location.search);
  function iniciar() {
    carregar().then(() => {
      if (q.get('raros') === '1' && dados && dados.total) entrar();
      const d = q.get('disco');
      if (d && typeof window.editarDisco === 'function') setTimeout(() => window.editarDisco(d), 400);
    });
  }
  // só depois que a prateleira carregou (a página guarda o usuário logado em usuarioId)
  let tentativas = 0;
  (function esperar() {
    if (typeof usuarioId !== 'undefined' && usuarioId && document.querySelector('#colecao-container .album-card, #colecao-container .col-empty-state')) return iniciar();
    if (++tentativas < 60) setTimeout(esperar, 500);
  })();
})();
