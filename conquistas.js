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
  const COR = { comum: '#9A9A9A', incomum: '#D0D0D0', rara: '#C9A24C', lendaria: '#E39A2E' };
  const UNIDADE = { colecao_crescente: 'itens', mestre_do_vinil: 'vinis', mestre_do_cd: 'CDs', mestre_do_cassete: 'cassetes', mestre_do_dvd: 'DVDs',
    completista: 'artistas completos', superfa: 'discos do mesmo artista', mago_da_wishlist: 'itens da wishlist na coleção', a_caca: 'itens na wishlist',
    vintage: 'anos', ao_vivo: 'álbuns ao vivo', trilha_sonora: 'trilhas sonoras', coletanista: 'coletâneas', viajante_do_tempo: 'décadas',
    multiformato: 'formatos', maratona: 'discos no mesmo dia', fiel: 'audições do mesmo disco', fotografo: 'audições com foto', arquivista: 'discos catalogados' };
  const DADOS = new WeakMap();   // elemento do selo -> { conquista, comProgresso }
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
    .cq-selo { cursor: default; outline: none; }
    .cq-selo:focus-visible { box-shadow: 0 0 0 2px var(--paper); }
    .cq-mini { border-radius: 16px; padding: 10px 6px; }
    .cq-mini::before { inset: 5px; border-radius: 11px; } .cq-mini::after { inset: 9px; border-radius: 8px; }
    .cq-mini .cq-rotulo { font-size: 9px; margin-top: 7px; } .cq-mini .cq-meta { display: none; }
    #cqBalao { position: fixed; z-index: 90; max-width: 280px; background: #141414; border: 1px solid var(--cqb, #9A9A9A); border-radius: 14px;
      padding: 12px 14px; box-shadow: 0 18px 40px -12px rgba(0,0,0,0.85); font-family: 'Inter', sans-serif; color: var(--paper); pointer-events: none;
      opacity: 0; transform: translateY(4px); transition: opacity 0.15s ease, transform 0.15s ease; }
    #cqBalao.visivel { opacity: 1; transform: none; }
    #cqBalao .b-nome { font-size: 14px; font-weight: 700; }
    #cqBalao .b-rar { font-size: 10.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--cqb); margin-top: 2px; }
    #cqBalao .b-desc { font-size: 12.5px; line-height: 1.45; opacity: 0.75; margin-top: 8px; }
    #cqBalao .b-linha { font-size: 11.5px; opacity: 0.5; margin-top: 6px; }
    #cqBalao .b-prox { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--card-line); font-size: 12px; }
    #cqBalao .b-barra { height: 5px; border-radius: 3px; background: #262626; margin-top: 6px; overflow: hidden; }
    #cqBalao .b-barra span { display: block; height: 100%; background: var(--cqb); border-radius: 3px; }
    .cq-vitrine-topo { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
    .cq-vitrine-resumo { font-size: 13px; opacity: 0.55; }
    .cq-vitrine { display: grid; grid-template-columns: minmax(300px, 1.1fr) 1fr; gap: 28px; align-items: center; margin-top: 18px; }
    .cq-vitrine.so-destaque { grid-template-columns: 1fr; justify-items: center; }   /* só uma conquista: cartão centralizado, sem buraco */
    .cq-vitrine.so-destaque .cq-destaque-texto .d-desc { max-width: 420px; }
    .cq-outras .cq-selo { max-width: 150px; width: 100%; }
    .cq-destaque { display: flex; align-items: center; gap: 22px; }
    .cq-destaque .cq-selo { width: 168px; flex-shrink: 0; }
    .cq-destaque-texto .d-nome { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
    .cq-destaque-texto .d-rar { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }
    .cq-destaque-texto .d-desc { font-size: 14px; line-height: 1.5; opacity: 0.65; margin-top: 10px; max-width: 360px; }
    .cq-destaque-texto .d-data { font-size: 12px; opacity: 0.45; margin-top: 8px; }
    .cq-outras { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    @media (max-width: 860px) {
      .cq-vitrine { grid-template-columns: 1fr; gap: 18px; }
      .cq-outras { grid-template-columns: none; grid-auto-flow: column; grid-auto-columns: 104px; overflow-x: auto; padding-bottom: 6px; scrollbar-width: thin; scrollbar-color: #3a3a3a transparent; }
    }
    @media (max-width: 600px) {
      .cq-grade { grid-template-columns: repeat(2, 1fr); }
      .cq-destaque .cq-selo { width: 128px; } .cq-destaque { gap: 16px; } .cq-destaque-texto .d-nome { font-size: 18px; }
    }
    @media (prefers-reduced-motion: reduce) { .cq-selo, #cqBalao { transition: none; } }
  `;
  function estilo() {
    if (document.getElementById('cqEstilo')) return;
    const st = document.createElement('style'); st.id = 'cqEstilo'; st.textContent = CSS; document.head.appendChild(st);
  }
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  function dataCurta(d) { const p = (d || '').slice(0, 10).split('-'); return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : ''; }
  let FILA = [];   // conquistas desenhadas, na ordem (o selo guarda o índice e o balão lê daqui)
  function selo(c, extra) {
    const raridade = RARIDADE[c.raridade] ? c.raridade : 'comum';
    FILA.push(c);
    return `<div class="cq-selo ${raridade}${extra ? ' ' + extra : ''}" data-cq="${FILA.length - 1}" tabindex="0" role="img" aria-label="${esc(c.rotulo)}, conquista ${RARIDADE[raridade].toLowerCase()}. ${esc(c.descricao)}">
      <svg viewBox="0 0 100 100" aria-hidden="true">${ICONES[c.id] || ''}</svg>
      <div class="cq-rotulo">${esc(c.rotulo)}</div>
      <div class="cq-meta">${RARIDADE[raridade]}${c.desbloqueada_em ? ' · ' + dataCurta(c.desbloqueada_em) : ''}</div>
    </div>`;
  }
  let balao = null, ancora = null, abertoEm = 0;
  function textoBalao(c, comProgresso) {
    const unid = UNIDADE[c.id], unico = !unid || (c.niveis || 1) === 1;
    let html = `<div class="b-nome">${esc(c.rotulo)}</div><div class="b-rar">${RARIDADE[c.raridade] || ''}</div><div class="b-desc">${esc(c.descricao)}</div>`;
    if (!unico && c.alvo) html += `<div class="b-linha">Meta deste nível: ${c.alvo} ${unid}</div>`;
    if (c.desbloqueada_em) html += `<div class="b-linha">Desbloqueada em ${dataCurta(c.desbloqueada_em)}</div>`;
    if (comProgresso && c.proximo && unid) {
      const v = Math.min(Number(c.valor) || 0, c.proximo.alvo), pct = Math.round(v / c.proximo.alvo * 100);
      html += `<div class="b-prox">Próximo: <strong>${esc(c.proximo.rotulo)}</strong> — ${v} de ${c.proximo.alvo} ${unid}<div class="b-barra"><span style="width:${pct}%"></span></div></div>`;
    } else if (comProgresso && !c.proximo && (c.niveis || 1) > 1) {
      html += `<div class="b-prox">Nível máximo alcançado.</div>`;
    }
    return html;
  }
  function mostrarBalao(el) {
    const c = FILA[Number(el.dataset.cq)]; if (!c) return;
    if (!balao) { balao = document.createElement('div'); balao.id = 'cqBalao'; balao.setAttribute('role', 'tooltip'); document.body.appendChild(balao); }
    ancora = el;
    balao.style.setProperty('--cqb', COR[c.raridade] || COR.comum);
    balao.innerHTML = textoBalao(c, el.closest('#conquistasCard') !== null);
    const r = el.getBoundingClientRect(), b = balao.getBoundingClientRect();
    let top = r.top - b.height - 10;                         // em cima; sem espaço, embaixo
    if (top < 8) top = r.bottom + 10;
    let left = r.left + r.width / 2 - b.width / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - b.width - 8));
    balao.style.top = Math.round(top) + 'px'; balao.style.left = Math.round(left) + 'px';
    balao.classList.add('visivel');
    abertoEm = Date.now();
  }
  function esconderBalao() { if (balao) balao.classList.remove('visivel'); ancora = null; }
  function ligarBalao() {
    if (document.documentElement.dataset.cqBalao) return;
    document.documentElement.dataset.cqBalao = '1';
    const alvo = e => e.target.closest && e.target.closest('.cq-selo[data-cq]');
    document.addEventListener('mouseover', e => { const s = alvo(e); if (s) mostrarBalao(s); });
    document.addEventListener('mouseout', e => { const s = alvo(e); if (s && !s.contains(e.relatedTarget)) esconderBalao(); });
    document.addEventListener('focusin', e => { const s = alvo(e); if (s) mostrarBalao(s); });
    document.addEventListener('focusout', e => { if (alvo(e)) esconderBalao(); });
    document.addEventListener('click', e => {   // toque no celular: abre; tocar de novo (ou fora) fecha
      const s = alvo(e);
      if (!s) return esconderBalao();
      if (Date.now() - abertoEm < 400) return;   // o próprio toque já abriu (via mouseover/foco): não fecha
      (ancora === s && balao && balao.classList.contains('visivel')) ? esconderBalao() : mostrarBalao(s);
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') esconderBalao(); });
    window.addEventListener('scroll', esconderBalao, { passive: true });
  }
  function chamar(caminho, opcoes) {
    if (typeof apiFetch === 'function' && typeof API_URL !== 'undefined') return apiFetch(API_URL + caminho, opcoes || {});
    return Promise.reject(new Error('sem API'));
  }
  // ---------- Configurações ----------
  function iniciarConfiguracoes() {
    const card = document.getElementById('conquistasCard');
    if (!card) return;
    estilo(); ligarBalao();
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
      grade.innerHTML = lista.length ? lista.map(c => selo(c)).join('') : '<div class="cq-vazio">Use o Discoteca — coleção, wishlist, audições — e as conquistas aparecem aqui.</div>';
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
  // Vitrine: destaque (a do título ou a mais rara) + até 6 outras + resumo por raridade
  function renderPublico(el, vitrine) {
    if (!el) return;
    if (!vitrine || !vitrine.destaque) { el.innerHTML = ''; el.style.display = 'none'; return; }
    estilo(); ligarBalao();
    const d = vitrine.destaque, r = vitrine.resumo || {}, outras = vitrine.outras || [];
    const partes = [`${r.total} ${r.total === 1 ? 'conquista' : 'conquistas'}`];
    [['lendaria', 'lendária', 'lendárias'], ['rara', 'rara', 'raras']].forEach(([k, s, pl]) => { if (r[k]) partes.push(`${r[k]} ${r[k] === 1 ? s : pl}`); });
    el.style.display = '';
    el.innerHTML = `<div class="cq-vitrine-topo"><h2 style="margin:0">Conquistas</h2><span class="cq-vitrine-resumo">${partes.join(' · ')}</span></div>
      <div class="cq-vitrine${outras.length ? '' : ' so-destaque'}">
        <div class="cq-destaque">${selo(d)}<div class="cq-destaque-texto">
          <div class="d-nome">${esc(d.rotulo)}</div><div class="d-rar" style="color:${COR[d.raridade] || COR.comum}">${RARIDADE[d.raridade] || ''}</div>
          <div class="d-desc">${esc(d.descricao)}</div>${d.desbloqueada_em ? `<div class="d-data">Desbloqueada em ${dataCurta(d.desbloqueada_em)}</div>` : ''}
        </div></div>
        ${outras.length ? `<div class="cq-outras">${outras.map(c => selo(c, 'cq-mini')).join('')}</div>` : ''}
      </div>`;
  }
  window.DiscotecaConquistas = { renderPublico, selo, estilo };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarConfiguracoes); else iniciarConfiguracoes();
})();
