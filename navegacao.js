// Navegação do celular: barra fixa embaixo, botão + (disco / audição / wishlist)
// e menu do avatar com o resto (Radar, Estatísticas, Importar, Configurações...).
// No computador nada muda: o menu de cima continua igual.
(function () {
  const MOBILE = () => window.matchMedia('(max-width: 960px)').matches;
  const pagina = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const svg = (d) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    inicio: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    prateleira: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    audicoes: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    wishlist: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>',
    mais: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    disco: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/>',
    play: '<polygon points="7 4 20 12 7 20 7 4"/>',
    radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><line x1="12" y1="3" x2="12" y2="7"/>',
    stats: '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
    importar: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    config: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    novidades: '<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/>',
    guias: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><line x1="4" y1="19.5" x2="4" y2="21"/>',
    perfil: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    editar: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    lixo: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    coracao: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>'
  };

  // ---- abrir "novo X" vindo do + de outra página (?novo=disco|audicao|wishlist)
  const ACOES = {
    disco: { pagina: 'colecao.html', abrir: () => window.abrirModal && window.abrirModal(null) },
    audicao: { pagina: 'audicoes.html', abrir: () => window.abrirAdd && window.abrirAdd(null) },
    wishlist: { pagina: 'wishlist.html', abrir: () => window.abrirWishlist && window.abrirWishlist() }
  };
  function executar(tipo) {
    const a = ACOES[tipo];
    if (!a) return;
    if (pagina === a.pagina) a.abrir();
    else location.href = a.pagina + '?novo=' + tipo;
  }
  function abrirPendente() {
    const p = new URLSearchParams(location.search);
    const tipo = p.get('novo');
    if (!tipo || !ACOES[tipo] || ACOES[tipo].pagina !== pagina) return;
    p.delete('novo');
    history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : '') + location.hash);
    let tent = 0;
    const t = setInterval(() => {   // espera a página montar as funções de abrir
      const ok = tipo === 'disco' ? window.abrirModal : tipo === 'audicao' ? window.abrirAdd : window.abrirWishlist;
      if (ok || ++tent > 40) { clearInterval(t); if (ok) ACOES[tipo].abrir(); }
    }, 100);
  }

  // ---- folha que sobe de baixo
  let folha = null;
  function fecharFolha() {
    if (!folha) return;
    folha.classList.remove('hb-aberta');
    const f = folha; folha = null;
    setTimeout(() => f.remove(), 200);
    document.removeEventListener('keydown', escFolha);
  }
  function escFolha(e) { if (e.key === 'Escape') fecharFolha(); }
  function abrirFolha(titulo, itens) {
    fecharFolha();
    const w = document.createElement('div');
    w.className = 'hb-folha-wrap';
    w.innerHTML = `<div class="hb-fundo"></div><div class="hb-folha" role="dialog" aria-modal="true" aria-label="${titulo}">
      <div class="hb-alca"></div>
      ${itens.map((it, i) => `<${it.href ? 'a href="' + it.href + '"' : 'button type="button"'} class="hb-op" data-i="${i}">
        <span class="hb-op-ic${it.perigo ? ' hb-perigo' : ''}">${svg(IC[it.ic] || '')}</span><span class="hb-op-tx"><b>${it.nome}</b>${it.sub ? `<span>${it.sub}</span>` : ''}</span>
      </${it.href ? 'a' : 'button'}>`).join('')}</div>`;
    document.body.appendChild(w);
    requestAnimationFrame(() => w.classList.add('hb-aberta'));
    folha = w;
    w.querySelector('.hb-fundo').addEventListener('click', fecharFolha);
    w.querySelectorAll('button.hb-op').forEach(b => b.addEventListener('click', () => { const it = itens[+b.dataset.i]; fecharFolha(); it.acao(); }));
    document.addEventListener('keydown', escFolha);
    const primeiro = w.querySelector('.hb-op'); if (primeiro) primeiro.focus({ preventScroll: true });
  }
  function folhaMais() {
    abrirFolha('Adicionar', [
      { ic: 'disco', nome: 'Disco na prateleira', sub: 'Digitar ou ler código de barras', acao: () => executar('disco') },
      { ic: 'play', nome: 'Audição', sub: 'O que você ouviu', acao: () => executar('audicao') },
      { ic: 'wishlist', nome: 'Wishlist', sub: 'Um disco que você quer', acao: () => executar('wishlist') }
    ]);
  }
  function folhaAvatar() {
    abrirFolha('Menu', [
      { ic: 'radar', nome: 'Radar Musical', href: 'radar-musical.html' },
      { ic: 'stats', nome: 'Estatísticas', sub: 'Seu mês está aqui', href: 'estatisticas.html' },
      { ic: 'importar', nome: 'Importar', href: 'importar.html' },
      { ic: 'config', nome: 'Configurações e perfil', href: 'perfil.html' },
      { ic: 'novidades', nome: 'Novidades', href: 'novidades.html' },
      { ic: 'guias', nome: 'Guias', href: 'guias/' }
    ]);
  }

  function montar() {
    const nav = document.querySelector('header.app-nav');
    if (!nav || document.querySelector('.hb-barra')) return;
    const ativo = { 'index.html': 'inicio', '': 'inicio', 'colecao.html': 'prateleira', 'audicoes.html': 'audicoes', 'wishlist.html': 'wishlist' }[pagina];
    const item = (id, href, nome) => `<a href="${href}" class="hb-it${ativo === id ? ' hb-on' : ''}"${ativo === id ? ' aria-current="page"' : ''}>${svg(IC[id])}<span>${nome}</span>${id === 'wishlist' ? '<b class="hb-badge" hidden></b>' : ''}</a>`;
    const barra = document.createElement('nav');
    barra.className = 'hb-barra';
    barra.setAttribute('aria-label', 'Navegação');
    barra.innerHTML = item('inicio', 'index.html', 'Início') + item('prateleira', 'colecao.html', 'Prateleira') +
      `<button type="button" class="hb-mais" aria-label="Adicionar">${svg(IC.mais)}</button>` +
      item('audicoes', 'audicoes.html', 'Audições') + item('wishlist', 'wishlist.html', 'Wishlist');
    document.body.appendChild(barra);
    // só aparece logado e com o app visível (na tela de login o menu de cima fica escondido)
    const atualizar = () => {
      let tok = null; try { tok = localStorage.getItem('discoteca_session_token'); } catch (e) {}
      const ok = !!tok && nav.getClientRects().length > 0;
      barra.hidden = !ok;
      document.body.classList.toggle('hb-com-barra', ok);
    };
    atualizar();
    if (window.ResizeObserver) new ResizeObserver(atualizar).observe(nav);
    barra.querySelector('.hb-mais').addEventListener('click', folhaMais);

    // contador da wishlist: espelha o do menu de cima
    const fonte = document.getElementById('navWishlistCount'), alvo = barra.querySelector('.hb-badge');
    const copiar = () => { if (!fonte) return; alvo.textContent = fonte.textContent; alvo.hidden = fonte.style.display === 'none' || !fonte.textContent.trim() || fonte.textContent.trim() === '0'; };
    if (fonte) { copiar(); new MutationObserver(copiar).observe(fonte, { childList: true, characterData: true, subtree: true, attributes: true }); }

    // computador: "+ Adicionar" no topo
    const direita = nav.querySelector('.app-nav-right');
    if (direita && !direita.querySelector('.hb-add-topo')) {
      const bt = document.createElement('button');
      bt.type = 'button'; bt.className = 'hb-add-topo'; bt.title = 'Adicionar (atalho: N)';
      bt.innerHTML = svg(IC.mais) + '<span>Adicionar</span>';
      bt.addEventListener('click', folhaMais);
      direita.insertBefore(bt, direita.firstChild);
    }

    // avatar no celular abre o menu em vez de ir direto para Configurações
    const av = nav.querySelector('.app-nav-user');
    if (av) av.addEventListener('click', (e) => { if (MOBILE()) { e.preventDefault(); folhaAvatar(); } });
  }

  // atalhos de teclado: "/" busca, "N" novo disco
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (document.querySelector('.hb-folha-wrap')) return;
    let tok = null; try { tok = localStorage.getItem('discoteca_session_token'); } catch (er) {}
    if (!tok) return;
    if (e.key === '/') {
      const campo = ['searchInput', 'wishSearchTop', 'radarBuscaInput', 'dashSearch', 'audBusca']
        .map(id => document.getElementById(id)).find(el => el && el.getClientRects().length);
      if (campo) { e.preventDefault(); campo.focus(); campo.select && campo.select(); }
    } else if (e.key === 'n' || e.key === 'N') {
      e.preventDefault(); executar('disco');
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { montar(); abrirPendente(); });
  else { montar(); abrirPendente(); }
  // ---- "Desfazer": a ação só vai pro servidor depois de alguns segundos.
  // Se a pessoa sair da página antes, executa na hora (keepalive no fetch).
  const pendentes = new Set();
  function desfazer(opts) {
    const toast = document.createElement('div');
    toast.className = 'hb-toast'; toast.setAttribute('role', 'status');
    const tx = document.createElement('span'); tx.textContent = opts.texto;
    const bt = document.createElement('button'); bt.type = 'button'; bt.textContent = 'Desfazer';
    toast.append(tx, bt);
    document.querySelectorAll('.hb-toast').forEach(t => t.remove());
    document.body.appendChild(toast);
    let feito = false;
    const p = { rodar: () => { if (feito) return; feito = true; pendentes.delete(p); clearTimeout(timer); toast.remove(); opts.executar(); } };
    pendentes.add(p);
    const timer = setTimeout(p.rodar, opts.tempo || 5000);
    bt.addEventListener('click', () => { if (feito) return; feito = true; pendentes.delete(p); clearTimeout(timer); toast.remove(); if (opts.aoDesfazer) opts.aoDesfazer(); });
  }
  window.addEventListener('pagehide', () => { [...pendentes].forEach(p => p.rodar()); });
  function aviso(texto) {
    document.querySelectorAll('.hb-toast').forEach(t => t.remove());
    const toast = document.createElement('div'); toast.className = 'hb-toast'; toast.setAttribute('role', 'status');
    toast.textContent = texto; document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  window.HillaNav = { novo: executar, menu: abrirFolha, desfazer, aviso };
})();
