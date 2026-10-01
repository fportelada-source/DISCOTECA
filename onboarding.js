/* ================================================================
   APRESENTAÇÃO (onboarding) — Discoteca
   ================================================================
   Um painel grande (quase tela cheia) com os 3 tópicos lado a lado;
   no celular, tela cheia com os tópicos empilhados. Reaproveita o
   sistema de modal do app (.modal-overlay, .modal, .modal-close e o
   botão dourado .form-btn do style.css); aqui só ficam o layout do
   painel, a entrada animada e o ajuste de celular — por isso o CSS vai embutido neste arquivo, sem mexer no
   style.css (que obrigaria a subir as 9 páginas).

   Quem viu fica salvo NO SERVIDOR, por usuário (rota /onboarding): não
   volta ao atualizar a página, ao fechar o navegador, nem ao sair e
   entrar de novo, em qualquer aparelho. Uma cópia local evita perguntar
   ao servidor toda vez.

   Uso:
     <script src="onboarding.js" data-auto="1"></script>  -> mostra
       sozinho na 1ª vez que o usuário logado entra (Início).
     DiscotecaOnboarding.abrir()  -> abre a qualquer momento
       (Configurações → "Rever apresentação").
   ================================================================ */
(function () {
  const PASSOS = [
    { n: '01', pergunta: 'O que é o Discoteca?',
      titulo: 'Transforme suas playlists em uma coleção de mídias físicas.',
      texto: 'Um companion app para organizar sua coleção, gerenciar sua wishlist e descobrir música nova.' },
    { n: '02', pergunta: 'Por que usar?',
      titulo: 'Tudo em um só lugar.',
      texto: 'Chega de ficar pulando de um lugar para outro. Uma experiência simples, bonita e fácil de usar.' },
    { n: '03', pergunta: 'Como começar?',
      titulo: 'Importe suas playlists. Descubra o que comprar. Construa sua coleção.',
      texto: 'O Discoteca transforma seu gosto musical em uma experiência de colecionismo personalizada.' }
  ];

  const CSS = `
    #onbOverlay { padding: 24px; box-sizing: border-box; }
    #onbOverlay .onb-modal { max-width: none; width: min(1120px, 100%); height: min(680px, 100%); max-height: none;
      padding: 0; box-sizing: border-box; display: flex; flex-direction: column; overflow: hidden; }
    #onbOverlay .onb-modal:focus { outline: none; }
    #onbOverlay.open .onb-modal { animation: onbEntra 0.32s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
    @keyframes onbEntra { from { opacity: 0; transform: translateY(12px) scale(0.985); } to { opacity: 1; transform: none; } }
    .onb-topo { display: flex; justify-content: space-between; align-items: center; padding: 22px 28px 0 36px; flex-shrink: 0; }
    .onb-marca { font-size: 17px; font-weight: 800; letter-spacing: -0.02em; color: var(--paper); }
    .onb-marca span { color: var(--terracotta); }
    #onbOverlay .modal-close { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
    #onbOverlay .modal-close:focus-visible, #onbAvancar:focus-visible { outline: 2px solid var(--terracotta); outline-offset: 2px; }
    .onb-corpo { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; justify-content: center; padding: 8px 36px; }
    .onb-intro { font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--terracotta); margin-bottom: 28px; }
    .onb-grade { display: grid; grid-template-columns: repeat(3, 1fr); }
    .onb-topico { padding: 4px 32px 4px 0; }
    .onb-topico + .onb-topico { padding-left: 32px; border-left: 1px solid var(--card-line); }
    #onbOverlay.open .onb-topico { animation: onbTopico 0.36s ease both; }
    #onbOverlay.open .onb-topico:nth-child(2) { animation-delay: 0.08s; }
    #onbOverlay.open .onb-topico:nth-child(3) { animation-delay: 0.16s; }
    @keyframes onbTopico { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    .onb-num { font-size: 44px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; color: var(--terracotta); margin-bottom: 18px; font-variant-numeric: tabular-nums; }
    .onb-pergunta { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.45; margin-bottom: 10px; }
    .onb-titulo { font-size: clamp(20px, 2.1vw, 26px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.18; margin: 0; }
    .onb-texto { font-size: 14.5px; line-height: 1.6; opacity: 0.6; margin: 14px 0 0; }
    .onb-rodape { flex-shrink: 0; display: flex; justify-content: center; padding: 20px 36px 30px; }
    #onbOverlay .onb-rodape .form-btn { margin-top: 0; width: 100%; max-width: 340px; min-height: 50px; }
    @media (max-width: 860px) {
      #onbOverlay { padding: 0; }
      #onbOverlay .onb-modal { width: 100%; height: 100%; border-radius: 0; border: none;
        padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }
      .onb-topo { padding: 14px 14px 0 22px; }
      .onb-corpo { justify-content: flex-start; padding: 18px 22px 8px; }
      .onb-intro { margin-bottom: 22px; }
      .onb-grade { grid-template-columns: 1fr; gap: 26px; }
      .onb-topico, .onb-topico + .onb-topico { padding: 0; border-left: none; }
      .onb-topico + .onb-topico { padding-top: 26px; border-top: 1px solid var(--card-line); }
      .onb-num { font-size: 32px; margin-bottom: 12px; }
      .onb-rodape { padding: 14px 22px 18px; border-top: 1px solid var(--card-line); }
      #onbOverlay .onb-rodape .form-btn { max-width: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      #onbOverlay.open .onb-modal, #onbOverlay.open .onb-topico { animation: none; }
    }
  `;

  let overlay = null, focoAnterior = null, aberto = false;

  function chaveLocal() {
    const uid = localStorage.getItem('discoteca_user_id');
    return uid ? 'discoteca_onboarding_visto_' + uid : null;
  }
  function chamarApi(caminho, opcoes) {
    if (typeof apiFetch !== 'function' || typeof API_URL === 'undefined') return Promise.reject(new Error('sem API'));
    return apiFetch(API_URL + caminho, opcoes || {});
  }

  function montar() {
    if (overlay) return;
    const estilo = document.createElement('style');
    estilo.id = 'onbEstilo';
    estilo.textContent = CSS;
    document.head.appendChild(estilo);

    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'onbOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'onbTitulo');
    overlay.innerHTML = `
      <div class="modal onb-modal" tabindex="-1">
        <div class="onb-topo">
          <div class="onb-marca" aria-hidden="true">D<span>iscoteca</span></div>
          <button type="button" class="modal-close" id="onbFechar" aria-label="Fechar apresentação">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="onb-corpo">
          <h2 class="onb-intro" id="onbTitulo">Bem-vindo ao Discoteca</h2>
          <div class="onb-grade">
            ${PASSOS.map(p => `
              <section class="onb-topico" aria-label="${p.n} — ${p.pergunta}">
                <div class="onb-num" aria-hidden="true">${p.n}</div>
                <div class="onb-pergunta">${p.pergunta}</div>
                <h3 class="onb-titulo">${p.titulo}</h3>
                <p class="onb-texto">${p.texto}</p>
              </section>`).join('')}
          </div>
        </div>
        <div class="onb-rodape">
          <button type="button" class="form-btn" id="onbAvancar">Começar a usar o Discoteca</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelector('#onbFechar').addEventListener('click', () => fechar());
    overlay.querySelector('#onbAvancar').addEventListener('click', () => fechar());
    document.addEventListener('keydown', e => {
      if (!aberto) return;
      if (e.key === 'Escape') { e.preventDefault(); fechar(); }
      else if (e.key === 'Tab') {
        // mantém o Tab dentro do modal enquanto ele está aberto
        const foco = [...overlay.querySelectorAll('button')];
        const i = foco.indexOf(document.activeElement);
        if (e.shiftKey && (i <= 0)) { e.preventDefault(); foco[foco.length - 1].focus(); }
        else if (!e.shiftKey && i === foco.length - 1) { e.preventDefault(); foco[0].focus(); }
      }
    });
  }

  function abrir() {
    montar();
    focoAnterior = document.activeElement;
    const corpo = overlay.querySelector('.onb-corpo'); if (corpo) corpo.scrollTop = 0;
    overlay.classList.add('open');
    aberto = true;
    // foco no card (sem contorno visível): leitor de tela anuncia o conteúdo e o Tab leva aos botões
    setTimeout(() => { const m = overlay.querySelector('.onb-modal'); if (m) m.focus(); }, 30);
  }

  function marcarVisto() {
    const k = chaveLocal();
    if (k) { try { localStorage.setItem(k, '1'); } catch (e) {} }
    chamarApi('/onboarding/visto', { method: 'POST' }).catch(() => {});
  }

  function fechar() {
    if (!overlay || !aberto) return;
    overlay.classList.remove('open');
    aberto = false;
    marcarVisto();   // fechou pelo X, pelo Esc ou terminou: não aparece de novo sozinho
    if (focoAnterior && typeof focoAnterior.focus === 'function') focoAnterior.focus();
  }

  function verificarPrimeiraVez() {
    const k = chaveLocal();
    if (!k || !localStorage.getItem('discoteca_session_token')) return;   // só logado
    if (localStorage.getItem(k) === '1') return;                          // já visto neste aparelho
    chamarApi('/onboarding')
      .then(r => r.json())
      .then(d => {
        if (d && d.visto === false) abrir();
        else if (d && d.visto === true) { try { localStorage.setItem(k, '1'); } catch (e) {} }
      })
      .catch(() => {});   // sem servidor: não mostra (melhor que mostrar sempre)
  }

  // Modo automático: espera a tela do app aparecer (= sessão confirmada)
  // em vez de depender da ordem dos scripts de cada página.
  function quandoLogado(fn) {
    const app = document.getElementById('appScreen');
    if (!app) return;
    const visivel = () => app.style.display === 'block';
    if (visivel()) return fn();
    const obs = new MutationObserver(() => { if (visivel()) { obs.disconnect(); fn(); } });
    obs.observe(app, { attributes: true, attributeFilter: ['style'] });
  }

  const auto = document.currentScript && document.currentScript.dataset.auto === '1';
  window.DiscotecaOnboarding = { abrir, verificarPrimeiraVez };
  if (auto) {
    const iniciar = () => quandoLogado(() => setTimeout(verificarPrimeiraVez, 400));
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
    else iniciar();
  }
})();
