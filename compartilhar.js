/* ================================================================
   COMPARTILHAR — Discoteca
   ================================================================
   Modal de compartilhamento (mockup do dono, 09/10) e as imagens:
   - Audição: foto da audição > capa > vinil; artista, álbum, data, marca.
   - Wishlist "Na mira da agulha": grade 3 × 3 (mockup do dono).
   Formatos Post (1080 × 1350) e Story (1080 × 1920), desenhados num
   <canvas> no próprio navegador. Instagram/Compartilhar = menu nativo
   do celular com a imagem (sem menu: baixa a imagem). Threads = texto
   + link. Copiar = link com prévia rica (página gerada pelo servidor).
   Cada clique conta pra conquista Divulgador.
   ================================================================ */
(function () {
  const API = (typeof API_URL !== 'undefined') ? API_URL : 'https://fportelada.pythonanywhere.com';
  const OURO = '#C9A24C', FUNDO = '#101010', TEXTO = '#F0F0F0';
  const FORMATOS = { post: [1080, 1350], story: [1080, 1920] };

  const SVG = (d, w) => `<svg viewBox="0 0 24 24" width="${w || 18}" height="${w || 18}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    fechar: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    post: '<rect x="4" y="2" width="16" height="20" rx="2"/>',
    story: '<rect x="6" y="2" width="12" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    threads: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    baixar: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    copiar: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    compartilhar: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    editar: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'
  };
  const CSS = `
    #shOverlay { position: fixed; inset: 0; z-index: 2000; background: rgba(0,0,0,0.78); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      display: none; align-items: center; justify-content: center; padding: 16px; }
    #shOverlay.aberto { display: flex; }
    .sh-modal { width: 100%; max-width: 380px; max-height: calc(100vh - 32px); overflow-y: auto; background: #151515; border: 1px solid #252525; border-radius: 20px;
      padding: 22px 22px 18px; box-shadow: 0 32px 80px rgba(0,0,0,0.9); font-family: 'Inter', sans-serif; color: ${TEXTO}; box-sizing: border-box; }
    .sh-topo { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
    .sh-titulo { font-size: 17px; font-weight: 800; letter-spacing: -0.02em; }
    .sh-sub { font-size: 12px; color: #8A8A8A; margin-top: 2px; }
    .sh-fechar { background: transparent; border: 0; color: #8A8A8A; cursor: pointer; padding: 4px; border-radius: 8px; display: flex; }
    .sh-fechar:hover { color: ${TEXTO}; }
    .sh-previa { background: #0f0f0f; border: 1px solid #222; border-radius: 14px; overflow: hidden; margin-bottom: 14px; display: flex; justify-content: center; }
    .sh-previa img { display: block; width: 100%; height: auto; max-height: 52vh; object-fit: contain; }
    .sh-previa.carregando { min-height: 240px; align-items: center; color: #6a6a6a; font-size: 12px; }
    .sh-linha { display: flex; gap: 6px; margin-bottom: 12px; }
    .sh-opc { flex: 1; background: #0f0f0f; border: 1px solid #222; border-radius: 10px; padding: 9px 10px; font: 500 12px 'Inter', sans-serif; color: #8A8A8A;
      cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }
    .sh-opc[aria-pressed="true"] { border-color: ${OURO}; color: ${OURO}; background: rgba(201,162,76,0.06); }
    .sh-opc:disabled { opacity: 0.35; cursor: default; }
    .sh-canais { display: flex; gap: 8px; margin-bottom: 14px; }
    .sh-canal { flex: 1; background: #0f0f0f; border: 1px solid #222; border-radius: 10px; padding: 12px; display: flex; align-items: center; justify-content: center;
      color: #8A8A8A; cursor: pointer; min-height: 44px; }
    .sh-canal:hover { border-color: #3a3a3a; color: ${TEXTO}; }
    .sh-canal:disabled { opacity: 0.3; cursor: default; }
    .sh-acoes { display: flex; gap: 10px; }
    .sh-btn { flex: 1; padding: 11px; border-radius: 12px; font: 600 13px 'Inter', sans-serif; cursor: pointer; border: none; display: flex; align-items: center;
      justify-content: center; gap: 6px; min-height: 44px; }
    .sh-btn.sec { background: transparent; border: 1px solid #2a2a2a; color: #8A8A8A; flex: 0.6; }
    .sh-btn.sec:hover { color: ${TEXTO}; border-color: #3a3a3a; }
    .sh-btn.pri { background: ${OURO}; color: #101010; }
    .sh-btn.pri:hover { opacity: 0.92; }
    .sh-editar { margin: 12px auto 0; background: transparent; border: 0; font: 500 11px 'Inter', sans-serif; color: #6a6a6a; display: flex; align-items: center;
      justify-content: center; gap: 5px; cursor: pointer; padding: 6px; }
    .sh-editar:hover { color: #b0b0b0; }
    .sh-msg { font-size: 12px; text-align: center; min-height: 16px; margin-top: 8px; color: #b0b0b0; }
    .sh-aviso { font-size: 12px; line-height: 1.45; color: #d9c08a; background: rgba(201,162,76,0.07); border: 1px solid rgba(201,162,76,0.25); border-radius: 10px;
      padding: 9px 11px; margin-bottom: 12px; }
    .sh-modal button:focus-visible { outline: 2px solid ${OURO}; outline-offset: 2px; }
    .sh-botao-abrir { display: inline-flex; align-items: center; gap: 6px; }
  `;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  function dataCurta(iso) { const p = (iso || '').split('-'); return p.length === 3 ? `${p[2]} ${MESES[Number(p[1]) - 1] || ''} ${p[0]}` : ''; }
  function chamar(caminho, opcoes) {
    if (typeof apiFetch === 'function') return apiFetch(API + caminho, opcoes || {});
    return fetch(API + caminho, opcoes || {});
  }
  function limparArroba(n) {
    n = (n || '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9._]/g, '');
    return n ? '@' + n : '';
  }
  function arroba() {   // reserva: primeiro nome do login
    let n = '';
    try { n = localStorage.getItem('discoteca_user_nome') || ''; } catch (e) {}
    return limparArroba(n.trim().split(/\s+/)[0]);
  }
  async function arrobaPerfil(usuarioId) {   // nome de exibição do perfil
    try {
      const d = await (await chamar(`/perfil/${usuarioId}`)).json();
      const a = limparArroba(d && d.nome_exibicao);
      if (a) return a;
    } catch (e) {}
    return arroba();
  }

  // ---------- imagens ----------
  function carregarImagem(src) {
    return new Promise(res => {
      if (!src) return res(null);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => res(img);
      img.onerror = () => res(null);
      img.src = src;
      setTimeout(() => res(null), 9000);
    });
  }
  function urlCapa(capa) {
    if (!capa || !/^https:\/\//.test(capa)) return null;
    if (capa.startsWith(API)) return capa;
    return API + '/capa_proxy?url=' + encodeURIComponent(capa);
  }
  // Capa pra imagem: 1) direto do Discogs/Last.fm (eles liberam CORS na maioria das vezes),
  // 2) pelo repasse do servidor, 3) sem capa salva (ou as duas falharam): pede a capa ao
  // servidor (/buscar_capa) e tenta de novo. Só então desiste (fica o título).
  async function carregarCapa(capa, artista, album) {
    const tentar = async (u) => (u && /^https:\/\//.test(u)) ? (await carregarImagem(u)) || (await carregarImagem(urlCapa(u))) : null;
    let img = await tentar(capa);
    if (img || !artista || !album) return img;
    try {
      const d = await (await chamar(`/buscar_capa?artista=${encodeURIComponent(artista)}&album=${encodeURIComponent(album)}`)).json();
      if (d && d.capa_url && d.capa_url !== capa) img = await tentar(d.capa_url);
    } catch (e) {}
    return img;
  }
  async function fontesProntas() {
    try { await Promise.all(['900 40px Inter', '800 40px Inter', '700 40px Inter', '500 40px Inter', '400 40px Inter'].map(f => document.fonts.load(f))); } catch (e) {}
  }
  function cobrir(ctx, img, x, y, w, h) {   // object-fit: cover
    const r = Math.max(w / img.width, h / img.height), iw = img.width * r, ih = img.height * r;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih); ctx.restore();
  }
  function quebrar(ctx, texto, larg, maxLinhas) {
    const palavras = String(texto || '').split(/\s+/), linhas = []; let atual = '';
    for (const p of palavras) {
      const t = atual ? atual + ' ' + p : p;
      if (ctx.measureText(t).width <= larg || !atual) atual = t; else { linhas.push(atual); atual = p; }
    }
    if (atual) linhas.push(atual);
    if (linhas.length > maxLinhas) {
      const corte = linhas.slice(0, maxLinhas); let u = corte[maxLinhas - 1];
      while (u.length > 1 && ctx.measureText(u + '…').width > larg) u = u.slice(0, -1);
      corte[maxLinhas - 1] = u + '…'; return corte;
    }
    return linhas;
  }
  function vinil(ctx, cx, cy, r) {
    const g = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, r * 0.05, cx, cy, r);
    g.addColorStop(0, '#1f1f1f'); g.addColorStop(0.75, '#060606');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(201,162,76,0.07)'; ctx.lineWidth = 2;
    for (let k = r * 0.9; k > r * 0.28; k -= 11) { ctx.beginPath(); ctx.arc(cx, cy, k, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = 'rgba(201,162,76,0.15)'; ctx.beginPath(); ctx.arc(cx, cy, r * 0.24, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(201,162,76,0.55)'; ctx.font = `700 ${Math.round(r * 0.13)}px Inter, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('D.', cx, cy); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }
  function marca(ctx, x, y, tamanho, alinhar, cor) {
    ctx.font = `800 ${tamanho}px Inter, sans-serif`; ctx.textBaseline = 'middle';
    const w1 = ctx.measureText('Discoteca').width, w2 = ctx.measureText('.').width;
    const x0 = alinhar === 'right' ? x - w1 - w2 : x;
    ctx.fillStyle = cor || TEXTO; ctx.textAlign = 'left'; ctx.fillText('Discoteca', x0, y);
    ctx.fillStyle = OURO; ctx.fillText('.', x0 + w1, y); ctx.textBaseline = 'alphabetic';
  }

  // Audição (mockup "imagem social": foto em cima, divisor dourado, bloco editorial)
  function desenharAudicao(ctx, W, H, a, img, opc) {
    ctx.fillStyle = '#0f0f0f'; ctx.fillRect(0, 0, W, H);
    const infoH = 400, fotoH = H - infoH;
    const fundo = ctx.createRadialGradient(W / 2, fotoH * 0.4, 0, W / 2, fotoH * 0.4, W * 0.7);
    fundo.addColorStop(0, 'rgba(201,162,76,0.06)'); fundo.addColorStop(1, 'rgba(201,162,76,0)');
    ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0, 0, W, fotoH); ctx.fillStyle = fundo; ctx.fillRect(0, 0, W, fotoH);
    if (img) cobrir(ctx, img, 0, 0, W, fotoH); else vinil(ctx, W / 2, fotoH / 2, Math.min(W, fotoH) * 0.29);
    const div = ctx.createLinearGradient(0, 0, W, 0);
    div.addColorStop(0, 'rgba(201,162,76,0)'); div.addColorStop(0.3, 'rgba(201,162,76,0.55)'); div.addColorStop(0.7, 'rgba(201,162,76,0.55)'); div.addColorStop(1, 'rgba(201,162,76,0)');
    ctx.fillStyle = div; ctx.fillRect(0, fotoH, W, 3);
    const px = 78; let y = fotoH + 96;
    ctx.fillStyle = TEXTO; ctx.font = '800 58px Inter, sans-serif';
    quebrar(ctx, (a.artista || '').toUpperCase(), W - px * 2, 2).forEach((l, i) => ctx.fillText(l, px, y + i * 62));
    y += (quebrar(ctx, (a.artista || '').toUpperCase(), W - px * 2, 2).length - 1) * 62 + 56;
    ctx.fillStyle = '#9A9A9A'; ctx.font = '400 36px Inter, sans-serif';
    quebrar(ctx, a.album || '', W - px * 2, 2).forEach((l, i) => ctx.fillText(l, px, y + i * 46));
    const metaY = H - 74;
    ctx.fillStyle = '#1e1e1e'; ctx.fillRect(px, metaY - 52, W - px * 2, 2);
    if (opc.data && a.data) {
      ctx.fillStyle = '#7a7a7a'; ctx.font = '500 26px Inter, sans-serif'; ctx.textBaseline = 'middle';
      if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '2.6px';
      ctx.fillText(dataCurta(a.data), px, metaY); ctx.textBaseline = 'alphabetic';
      if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '0px';
    }
    marca(ctx, W - px, metaY, 32, 'right');
  }

  // Wishlist (mockup do dono: D. + @usuário, "Na mira da agulha", grade 3 × 3, rodapé)
  function desenharWishlist(ctx, W, H, w, capas) {
    const s = W / 760;                                    // o mockup foi desenhado com 760 px de largura
    ctx.fillStyle = FUNDO; ctx.fillRect(0, 0, W, H);
    const artH = W * 5 / 4, oy = (H - artH) / 2;          // Story: a arte 4:5 centralizada
    const cx = W / 2, cy = oy + artH * 0.42;
    ctx.save();                                           // sulcos de vinil, sumindo pras bordas
    for (let r = 3 * s; r < W * 0.95; r += 3 * s) {
      const alfa = Math.max(0, 1 - Math.max(0, r / (W * 0.95) - 0.55) / 0.4) * 0.55;
      ctx.strokeStyle = `rgba(201,162,76,${0.045 * alfa})`; ctx.lineWidth = 1 * s; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    }
    const brilho = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.45);
    brilho.addColorStop(0, 'rgba(201,162,76,0.05)'); brilho.addColorStop(1, 'rgba(201,162,76,0)');
    ctx.fillStyle = brilho; ctx.fillRect(0, 0, W, H); ctx.restore();
    const pad = 56 * s;
    let y = oy + 44 * s;
    ctx.textBaseline = 'top'; ctx.font = `900 ${22 * s}px Inter, sans-serif`; ctx.fillStyle = TEXTO;
    ctx.fillText('D', pad, y); const wd = ctx.measureText('D').width; ctx.fillStyle = OURO; ctx.fillText('.', pad + wd * 0.95, y);
    ctx.font = `400 ${13 * s}px Inter, sans-serif`; ctx.fillStyle = '#7a7a7a'; ctx.textAlign = 'right'; ctx.fillText(w.usuario || '', W - pad, y + 7 * s); ctx.textAlign = 'left';
    y += 22 * s + 20 * s;
    ctx.textAlign = 'center'; ctx.font = `800 ${22 * s}px Inter, sans-serif`;
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = `${1.76 * s}px`;
    const t1 = 'NA MIRA DA ', t2 = 'AGULHA', w1 = ctx.measureText(t1).width, w2 = ctx.measureText(t2).width;
    ctx.textAlign = 'left'; ctx.fillStyle = TEXTO; ctx.fillText(t1, cx - (w1 + w2) / 2, y); ctx.fillStyle = OURO; ctx.fillText(t2, cx - (w1 + w2) / 2 + w1, y);
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '0px';
    y += 22 * s + 4 * s;
    ctx.textAlign = 'center'; ctx.font = `400 ${13 * s}px Inter, sans-serif`; ctx.fillStyle = '#7a7a7a'; ctx.fillText('Discos que ainda faltam na coleção.', cx, y);
    ctx.textAlign = 'left';
    const rodapeH = (28 + 10 + 40) * s, gradeTopo = y + 18 * s + 32 * s, gradeBase = oy + artH - rodapeH, gap = 8 * s;
    const lado = Math.min((W - pad * 2 - gap * 2) / 3, (gradeBase - gradeTopo - gap * 2) / 3);
    const gx = (W - (lado * 3 + gap * 2)) / 2;
    for (let i = 0; i < 9; i++) {
      const x = gx + (i % 3) * (lado + gap), yy = gradeTopo + Math.floor(i / 3) * (lado + gap), d = w.discos[i], img = capas[i];
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 6 * s; ctx.shadowOffsetY = 2 * s;
      const g = ctx.createLinearGradient(x, yy, x + lado, yy + lado); g.addColorStop(0, '#262626'); g.addColorStop(1, '#131313');
      ctx.fillStyle = g; ctx.fillRect(x, yy, lado, lado); ctx.restore();
      if (img) cobrir(ctx, img, x, yy, lado, lado);
      else if (d) {
        ctx.fillStyle = 'rgba(240,240,240,0.62)'; ctx.font = `800 ${14 * s}px Inter, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const linhas = quebrar(ctx, (d.album || '').toUpperCase(), lado - 28 * s, 4);
        linhas.forEach((l, k) => ctx.fillText(l, x + lado / 2, yy + lado / 2 + (k - (linhas.length - 1) / 2) * 16 * s));
        ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      }
      const brilho2 = ctx.createLinearGradient(x, yy, x + lado, yy + lado);
      brilho2.addColorStop(0, 'rgba(255,255,255,0.06)'); brilho2.addColorStop(0.4, 'rgba(255,255,255,0)'); brilho2.addColorStop(0.65, 'rgba(0,0,0,0)'); brilho2.addColorStop(1, 'rgba(0,0,0,0.25)');
      ctx.fillStyle = brilho2; ctx.fillRect(x, yy, lado, lado);
    }
    const ry = oy + artH - 40 * s - 5 * s;
    ctx.textBaseline = 'middle'; ctx.font = `500 ${10 * s}px Inter, sans-serif`; ctx.fillStyle = '#5a5a5a';
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = `${1.6 * s}px`;
    ctx.fillText(`${w.total} ${w.total === 1 ? 'DISCO' : 'DISCOS'}`, pad, ry);
    ctx.textAlign = 'right'; const assin = 'DISCOTECA', wa = ctx.measureText(assin).width, wp = ctx.measureText('.').width;
    ctx.fillText(assin, W - pad - wp, ry); ctx.fillStyle = OURO; ctx.fillText('.', W - pad, ry);
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '0px';
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; void wa;
  }

  // ---------- modal ----------
  let estado = null;
  function montar() {
    if (document.getElementById('shOverlay')) return;
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    const o = document.createElement('div'); o.id = 'shOverlay';
    o.innerHTML = `
      <div class="sh-modal" role="dialog" aria-modal="true" aria-labelledby="shTitulo">
        <div class="sh-topo"><div><div class="sh-titulo" id="shTitulo"></div><div class="sh-sub" id="shSub"></div></div>
          <button type="button" class="sh-fechar" id="shFechar" aria-label="Fechar">${SVG(IC.fechar)}</button></div>
        <div class="sh-aviso" id="shAviso" hidden>Seu perfil está privado: o link não abre para outras pessoas. A imagem funciona normalmente.</div>
        <div class="sh-previa carregando" id="shPrevia">Gerando a imagem…</div>
        <div class="sh-linha" role="group" aria-label="Formato">
          <button type="button" class="sh-opc" data-formato="post" aria-pressed="true">${SVG(IC.post, 14)} Post</button>
          <button type="button" class="sh-opc" data-formato="story" aria-pressed="false">${SVG(IC.story, 14)} Story</button>
        </div>
        <div id="shEdicao" hidden>
          <div class="sh-linha" role="group" aria-label="Imagem">
            <button type="button" class="sh-opc" data-img="foto" aria-pressed="true">Foto</button>
            <button type="button" class="sh-opc" data-img="capa" aria-pressed="false">Capa</button>
          </div>
          <div class="sh-linha"><button type="button" class="sh-opc" id="shData" aria-pressed="true">Mostrar data</button></div>
        </div>
        <div class="sh-canais">
          <button type="button" class="sh-canal" id="shInstagram" aria-label="Instagram">${SVG(IC.instagram, 20)}</button>
          <button type="button" class="sh-canal" id="shThreads" aria-label="Threads">${SVG(IC.threads, 20)}</button>
          <button type="button" class="sh-canal" id="shCopiar" aria-label="Copiar link">${SVG(IC.copiar, 20)}</button>
          <button type="button" class="sh-canal" id="shBaixar" aria-label="Baixar imagem" title="Baixar imagem">${SVG(IC.baixar, 20)}</button>
        </div>
        <div class="sh-acoes">
          <button type="button" class="sh-btn sec" id="shCancelar">Cancelar</button>
          <button type="button" class="sh-btn pri" id="shCompartilhar">${SVG(IC.compartilhar, 15)} <span>Compartilhar</span></button>
        </div>
        <button type="button" class="sh-editar" id="shEditar" aria-expanded="false" aria-controls="shEdicao">${SVG(IC.editar, 12)} Editar imagem</button>
        <div class="sh-msg" id="shMsg" role="status"></div>
      </div>`;
    document.body.appendChild(o);
    const $ = id => document.getElementById(id);
    o.addEventListener('click', e => { if (e.target === o) fechar(); });
    $('shFechar').addEventListener('click', fechar); $('shCancelar').addEventListener('click', fechar);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && o.classList.contains('aberto')) fechar(); });
    o.querySelectorAll('[data-formato]').forEach(b => b.addEventListener('click', () => { estado.formato = b.dataset.formato; atualizar(); }));
    o.querySelectorAll('[data-img]').forEach(b => b.addEventListener('click', () => { if (!b.disabled) { estado.usarFoto = b.dataset.img === 'foto'; atualizar(); } }));
    $('shData').addEventListener('click', () => { estado.mostrarData = !estado.mostrarData; atualizar(); });
    $('shEditar').addEventListener('click', () => { const ed = $('shEdicao'); ed.hidden = !ed.hidden; $('shEditar').setAttribute('aria-expanded', ed.hidden ? 'false' : 'true'); });
    $('shInstagram').addEventListener('click', () => enviarImagem(true));
    $('shCompartilhar').addEventListener('click', () => enviarImagem(false));
    $('shThreads').addEventListener('click', () => {
      contar();
      window.open('https://www.threads.net/intent/post?text=' + encodeURIComponent(estado.texto + ' ' + estado.link), '_blank', 'noopener');
    });
    $('shBaixar').addEventListener('click', () => {
      if (!estado || !estado.blob) return;
      contar();
      const a = document.createElement('a'); a.href = estado.urlPrevia; a.download = estado.nomeArquivo; document.body.appendChild(a); a.click(); a.remove();
      msg('Imagem baixada.');
    });
    $('shCopiar').addEventListener('click', async () => {
      contar();
      try { await navigator.clipboard.writeText(estado.link); msg('Link copiado.'); }
      catch (e) { window.prompt('Copie o link:', estado.link); }
    });
  }
  function msg(t) { const m = document.getElementById('shMsg'); if (m) m.textContent = t || ''; }
  function fechar() {
    const o = document.getElementById('shOverlay'); if (o) o.classList.remove('aberto');
    if (estado && estado.urlPrevia) URL.revokeObjectURL(estado.urlPrevia);
    if (estado && estado.voltar) try { estado.voltar.focus(); } catch (e) {}
    estado = null;
  }
  function contar() { chamar('/compartilhamentos', { method: 'POST' }).catch(() => {}); }
  async function gerar() {
    const [W, H] = FORMATOS[estado.formato];
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    await fontesProntas();
    if (estado.tipo === 'audicao') {
      const img = estado.usarFoto && estado.imgFoto ? estado.imgFoto : estado.imgCapa;
      desenharAudicao(ctx, W, H, estado.dados, img, { data: estado.mostrarData });
    } else {
      desenharWishlist(ctx, W, H, estado.dados, estado.capas);
    }
    return new Promise(res => cv.toBlob(b => res(b), 'image/png'));
  }
  async function atualizar() {
    const o = document.getElementById('shOverlay');
    o.querySelectorAll('[data-formato]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.formato === estado.formato)));
    o.querySelectorAll('[data-img]').forEach(b => b.setAttribute('aria-pressed', String((b.dataset.img === 'foto') === estado.usarFoto)));
    document.getElementById('shData').setAttribute('aria-pressed', String(estado.mostrarData));
    document.getElementById('shData').textContent = estado.mostrarData ? 'Mostrar data' : 'Data escondida';
    const previa = document.getElementById('shPrevia'), meu = estado;
    const blob = await gerar();
    if (estado !== meu || !blob) return;
    if (estado.urlPrevia) URL.revokeObjectURL(estado.urlPrevia);
    estado.blob = blob; estado.urlPrevia = URL.createObjectURL(blob);
    previa.classList.remove('carregando');
    previa.innerHTML = `<img src="${estado.urlPrevia}" alt="${esc(estado.alt)}">`;
  }
  async function enviarImagem(instagram) {
    if (!estado || !estado.blob) return;
    contar();
    const arquivo = new File([estado.blob], estado.nomeArquivo, { type: 'image/png' });
    const dados = instagram ? { files: [arquivo] } : { files: [arquivo], text: estado.texto + (estado.publico ? ' ' + estado.link : '') };
    try {
      if (navigator.canShare && navigator.canShare({ files: [arquivo] })) { await navigator.share(dados); msg(''); return; }
    } catch (e) { if (e && e.name === 'AbortError') return; }
    const a = document.createElement('a'); a.href = estado.urlPrevia; a.download = estado.nomeArquivo; document.body.appendChild(a); a.click(); a.remove();
    msg(instagram ? 'Imagem baixada. Publique pelo Instagram a partir da galeria.' : 'Imagem baixada.');
  }
  async function perfilPublico() {
    try { const d = await (await chamar('/configuracoes')).json(); return !!d.privacidade_perfil_publico; } catch (e) { return true; }
  }
  async function abrir(novo) {
    montar();
    estado = Object.assign({ formato: 'post', usarFoto: true, mostrarData: true, voltar: document.activeElement }, novo);
    const o = document.getElementById('shOverlay'), $ = id => document.getElementById(id);
    $('shTitulo').textContent = estado.titulo; $('shSub').textContent = estado.sub;
    $('shPrevia').className = 'sh-previa carregando'; $('shPrevia').textContent = 'Gerando a imagem…';
    $('shEdicao').hidden = true; $('shEditar').setAttribute('aria-expanded', 'false');
    $('shEditar').style.display = estado.tipo === 'audicao' ? '' : 'none';
    msg(''); o.classList.add('aberto'); $('shFechar').focus();
    const meu = estado;
    const [publico] = await Promise.all([perfilPublico(), estado.preparar()]);
    if (estado !== meu) return;
    estado.publico = publico;
    $('shAviso').hidden = publico; $('shThreads').disabled = !publico; $('shCopiar').disabled = !publico;
    if (estado.tipo === 'audicao') o.querySelector('[data-img="foto"]').disabled = !estado.imgFoto;
    if (estado.tipo === 'audicao' && !estado.imgFoto) estado.usarFoto = false;
    await atualizar();
  }

  window.DiscotecaCompartilhar = {
    audicao(a) {   // a: { id, artista, album, data, capa_url, foto }
      if (!a || !a.id) return;
      abrir({
        tipo: 'audicao', dados: a, titulo: 'Compartilhar audição', sub: 'Mostre o que está tocando agora.',
        alt: `${a.album} — ${a.artista}`, nomeArquivo: `discoteca-audicao-${a.data || ''}.png`,
        texto: `Ouvindo ${a.album} — ${a.artista} no Discoteca.`, link: `${API}/compartilhar/a/${a.id}`,
        async preparar() {
          const [f, c] = await Promise.all([carregarImagem(a.foto ? `${API}/audicoes/foto/${a.foto}.jpg` : null), carregarCapa(a.capa_url, a.artista, a.album)]);
          this.imgFoto = f; this.imgCapa = c;
        }
      });
    },
    async wishlist(itens, usuarioId) {   // itens: recomendações (já em ordem de prioridade)
      if (!Array.isArray(itens) || !itens.length) {   // lista ainda não carregada: busca agora
        try { const d = await (await chamar('/recomendacoes')).json(); itens = Array.isArray(d) ? d : []; } catch (e) { itens = []; }
      }
      if (!itens.filter(i => !i.comprado).length) { alert('Sua wishlist está vazia. Adicione discos para compartilhar.'); return; }
      const ordem = { S: 1, A: 2, B: 3, C: 4 };
      const lista = (itens || []).filter(i => !i.comprado).slice().sort((x, y) => (ordem[x.tier] || 9) - (ordem[y.tier] || 9));
      const nove = lista.slice(0, 9);
      abrir({
        tipo: 'wishlist', dados: { usuario: arroba(), discos: nove, total: lista.length },
        titulo: 'Compartilhar wishlist', sub: 'Os discos que ainda faltam na coleção.', alt: 'Na mira da agulha — wishlist',
        nomeArquivo: 'discoteca-wishlist.png', texto: 'Na mira da agulha: minha wishlist no Discoteca.', link: `${API}/compartilhar/w/${usuarioId}`,
        async preparar() { [this.dados.usuario, this.capas] = await Promise.all([arrobaPerfil(usuarioId), Promise.all(nove.map(d => carregarCapa(d.capa_url, d.artista, d.album)))]); }
      });
    },
    _desenhar: { desenharAudicao, desenharWishlist }   // usado nos testes
  };
})();
