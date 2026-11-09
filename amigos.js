// Amigos: peças usadas em várias páginas (bloco no fim da home, "quem também tem"
// no disco, aviso na wishlist, seguir/compatibilidade no perfil público e o popup
// que apresenta a novidade). Precisa de API_URL e apiFetch da página.
(function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const CORES = ['#E8C87A', '#7AB8D8', '#A78BFA', '#8FBF8A', '#d98f6b', '#C9A24C'];
  const logado = () => { try { return !!localStorage.getItem('discoteca_session_token'); } catch (e) { return false; } };
  const api = (rota, op) => apiFetch(API_URL + rota, op || {}).then(r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)).catch(e => Promise.reject(e)));

  function avatar(p, tam) {
    const t = tam || 40, cor = CORES[(p.id || 0) % CORES.length], ini = esc((p.nome || '?').trim().charAt(0).toUpperCase());
    const foto = p.foto_url && /^https:\/\//.test(p.foto_url) ? `<img src="${esc(p.foto_url)}" alt="" referrerpolicy="no-referrer" onerror="this.remove()">` : '';
    return `<span class="am-av" style="width:${t}px;height:${t}px;background:${cor};font-size:${Math.round(t * 0.42)}px" aria-hidden="true">${ini}${foto}</span>`;
  }
  function capaUrl(u) {
    if (!u) return '';
    if (/^https:\/\//.test(u)) return u;
    if (u.charAt(0) === '/') return API_URL + u;
    return '';
  }
  function capa(u, cls) {
    const url = capaUrl(u);
    return `<span class="am-capa ${cls || ''}">${url ? `<img src="${esc(url)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</span>`;
  }
  function tempo(quando) {
    if (!quando) return '';
    const d = new Date(quando.replace(' ', 'T'));
    if (isNaN(d)) return '';
    const min = (Date.now() - d.getTime()) / 60000;
    if (min < 60) return 'agora';
    if (min < 60 * 24 && new Date().toDateString() === d.toDateString()) return 'há ' + Math.round(min / 60) + 'h';
    const ontem = new Date(); ontem.setDate(ontem.getDate() - 1);
    if (ontem.toDateString() === d.toDateString()) return 'ontem';
    if (min < 60 * 24 * 6) return ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'][d.getDay()];
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }
  const fmtCurto = f => { const s = (f || '').toLowerCase(); return /lp|ep|vinil|vinyl/.test(s) ? 'LP' : /cd/.test(s) ? 'CD' : /cassete|cassette/.test(s) ? 'Fita' : /dvd|blu/.test(s) ? 'DVD' : ''; };
  const perfil = id => 'perfil-publico.html?id=' + encodeURIComponent(id);

  // Frase de cada atividade: [verbo, objeto, linha de baixo]
  function frase(i) {
    const n = i.quantidade;
    switch (i.tipo) {
      case 'audicao': return ['ouviu', i.album, i.artista, fmtCurto(i.formato)];
      case 'compra': return ['comprou', i.album, (i.artista || '') + ' · estava na wishlist'];
      case 'prateleira': return ['adicionou', i.album, (i.artista || '') + ' · na prateleira'];
      case 'prateleira_lote': return ['adicionou', n + ' discos', 'à prateleira'];
      case 'conquista': return ['desbloqueou', i.conquista, i.descricao];
      case 'conquista_lote': return ['desbloqueou', n + ' conquistas', ''];
      default: return ['', '', ''];
    }
  }
  // Linha simples (home): uma linha, sem foto
  function linhaSimples(i) {
    const [v, o] = frase(i);
    return `<a class="am-ls" href="${perfil(i.usuario_id)}">${avatar({ id: i.usuario_id, nome: i.nome, foto_url: i.foto_usuario }, 28)}
      <span class="am-ls-tx"><b>${esc(i.nome)}</b> <span class="am-soft">${v}</span> ${esc(o)}</span><span class="am-quando">${tempo(i.quando)}</span></a>`;
  }
  // Item completo (página Amigos): com foto da audição e capa
  function itemFeed(i) {
    const [v, o, sub, fmt] = frase(i);
    const foto = i.tipo === 'audicao' && i.foto ? `<img class="am-foto" src="${esc(API_URL + '/audicoes/foto/' + encodeURIComponent(i.foto) + '.jpg')}" alt="Foto da audição de ${esc(i.album)}" loading="lazy" onerror="this.remove()">` : '';
    const thumb = !foto && (i.capa_url || i.tipo === 'audicao' || i.tipo === 'compra' || i.tipo === 'prateleira') ? capa(i.capa_url) :
      (i.tipo === 'prateleira_lote' && i.capas && i.capas.length ? `<span class="am-pilha">${i.capas.slice(0, 3).map(u => capa(u)).join('')}</span>` : '');
    return `<article class="am-post">
      <a href="${perfil(i.usuario_id)}" class="am-post-av">${avatar({ id: i.usuario_id, nome: i.nome, foto_url: i.foto_usuario }, 40)}</a>
      <div class="am-post-corpo">
        <div class="am-post-topo"><div class="am-post-tx"><a href="${perfil(i.usuario_id)}"><b>${esc(i.nome)}</b></a> ${v} <b>${esc(o)}</b>${fmt ? `<span class="am-fmt">${fmt}</span>` : ''}
          ${sub ? `<span class="am-sub">${esc(sub)}</span>` : ''}</div>${thumb}<span class="am-quando">${tempo(i.quando)}</span></div>
        ${foto}
      </div></article>`;
  }

  // ---------- botão seguir (com desfazer otimista simples) ----------
  async function seguir(id, quer, botao) {
    if (botao) { botao.disabled = true; }
    try {
      const r = await api('/amigos/seguir', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, seguir: quer }) });
      if (botao) pintarBotao(botao, r.seguindo);
      return r;
    } catch (e) {
      if (window.HillaNav) HillaNav.aviso((e && e.erro) || 'Não deu para seguir agora. Tente de novo.');
      throw e;
    } finally { if (botao) botao.disabled = false; }
  }
  function pintarBotao(b, seguindo) {
    b.dataset.seguindo = seguindo ? '1' : '0';
    b.classList.toggle('am-btn-o', !!seguindo);
    b.textContent = seguindo ? 'Seguindo' : 'Seguir';
    b.setAttribute('aria-pressed', seguindo ? 'true' : 'false');
  }
  function botaoSeguir(p) {
    return `<button type="button" class="am-btn${p.seguindo ? ' am-btn-o' : ''}" data-seguir="${p.id}" data-seguindo="${p.seguindo ? 1 : 0}" aria-pressed="${p.seguindo ? 'true' : 'false'}" aria-label="${p.seguindo ? 'Deixar de seguir' : 'Seguir'} ${esc(p.nome)}">${p.seguindo ? 'Seguindo' : 'Seguir'}</button>`;
  }
  // um ouvinte só para todos os botões "Seguir" da página
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-seguir]');
    if (!b) return;
    e.preventDefault();
    const id = +b.dataset.seguir, ja = b.dataset.seguindo === '1';
    seguir(id, !ja, b).then(r => { b.dispatchEvent(new CustomEvent('am-seguiu', { bubbles: true, detail: { id, seguindo: r.seguindo, seguidores: r.seguidores } })); }).catch(() => {});
  });

  function linhaPessoa(p, extra) {
    const det = [p.em_comum ? `<span class="am-ouro">${p.em_comum} ${p.em_comum === 1 ? 'disco' : 'discos'} em comum</span>` : '',
      p.total_discos != null ? `${p.total_discos} ${p.total_discos === 1 ? 'disco' : 'discos'}` : '', p.localizacao ? esc(p.localizacao) : '']
      .filter(Boolean).slice(0, 2).join(' · ');
    return `<div class="am-pessoa"><a href="${perfil(p.id)}" class="am-pessoa-l">${avatar(p, 40)}<span class="am-pessoa-tx"><b>${esc(p.nome)}</b><span class="am-sub">${det || extra || ''}</span></span></a>${botaoSeguir(p)}</div>`;
  }

  // ---------- home: bloco simples no fim ----------
  function blocoHome(container) {
    if (!container || !logado() || container.querySelector('#amHome')) return;
    const sec = document.createElement('section');
    sec.className = 'dash-sec'; sec.id = 'amHome';
    sec.innerHTML = `<div class="dash-section-title">De quem você segue <a href="amigos.html" class="see-all">ver tudo</a></div><div class="am-home-lista"><div class="am-vazio">Carregando…</div></div>`;
    container.appendChild(sec);
    api('/amigos/feed?limite=5').then(d => {
      const alvo = sec.querySelector('.am-home-lista');
      if (!d.seguindo_total) {
        alvo.innerHTML = `<a class="am-convite" href="amigos.html"><b>Siga outros colecionadores</b><span>Veja o que eles ouvem e compram, e quem tem os discos da sua wishlist.</span></a>`;
      } else if (!d.itens.length) {
        alvo.innerHTML = `<div class="am-vazio">Nada novo de quem você segue nas últimas semanas.</div>`;
      } else alvo.innerHTML = `<div class="am-home-grade">${d.itens.map(linhaSimples).join('')}</div>`;
    }).catch(() => sec.remove());
  }

  // ---------- disco: quem também tem ----------
  function quemTem(el, artista, album) {
    if (!el) return;
    el.hidden = true; el.innerHTML = '';
    if (!logado() || !artista || !album) return;
    const pedido = (el._pedido = (el._pedido || 0) + 1);
    api(`/amigos/quem_tem?artista=${encodeURIComponent(artista)}&album=${encodeURIComponent(album)}`).then(d => {
      if (pedido !== el._pedido || (!d.tem.length && !d.quer.length)) return;
      const nomes = l => l.length <= 3 ? l.map(p => esc(p.nome)).join(', ').replace(/, ([^,]*)$/, ' e $1') : l.slice(0, 2).map(p => esc(p.nome)).join(', ') + ` e mais ${l.length - 2}`;
      const ouvinte = d.tem.filter(p => p.audicoes_ano > 0).sort((a, b) => b.audicoes_ano - a.audicoes_ano)[0];
      el.innerHTML = (d.tem.length ? `<div class="am-qt"><div class="am-k">Quem também tem</div>
          <div class="am-qt-l"><span class="am-avs">${d.tem.slice(0, 4).map(p => `<a href="${perfil(p.id)}" title="${esc(p.nome)}">${avatar(p, 28)}</a>`).join('')}</span><span>${nomes(d.tem)}</span></div>
          ${ouvinte ? `<div class="am-sub">${esc(ouvinte.nome)} ouviu ${ouvinte.audicoes_ano} ${ouvinte.audicoes_ano === 1 ? 'vez' : 'vezes'} este ano.</div>` : ''}</div>` : '') +
        (d.quer.length ? `<div class="am-qt"><div class="am-k">Na wishlist de</div><div>${d.quer.map(p => `<a href="${perfil(p.id)}">${esc(p.nome)}</a>${p.tier ? ` <span class="am-soft">(prioridade ${esc(p.tier)})</span>` : ''}`).join(', ')}</div></div>` : '');
      el.hidden = false;
    }).catch(() => {});
  }

  // ---------- wishlist: um amigo tem o que você quer ----------
  function alertaWishlist(el) {
    if (!el || !logado()) return;
    api('/amigos/tem_o_que_quero').then(d => {
      if (!d.itens.length) { el.hidden = true; return; }
      let ocultos = [];
      try { ocultos = JSON.parse(localStorage.getItem('hilla_amigo_tem_ok') || '[]'); } catch (e) {}
      const chave = it => (it.artista + '|' + it.album).toLowerCase();
      const lista = d.itens.filter(it => !ocultos.includes(chave(it))).slice(0, 3);
      if (!lista.length) { el.hidden = true; return; }
      el.innerHTML = `<div class="am-alerta"><div class="am-k am-k-ok">Um amigo tem</div>${lista.map(it => {
        const dono = it.donos[0], outros = it.donos.length - 1;
        return `<div class="am-alerta-it" data-chave="${esc(chave(it))}">${capa(it.capa_url)}<div class="am-pessoa-tx"><b>${esc(it.album)}</b><span class="am-sub">${esc(it.artista)} · está na prateleira de <b>${esc(dono.nome)}</b>${outros ? ` e mais ${outros}` : ''}</span></div>
          <div class="am-alerta-ac"><a class="am-btn" href="${perfil(dono.id)}">Ver perfil</a><button type="button" class="am-btn am-btn-o" data-ok>Ok</button></div></div>`;
      }).join('')}</div>`;
      el.hidden = false;
      el.querySelectorAll('[data-ok]').forEach(b => b.addEventListener('click', () => {
        const it = b.closest('.am-alerta-it');
        ocultos.push(it.dataset.chave);
        try { localStorage.setItem('hilla_amigo_tem_ok', JSON.stringify(ocultos.slice(-200))); } catch (e) {}
        it.remove();
        if (!el.querySelector('.am-alerta-it')) el.hidden = true;
      }));
    }).catch(() => { el.hidden = true; });
  }

  // ---------- perfil público: seguir, números e "vocês dois" ----------
  function blocoPerfil(alvoTopo, alvoCompat, id) {
    api('/amigos/relacao/' + encodeURIComponent(id)).then(r => {
      if (alvoTopo) {
        alvoTopo.innerHTML = `<div class="am-nums"><span><b id="amSeguidores">${r.seguidores}</b> ${r.seguidores === 1 ? 'seguidor' : 'seguidores'}</span><span><b>${r.seguindo_total}</b> seguindo</span></div>` +
          (r.eu_mesmo ? '' : r.logado ? botaoSeguir({ id, seguindo: r.seguindo, nome: '' }) :
            `<a class="am-btn" href="index.html">Entrar para seguir</a>`);
        alvoTopo.hidden = false;
        alvoTopo.addEventListener('am-seguiu', e => {
          const s = alvoTopo.querySelector('#amSeguidores'); if (s) s.textContent = e.detail.seguidores;
        });
      }
      if (alvoCompat && r.logado && !r.eu_mesmo && r.em_comum != null) {
        const tem = r.tem_o_que_voce_quer || [];
        alvoCompat.innerHTML = `<div class="am-compat"><div class="am-k">Vocês dois</div>
            <div class="am-compat-n"><span class="am-big">${r.em_comum}</span><span>${r.em_comum === 1 ? 'disco em comum' : 'discos em comum'}</span></div>
            ${r.artistas_comum.length ? `<div class="am-sub">Mais em comum: ${r.artistas_comum.map(esc).join(', ')}</div>` : ''}
            ${r.capas_comum.length ? `<div class="am-mini">${r.capas_comum.map(c => capa(c.capa_url)).join('')}</div>` : ''}</div>` +
          (tem.length ? `<div class="am-compat am-compat-tem"><div class="am-k">Tem o que você quer</div>${tem.map(t => `<div class="am-alerta-it">${capa(t.capa_url)}<div class="am-pessoa-tx"><b>${esc(t.album)}</b><span class="am-sub">${esc(t.artista)}${t.tier ? ' · na sua wishlist (' + esc(t.tier) + ')' : ''}</span></div></div>`).join('')}</div>` : '');
        alvoCompat.hidden = false;
      }
    }).catch(() => {});
  }

  // ---------- popup de apresentação (1ª vez que abre a Hilla depois da novidade) ----------
  const CSS_POP = `
    #amPop .modal { max-width: 560px; width: calc(100% - 32px); padding: 0; overflow: hidden; }
    #amPop.open .modal { animation: amEntra .32s cubic-bezier(.2,.7,.2,1) both; }
    @keyframes amEntra { from { opacity: 0; transform: translateY(12px) scale(.985); } to { opacity: 1; transform: none; } }
    .am-pop-topo { padding: 26px 26px 6px; }
    .am-pop-k { font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--terracotta); }
    .am-pop-t { font-size: clamp(22px, 4vw, 28px); font-weight: 800; letter-spacing: -.02em; line-height: 1.15; margin: 10px 0 8px; }
    .am-pop-tx { font-size: 14.5px; line-height: 1.6; opacity: .65; margin: 0; }
    .am-pop-lista { list-style: none; margin: 18px 0 0; padding: 0 26px; display: grid; gap: 14px; }
    .am-pop-lista li { display: flex; gap: 14px; align-items: flex-start; }
    .am-pop-lista .ic { width: 36px; height: 36px; border-radius: 10px; background: rgba(201,162,76,.12); color: var(--terracotta); display: grid; place-items: center; flex-shrink: 0; }
    .am-pop-lista b { display: block; font-size: 14.5px; }
    .am-pop-lista span { font-size: 13px; opacity: .6; }
    .am-pop-rod { display: flex; gap: 10px; padding: 22px 26px 26px; }
    .am-pop-rod .form-btn { margin-top: 0; flex: 1; min-height: 48px; }
    .am-pop-rod .am-pop-dep { flex: 1; min-height: 48px; border-radius: 24px; border: 1px solid var(--card-line); background: none; color: var(--paper); font: inherit; font-weight: 600; cursor: pointer; }
    #amPop .modal-close { position: absolute; top: 14px; right: 14px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
    #amPop button:focus-visible { outline: 2px solid var(--terracotta); outline-offset: 2px; }
    @media (max-width: 600px) { .am-pop-rod { flex-direction: column-reverse; } }
    @media (prefers-reduced-motion: reduce) { #amPop.open .modal { animation: none; } }`;
  const IC = d => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  function apresentar() {
    if (document.getElementById('amPop')) return;
    const st = document.createElement('style'); st.textContent = CSS_POP; document.head.appendChild(st);
    const ov = document.createElement('div');
    ov.className = 'modal-overlay'; ov.id = 'amPop';
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-labelledby', 'amPopT');
    ov.innerHTML = `<div class="modal" tabindex="-1" style="position:relative">
      <button type="button" class="modal-close" data-fechar aria-label="Fechar">${IC('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>')}</button>
      <div class="am-pop-topo"><div class="am-pop-k">Novidade · Amigos</div>
        <h2 class="am-pop-t" id="amPopT">Colecionar ficou melhor com companhia.</h2>
        <p class="am-pop-tx">Agora dá para seguir outros colecionadores na Hilla.</p></div>
      <ul class="am-pop-lista">
        <li><span class="ic">${IC('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>')}</span><div><b>Gosto parecido</b><span>A Hilla mostra quem tem mais discos em comum com você.</span></div></li>
        <li><span class="ic">${IC('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>')}</span><div><b>O que eles ouvem e compram</b><span>As novidades de quem você segue aparecem no fim do Início.</span></div></li>
        <li><span class="ic">${IC('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>')}</span><div><b>Um amigo tem o que você quer</b><span>Avisamos quando um disco da sua wishlist está na prateleira de alguém que você segue.</span></div></li>
        <li><span class="ic">${IC('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>')}</span><div><b>Você no controle</b><span>Em Configurações você escolhe o que mostrar. Preço não aparece.</span></div></li>
      </ul>
      <div class="am-pop-rod"><button type="button" class="am-pop-dep" data-fechar>Depois</button><button type="button" class="form-btn" data-ir>Encontrar colecionadores</button></div>
    </div>`;
    document.body.appendChild(ov);
    const foco = document.activeElement;
    const marcar = () => { api('/avisos/visto', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ aviso: 'amigos' }) }).catch(() => {}); try { localStorage.setItem(chaveAviso(), '1'); } catch (e) {} };
    const fechar = () => { ov.classList.remove('open'); document.removeEventListener('keydown', tecla); setTimeout(() => ov.remove(), 200); marcar(); if (foco && foco.focus) foco.focus(); };
    const tecla = e => {
      if (e.key === 'Escape') { e.preventDefault(); fechar(); }
      else if (e.key === 'Tab') {
        const bts = [...ov.querySelectorAll('button')], i = bts.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); bts[bts.length - 1].focus(); }
        else if (!e.shiftKey && i === bts.length - 1) { e.preventDefault(); bts[0].focus(); }
      }
    };
    document.addEventListener('keydown', tecla);
    ov.addEventListener('click', e => { if (e.target === ov) fechar(); });
    ov.querySelectorAll('[data-fechar]').forEach(b => b.addEventListener('click', fechar));
    ov.querySelector('[data-ir]').addEventListener('click', () => { marcar(); location.href = 'amigos.html'; });
    requestAnimationFrame(() => { ov.classList.add('open'); setTimeout(() => ov.querySelector('[data-ir]').focus(), 40); });
  }
  const chaveAviso = () => 'hilla_aviso_amigos_' + (localStorage.getItem('discoteca_user_id') || '');
  function verificarAviso() {
    if (!logado()) return;
    try { if (localStorage.getItem(chaveAviso()) === '1') return; } catch (e) {}
    api('/avisos').then(d => {
      if (d.vistos.includes('amigos')) { try { localStorage.setItem(chaveAviso(), '1'); } catch (e) {} return; }
      if (!d.onboarding_visto) return;   // conta nova: primeiro a boas-vindas; a novidade fica para a próxima vez
      if (document.querySelector('#onbOverlay.open')) return;
      apresentar();
    }).catch(() => {});
  }

  window.HillaAmigos = { avatar, capa, capaUrl, tempo, itemFeed, linhaSimples, linhaPessoa, botaoSeguir, seguir, blocoHome, quemTem, alertaWishlist, blocoPerfil, apresentar, verificarAviso, api, esc };
})();
