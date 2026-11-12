/* Conexão com o Hilla (mesma de todas as páginas) */
const API_URL = 'https://fportelada.pythonanywhere.com';
function apiFetch(url, opcoes = {}) {
  let t = null; try { t = localStorage.getItem('discoteca_session_token'); } catch (e) {}
  return fetch(url, { ...opcoes, headers: { ...(opcoes.headers || {}), 'X-Session-Token': t || '' } });
}
(function () {
  let nome = null; try { nome = localStorage.getItem('discoteca_user_nome'); } catch (e) {}
  const n = document.getElementById('userNameDisplay'), av = document.getElementById('userAvatar');
  if (n) n.textContent = nome || 'Entrar';
  if (av) av.textContent = nome ? (nome.trim().charAt(0).toUpperCase() || '?') : '?';
})();

/* =========================================================================
   HILLA ACADEMY — APLICAÇÃO (a mesma para todos os cursos; os dados vêm de academy-dados-<curso>.js)
   JavaScript puro, sem dependências. Tudo é salvo no localStorage.

   Sumário
   1. Constantes e utilitários
   2. Persistência (localStorage)
   3. Coleção: leitura do CSV e classificação
   4. Capas (iTunes Search via JSONP + capa gerada como alternativa)
   5. Componentes de interface
   6. Telas: Início, Curso, Aula, Prateleira, Ajustes
   7. Busca global
   8. Modais e avisos
   9. Roteamento e eventos
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     1. CONSTANTES E UTILITÁRIOS
     --------------------------------------------------------------------- */
  const AULAS = (window.AULAS || []).slice().sort((a, b) => a.n - b.n);
  const TOTAL = AULAS.length;
  const CFG = window.CURSO_CFG;
  const MODULOS = CFG.modulos;
  const TIPOS = CFG.tipos;
  const TOTAL_FAIXAS = AULAS.reduce((s, a) => s + a.playlist.length, 0);

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const app = $('#app');

  /** Escapa texto vindo de dados do usuário (CSV, notas). */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  /** Normaliza para comparação: minúsculas, sem acentos, só letras e números. */
  function norm(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }
  /** Normaliza preservando espaços (para busca por palavras). */
  function normWords(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }
  function pad(n) { return String(n).padStart(2, '0'); }
  function fmtDate(iso) { if (!iso) return ''; const d = new Date(iso); return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }); }
  function relDate(iso) {
    if (!iso) return '';
    const d = new Date(iso), now = new Date();
    const day = 864e5, a = new Date(d.getFullYear(), d.getMonth(), d.getDate()), b = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = Math.round((b - a) / day);
    if (diff <= 0) return 'hoje';
    if (diff === 1) return 'ontem';
    if (diff < 7) return 'há ' + diff + ' dias';
    return fmtDate(iso);
  }
  function saudacao() { const h = new Date().getHours(); return h < 5 ? 'Boa madrugada' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'; }
  const ytURL = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
  const spURL = q => 'https://open.spotify.com/search/' + encodeURIComponent(q);

  /* Ícones (desenhos no estilo Lucide, em SVG inline) */
  const ICONS = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    disc: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    list: '<path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    sliders: '<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
    youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    spotify: '<circle cx="12" cy="12" r="10"/><path d="M7 9.5c3.5-1 7-.7 10 1"/><path d="M7.5 12.8c3-.8 5.8-.5 8.5.9"/><path d="M8 16c2.4-.6 4.6-.4 6.6.6"/>',
    guitar: '<path d="m11.9 12.1 4.51-4.51"/><path d="M20.1 2.3a1 1 0 0 0-1.4 0l-1.11 1.12a1 1 0 0 0 0 1.4l2.38 2.37a1 1 0 0 0 1.4 0l1.12-1.1a1 1 0 0 0 0-1.42Z"/><path d="m6 16 2 2"/><path d="M8.2 9.9C8.7 8.8 9.8 8 11 8c2.8 0 5 2.2 5 5 0 1.2-.8 2.3-1.9 2.8l-.9.4A2 2 0 0 0 12 18a4 4 0 0 1-4 4c-3.3 0-6-2.7-6-6a4 4 0 0 1 4-4 2 2 0 0 0 1.8-1.2Z"/><circle cx="11.5" cy="12.5" r=".5" fill="currentColor"/>',
    bass: '<path d="M2 12h3l3-8 4 16 3-8h7"/>',
    drum: '<path d="m2 2 8 8"/><path d="m22 2-8 8"/><ellipse cx="12" cy="9" rx="10" ry="5"/><path d="M7 13.4v7.9"/><path d="M12 14v8"/><path d="M17 13.4v7.9"/><path d="M2 9v8a10 5 0 0 0 20 0V9"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
    sliders2: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
    struct: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    tag: '<path d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>'
  };
  function icon(n, cls) { return '<svg class="i ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || '') + '</svg>'; }

  /* ---------------------------------------------------------------------
     2. PERSISTÊNCIA (localStorage)
     Chave única "hma.v1" com todo o progresso. Capas ficam em "hma.capas.v1".
     --------------------------------------------------------------------- */
  const KEY = 'hma.v1', KEY_COV = 'hma.capas.v1';
  const NOVO = () => ({
    concluidas: {},   // { n: dataISO }
    favoritas: {},    // { n: true }
    notas: {},        // { n: texto }
    ouvidas: {},      // { "n-i": dataISO }
    visitadas: {},    // { n: dataISO }  (primeira vez que a aula foi aberta)
    respostas: {},    // { "n-i": texto } tentativas no desafio
    reveladas: {},    // { "n-i": true }
    csv: null,        // CSV importado pelo usuário (substitui o padrão)
    overrides: {},    // { chaveDisco: { g, a:[n] } } classificações manuais
    prefs: { capas: true },
    criado: new Date().toISOString()
  });
  let storageOK = true;
  const CURSO = CFG.id;
  const LOGADO = (() => { try { return !!localStorage.getItem('discoteca_session_token'); } catch (e) { return false; } })();
  const api = (rota, op) => apiFetch(API_URL + rota, op || {}).then(r => r.ok ? r.json() : Promise.reject(r.status));
  let S = NOVO();
  let podeSalvar = false;   // só salva depois de carregar o que já está na conta (não apaga o progresso por engano)
  const enviar = debounce(() => {
    api('/academy/progresso/' + CURSO, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dados: S }) })
      .then(r => {
        const nomes = { ['formado_' + CURSO]: 'Formado em ' + CFG.nome, doutor_em_musica: 'Doutor em Música' };
        (r && r.conquistas || []).forEach((id, i) => setTimeout(() => toast('Conquista desbloqueada: ' + (nomes[id] || id), 'award'), i * 2800));
      })
      .catch(() => toast('Não foi possível salvar agora. Tente de novo em instantes.', 'alert'));
  }, 700);
  function save() {
    if (!LOGADO) return;   // sem login, o progresso vale só enquanto a página está aberta (o aviso fica no Início)
    if (!podeSalvar) { toast('Seu progresso ainda não carregou. Recarregue a página.', 'alert'); return; }
    enviar();
  }

  let COV = {};
  try { COV = JSON.parse(localStorage.getItem(KEY_COV) || '{}') || {}; } catch (e) { COV = {}; }
  const saveCov = debounce(() => { try { localStorage.setItem(KEY_COV, JSON.stringify(COV)); } catch (e) { /* cache de capas é opcional */ } }, 600);

  /* ---------------------------------------------------------------------
     3. COLEÇÃO: leitura do CSV e classificação
     --------------------------------------------------------------------- */
  /** Parser de CSV com suporte a aspas, quebras de linha em campos e "" escapado. */
  function parseCSV(text) {
    text = String(text || '').replace(/^﻿/, '');
    const first = text.split(/\r?\n/)[0] || '';
    const sep = (first.split(';').length > first.split(',').length) ? ';' : ',';
    const rows = []; let row = [], f = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; }
        else f += c;
      } else if (c === '"') q = true;
      else if (c === sep) { row.push(f); f = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(f); rows.push(row); row = []; f = ''; }
      else f += c;
    }
    if (f !== '' || row.length) { row.push(f); rows.push(row); }
    return rows.filter(r => r.some(x => String(x).trim() !== ''));
  }
  function tipoFisico(fmt) {
    const f = norm(fmt);
    if (/lp|vinil|vinyl|compacto|single7|^7|^10|^12/.test(f)) return 'Vinil';
    if (/dvd|bluray|vhs/.test(f)) return 'DVD';
    if (/cd/.test(f)) return 'CD';
    if (/k7|cassete|cassette|fita/.test(f)) return 'Fita';
    return 'Outro';
  }
  /** Monta a lista de discos a partir da prateleira do Hilla, já classificados. */
  let HILLA = [];
  function buildCollection() {
    return HILLA.map((x, i) => {
      const artista = String(x.artista || '').trim(), album = String(x.album || '').trim();
      if (!artista && !album) return null;
      const artKey = norm(artista), key = artKey + '|' + norm(album);
      const formato = x.formato || '';
      const d = {
        id: 'd' + i + '-' + (hash(key) % 100000), hid: x.id, key, artKey,
        artista: (window.ARTISTAS[artKey] && window.ARTISTAS[artKey].nome) || artista,
        album, formato, tipo: tipoFisico(formato), anoEd: parseInt(x.ano_lancamento, 10) || null,
        generoCSV: x.genero || '', condM: x.condicao_midia || '', condC: x.condicao_capa || '', data: String(x.data_adicao || '').slice(0, 10),
        notas: String(x.notas || '').trim(), barras: x.codigo_barras || '', fav: !!x.favorito,
        pais: (window.ARTISTAS[artKey] && window.ARTISTAS[artKey].pais) || ''
      };
      d.cls = classify(d);
      return d;
    }).filter(Boolean);
  }
  /** Classificação: manual (override) > álbum conhecido > artista conhecido > a classificar. */
  function classify(d) {
    const ov = S.overrides[d.key];
    const al = window.ALBUNS[d.key];
    const ar = window.ARTISTAS[d.artKey];
    let c;
    if (al) c = { g: al.g, s: al.s || [], a: al.a || [], e: al.e || [], o: al.o || null, r: al.r || '', ref: !!al.ref, fonte: 'editorial' };
    else if (ar) c = { g: ar.g, s: [], a: ar.a || [], e: ar.e || [], o: null, r: 'Classificado automaticamente pelo artista: ' + ar.nome + ' está ligado à aula ' + pad(ar.a[0]) + '. Abra o disco para ajustar, se quiser.', ref: false, fonte: 'artista' };
    else c = { g: 'A classificar', s: d.generoCSV ? ['CSV: ' + d.generoCSV] : [], a: [], e: [], o: null, r: 'Este disco ainda não tem classificação editorial. Escolha a aula e o estilo abaixo para incluí-lo no curso.', ref: false, fonte: 'pendente' };
    if (ov) { c = Object.assign({}, c, { g: ov.g || c.g, a: ov.a && ov.a.length ? ov.a : c.a, fonte: 'manual' }); }
    return c;
  }
  let COL = [];
  function loadCollection() {
    // só entram no curso os discos que o curso conhece (o resto da prateleira é de outros estilos)
    try { COL = buildCollection().filter(d => d.cls.fonte !== 'pendente'); }
    catch (e) { console.warn(e); COL = []; }
    buildSearchIndex();
  }
  function discosDaAula(n) {
    const prim = COL.filter(d => d.cls.a.includes(n));
    const ecos = COL.filter(d => !d.cls.a.includes(n) && d.cls.e.includes(n));
    return { prim, ecos };
  }
  /** Verifica se um álbum recomendado já está na prateleira. */
  function possui(artista, album) {
    const a = norm(artista), b = norm(album);
    return COL.find(d => d.artKey === a && (norm(d.album) === b || norm(d.album).startsWith(b) || b.startsWith(norm(d.album))));
  }
  const anoOriginal = d => d.cls.o || d.anoEd || '';

  /* ---------------------------------------------------------------------
     4. CAPAS
     Busca na API pública e gratuita do iTunes (JSONP funciona até abrindo o
     arquivo localmente). Se não houver internet ou resultado confiável,
     fica a capa tipográfica gerada, que é sempre renderizada por baixo.
     --------------------------------------------------------------------- */
  function coverHTML(artista, album, cls) {
    const key = norm(artista) + '|' + norm(album);
    const h = hash(key), hue = h % 360;
    const bg = 'linear-gradient(150deg,hsl(' + hue + ' 20% 20%),hsl(' + ((hue + 50) % 360) + ' 16% 9%))';
    return '<div class="cover ' + (cls || '') + '" data-ck="' + esc(key) + '" data-ca="' + esc(artista) + '" data-cb="' + esc(album) + '">' +
      '<div class="cover-fb" style="background:' + bg + '"><span class="cl"></span><span class="ca">' + esc(artista) + '</span><span class="cb">' + esc(album) + '</span></div></div>';
  }
  let jsonpN = 0, coverFails = 0;
  const coverQueue = [], coverWaiting = new Map();
  function jsonp(url, ms) {
    return new Promise((resolve, reject) => {
      const cb = '__hmaCover' + (++jsonpN);
      const s = document.createElement('script');
      let done = false;
      const end = () => { done = true; clearTimeout(t); s.remove(); window[cb] = function () { }; };
      const t = setTimeout(() => { if (!done) { end(); reject(new Error('timeout')); } }, ms || 9000);
      window[cb] = data => { if (!done) { end(); resolve(data); } };
      s.onerror = () => { if (!done) { end(); reject(new Error('rede')); } };
      s.src = url + '&callback=' + cb;
      document.head.appendChild(s);
    });
  }
  function limparAlbum(a) { return String(a).replace(/\(.*?\)|\[.*?\]/g, ' ').replace(/bonus edition|edicao|deluxe|remaster(ed)?/gi, ' ').trim(); }
  async function buscarCapa(artista, album) {
    const term = artista + ' ' + limparAlbum(album);
    const data = await jsonp('https://itunes.apple.com/search?term=' + encodeURIComponent(term) + '&media=music&entity=album&limit=10');
    const na = norm(artista), wa = normWords(limparAlbum(album)).split(' ').filter(w => w.length > 1);
    let best = null, bestScore = 0;
    (data.results || []).forEach(r => {
      const ra = norm(r.artistName);
      if (!ra || !(ra === na || ra.includes(na) || na.includes(ra))) return;
      const rw = normWords(r.collectionName);
      const hit = wa.filter(w => rw.split(' ').includes(w)).length;
      const score = wa.length ? hit / wa.length : 0;
      if (score > bestScore) { bestScore = score; best = r; }
    });
    if (best && bestScore >= 0.5 && best.artworkUrl100) return best.artworkUrl100.replace('100x100bb', '600x600bb');
    return null;
  }
  async function processarFila() {
    if (processarFila.busy) return;
    processarFila.busy = true;
    while (coverQueue.length) {
      if (coverFails >= 3) { coverQueue.length = 0; break; } // sem internet: desiste nesta sessão
      const job = coverQueue.shift();
      try {
        const url = await buscarCapa(job.artista, job.album);
        COV[job.key] = url; coverFails = 0; saveCov();
        (coverWaiting.get(job.key) || []).forEach(el => aplicarCapa(el, url));
      } catch (e) { coverFails++; }
      coverWaiting.delete(job.key);
      await new Promise(r => setTimeout(r, 450));
    }
    processarFila.busy = false;
  }
  function aplicarCapa(el, url) {
    if (!url || !el.isConnected || el.querySelector('img')) return;
    const img = new Image();
    img.alt = 'Capa de ' + el.dataset.cb + ', de ' + el.dataset.ca;
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    img.onload = () => img.classList.add('ok');
    img.onerror = () => img.remove(); // mantém a capa gerada
    img.src = url;
    el.appendChild(img);
  }
  const coverObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      coverObserver.unobserve(en.target);
      pedirCapa(en.target);
    });
  }, { rootMargin: '200px' }) : null;
  function pedirCapa(el) {
    const key = el.dataset.ck;
    if (key in COV) { aplicarCapa(el, COV[key]); return; }
    if (coverWaiting.has(key)) { coverWaiting.get(key).push(el); return; }
    coverWaiting.set(key, [el]);
    coverQueue.push({ key, artista: el.dataset.ca, album: el.dataset.cb });
    processarFila();
  }
  function hidratarCapas(root) {
    if (!S.prefs.capas) return;
    $$('.cover[data-ck]', root || document).forEach(el => {
      if (el.dataset.h) return; el.dataset.h = '1';
      const key = el.dataset.ck;
      if (key in COV) aplicarCapa(el, COV[key]);
      else if (coverObserver) coverObserver.observe(el);
      else pedirCapa(el);
    });
  }

  /* ---------------------------------------------------------------------
     5. COMPONENTES
     --------------------------------------------------------------------- */
  function meter(v, label) {
    let bars = '';
    for (let i = 1; i <= 10; i++) bars += '<i class="' + (i <= v ? 'on' : '') + '" style="height:' + (5 + i * 1.1) + 'px"></i>';
    return '<span class="meter" title="Nível indicativo, não científico"><span class="meter-bars">' + bars + '</span>' +
      (label === false ? '' : '<span class="meter-label">' + CFG.medidor + ' ' + v + '/10</span>') + '</span>';
  }
  function progressBar(pct, cls) { return '<div class="progress ' + (cls || '') + '" role="progressbar" aria-valuenow="' + Math.round(pct) + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + pct + '%"></span></div>'; }
  function fmtBadge(d) { const c = d.tipo === 'Vinil' ? 'vinil' : d.tipo === 'DVD' ? 'dvd' : ''; return '<span class="badge ' + c + '">' + esc(d.formato || d.tipo) + '</span>'; }
  function links(q, small) {
    return '<a class="lnk yt" href="' + ytURL(q) + '" target="_blank" rel="noopener" title="Pesquisar no YouTube" aria-label="Pesquisar ' + esc(q) + ' no YouTube">' + icon('youtube', small ? 'sm' : '') + '</a>' +
      '<a class="lnk sp" href="' + spURL(q) + '" target="_blank" rel="noopener" title="Pesquisar no Spotify" aria-label="Pesquisar ' + esc(q) + ' no Spotify">' + icon('spotify', small ? 'sm' : '') + '</a>';
  }
  function discCard(d, opts) {
    opts = opts || {};
    const aulaChip = d.cls.a.length ? '<span class="badge">Aula ' + pad(d.cls.a[0]) + '</span>' : '<span class="badge ref">A classificar</span>';
    return '<button class="disc" data-action="open-disc" data-id="' + d.id + '">' + coverHTML(d.artista, d.album) +
      '<div class="dt"><b>' + esc(d.album) + '</b><span>' + esc(d.artista) + (anoOriginal(d) ? ' · ' + anoOriginal(d) : '') + '</span></div>' +
      '<div class="db">' + fmtBadge(d) + (opts.aula !== false ? aulaChip : '') + (d.cls.ref ? '<span class="badge ref">Referência</span>' : '') + '</div>' +
      (opts.why ? '<div class="why">' + esc(d.cls.r) + '</div>' : '') + '</button>';
  }
  const statusAula = n => S.concluidas[n] ? 'done' : (S.visitadas[n] ? 'seen' : '');
  function aulaAtual() { const a = AULAS.find(x => !S.concluidas[x.n]); return a || null; }
  function ouvidasDaAula(a) { return a.playlist.filter((_, i) => S.ouvidas[a.n + '-' + i]).length; }

  /* ---------------------------------------------------------------------
     6. TELAS
     --------------------------------------------------------------------- */

  /* ----- 6.1 Início (dashboard) ----- */
  function viewInicio() {
    const feitas = Object.keys(S.concluidas).length;
    const pct = (feitas / TOTAL) * 100;
    const apresentados = AULAS.filter(a => S.visitadas[a.n] || S.concluidas[a.n]).length;
    const ouvidas = Object.keys(S.ouvidas).length;
    const hoje = aulaAtual();
    const depois = hoje ? AULAS.find(a => a.n > hoje.n && !S.concluidas[a.n]) : null;
    const hist = Object.entries(S.concluidas).sort((a, b) => b[1].localeCompare(a[1])).slice(0, 6);
    const favs = AULAS.filter(a => S.favoritas[a.n]);

    let h = '<section class="view">';
    h += '<div class="hero"><div><div class="eyebrow">' + saudacao() + '</div>' +
      '<h1>' + CFG.h1 + '</h1>' +
      '<p class="hero-lead">' + CFG.lead + '</p></div>' +
      '<div class="hero-progress"><div class="eyebrow muted">Progresso geral do curso</div><div class="big num">' + Math.round(pct) + '<small>%</small></div>' +
      progressBar(pct) + '<div class="cap"><span class="num">' + feitas + ' de ' + TOTAL + ' aulas concluídas</span><span>' + (feitas === TOTAL ? 'Curso completo' : (TOTAL - feitas) + ' noites pela frente') + '</span></div></div></div>';

    h += '<div class="stats">' +
      stat(feitas, '/' + TOTAL, 'Aulas concluídas', 'check') +
      stat(apresentados, '/' + TOTAL, 'Estilos apresentados', 'eye') +
      stat(ouvidas, '/' + TOTAL_FAIXAS, 'Músicas ouvidas', 'headphones') +
      stat(COL.length, '', 'Discos na prateleira', 'disc') + '</div>';

    if (!LOGADO) h += avisoEntrar();
    // Hoje à noite
    h += '<div class="section"><div class="section-head"><h2>Hoje à noite</h2>' + (hoje ? '<a class="link" href="#/curso">Ver o curso completo ' + icon('arrow', 'sm') + '</a>' : '') + '</div>';
    if (hoje) {
      const dd = discosDaAula(hoje.n), discos = dd.prim.concat(dd.ecos).slice(0, 3);
      h += '<article class="card tonight"><div class="tonight-num num">' + pad(hoje.n) + '</div><div class="tonight-main">' +
        '<div class="eyebrow">Aula ' + pad(hoje.n) + ' · Módulo ' + hoje.m + ' — ' + MODULOS[hoje.m - 1].t + '</div>' +
        '<h3 class="t">' + hoje.titulo + '</h3><div class="sub">' + hoje.subtitulo + '</div>' +
        '<p class="desc">' + hoje.desc + '</p>' +
        '<div class="meta-row"><span>' + icon('clock', 'sm') + hoje.periodo + '</span><span>' + icon('pin', 'sm') + hoje.origem + '</span>' + meter(hoje.agress) + '</div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn primary" href="#/aula/' + hoje.n + '">' + icon('play', 'sm') + (S.visitadas[hoje.n] ? 'Continuar a aula' : 'Começar a aula') + '</a>' +
        '<a class="btn" href="#/aula/' + hoje.n + '" data-goto="playlist">' + icon('list', 'sm') + 'Playlist da noite</a></div></div>' +
        '<div class="tonight-side">';
      if (discos.length) {
        h += '<div class="lbl">Da sua prateleira para esta noite</div><div class="mini-discs">' +
          discos.map(d => '<button class="mini-disc disc" data-action="open-disc" data-id="' + d.id + '">' + coverHTML(d.artista, d.album) + '<div class="t"><b>' + esc(d.album) + '</b><span>' + esc(d.tipo) + '</span></div></button>').join('') + '</div>';
      } else {
        const e = hoje.essenciais[0];
        h += '<div class="lbl">Esse estilo ainda não está representado na sua coleção. Um bom primeiro disco:</div>' +
          '<div class="disc-row" style="border:0;padding:0">' + coverHTML(e[0], e[1]) + '<div class="dt"><b>' + esc(e[1]) + '</b><br><span>' + esc(e[0]) + ' · ' + e[2] + '</span></div><div class="links">' + links(e[0] + ' ' + e[1], true) + '</div></div>';
      }
      h += '<div class="lbl" style="margin-top:6px">Na playlist</div><div class="track-mini">' +
        hoje.playlist.slice(0, 4).map((t, i) => '<div><span class="n num">' + (i + 1) + '</span><span><b>' + esc(t[2]) + '</b> <span class="muted">— ' + esc(t[1]) + '</span></span></div>').join('') + '</div></div></article>';
    } else {
      h += '<article class="card panel"><h3>' + icon('award') + 'Curso concluído</h3><p class="muted">Você completou as ' + TOTAL + ' noites e ganhou a conquista lendária <b>Formado em ' + CFG.nome + '</b>. ' + CFG.fimTexto + '</p><a class="btn primary" href="#/aula/1">Voltar à aula 01</a></article>';
    }
    h += '</div>';

    // Próxima aula + histórico
    h += '<div class="dash-grid"><div class="card panel"><h3>' + icon('arrow') + 'Próxima aula</h3>';
    if (depois) {
      h += '<a class="next-card" href="#/aula/' + depois.n + '"><span class="n num">' + pad(depois.n) + '</span><div><div style="font-weight:700;font-size:17px">' + depois.titulo + '</div><div class="muted" style="font-size:13.5px">' + depois.periodo + ' · ' + depois.origem + '</div><div style="margin-top:8px">' + meter(depois.agress) + '</div></div></a>';
    } else h += '<p class="empty">' + (hoje ? 'Esta é a última aula pendente.' : 'Nenhuma aula pendente.') + '</p>';
    h += '</div><div class="card panel"><h3>' + icon('clock') + 'Histórico das últimas aulas</h3>';
    if (hist.length) {
      h += '<ul class="hist">' + hist.map(([n, d]) => { const a = AULAS[n - 1]; return '<li><a href="#/aula/' + n + '"><span class="n num">' + pad(n) + '</span><span class="t">' + a.titulo + '</span><span class="d">' + relDate(d) + '</span></a></li>'; }).join('') + '</ul>';
    } else h += '<p class="empty">Nenhuma aula concluída ainda. Ao terminar a aula de hoje, use “Marcar como concluída” — ela aparecerá aqui.</p>';
    h += '</div></div>';

    // Jornada
    h += '<div class="section"><div class="section-head"><h2>Sua jornada pelo ' + CFG.nome + '</h2><span class="muted num" style="font-size:14px">' + feitas + '/' + TOTAL + '</span></div><div class="journey">';
    MODULOS.forEach(m => {
      const as = AULAS.filter(a => a.m === m.n), done = as.filter(a => S.concluidas[a.n]).length;
      h += '<div class="jmod"><div class="mt"><div class="eyebrow">Módulo ' + m.n + '</div><h4>' + m.t + '</h4><p>' + m.p + '</p></div><div class="jnodes">' +
        as.map(a => '<div class="jnode ' + statusAula(a.n) + (hoje && hoje.n === a.n ? ' current' : '') + '"><a href="#/aula/' + a.n + '" title="' + pad(a.n) + ' · ' + esc(a.titulo) + '" class="num">' + pad(a.n) + '</a></div>').join('') +
        '</div><div class="jp num">' + done + '/' + as.length + '</div></div>';
    });
    h += '</div><div class="legend"><span><i class="done"></i>Concluída</span><span><i class="current"></i>Hoje à noite</span><span><i class="seen"></i>Iniciada</span><span><i></i>Pendente</span></div></div>';

    if (favs.length) {
      h += '<div class="section"><div class="section-head"><h2>Aulas favoritas</h2></div><div class="lesson-grid">' + favs.map(lessonCard).join('') + '</div></div>';
    }
    h += '</section>';
    return h;
  }
  function stat(v, of, l, ic) { return '<div class="stat"><div class="v num">' + v + '<small>' + of + '</small></div><div class="l">' + icon(ic, 'sm') + l + '</div></div>'; }

  /* ----- 6.2 Curso ----- */
  let filtroCurso = 'todas';
  function lessonCard(a) {
    const nd = discosDaAula(a.n).prim.length;
    return '<a class="card lesson ' + (S.concluidas[a.n] ? 'is-done' : '') + '" href="#/aula/' + a.n + '">' +
      '<div class="st"><span class="fav ' + (S.favoritas[a.n] ? 'on' : '') + '" title="Favorita">' + icon('star', 'sm') + '</span><span class="' + (S.concluidas[a.n] ? 'on' : '') + '" title="Concluída">' + icon('check', 'sm') + '</span></div>' +
      '<div class="ln num">' + pad(a.n) + '</div><h3>' + a.titulo + '</h3><div class="lp">' + a.periodo + '</div><div class="lp">' + a.origem + '</div>' +
      '<div class="lf">' + meter(a.agress, false) + '<span class="discs">' + icon('disc', 'sm') + (nd ? nd + (nd > 1 ? ' discos seus' : ' disco seu') : 'sem discos ainda') + '</span></div></a>';
  }
  function viewCurso() {
    const feitas = Object.keys(S.concluidas).length;
    const filt = a => filtroCurso === 'todas' || (filtroCurso === 'pendentes' && !S.concluidas[a.n]) || (filtroCurso === 'concluidas' && S.concluidas[a.n]) || (filtroCurso === 'favoritas' && S.favoritas[a.n]);
    let h = '<section class="view"><div class="page-head"><div><div class="eyebrow">Curso</div><h1>' + TOTAL + ' noites de ' + CFG.nome + '</h1>' +
      '<p>Cinco módulos em ordem histórica. Cada aula tem história, características musicais, ' + (CFG.rotuloBandas || 'bandas').toLowerCase() + ' fundamentais, playlist, discos da sua prateleira, curiosidades e um desafio.</p></div>' +
      '<div class="filters" role="group" aria-label="Filtrar aulas">' +
      [['todas', 'Todas'], ['pendentes', 'Pendentes'], ['concluidas', 'Concluídas'], ['favoritas', 'Favoritas']].map(([k, l]) => '<button class="chip ' + (filtroCurso === k ? 'on' : '') + '" data-action="filtro-curso" data-v="' + k + '">' + l + '</button>').join('') +
      '</div></div><div style="margin-top:22px">' + progressBar(feitas / TOTAL * 100, 'thin') + '</div>';
    let algum = false;
    MODULOS.forEach(m => {
      const as = AULAS.filter(a => a.m === m.n), vis = as.filter(filt);
      if (!vis.length) return; algum = true;
      h += '<div class="module"><div class="module-head"><span class="mn">MÓDULO ' + m.n + '</span><h2>' + m.t + '</h2><span class="mp num">' + as.filter(a => S.concluidas[a.n]).length + ' de ' + as.length + ' concluídas</span></div><div class="lesson-grid">' + vis.map(lessonCard).join('') + '</div></div>';
    });
    if (!algum) h += '<p class="empty" style="margin-top:40px">Nenhuma aula neste filtro ainda.</p>';
    return h + '</section>';
  }

  /* ----- 6.3 Página da aula ----- */
  const SECOES = [['apresentacao', 'A', 'Apresentação'], ['historia', 'B', 'História'], ['caracteristicas', 'C', 'Características'], ['bandas', 'D', CFG.rotuloBandas || 'Bandas'], ['playlist', 'E', 'Playlist'], ['colecao', 'F', 'Minha coleção'], ['curiosidades', 'G', 'Curiosidades'], ['desafio', 'H', 'Desafio'], ['conclusao', 'I', 'Conclusão'], ['notas', '·', 'Observações']];
  function secHead(id, titulo) { const s = SECOES.find(x => x[0] === id); return '<div class="lsec-h"><span class="letter">' + s[1] + '</span><h2>' + titulo + '</h2></div>'; }
  function viewAula(n) {
    const a = AULAS[n - 1];
    if (!S.visitadas[n]) { S.visitadas[n] = new Date().toISOString(); save(); }
    const prev = AULAS[n - 2], next = AULAS[n];
    const ouv = ouvidasDaAula(a), rev = a.desafio.filter((_, i) => S.reveladas[n + '-' + i]).length;
    let h = '<section class="view">';

    // A. Apresentação (cabeçalho)
    h += '<header class="lesson-hero" id="apresentacao" data-sec="apresentacao"><div class="bgnum num">' + pad(n) + '</div>' +
      '<div class="crumbs"><a href="#/curso">Curso</a>' + icon('right', 'sm') + '<span>Módulo ' + a.m + ' — ' + MODULOS[a.m - 1].t + '</span>' + icon('right', 'sm') + '<span class="gold">Aula ' + pad(n) + '</span></div>' +
      '<h1>' + a.titulo + '</h1><div class="sub">' + a.subtitulo + '</div><p class="desc">' + a.desc + '</p>' +
      '<div class="facts"><div class="fact"><div class="k">Período</div><div class="v">' + a.periodo + '</div></div><div class="fact"><div class="k">Origem</div><div class="v">' + a.origem + '</div></div>' +
      '<div class="fact"><div class="k">' + CFG.medidorFato + '</div><div class="v">' + meter(a.agress) + '</div></div></div>' +
      '<div class="lesson-actions"><button class="btn ' + (S.concluidas[n] ? 'done' : 'primary') + '" data-action="toggle-done" data-n="' + n + '">' + icon('check', 'sm') +
      (S.concluidas[n] ? 'Concluída em ' + fmtDate(S.concluidas[n]) : 'Marcar como concluída') + '</button>' +
      '<button class="btn fav ' + (S.favoritas[n] ? 'on' : '') + '" data-action="toggle-fav" data-n="' + n + '" aria-pressed="' + !!S.favoritas[n] + '">' + icon('star', 'sm') + (S.favoritas[n] ? 'Favorita' : 'Favoritar') + '</button>' +
      '<div class="lprog"><span>' + icon('headphones', 'sm') + '<b class="num" id="lp-ouv">' + ouv + '/' + a.playlist.length + '</b> ouvidas</span><span>' + icon('help', 'sm') + '<b class="num" id="lp-rev">' + rev + '/' + a.desafio.length + '</b> respostas vistas</span></div></div></header>';

    h += '<div class="lesson-body"><nav class="toc" aria-label="Seções da aula">' + SECOES.map(s => '<a href="#/aula/' + n + '" data-scroll="' + s[0] + '"><b>' + s[1] + '</b>' + s[2] + '</a>').join('') + '</nav><div class="lesson-content">';

    // B. História
    const H = a.historia;
    h += '<section class="lsec" id="historia" data-sec="historia">' + secHead('historia', 'História') + '<div class="hgrid">' +
      [['Como surgiu', H.surgiu], ['Contexto histórico', H.contexto], ['Principais pioneiros', H.pioneiros], ['Influências musicais', H.influencias], ['Como evoluiu', H.evolucao], ['Estilos que surgiram a partir dele', H.derivados]]
        .map(([t, p]) => '<div class="hblock"><h4>' + t + '</h4><p>' + p + '</p></div>').join('') + '</div>' +
      (a.controversia ? '<div class="callout"><div class="eyebrow">' + icon('alert', 'sm') + 'Controvérsias e interpretações</div>' + a.controversia + '</div>' : '') + '</section>';

    // C. Características
    const M = a.musica;
    h += '<section class="lsec" id="caracteristicas" data-sec="caracteristicas">' + secHead('caracteristicas', 'Características musicais') + '<div class="charlist">' +
      CFG.musica.map(x => [x[0], x[1], M[x[2]]])
        .map(([ic, t, p]) => '<div class="card charitem"><h4>' + icon(ic) + t + '</h4><p>' + p + '</p></div>').join('') + '</div>' +
      (a.glossario && a.glossario.length ? '<div class="glossary"><h4>Termos da aula, explicados</h4><dl>' + a.glossario.map(g => '<dt>' + g[0] + '</dt><dd>' + g[1] + '</dd>').join('') + '</dl></div>' : '') + '</section>';

    // D. Bandas
    h += '<section class="lsec" id="bandas" data-sec="bandas">' + secHead('bandas', a.bandasTitulo || 'Bandas fundamentais') + '<div class="bands">' +
      a.bandas.map(b => {
        const alb = b[4].replace(/\s*\((EP, )?\d{4}\)\s*$/, '').replace(/\s*\(EP\)\s*$/, '');
        const own = possui(b[0], alb);
        return '<div class="card band"><div class="band-top"><div><h4>' + b[0] + '</h4><div class="bm">' + b[1] + ' · ' + (a.anoLabel || 'Formação') + ': ' + b[2] + '</div></div>' + (own ? '<span class="own">' + icon('disc', 'sm') + 'Você tem</span>' : '') + '</div>' +
          '<p>' + b[3] + '</p><div class="rec"><span class="lbl">Álbum recomendado</span><b>' + b[4] + '</b><span class="links">' + links(b[0] + ' ' + alb, true) + '</span></div></div>';
      }).join('') + '</div></section>';

    // E. Playlist
    h += '<section class="lsec" id="playlist" data-sec="playlist">' + secHead('playlist', 'Playlist da aula') +
      '<div class="pl-head"><span class="muted">Marque cada música depois de ouvir. Os botões abrem uma pesquisa no YouTube ou no Spotify.</span>' +
      '<span class="links" style="display:flex;gap:6px"><a class="btn sm" target="_blank" rel="noopener" href="' + spURL(a.titulo + CFG.busca) + '">' + icon('spotify', 'sm') + 'Buscar playlists do estilo</a></span></div><div class="playlist">' +
      a.playlist.map((t, i) => {
        const k = n + '-' + i, on = !!S.ouvidas[k];
        return '<div class="track"><button class="heard ' + (on ? 'on' : '') + '" data-action="toggle-heard" data-k="' + k + '" aria-pressed="' + on + '" title="' + (on ? 'Ouvida' : 'Marcar como ouvida') + '">' + icon(on ? 'check' : 'headphones', 'sm') + '</button>' +
          '<div><div class="ttype">' + TIPOS[t[0]] + '</div><div class="tt"><h4>' + esc(t[2]) + '</h4>' + (possui(t[1], t[3]) ? '<span class="own">' + icon('disc', 'sm') + 'Você tem</span>' : '') + '</div>' +
          '<div class="tm"><b>' + esc(t[1]) + '</b> · ' + esc(t[3]) + ' · ' + t[4] + '</div><p class="why">' + t[5] + '</p></div>' +
          '<div class="tl">' + links(t[1] + ' ' + t[2]) + '</div></div>';
      }).join('') + '</div></section>';

    // F. Minha coleção
    h += '<section class="lsec" id="colecao" data-sec="colecao">' + secHead('colecao', 'Minha coleção') + colecaoDaAula(a) + '</section>';

    // G. Curiosidades
    h += '<section class="lsec" id="curiosidades" data-sec="curiosidades">' + secHead('curiosidades', 'Curiosidades') + '<ol class="facts-list">' + a.curiosidades.map(c => '<li>' + c + '</li>').join('') + '</ol></section>';

    // H. Desafio
    h += '<section class="lsec" id="desafio" data-sec="desafio">' + secHead('desafio', 'Desafio da noite') +
      '<p class="muted" style="margin-top:-8px">Tente responder primeiro — por escrito ou em voz alta. Depois revele a resposta.</p><div class="quiz">' +
      a.desafio.map((q, i) => {
        const k = n + '-' + i, shown = !!S.reveladas[k];
        return '<div class="card q"><div class="qh"><span class="qn num">' + (i + 1) + '.</span><span class="qp">' + q[0] + '</span></div>' +
          '<textarea data-resp="' + k + '" placeholder="Sua resposta (fica salva)" aria-label="Sua resposta para a pergunta ' + (i + 1) + '">' + esc(S.respostas[k] || '') + '</textarea>' +
          '<div class="qa"><button class="btn sm ' + (shown ? '' : 'primary') + '" data-action="reveal" data-k="' + k + '">' + icon(shown ? 'x' : 'eye', 'sm') + (shown ? 'Ocultar resposta' : 'Revelar resposta') + '</button></div>' +
          (shown ? '<div class="ans"><b>Resposta</b>' + q[1] + '</div>' : '') + '</div>';
      }).join('') + '</div></section>';

    // I. Conclusão
    h += '<section class="lsec" id="conclusao" data-sec="conclusao">' + secHead('conclusao', 'Conclusão') + '<p class="conclusion">' + a.conclusao + '</p>' +
      '<div class="lesson-actions" style="margin-top:20px"><button class="btn ' + (S.concluidas[n] ? 'done' : 'primary') + '" data-action="toggle-done" data-n="' + n + '">' + icon('check', 'sm') + (S.concluidas[n] ? 'Concluída em ' + fmtDate(S.concluidas[n]) : 'Marcar como concluída') + '</button></div></section>';

    // Observações pessoais
    h += '<section class="lsec" id="notas" data-sec="notas">' + secHead('notas', 'Observações pessoais') +
      '<div class="notes-box"><textarea data-note="' + n + '" placeholder="O que ele achou? Qual música marcou a noite? Que disco ouvir de novo?">' + esc(S.notas[n] || '') + '</textarea>' +
      '<div class="notes-meta"><span>Salvo automaticamente na sua conta.</span><span class="saved" id="saved">' + icon('check', 'sm') + ' Salvo</span></div></div>' +
      '<nav class="pager" aria-label="Navegar entre aulas">' +
      (prev ? '<a class="card" href="#/aula/' + prev.n + '"><span class="k">' + icon('left', 'sm') + 'Aula ' + pad(prev.n) + '</span><span class="t">' + prev.titulo + '</span></a>' : '<span class="placeholder"></span>') +
      (next ? '<a class="card next" href="#/aula/' + next.n + '"><span class="k">Aula ' + pad(next.n) + icon('right', 'sm') + '</span><span class="t">' + next.titulo + '</span></a>' : '<a class="card next" href="#/"><span class="k">Fim do curso' + icon('right', 'sm') + '</span><span class="t">Voltar ao início</span></a>') +
      '</nav></section>';

    h += '</div></div></section>';
    return h;
  }
  function colecaoDaAula(a) {
    const { prim, ecos } = discosDaAula(a.n);
    let h = '';
    if (prim.length) {
      const refs = prim.filter(d => d.cls.ref).length;
      h += '<p class="muted" style="margin-top:-8px">' + prim.length + (prim.length > 1 ? ' discos' : ' disco') + ' da sua prateleira ' + (prim.length > 1 ? 'pertencem' : 'pertence') + ' a esta aula' + (refs ? ', ' + refs + (refs > 1 ? ' deles são referências históricas' : ' deles é referência histórica') : '') + '.</p>' +
        '<div class="discs-grid">' + prim.map(d => discCard(d, { why: true, aula: false })).join('') + '</div>';
    } else if (a.n === CFG.aulaPessoas) {
      h += '<div class="notice">' + icon('users') + '<div><b>Esta aula é sobre pessoas, não sobre um estilo.</b><br>' + CFG.pessoasTexto + '</div></div>';
    } else if (a.n === TOTAL) {
      const favs = COL.filter(d => d.fav);
      h += '<div class="notice">' + icon('globe') + '<div><b>A última noite é da prateleira inteira.</b><br>Escolha um disco de cada módulo, ou comece pelos que você marcou como favoritos na sua prateleira do Hilla.</div></div>';
      if (favs.length) h += '<div class="sub-h">Seus favoritos para a grande noite</div><div class="discs-grid">' + favs.map(d => discCard(d, { aula: true })).join('') + '</div>';
    } else {
      h += '<div class="notice">' + icon('disc') + '<div><b>Esse estilo ainda não está representado na sua coleção.</b><br>Abaixo estão os álbuns essenciais para conhecer o gênero.</div></div>';
    }
    if (ecos.length) {
      h += '<div class="sub-h">' + (a.n === CFG.aulaPessoas ? 'Músicos desta aula na sua prateleira' : 'Ecos na sua coleção — discos de outros estilos com influência desta aula') + '</div><div class="discs-grid">' + ecos.map(d => discCard(d, { aula: true })).join('') + '</div>';
    }
    const faltam = a.essenciais.filter(e => !possui(e[0], e[1]));
    if (faltam.length) {
      h += '<div class="sub-h">' + (prim.length ? 'Lacunas: essenciais que ainda não estão na prateleira' : 'Álbuns essenciais do estilo') + '</div>' +
        faltam.map(e => '<div class="disc-row">' + coverHTML(e[0], e[1]) + '<div class="dt"><b>' + esc(e[1]) + '</b><br><span>' + esc(e[0]) + ' · ' + e[2] + '</span></div><div class="links">' + links(e[0] + ' ' + e[1], true) + (LOGADO ? '<button class="btn sm" data-action="add-wish" data-art="' + esc(e[0]) + '" data-alb="' + esc(e[1]) + '" data-aula="' + a.n + '">' + icon('star', 'sm') + 'Wishlist</button>' : '') + '</div></div>').join('');
    }
    if (a.n === TOTAL) {
      const cont = {};
      COL.forEach(d => { const p = d.pais || 'Não informado'; cont[p] = (cont[p] || 0) + 1; });
      const lista = Object.entries(cont).sort((x, y) => y[1] - x[1]), max = lista[0] ? lista[0][1] : 1;
      h += '<div class="sub-h">' + icon('globe', 'sm') + ' Mapa da sua prateleira por país de origem das bandas</div><div class="countries">' +
        lista.map(([p, c]) => '<div class="country"><span>' + esc(p) + '</span><div class="bar"><span style="width:' + (c / max * 100) + '%"></span></div><span class="c num">' + c + '</span></div>').join('') + '</div>';
    }
    return h;
  }

  /* ----- 6.4 Minha Prateleira ----- */
  const F = { q: '', tipo: 'todos', estilo: '', artista: '', aula: '', ordem: 'artista', ref: false };
  function avisoEntrar() {
    return '<div class="notice" style="margin-top:24px">' + icon('disc') + '<div><b>Entre no Hilla para usar a sua prateleira.</b><br>Com login, o curso mostra os seus discos em cada noite e salva o seu progresso. <a class="chip gold" href="index.html" style="margin-left:6px">Entrar</a></div></div>';
  }
  function viewPrateleira() {
    if (!LOGADO) return '<section class="view"><div class="page-head"><div><div class="eyebrow">Coleção física</div><h1>Minha Prateleira</h1></div></div>' + avisoEntrar() + '</section>';
    const cds = COL.filter(d => d.tipo === 'CD').length, vin = COL.filter(d => d.tipo === 'Vinil').length, dvd = COL.filter(d => d.tipo === 'DVD').length;
    const artistas = new Set(COL.map(d => d.artKey)).size;
    const porAula = {}; AULAS.forEach(a => porAula[a.n] = 0);
    COL.forEach(d => d.cls.a.forEach(n => { porAula[n] = (porAula[n] || 0) + 1; }));
    const cobertas = AULAS.filter(a => porAula[a.n] > 0).length;
    const fortes = AULAS.slice().sort((x, y) => porAula[y.n] - porAula[x.n]).filter(a => porAula[a.n] > 0).slice(0, 5);
    const lacunas = AULAS.filter(a => porAula[a.n] === 0 && a.n < 29); // 29 e 30 são aulas de síntese, não estilos
    const pendentes = COL.filter(d => d.cls.fonte === 'pendente').length;

    let h = '<section class="view"><div class="page-head"><div><div class="eyebrow">Coleção física</div><h1>Minha Prateleira</h1>' +
      '<p>Os discos da sua prateleira do Hilla, classificados por estilo principal e ligados às aulas do curso. Quando um disco fica entre estilos, ele recebe uma classificação principal e as influências aparecem como subgêneros.</p></div>' +
      '<div class="shelf-stats"><div><div class="v num">' + COL.length + '</div><div class="l">discos</div></div><div><div class="v num">' + vin + '</div><div class="l">vinis</div></div><div><div class="v num">' + cds + '</div><div class="l">CDs</div></div>' +
      (dvd ? '<div><div class="v num">' + dvd + '</div><div class="l">DVD</div></div>' : '') + '<div><div class="v num">' + artistas + '</div><div class="l">artistas</div></div></div></div>';

    if (pendentes) h += '<div class="notice" style="margin-top:24px">' + icon('tag') + '<div><b>' + pendentes + (pendentes > 1 ? ' discos aguardam' : ' disco aguarda') + ' classificação.</b> São artistas que o curso ainda não conhece. Abra o disco e escolha a aula e o estilo. <button class="chip gold" data-action="filtro-pendentes" style="margin-left:6px">Ver pendentes</button></div></div>';

    // Raio-X da coleção
    h += '<div class="xray"><div class="card panel"><h3>' + icon('layers') + 'Raio-X da coleção por aula</h3><div class="modbars">' +
      MODULOS.map(m => {
        const as = AULAS.filter(a => a.m === m.n), tot = as.reduce((s, a) => s + porAula[a.n], 0);
        return '<div class="modbar"><div class="top"><b>' + m.n + '. ' + m.t + '</b><span class="num">' + tot + (tot === 1 ? ' disco' : ' discos') + '</span></div><div class="row">' +
          as.map(a => { const c = porAula[a.n], l = c === 0 ? '' : c === 1 ? 'l1' : c <= 3 ? 'l2' : c <= 6 ? 'l3' : 'l4'; return '<a class="' + l + ' num" href="#/aula/' + a.n + '" title="Aula ' + pad(a.n) + ' · ' + esc(a.titulo) + ': ' + c + ' disco(s)">' + pad(a.n) + '</a>'; }).join('') + '</div></div>';
      }).join('') + '</div><p class="muted" style="font-size:13px;margin:16px 0 0">' + cobertas + ' de ' + TOTAL + ' aulas têm pelo menos um disco seu como referência principal. Clique num quadrado para abrir a aula.</p></div>' +
      '<div class="card panel"><h3>' + icon('award') + 'Pontos fortes</h3><div class="strong-list">' +
      fortes.map(a => '<a href="#/aula/' + a.n + '"><b>' + pad(a.n) + ' · ' + a.titulo + '</b><span class="num">' + porAula[a.n] + (porAula[a.n] === 1 ? ' disco' : ' discos') + '</span></a>').join('') + '</div>' +
      '<h3>' + icon('search') + 'Lacunas históricas</h3><p class="muted" style="font-size:13.5px;margin-top:-8px">Estilos ainda sem nenhum disco na prateleira. Cada aula sugere os álbuns essenciais.</p><div class="gaps">' +
      lacunas.map(a => '<a class="chip" href="#/aula/' + a.n + '" data-goto="colecao">' + pad(a.n) + ' · ' + a.titulo + '</a>').join('') + '</div></div></div>';

    // Filtros
    const estilos = Array.from(new Set(COL.map(d => d.cls.g))).sort((x, y) => x.localeCompare(y, 'pt'));
    const arts = Array.from(new Map(COL.map(d => [d.artKey, d.artista])).values()).sort((x, y) => x.localeCompare(y, 'pt'));
    h += '<div class="toolbar" role="search"><div class="field">' + icon('search', 'sm') + '<input class="input has-i" type="search" data-f="q" placeholder="Buscar artista ou álbum" value="' + esc(F.q) + '" aria-label="Buscar artista ou álbum"></div>' +
      '<div class="seg" role="group" aria-label="Formato">' + [['todos', 'Todos'], ['CD', 'CD'], ['Vinil', 'Vinil'], ['DVD', 'Outros']].map(([k, l]) => '<button data-action="f-tipo" data-v="' + k + '" class="' + (F.tipo === k ? 'on' : '') + '">' + l + '</button>').join('') + '</div>' +
      '<select class="select" data-f="estilo" aria-label="Estilo"><option value="">Todos os estilos</option>' + estilos.map(e => '<option ' + (F.estilo === e ? 'selected' : '') + '>' + esc(e) + '</option>').join('') + '</select>' +
      '<select class="select" data-f="artista" aria-label="Artista"><option value="">Todos os artistas</option>' + arts.map(e => '<option ' + (F.artista === e ? 'selected' : '') + '>' + esc(e) + '</option>').join('') + '</select>' +
      '<select class="select" data-f="aula" aria-label="Aula relacionada"><option value="">Todas as aulas</option>' + AULAS.map(a => '<option value="' + a.n + '" ' + (String(F.aula) === String(a.n) ? 'selected' : '') + '>' + pad(a.n) + ' · ' + esc(a.titulo) + '</option>').join('') + '</select>' +
      '<select class="select" data-f="ordem" aria-label="Ordenar"><option value="artista" ' + (F.ordem === 'artista' ? 'selected' : '') + '>Artista A–Z</option><option value="ano" ' + (F.ordem === 'ano' ? 'selected' : '') + '>Ano original</option><option value="aula" ' + (F.ordem === 'aula' ? 'selected' : '') + '>Ordem do curso</option><option value="recentes" ' + (F.ordem === 'recentes' ? 'selected' : '') + '>Adicionados recentemente</option></select></div>' +
      '<div id="shelf-results"></div></section>';
    return h;
  }
  function filtrarColecao() {
    const q = normWords(F.q);
    let r = COL.filter(d => {
      if (F.tipo !== 'todos') { if (F.tipo === 'DVD') { if (d.tipo === 'CD' || d.tipo === 'Vinil') return false; } else if (d.tipo !== F.tipo) return false; }
      if (F.estilo && d.cls.g !== F.estilo && !d.cls.s.includes(F.estilo)) return false;
      if (F.artista && d.artista !== F.artista) return false;
      if (F.aula && !d.cls.a.includes(+F.aula) && !d.cls.e.includes(+F.aula)) return false;
      if (F.pend && d.cls.fonte !== 'pendente') return false;
      if (q) { const hay = normWords(d.artista + ' ' + d.album + ' ' + d.cls.g + ' ' + d.cls.s.join(' ')); if (!q.split(' ').every(w => hay.includes(w))) return false; }
      return true;
    });
    const by = {
      artista: (x, y) => x.artista.localeCompare(y.artista, 'pt') || (anoOriginal(x) || 0) - (anoOriginal(y) || 0),
      ano: (x, y) => (anoOriginal(x) || 9999) - (anoOriginal(y) || 9999),
      aula: (x, y) => (x.cls.a[0] || 99) - (y.cls.a[0] || 99) || x.artista.localeCompare(y.artista, 'pt'),
      recentes: (x, y) => String(y.data).localeCompare(String(x.data))
    };
    return r.sort(by[F.ordem] || by.artista);
  }
  function renderShelfResults() {
    const box = $('#shelf-results'); if (!box) return;
    const r = filtrarColecao();
    const ativos = F.q || F.tipo !== 'todos' || F.estilo || F.artista || F.aula || F.pend;
    box.innerHTML = '<div class="result-line"><span class="num">' + r.length + (r.length === 1 ? ' disco' : ' discos') + (ativos ? ' encontrados' : '') + '</span>' + (ativos ? '<button class="chip" data-action="limpar-filtros">' + icon('x', 'sm') + 'Limpar filtros</button>' : '') + '</div>' +
      (r.length ? '<div class="shelf-grid">' + r.map(d => discCard(d)).join('') + '</div>' : '<p class="empty">Nenhum disco com esses filtros.</p>');
    hidratarCapas(box);
  }

  /* ----- 6.5 Ajustes e backup ----- */
  function viewAjustes() {
    return '<section class="view"><div class="page-head"><div><div class="eyebrow">Ajustes</div><h1>Ajustes do curso</h1><p>O seu progresso fica salvo na sua conta do Hilla e aparece igual no celular e no computador.</p></div></div>' +
      (LOGADO ? '' : avisoEntrar()) +
      '<div class="settings">' +
      '<div class="card panel"><h3>' + icon('disc') + 'Prateleira</h3><p>A Academy usa a sua prateleira do Hilla: <b>' + COL.length + (COL.length === 1 ? ' disco' : ' discos') + '</b>. Para mudar, adicione ou edite discos na Prateleira.</p>' +
      '<div class="acts"><a class="btn primary" href="colecao.html">' + icon('disc', 'sm') + 'Abrir a Prateleira</a></div></div>' +
      '<div class="card panel"><h3>' + icon('eye') + 'Capas dos álbuns</h3><p>As capas vêm da busca pública do iTunes. Sem internet, ou quando a busca não encontra um resultado confiável, aparece uma capa tipográfica gerada pelo próprio site.</p>' +
      '<label class="toggle"><input type="checkbox" data-pref="capas" ' + (S.prefs.capas ? 'checked' : '') + '><span class="sw"></span>Buscar capas na internet</label>' +
      '<div class="acts" style="margin-top:16px"><button class="btn sm" data-action="limpar-capas">' + icon('reset', 'sm') + 'Buscar capas de novo</button></div></div>' +
      '<div class="card panel"><h3>' + icon('alert') + 'Recomeçar o curso</h3><p>Apaga progresso, favoritas, músicas ouvidas, respostas e observações deste curso. A sua prateleira não muda.</p>' +
      '<div class="acts"><button class="btn danger" data-action="pedir-reset">' + icon('reset', 'sm') + 'Apagar progresso</button></div></div>' +
      '</div></section>';
  }

  /* ---------------------------------------------------------------------
     7. BUSCA GLOBAL (estilos, artistas, álbuns e músicas)
     --------------------------------------------------------------------- */
  let INDEX = [];
  function buildSearchIndex() {
    INDEX = [];
    AULAS.forEach(a => {
      INDEX.push({ g: 'Estilos e aulas', t: a.titulo, s: 'Aula ' + pad(a.n) + ' · ' + a.periodo + ' · ' + a.origem, ic: pad(a.n), href: '#/aula/' + a.n, hay: normWords(a.titulo + ' ' + a.subtitulo + ' ' + a.origem + ' ' + (a.glossario || []).map(x => x[0]).join(' ')) });
      a.bandas.forEach(b => INDEX.push({ g: 'Artistas', t: b[0], s: b[1] + ' · ' + b[2] + ' · aula ' + pad(a.n), ic: icon('users', 'sm'), href: '#/aula/' + a.n, goto: 'bandas', hay: normWords(b[0]) }));
      a.bandas.forEach(b => INDEX.push({ g: 'Álbuns', t: b[4], s: b[0] + ' · recomendado na aula ' + pad(a.n), ic: icon('disc', 'sm'), href: '#/aula/' + a.n, goto: 'bandas', hay: normWords(b[4] + ' ' + b[0]) }));
      a.playlist.forEach(t => INDEX.push({ g: 'Músicas', t: t[2], s: t[1] + ' · ' + t[3] + ' (' + t[4] + ') · aula ' + pad(a.n), ic: icon('music', 'sm'), href: '#/aula/' + a.n, goto: 'playlist', hay: normWords(t[2] + ' ' + t[1] + ' ' + t[3]) }));
    });
    const vistos = new Set();
    COL.forEach(d => {
      INDEX.push({ g: 'Na sua prateleira', t: d.album, s: d.artista + ' · ' + d.formato + ' · ' + d.cls.g, ic: icon('disc', 'sm'), disc: d.id, hay: normWords(d.album + ' ' + d.artista + ' ' + d.cls.g) });
      if (!vistos.has(d.artKey)) { vistos.add(d.artKey); INDEX.push({ g: 'Artistas', t: d.artista, s: 'Na sua prateleira · ' + d.cls.g, ic: icon('users', 'sm'), href: '#/prateleira', artista: d.artista, hay: normWords(d.artista) }); }
    });
  }
  function buscar(q) {
    const w = normWords(q).split(' ').filter(Boolean);
    if (!w.length) return [];
    const res = INDEX.filter(it => w.every(x => it.hay.includes(x))).map(it => ({ it, sc: (it.hay.startsWith(w[0]) ? 0 : 1) + (normWords(it.t).startsWith(w.join(' ')) ? -1 : 0) }));
    res.sort((a, b) => a.sc - b.sc);
    const grupos = {}, ordem = ['Estilos e aulas', 'Artistas', 'Álbuns', 'Na sua prateleira', 'Músicas'], dedupe = new Set();
    res.forEach(({ it }) => { const k = it.g + '|' + normWords(it.t) + '|' + (it.href || it.disc); if (dedupe.has(k)) return; dedupe.add(k); (grupos[it.g] = grupos[it.g] || []).push(it); });
    return ordem.filter(g => grupos[g]).map(g => [g, grupos[g].slice(0, 6)]);
  }
  function marcar(texto, q) {
    const ws = normWords(q).split(' ').filter(Boolean); let t = esc(texto);
    if (!ws.length) return t;
    const plain = normWords(texto);
    // destaque simples: primeira palavra buscada que aparece no início de uma palavra do título
    const w = ws[0], i = plain.indexOf(w);
    if (i < 0 || plain.length !== String(texto).length) return t;
    return esc(texto.slice(0, i)) + '<mark>' + esc(texto.slice(i, i + w.length)) + '</mark>' + esc(texto.slice(i + w.length));
  }
  function abrirBusca() {
    abrirModal('<div class="modal search-modal" role="dialog" aria-label="Pesquisar"><div class="search-top">' + icon('search', 'lg') + '<input type="search" id="q" placeholder="Pesquise estilos, artistas, álbuns ou músicas" autocomplete="off" aria-label="Pesquisar"><button class="icon-btn" data-action="close-modal" aria-label="Fechar">' + icon('x') + '</button></div>' +
      '<div class="search-res" id="qres"><div class="search-empty">Experimente: <b>thrash</b>, <b>Blind Guardian</b>, <b>breakdown</b>, <b>Master of Puppets</b>, <b>Brasil</b>.</div></div>' +
      '<div class="search-foot"><span><kbd>↑</kbd><kbd>↓</kbd>navegar</span><span><kbd>Enter</kbd>abrir</span><span><kbd>Esc</kbd>fechar</span></div></div>');
    const inp = $('#q'); inp.focus();
    inp.addEventListener('input', () => renderBusca(inp.value));
    inp.addEventListener('keydown', e => {
      const items = $$('.sitem', $('#qres')); let i = items.findIndex(x => x.classList.contains('act'));
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); if (!items.length) return;
        if (i >= 0) items[i].classList.remove('act');
        i = e.key === 'ArrowDown' ? Math.min(items.length - 1, i + 1) : Math.max(0, i - 1);
        items[i].classList.add('act'); items[i].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') { e.preventDefault(); const el = items[i >= 0 ? i : 0]; if (el) el.click(); }
    });
  }
  function renderBusca(q) {
    const box = $('#qres'); if (!box) return;
    if (!q.trim()) { box.innerHTML = '<div class="search-empty">Experimente: <b>thrash</b>, <b>Blind Guardian</b>, <b>breakdown</b>, <b>Master of Puppets</b>, <b>Brasil</b>.</div>'; return; }
    const r = buscar(q);
    if (!r.length) { box.innerHTML = '<div class="search-empty">Nada encontrado para “' + esc(q) + '”.</div>'; return; }
    box.innerHTML = r.map(([g, its]) => '<div class="sgroup"><h5>' + g + '</h5>' + its.map((it, i) =>
      '<div class="sitem" role="button" tabindex="-1" data-action="search-go" ' + (it.disc ? 'data-disc="' + it.disc + '"' : 'data-href="' + it.href + '"') + (it.goto ? ' data-goto="' + it.goto + '"' : '') + (it.artista ? ' data-artista="' + esc(it.artista) + '"' : '') + '>' +
      '<span class="si">' + it.ic + '</span><span class="st"><b>' + marcar(it.t, q) + '</b><span>' + esc(it.s) + '</span></span></div>').join('') + '</div>').join('');
    const f = $('.sitem', box); if (f) f.classList.add('act');
  }

  /* ---------------------------------------------------------------------
     8. MODAIS E AVISOS
     --------------------------------------------------------------------- */
  let lastFocus = null;
  function abrirModal(html) {
    fecharModal(true);
    lastFocus = document.activeElement;
    const ov = document.createElement('div');
    ov.className = 'overlay'; ov.id = 'overlay'; ov.innerHTML = html;
    ov.addEventListener('mousedown', e => { if (e.target === ov) fecharModal(); });
    document.body.appendChild(ov); document.body.style.overflow = 'hidden';
    hidratarCapas(ov);
  }
  function fecharModal(silencioso) {
    const ov = $('#overlay'); if (!ov) return;
    ov.remove(); document.body.style.overflow = '';
    if (!silencioso && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function abrirDisco(id) {
    const d = COL.find(x => x.id === id); if (!d) return;
    const aulas = d.cls.a.map(n => '<a class="chip gold" href="#/aula/' + n + '" data-action="close-modal-nav">' + pad(n) + ' · ' + esc(AULAS[n - 1].titulo) + '</a>').join(' ');
    const ecos = d.cls.e.map(n => '<a class="chip" href="#/aula/' + n + '" data-action="close-modal-nav">' + pad(n) + ' · ' + esc(AULAS[n - 1].titulo) + '</a>').join(' ');
    const cond = [d.condM && 'mídia ' + d.condM, d.condC && 'capa ' + d.condC].filter(Boolean).join(' · ');
    const row = (k, v) => v ? '<div class="k">' + k + '</div><div>' + v + '</div>' : '';
    abrirModal('<div class="modal" role="dialog" aria-label="' + esc(d.album) + '"><div class="album-modal"><button class="icon-btn modal-x" data-action="close-modal" aria-label="Fechar">' + icon('x') + '</button>' +
      '<div>' + coverHTML(d.artista, d.album) + '<div class="acts" style="margin-top:14px">' + links(d.artista + ' ' + d.album) + '</div>' + (d.hid ? '<button class="btn sm primary" style="margin-top:10px" data-action="registrar-aud" data-hid="' + d.hid + '">' + icon('headphones', 'sm') + 'Registrar audição</button>' : '') + '</div>' +
      '<div><div class="db" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">' + fmtBadge(d) + (d.cls.ref ? '<span class="badge ref">Referência histórica</span>' : '') + (d.fav ? '<span class="badge vinil">' + icon('star', 'sm') + ' Favorito</span>' : '') + '</div>' +
      '<h2>' + esc(d.album) + '</h2><div class="art">' + esc(d.artista) + (d.pais ? ' <span class="muted">· ' + esc(d.pais) + '</span>' : '') + '</div>' +
      '<p class="rel">' + esc(d.cls.r) + '</p>' +
      '<div class="kv">' + row('Estilo principal', '<b>' + esc(d.cls.g) + '</b>') + row('Subgêneros e influências', d.cls.s.length ? esc(d.cls.s.join(' · ')) : '') +
      row('Aula relacionada', aulas || '<span class="muted">—</span>') + row('Também ecoa em', ecos) +
      row('Formato físico', esc(d.formato) + ' <span class="muted">(' + d.tipo + ')</span>') + row('Lançamento original', d.cls.o ? String(d.cls.o) : '') + row('Ano da edição', d.anoEd ? String(d.anoEd) : '') +
      row('Condição', esc(cond)) + row('Suas notas', esc(d.notas)) + row('Gênero no Hilla', esc(d.generoCSV)) + row('Adicionado em', d.data ? fmtDate(d.data + 'T12:00:00') : '') + '</div>' +
      '<details class="classify" ' + (d.cls.fonte === 'pendente' ? 'open' : '') + '><summary style="cursor:pointer;font-size:14px;color:var(--gold)">' + (d.cls.fonte === 'pendente' ? 'Classificar este disco' : 'Ajustar classificação') + '</summary>' +
      '<label class="muted" style="font-size:13px">Estilo principal<input class="input" id="cls-g" value="' + esc(d.cls.g === 'A classificar' ? '' : d.cls.g) + '" placeholder="Ex.: ' + CFG.exemploEstilo + '"></label>' +
      '<label class="muted" style="font-size:13px">Aula relacionada<select class="select" id="cls-a">' + AULAS.map(a => '<option value="' + a.n + '" ' + (d.cls.a[0] === a.n ? 'selected' : '') + '>' + pad(a.n) + ' · ' + esc(a.titulo) + '</option>').join('') + '</select></label>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm primary" data-action="salvar-cls" data-key="' + esc(d.key) + '">Salvar classificação</button>' + (S.overrides[d.key] ? '<button class="btn sm ghost" data-action="remover-cls" data-key="' + esc(d.key) + '">Desfazer ajuste manual</button>' : '') + '</div></details>' +
      '</div></div></div>');
  }
  function confirmar(titulo, texto, acao) {
    abrirModal('<div class="modal confirm" role="alertdialog" aria-label="' + esc(titulo) + '"><h2>' + titulo + '</h2><p>' + texto + '</p><div class="acts"><button class="btn" data-action="close-modal">Cancelar</button><button class="btn danger" data-action="' + acao + '">Confirmar</button></div></div>');
  }
  let toastT;
  function toast(msg, ic) {
    const t = $('#toast'); if (!t) return;
    t.innerHTML = icon(ic || 'check', 'sm') + '<span>' + esc(msg) + '</span>';
    t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------------------------------------------------------------------
     9. ROTEAMENTO E EVENTOS
     --------------------------------------------------------------------- */
  let pendingGoto = null, spy = null, rotaAtual = '';
  function render() {
    const h = location.hash.replace(/^#\/?/, '');
    const [p, arg] = h.split('/');
    let html, nav = '', title = CFG.nome + ' · Hilla Academy';
    if (spy) { spy.disconnect(); spy = null; }
    if (!p) { html = viewInicio(); nav = 'inicio'; }
    else if (p === 'curso') { html = viewCurso(); nav = 'curso'; title = 'Curso · ' + title; }
    else if (p === 'aula' && +arg >= 1 && +arg <= TOTAL) { html = viewAula(+arg); nav = 'curso'; title = pad(arg) + ' · ' + AULAS[arg - 1].titulo + ' · ' + title; }
    else if (p === 'prateleira') { html = viewPrateleira(); nav = 'prateleira'; title = 'Minha Prateleira · ' + title; }
    else if (p === 'ajustes') { html = viewAjustes(); title = 'Ajustes · ' + title; }
    else { location.replace('#/'); return; }
    const mudouRota = rotaAtual !== h; rotaAtual = h;
    app.innerHTML = html;
    document.title = title;
    $$('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === nav));
    if (p === 'prateleira') renderShelfResults();
    hidratarCapas(app);
    if (p === 'aula') iniciarScrollspy();
    if (pendingGoto) { const id = pendingGoto; pendingGoto = null; requestAnimationFrame(() => irPara(id)); }
    else if (mudouRota) { window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
  }
  /** Re-renderiza a tela atual mantendo a rolagem (usado após ações). */
  function rerender() { const y = window.scrollY; rotaAtual = location.hash.replace(/^#\/?/, ''); render(); window.scrollTo(0, y); }
  function irPara(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  function iniciarScrollspy() {
    if (!('IntersectionObserver' in window)) return;
    const links = $$('.toc a');
    spy = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.toggle('on', l.dataset.scroll === e.target.dataset.sec));
        const on = $('.toc a.on'); if (on && window.innerWidth <= 860) on.scrollIntoView({ inline: 'center', block: 'nearest' });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    $$('[data-sec]').forEach(s => spy.observe(s));
  }
  /** Atualiza só os contadores do cabeçalho da aula (evita re-render ao marcar músicas). */
  function atualizarContadores(n) {
    const a = AULAS[n - 1];
    const o = $('#lp-ouv'); if (o) o.textContent = ouvidasDaAula(a) + '/' + a.playlist.length;
    const r = $('#lp-rev'); if (r) r.textContent = a.desafio.filter((_, i) => S.reveladas[n + '-' + i]).length + '/' + a.desafio.length;
  }

  document.addEventListener('click', e => {
    const goto = e.target.closest('[data-goto]');
    if (goto && goto.getAttribute('href')) { pendingGoto = goto.dataset.goto; if (goto.getAttribute('href') === location.hash) { e.preventDefault(); const id = pendingGoto; pendingGoto = null; irPara(id); } }
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const act = el.dataset.action;
    switch (act) {
      case 'open-search': e.preventDefault(); abrirBusca(); break;
      case 'close-modal': e.preventDefault(); fecharModal(); break;
      case 'close-modal-nav': fecharModal(true); break;
      case 'search-go': {
        fecharModal(true);
        if (el.dataset.disc) { abrirDisco(el.dataset.disc); break; }
        if (el.dataset.artista) { Object.assign(F, { q: '', tipo: 'todos', estilo: '', aula: '', pend: false, artista: el.dataset.artista }); }
        if (el.dataset.goto) pendingGoto = el.dataset.goto;
        if (location.hash === el.dataset.href) { rerender(); } else location.hash = el.dataset.href;
        break;
      }
      case 'toggle-done': {
        const n = +el.dataset.n;
        if (S.concluidas[n]) { delete S.concluidas[n]; toast('Aula ' + pad(n) + ' marcada como pendente', 'reset'); }
        else { S.concluidas[n] = new Date().toISOString(); toast('Aula ' + pad(n) + ' concluída', 'check'); }
        save(); rerender(); break;
      }
      case 'toggle-fav': {
        const n = +el.dataset.n;
        if (S.favoritas[n]) delete S.favoritas[n]; else S.favoritas[n] = true;
        save(); toast(S.favoritas[n] ? 'Adicionada às favoritas' : 'Removida das favoritas', 'star'); rerender(); break;
      }
      case 'toggle-heard': {
        const k = el.dataset.k, on = !S.ouvidas[k];
        if (on) S.ouvidas[k] = new Date().toISOString(); else delete S.ouvidas[k];
        save();
        el.classList.toggle('on', on); el.setAttribute('aria-pressed', on); el.title = on ? 'Ouvida' : 'Marcar como ouvida';
        el.innerHTML = icon(on ? 'check' : 'headphones', 'sm');
        atualizarContadores(+k.split('-')[0]); break;
      }
      case 'reveal': {
        const k = el.dataset.k;
        if (S.reveladas[k]) delete S.reveladas[k]; else S.reveladas[k] = true;
        save(); rerender(); break;
      }
      case 'filtro-curso': filtroCurso = el.dataset.v; rerender(); break;
      case 'open-disc': abrirDisco(el.dataset.id); break;
      case 'f-tipo': F.tipo = el.dataset.v; $$('.seg button').forEach(b => b.classList.toggle('on', b.dataset.v === F.tipo)); renderShelfResults(); break;
      case 'limpar-filtros': Object.assign(F, { q: '', tipo: 'todos', estilo: '', artista: '', aula: '', pend: false }); rerender(); break;
      case 'filtro-pendentes': Object.assign(F, { q: '', tipo: 'todos', estilo: '', artista: '', aula: '', pend: true }); renderShelfResults(); irPara('shelf-results'); break;
      case 'salvar-cls': {
        const key = el.dataset.key, g = ($('#cls-g').value || '').trim(), a = +$('#cls-a').value;
        S.overrides[key] = { g: g || 'Sem estilo definido', a: [a] }; save(); loadCollection(); fecharModal(true); rerender(); toast('Classificação salva'); break;
      }
      case 'remover-cls': delete S.overrides[el.dataset.key]; save(); loadCollection(); fecharModal(true); rerender(); toast('Classificação original restaurada', 'reset'); break;
      case 'add-wish': adicionarWishlist(el); break;
      case 'registrar-aud': registrarAudicao(el); break;
      case 'limpar-capas': COV = {}; coverFails = 0; try { localStorage.removeItem(KEY_COV); } catch (er) { } toast('As capas serão buscadas novamente', 'reset'); break;
      case 'pedir-reset': confirmar('Apagar todo o progresso?', 'Aulas concluídas, favoritas, músicas ouvidas, respostas e observações deste curso serão apagadas da sua conta. A sua prateleira não muda.', 'reset'); break;
      case 'reset': {
        const ov = S.overrides, prefs = S.prefs;
        S = NOVO(); S.overrides = ov; S.prefs = prefs; save(); fecharModal(true); loadCollection(); toast('Progresso apagado', 'reset'); location.hash = '#/'; rerender(); break;
      }
    }
  });

  // Rolagem para seções da aula (o hash é usado pelas rotas)
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-scroll]'); if (!a) return;
    e.preventDefault(); irPara(a.dataset.scroll);
  });

  // Campos de texto: observações, respostas do desafio, filtros
  const salvarNota = debounce((n, v) => { S.notas[n] = v; if (!v) delete S.notas[n]; save(); const s = $('#saved'); if (s) { s.classList.add('show'); setTimeout(() => s.classList.remove('show'), 1400); } }, 450);
  const salvarResp = debounce((k, v) => { S.respostas[k] = v; if (!v) delete S.respostas[k]; save(); }, 450);
  const filtrarTexto = debounce(() => renderShelfResults(), 160);
  document.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.note) salvarNota(t.dataset.note, t.value);
    else if (t.dataset.resp) salvarResp(t.dataset.resp, t.value);
    else if (t.dataset.f === 'q') { F.q = t.value; F.pend = false; filtrarTexto(); }
  });
  document.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.f && t.dataset.f !== 'q') { F[t.dataset.f] = t.value; F.pend = false; renderShelfResults(); }
    if (t.dataset.pref) { S.prefs[t.dataset.pref] = t.checked; save(); toast(t.checked ? 'Capas online ativadas' : 'Capas online desativadas', 'eye'); }
  });

  // Atalhos de teclado
  document.addEventListener('keydown', e => {
    const tag = (e.target.tagName || '').toLowerCase();
    const editando = tag === 'input' || tag === 'textarea' || tag === 'select';
    if (e.key === 'Escape') { fecharModal(); return; }
    if ((e.key === '/' && !editando) || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) { e.preventDefault(); abrirBusca(); return; }
    const m = location.hash.match(/^#\/aula\/(\d+)/);
    if (m && !editando && !$('#overlay')) {
      const n = +m[1];
      if (e.key === 'ArrowRight' && n < TOTAL) location.hash = '#/aula/' + (n + 1);
      if (e.key === 'ArrowLeft' && n > 1) location.hash = '#/aula/' + (n - 1);
    }
  });

  /* Ações que falam com o Hilla */
  function adicionarWishlist(el) {
    el.disabled = true;
    api('/adicionar_recomendacao', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artista: el.dataset.art, album: el.dataset.alb, tier: 'B', notas: 'Hilla Academy: noite ' + el.dataset.aula + ' de ' + CFG.nome }) })
      .then(() => { el.innerHTML = icon('check', 'sm') + 'Na wishlist'; toast('Adicionado à sua wishlist', 'check'); })
      .catch(st => { if (st === 409) { el.innerHTML = icon('check', 'sm') + 'Na wishlist'; toast('Esse disco já está na sua wishlist', 'check'); } else { el.disabled = false; toast('Não foi possível adicionar agora', 'alert'); } });
  }
  function registrarAudicao(el) {
    const agora = new Date(), f = new FormData();
    f.append('colecao_id', el.dataset.hid);
    f.append('data', agora.getFullYear() + '-' + pad(agora.getMonth() + 1) + '-' + pad(agora.getDate()));
    f.append('hora', pad(agora.getHours()) + ':' + pad(agora.getMinutes()));
    el.disabled = true;
    api('/audicoes', { method: 'POST', body: f })
      .then(() => { el.innerHTML = icon('check', 'sm') + 'Audição registrada'; toast('Audição registrada', 'check'); })
      .catch(() => { el.disabled = false; toast('Não foi possível registrar agora', 'alert'); });
  }

  // Outra aba alterou o progresso: sincroniza
  window.addEventListener('hashchange', render);

  async function iniciar() {
    if (LOGADO) {
      const [p, c] = await Promise.allSettled([api('/academy/progresso/' + CURSO), api('/colecao')]);
      if (p.status === 'fulfilled') {
        const d = p.value && p.value.dados;
        if (d && typeof d === 'object') {
          const base = NOVO(); Object.keys(base).forEach(k => { if (d[k] !== undefined) base[k] = d[k]; });
          base.prefs = Object.assign({ capas: true }, base.prefs || {});
          S = base;
        }
        podeSalvar = true;
      } else toast('Não foi possível carregar o seu progresso agora.', 'alert');
      if (c.status === 'fulfilled' && Array.isArray(c.value)) HILLA = c.value;
    }
    loadCollection();
    render();
  }
  iniciar();
})();

