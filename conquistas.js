/* ================================================================
   CONQUISTAS — Discoteca
   ================================================================
   Selos (ícones do board, traço em currentColor; a cor vem da raridade),
   a seção de Configurações ("Ver todos" + título no perfil) e as 5
   últimas no perfil público. Regras e cálculo ficam no servidor
   (/conquistas). CSS próprio aqui, sem mexer no style.css.
   ================================================================ */
(function () {
  const ICONES = {
  "colecao_crescente": "<rect x=\"15\" y=\"60\" width=\"10\" height=\"25\" stroke-width=\"2\" /> <rect x=\"30\" y=\"48\" width=\"10\" height=\"37\" stroke-width=\"2\" /> <rect x=\"45\" y=\"36\" width=\"10\" height=\"49\" stroke-width=\"2\" /> <rect x=\"60\" y=\"24\" width=\"10\" height=\"61\" stroke-width=\"2\" /> <rect x=\"75\" y=\"12\" width=\"10\" height=\"73\" stroke-width=\"2\" />",
  "mestre_do_vinil": "<circle cx=\"50\" cy=\"50\" r=\"38\" stroke-width=\"2\" /> <circle cx=\"50\" cy=\"50\" r=\"28\" stroke-width=\"1.5\" /> <circle cx=\"50\" cy=\"50\" r=\"18\" stroke-width=\"1.5\" /> <circle cx=\"50\" cy=\"50\" r=\"5\" fill=\"currentColor\" />",
  "mestre_do_cd": "<circle cx=\"50\" cy=\"50\" r=\"36\" stroke-width=\"2\" /> <circle cx=\"50\" cy=\"50\" r=\"14\" stroke-width=\"1.5\" /> <circle cx=\"50\" cy=\"50\" r=\"4\" fill=\"currentColor\" />",
  "mestre_do_cassete": "<rect x=\"18\" y=\"30\" width=\"64\" height=\"40\" stroke-width=\"2\" /> <circle cx=\"35\" cy=\"50\" r=\"10\" stroke-width=\"1.5\" /> <circle cx=\"65\" cy=\"50\" r=\"10\" stroke-width=\"1.5\" />",
  "mestre_do_dvd": "<circle cx=\"50\" cy=\"50\" r=\"36\" stroke-width=\"2\" /> <rect x=\"32\" y=\"32\" width=\"36\" height=\"36\" stroke-width=\"1.5\" />",
  "completista": "<circle cx=\"50\" cy=\"50\" r=\"38\" stroke-width=\"2\" stroke-dasharray=\"30 10\" /> <circle cx=\"50\" cy=\"50\" r=\"10\" stroke-width=\"1.5\" />",
  "superfa": "<rect x=\"18\" y=\"18\" width=\"64\" height=\"64\" stroke-width=\"1.5\" /> <rect x=\"28\" y=\"28\" width=\"44\" height=\"44\" stroke-width=\"1.5\" /> <rect x=\"38\" y=\"38\" width=\"24\" height=\"24\" stroke-width=\"1.5\" />",
  "mago_da_wishlist": "<polygon points=\"50,15 60,40 85,50 60,60 50,85 40,60 15,50 40,40\" stroke-width=\"2\" />",
  "a_caca": "<rect x=\"28\" y=\"28\" width=\"44\" height=\"44\" stroke-width=\"2\" /> <line x1=\"15\" y1=\"50\" x2=\"85\" y2=\"50\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\" /> <line x1=\"50\" y1=\"15\" x2=\"50\" y2=\"85\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\" />",
  "vintage": "<polygon points=\"50,15 85,50 50,85 15,50\" stroke-width=\"2\" /> <polygon points=\"50,32 68,50 50,68 32,50\" stroke-width=\"1.5\" opacity=\"0.6\" />",
  "primeira_prensagem": "<rect x=\"22\" y=\"22\" width=\"56\" height=\"56\" stroke-width=\"2\" /> <circle cx=\"50\" cy=\"50\" r=\"5\" fill=\"currentColor\" /> <circle cx=\"30\" cy=\"30\" r=\"2.5\" fill=\"currentColor\" /> <circle cx=\"70\" cy=\"30\" r=\"2.5\" fill=\"currentColor\" /> <circle cx=\"30\" cy=\"70\" r=\"2.5\" fill=\"currentColor\" /> <circle cx=\"70\" cy=\"70\" r=\"2.5\" fill=\"currentColor\" />",
  "ao_vivo": "<path d=\"M 30 70 A 25 25 0 0 1 70 70\" stroke-width=\"2\" /> <path d=\"M 20 70 A 35 35 0 0 1 80 70\" stroke-width=\"2\" /> <circle cx=\"50\" cy=\"70\" r=\"4\" fill=\"currentColor\" />",
  "trilha_sonora": "<rect x=\"20\" y=\"28\" width=\"60\" height=\"44\" stroke-width=\"2\" /> <rect x=\"26\" y=\"32\" width=\"8\" height=\"8\" stroke-width=\"1\" /> <rect x=\"46\" y=\"32\" width=\"8\" height=\"8\" stroke-width=\"1\" /> <rect x=\"66\" y=\"32\" width=\"8\" height=\"8\" stroke-width=\"1\" /> <rect x=\"26\" y=\"60\" width=\"8\" height=\"8\" stroke-width=\"1\" /> <rect x=\"46\" y=\"60\" width=\"8\" height=\"8\" stroke-width=\"1\" /> <rect x=\"66\" y=\"60\" width=\"8\" height=\"8\" stroke-width=\"1\" />",
  "coletanista": "<circle cx=\"50\" cy=\"50\" r=\"36\" stroke-width=\"2\" /> <line x1=\"14\" y1=\"50\" x2=\"86\" y2=\"50\" stroke-width=\"1.5\" /> <line x1=\"50\" y1=\"14\" x2=\"50\" y2=\"86\" stroke-width=\"1.5\" />",
  "viajante_do_tempo": "<ellipse cx=\"50\" cy=\"50\" rx=\"36\" ry=\"14\" transform=\"rotate(-25 50 50)\" stroke-width=\"2\" /> <ellipse cx=\"50\" cy=\"50\" rx=\"36\" ry=\"14\" transform=\"rotate(25 50 50)\" stroke-width=\"2\" /> <circle cx=\"50\" cy=\"50\" r=\"6\" fill=\"currentColor\" />",
  "arqueologo": "<polygon points=\"26,20 74,20 50,50 74,80 26,80 50,50\" stroke-width=\"2\" />",
  "multiformato": "<circle cx=\"38\" cy=\"38\" r=\"18\" stroke-width=\"2\" /> <rect x=\"46\" y=\"44\" width=\"26\" height=\"26\" rx=\"2\" stroke-width=\"1.5\" /> <polygon points=\"32,70 52,70 42,50\" stroke-width=\"1.5\" />",
  "primeira_agulha": "<circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"currentColor\" /> <polyline points=\"20,20 60,20 80,60\" stroke-width=\"2\" /> <rect x=\"72\" y=\"58\" width=\"16\" height=\"18\" rx=\"1\" stroke-width=\"1.5\" />",
  "maratona": "<rect x=\"15\" y=\"25\" width=\"10\" height=\"50\" rx=\"2\" stroke-width=\"2\" /> <rect x=\"31\" y=\"25\" width=\"10\" height=\"50\" rx=\"2\" stroke-width=\"2\" /> <rect x=\"47\" y=\"25\" width=\"10\" height=\"50\" rx=\"2\" stroke-width=\"2\" /> <rect x=\"63\" y=\"25\" width=\"10\" height=\"50\" rx=\"2\" stroke-width=\"2\" /> <rect x=\"79\" y=\"25\" width=\"10\" height=\"50\" rx=\"2\" stroke-width=\"2\" />",
  "fiel": "<circle cx=\"50\" cy=\"50\" r=\"38\" stroke-width=\"2\" /> <path d=\"M 20 50 C 30 25, 35 75, 50 50 C 65 25, 70 75, 80 50\" stroke-width=\"1.5\" />",
  "redescoberta": "<path d=\"M 80 50 A 30 30 0 1 1 70 28\" stroke-width=\"2\" /> <polygon points=\"70,18 82,28 68,34\" fill=\"currentColor\" stroke=\"none\" />",
  "coruja": "<path d=\"M 60 20 A 30 30 0 1 0 80 65 A 25 25 0 0 1 60 20 Z\" stroke-width=\"2\" />",
  "fotografo": "<circle cx=\"50\" cy=\"50\" r=\"38\" stroke-width=\"2\" /> <rect x=\"35\" y=\"35\" width=\"30\" height=\"30\" rx=\"2\" stroke-width=\"1.5\" />",
  "arquivista": "<rect x=\"20\" y=\"20\" width=\"60\" height=\"60\" rx=\"3\" stroke-width=\"2\" /> <line x1=\"40\" y1=\"20\" x2=\"40\" y2=\"80\" stroke-width=\"1.5\" /> <line x1=\"60\" y1=\"20\" x2=\"60\" y2=\"80\" stroke-width=\"1.5\" /> <line x1=\"20\" y1=\"40\" x2=\"80\" y2=\"40\" stroke-width=\"1.5\" /> <line x1=\"20\" y1=\"60\" x2=\"80\" y2=\"60\" stroke-width=\"1.5\" />",
  "fundador": "<circle cx=\"50\" cy=\"50\" r=\"38\" stroke-width=\"2\" /> <polygon points=\"50,24 72,66 28,66\" stroke-width=\"2\" fill=\"none\" /> <line x1=\"36\" y1=\"55\" x2=\"64\" y2=\"55\" stroke-width=\"1.5\" /> <circle cx=\"50\" cy=\"45\" r=\"5\" fill=\"currentColor\" /> <circle cx=\"50\" cy=\"45\" r=\"10\" stroke-width=\"1\" opacity=\"0.6\" />"
};
  const RARIDADE = { comum: 'Comum', incomum: 'Incomum', rara: 'Rara', lendaria: 'Lendária' };
  const CSS = `
    .cq-grade[hidden] { display: none; }   /* sem isto o display:grid vence o atributo hidden */
    .cq-grade { display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr)); gap: 14px; margin-top: 14px; }
    .cq-selo { --cq: #9A9A9A; position: relative; aspect-ratio: 1 / 1; border-radius: 20px; background: rgba(22, 22, 22, 0.92);
      border: 1.4px solid var(--cq); color: var(--cq); display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 14px 10px; box-sizing: border-box; box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5); transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1); }
    .cq-selo:hover { transform: translateY(-3px); }
    .cq-selo::before { content: ""; position: absolute; inset: 7px; border-radius: 14px; border: 1px solid currentColor; opacity: 0.35; pointer-events: none; }
    .cq-selo::after { content: ""; position: absolute; inset: 12px; border-radius: 10px; border: 0.8px solid rgba(240, 240, 240, 0.12); pointer-events: none; }
    .cq-selo.incomum { --cq: #D0D0D0; box-shadow: 0 10px 28px rgba(0, 0, 0, 0.6); }
    .cq-selo.rara { --cq: #C9A24C; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.7), 0 0 18px rgba(201, 162, 76, 0.12); }
    .cq-selo.lendaria { --cq: #E39A2E; border-width: 1.8px; box-shadow: 0 16px 36px rgba(0, 0, 0, 0.8), 0 0 26px rgba(227, 154, 46, 0.22), inset 0 0 10px rgba(227, 154, 46, 0.22); }
    .cq-selo svg { width: 48%; height: auto; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5)); }
    .cq-rotulo { margin-top: 10px; font: 700 10.5px 'Inter', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; color: var(--paper); text-align: center; line-height: 1.25; }
    .cq-meta { margin-top: 4px; font: 500 10px 'Inter', sans-serif; color: var(--cq); opacity: 0.85; text-align: center; }
    .cq-resumo { font-size: 14px; }
    .cq-acoes { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 4px; }
    .cq-titulo-linha { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; flex-wrap: wrap; }
    .cq-titulo-linha select { background: var(--ink); color: var(--paper); border: 1px solid var(--card-line); border-radius: 12px; padding: 8px 12px; font: 500 13px 'Inter', sans-serif; max-width: 100%; }
    .cq-vazio { font-size: 13px; opacity: 0.55; margin-top: 10px; }
    .pp-titulo { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--terracotta); margin-top: 4px; }
    @media (max-width: 600px) { .cq-grade { grid-template-columns: repeat(2, 1fr); } }
    @media (prefers-reduced-motion: reduce) { .cq-selo { transition: none; } }
  `;
  function estilo() {
    if (document.getElementById('cqEstilo')) return;
    const st = document.createElement('style'); st.id = 'cqEstilo'; st.textContent = CSS; document.head.appendChild(st);
  }
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  function dataCurta(d) { const p = (d || '').slice(0, 10).split('-'); return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : ''; }
  function selo(c) {
    const raridade = RARIDADE[c.raridade] ? c.raridade : 'comum';
    return `<div class="cq-selo ${raridade}" title="${esc(c.descricao)} — ${RARIDADE[raridade]}" role="img" aria-label="${esc(c.rotulo)}, conquista ${RARIDADE[raridade].toLowerCase()}">
      <svg viewBox="0 0 100 100" aria-hidden="true">${ICONES[c.id] || ''}</svg>
      <div class="cq-rotulo">${esc(c.rotulo)}</div>
      <div class="cq-meta">${RARIDADE[raridade]}${c.desbloqueada_em ? ' · ' + dataCurta(c.desbloqueada_em) : ''}</div>
    </div>`;
  }
  function chamar(caminho, opcoes) {
    if (typeof apiFetch === 'function' && typeof API_URL !== 'undefined') return apiFetch(API_URL + caminho, opcoes || {});
    return Promise.reject(new Error('sem API'));
  }
  // ---------- Configurações ----------
  function iniciarConfiguracoes() {
    const card = document.getElementById('conquistasCard');
    if (!card) return;
    estilo();
    const resumo = card.querySelector('#cqResumo'), grade = card.querySelector('#cqGrade'), botao = card.querySelector('#cqVerTodos'), sel = card.querySelector('#cqTitulo');
    const abrirGrade = (abrir) => { grade.hidden = !abrir; botao.textContent = abrir ? 'Esconder' : 'Ver todos'; botao.setAttribute('aria-expanded', abrir ? 'true' : 'false'); };
    botao.addEventListener('click', () => abrirGrade(grade.hidden));
    sel.addEventListener('change', () => {
      chamar('/conquistas/titulo', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ conquista_id: sel.value }) })
        .then(r => r.json())
        .then(d => { if (typeof mostrarMsg === 'function') mostrarMsg(d.erro ? d.erro : 'Título atualizado.', d.erro ? 'error' : 'success'); })
        .catch(() => {});
    });
    const carregar = () => chamar('/conquistas').then(r => r.json()).then(d => {
      const lista = (d && d.conquistas) || [];
      resumo.textContent = lista.length ? `${lista.length} de ${d.total_catalogo} conquistas desbloqueadas` : 'Nenhuma conquista ainda';
      grade.innerHTML = lista.length ? lista.map(selo).join('') : '<div class="cq-vazio">Use o Discoteca — coleção, wishlist, audições — e as conquistas aparecem aqui.</div>';
      sel.innerHTML = '<option value="">Sem título</option>' + lista.map(c => `<option value="${esc(c.id)}"${d.titulo === c.id ? ' selected' : ''}>${esc(c.nome)}</option>`).join('');
      sel.disabled = !lista.length;
      if (location.hash === '#conquistas') { abrirGrade(true); card.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }).catch(() => { resumo.textContent = 'Não foi possível carregar as conquistas agora.'; });
    // espera a sessão (a tela do app aparece) antes de pedir ao servidor
    const app = document.getElementById('appScreen');
    if (!app || app.style.display === 'block') return carregar();
    const obs = new MutationObserver(() => { if (app.style.display === 'block') { obs.disconnect(); carregar(); } });
    obs.observe(app, { attributes: true, attributeFilter: ['style'] });
  }
  // ---------- Perfil público ----------
  function renderPublico(el, lista) {
    if (!el) return;
    if (!lista || !lista.length) { el.innerHTML = ''; el.style.display = 'none'; return; }
    estilo();
    el.style.display = '';
    el.innerHTML = `<div class="pp-section-header"><h2>Conquistas</h2></div><div class="cq-grade">${lista.map(selo).join('')}</div>`;
  }
  window.DiscotecaConquistas = { renderPublico, selo, estilo };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarConfiguracoes); else iniciarConfiguracoes();
})();
