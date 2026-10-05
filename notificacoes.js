/* ================================================================
   NOTIFICAÇÕES — Discoteca
   ================================================================
   Sino na navegação (com contador de não lidas), painel com a lista,
   card "Neste dia" no Início e os interruptores de Configurações.
   Os avisos são gerados no servidor ao abrir o app (rota /notificacoes):
   aniversário na coleção, lembranças de audição, "faz tempo que você
   não escuta" e lançamentos de artistas com disco favorito (checados
   aos poucos, em segundo plano, sem atrasar a página). Máx. 3 por dia.
   Reaproveita os tokens visuais do style.css; o CSS daqui é só do sino,
   do painel e do card (sem mexer no style.css).
   ================================================================ */
(function () {
  const CSS = `
    .sino-wrap { position: relative; }
    #sinoBtn { position: relative; background: transparent; cursor: pointer; }
    #sinoBtn .sino-cont { position: absolute; top: -4px; right: -4px; min-width: 17px; height: 17px; padding: 0 4px; border-radius: 9px;
      background: var(--terracotta); color: var(--ink); font: 700 10px 'Inter', sans-serif; display: none; align-items: center; justify-content: center; }
    #sinoPainel { position: absolute; top: calc(100% + 10px); right: 0; width: 360px; max-height: min(520px, 75vh); overflow-y: auto; z-index: 60;
      background: var(--card); border: 1px solid var(--card-line); border-radius: 18px; box-shadow: 0 24px 50px -20px rgba(0,0,0,0.8); display: none; }
    #sinoPainel.aberto { display: block; animation: sinoEntra 0.18s ease both; }
    @keyframes sinoEntra { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
    .sino-topo { display: flex; justify-content: space-between; align-items: baseline; padding: 16px 18px 10px; border-bottom: 1px solid var(--card-line); }
    .sino-topo strong { font-size: 15px; font-weight: 700; }
    .sino-topo span { font-size: 11.5px; opacity: 0.45; }
    .sino-item { display: flex; gap: 12px; padding: 14px 18px; border-bottom: 1px solid var(--card-line); }
    .sino-item:last-child { border-bottom: none; }
    .sino-item.nova { background: rgba(201, 162, 76, 0.06); }
    .sino-ico { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
      background: var(--terracotta-wash); color: var(--terracotta); }
    .sino-corpo { flex: 1; min-width: 0; }
    .sino-titulo { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--terracotta); margin-bottom: 3px; }
    .sino-texto { font-size: 13px; line-height: 1.45; }
    .sino-meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 8px; }
    .sino-dia { font-size: 11.5px; opacity: 0.4; }
    .sino-acao { font-size: 12px; font-weight: 600; color: var(--terracotta); text-decoration: none; white-space: nowrap; }
    .sino-acao:hover { text-decoration: underline; }
    .sino-vazio { padding: 28px 22px; font-size: 13px; line-height: 1.55; opacity: 0.55; text-align: center; }
    #sinoBtn:focus-visible, .sino-acao:focus-visible { outline: 2px solid var(--terracotta); outline-offset: 2px; }
    .nd-card { margin-top: 30px; background: var(--card); border: 1px solid var(--card-line); border-radius: 18px; padding: 18px 22px; }
    .nd-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--terracotta); margin-bottom: 6px; }
    .nd-linha { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 10px 0; border-top: 1px solid var(--card-line); }
    .nd-linha:first-of-type { border-top: none; }
    .nd-linha .sino-texto { font-size: 14px; }
    @media (max-width: 600px) {
      /* no celular o painel sai da barra (o desfoque dela muda a referência do "fixed") e fica logo abaixo dela */
      body > #sinoPainel { position: fixed; left: 10px; right: 10px; width: auto; z-index: 80; }
      .nd-linha { flex-direction: column; align-items: flex-start; gap: 6px; }
    }
    @media (prefers-reduced-motion: reduce) { #sinoPainel.aberto { animation: none; } }
  `;
  const SVG = (d) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONES = {
    aniversario: SVG('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>'),
    lembranca: SVG('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
    faz_tempo: SVG('<polygon points="6 4 20 12 6 20 6 4"/>'),
    lancamento: SVG('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>')
  };
  const ACAO = { lembranca: 'Ver no calendário', lancamento: 'Ouvir no Spotify' };
  // botão de ouvir: varia por aviso (fixo pro mesmo aviso)
  const ACAO_PLAY = ['Vamos dar o play?', 'Que tal ouvir agora?', 'Bora girar esse disco?', 'Hora de colocar pra tocar?', 'Merece um play hoje?', 'Que tal uma audição?'];
  let dados = null;

  const pad = n => String(n).padStart(2, '0');
  function hojeLocal() { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])); }
  function chamar(caminho, opcoes) {
    if (typeof apiFetch === 'function' && typeof API_URL !== 'undefined') return apiFetch(API_URL + caminho, opcoes || {});
    // Páginas públicas (Privacidade, Termos, Novidades) não têm apiFetch:
    // chama o servidor direto, com o mesmo token de sessão do navegador.
    const o = Object.assign({}, opcoes || {});
    o.headers = Object.assign({}, o.headers || {}, { 'X-Session-Token': localStorage.getItem('discoteca_session_token') || '' });
    return fetch('https://fportelada.pythonanywhere.com' + caminho, o);
  }
  function quandoDia(dia) {
    const hoje = hojeLocal();
    if (dia === hoje) return 'hoje';
    const [a, m, d] = (dia || '').split('-');
    return d ? `${d}/${m}` : '';
  }
  function linkAcao(item) {
    if (!item.link) return '';
    const externo = /^https?:\/\//.test(item.link);
    if (!externo && !/^[a-z-]+\.html(\?[\w=&.-]*)?$/.test(item.link)) return '';   // só links internos conhecidos ou http(s)
    const rotulo = (item.tipo === 'aniversario' || item.tipo === 'faz_tempo') ? ACAO_PLAY[Number(item.id || 0) % ACAO_PLAY.length] : (ACAO[item.tipo] || 'Abrir');
    return `<a class="sino-acao" href="${esc(item.link)}"${externo ? ' target="_blank" rel="noopener"' : ''}>${rotulo}</a>`;
  }

  function montarSino() {
    const direita = document.querySelector('.app-nav-right');
    if (!direita || document.getElementById('sinoBtn')) return;
    if (!document.getElementById('sinoEstilo')) {
      const st = document.createElement('style'); st.id = 'sinoEstilo'; st.textContent = CSS; document.head.appendChild(st);
    }
    const wrap = document.createElement('div');
    wrap.className = 'sino-wrap';
    wrap.innerHTML = `
      <button type="button" class="app-nav-icon" id="sinoBtn" aria-label="Notificações" aria-haspopup="dialog" aria-expanded="false" aria-controls="sinoPainel">
        ${SVG('<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>')}
        <span class="sino-cont" id="sinoContador" aria-hidden="true"></span>
      </button>
      <div id="sinoPainel" role="dialog" aria-label="Notificações"></div>`;
    direita.insertBefore(wrap, direita.firstChild);
    const btn = wrap.querySelector('#sinoBtn'), painel = wrap.querySelector('#sinoPainel');
    btn.addEventListener('click', e => { e.stopPropagation(); painel.classList.contains('aberto') ? fechar() : abrir(); });
    document.addEventListener('click', e => { if (painel.classList.contains('aberto') && !wrap.contains(e.target) && !painel.contains(e.target)) fechar(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && painel.classList.contains('aberto')) { fechar(); btn.focus(); } });
    render();
  }
  function abrir() {
    const painel = document.getElementById('sinoPainel'); if (!painel) return;
    const wrap = document.querySelector('.sino-wrap');
    if (window.matchMedia('(max-width: 600px)').matches) {
      if (painel.parentElement !== document.body) document.body.appendChild(painel);
      const nav = document.querySelector('.app-nav');
      const topo = Math.max(8, Math.round(nav ? nav.getBoundingClientRect().bottom + 8 : 70));
      painel.style.top = topo + 'px';
      painel.style.maxHeight = Math.max(200, window.innerHeight - topo - 12) + 'px';
    } else {
      if (wrap && painel.parentElement !== wrap) wrap.appendChild(painel);
      painel.style.top = ''; painel.style.maxHeight = '';
    }
    painel.classList.add('aberto'); document.getElementById('sinoBtn').setAttribute('aria-expanded', 'true');
    if (dados && dados.nao_lidas) {
      chamar('/notificacoes/lidas', { method: 'POST' }).then(() => { dados.nao_lidas = 0; atualizarContador(); }).catch(() => {});
    }
  }
  function fechar() {
    const painel = document.getElementById('sinoPainel'); if (!painel) return;
    painel.classList.remove('aberto'); document.getElementById('sinoBtn').setAttribute('aria-expanded', 'false');
    if (dados) { dados.itens.forEach(i => { i.lida = 1; }); render(); }
  }
  function atualizarContador() {
    const el = document.getElementById('sinoContador'), btn = document.getElementById('sinoBtn');
    if (!el) return;
    const n = dados ? dados.nao_lidas : 0;
    el.textContent = n > 9 ? '9+' : String(n);
    el.style.display = n ? 'flex' : 'none';
    if (btn) btn.setAttribute('aria-label', n ? `Notificações (${n} não lidas)` : 'Notificações');
  }
  function render() {
    atualizarContador();
    const painel = document.getElementById('sinoPainel'); if (!painel) return;
    const itens = dados ? dados.itens : [];
    painel.innerHTML = `<div class="sino-topo"><strong>Notificações</strong></div>` + (itens.length
      ? itens.map(i => `
        <div class="sino-item${i.lida ? '' : ' nova'}">
          <span class="sino-ico">${ICONES[i.tipo] || ICONES.lembranca}</span>
          <div class="sino-corpo">
            <div class="sino-titulo">${esc(i.titulo)}</div>
            <div class="sino-texto">${esc(i.texto)}</div>
            <div class="sino-meta"><span class="sino-dia">${quandoDia(i.dia)}</span>${linkAcao(i)}</div>
          </div>
        </div>`).join('')
      : `<div class="sino-vazio">Nada por aqui ainda. Lembranças da coleção, das suas audições e lançamentos dos artistas que você favoritou aparecem aqui.</div>`);
  }
  function preencherNesteDia() {
    const el = document.getElementById('dashNesteDia');
    if (!el || !dados) return;
    const hoje = dados.hoje || hojeLocal();
    const doDia = dados.itens.filter(i => i.dia === hoje && (i.tipo === 'aniversario' || i.tipo === 'lembranca'));
    if (!doDia.length) { el.innerHTML = ''; return; }
    if (!document.getElementById('sinoEstilo')) { const st = document.createElement('style'); st.id = 'sinoEstilo'; st.textContent = CSS; document.head.appendChild(st); }
    el.innerHTML = `<section class="nd-card" aria-label="Neste dia"><div class="nd-eyebrow">Neste dia</div>` +
      doDia.map(i => `<div class="nd-linha"><span class="sino-texto">${esc(i.texto)}</span>${linkAcao(i)}</div>`).join('') + `</section>`;
  }
  function carregar() {
    return chamar('/notificacoes?hoje=' + hojeLocal())
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d && Array.isArray(d.itens)) { dados = d; render(); preencherNesteDia(); } })
      .catch(() => {});
  }
  function verificarLancamentos() {
    // segundo plano: a página não espera; o servidor checa poucos artistas por vez
    chamar('/notificacoes/verificar_lancamentos?hoje=' + hojeLocal(), { method: 'POST' })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d && d.novas) carregar(); })
      .catch(() => {});
  }
  // Configurações: interruptores reais (card #notifPrefs)
  function ligarPreferencias() {
    const card = document.getElementById('notifPrefs');
    if (!card) return;
    const botoes = [...card.querySelectorAll('[data-notif]')];
    const nota = document.getElementById('notifFavoritosNota');
    chamar('/notificacoes/preferencias').then(r => r.json()).then(p => {
      botoes.forEach(b => b.classList.toggle('active', !!p[b.dataset.notif]));
      if (nota) nota.style.display = p.artistas_favoritos ? 'none' : 'block';
    }).catch(() => {});
    botoes.forEach(b => b.addEventListener('click', () => {
      setTimeout(() => {   // o clique genérico das Configurações já virou o interruptor; aqui só salva
        chamar('/notificacoes/preferencias', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [b.dataset.notif]: b.classList.contains('active') }) }).catch(() => {});
      }, 0);
    }));
  }

  function quandoLogado(fn) {
    const app = document.getElementById('appScreen');
    if (!app) {
      // página sem a tela do app (Privacidade, Termos, Novidades): basta estar logado neste navegador
      if (localStorage.getItem('discoteca_session_token') && document.querySelector('.app-nav-right')) fn();
      return;
    }
    const ok = () => app.style.display === 'block' && localStorage.getItem('discoteca_session_token') && !document.body.classList.contains('aud-publico');
    if (ok()) return fn();
    const obs = new MutationObserver(() => { if (ok()) { obs.disconnect(); fn(); } });
    obs.observe(app, { attributes: true, attributeFilter: ['style'] });
  }
  window.DiscotecaNotificacoes = { preencherNesteDia, carregar };
  const iniciar = () => quandoLogado(() => { montarSino(); carregar().then(verificarLancamentos); ligarPreferencias(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
