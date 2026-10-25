// Autocomplete de artista e álbum — mesma peça na Coleção, Wishlist e Disco de fora.
// Uso: HillaAuto.ligar({ artista: inputEl, album: inputEl, aoEscolher: item => {...} })
// Precisa de API_URL e apiFetch da página.
(function () {
  if (!document.getElementById('hilla-auto-css')) {
    const css = document.createElement('style');
    css.id = 'hilla-auto-css';
    css.textContent = `
.ha-wrap{position:relative}
.ha-lista{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:60;background:var(--card,#1A1A1A);border:1px solid var(--card-line,#282828);border-radius:10px;overflow:hidden;box-shadow:0 10px 28px rgba(0,0,0,.45);max-height:min(320px,45vh);overflow-y:auto}
.ha-it{display:flex;gap:10px;align-items:center;width:100%;padding:10px 12px;border:0;border-top:1px solid var(--card-line,#282828);background:none;color:var(--paper,#F0F0F0);text-align:left;font:inherit;cursor:pointer;min-height:48px}
.ha-it:first-child{border-top:0}
.ha-it:hover,.ha-it.ha-on{background:var(--terracotta-wash,rgba(201,162,76,.12))}
.ha-cv{width:34px;height:34px;border-radius:4px;flex-shrink:0;background:#262626 center/cover no-repeat;display:grid;place-items:center;color:#555;font-size:15px}
.ha-tx{min-width:0;flex:1}
.ha-tx b{display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ha-tx b em{font-style:normal;color:var(--terracotta,#C9A24C)}
.ha-tx span{display:block;font-size:12px;color:var(--ink-soft,#9a9a9a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ha-pill{font-size:10px;border:1px solid var(--terracotta,#C9A24C);color:var(--terracotta,#C9A24C);border-radius:99px;padding:2px 7px;white-space:nowrap;flex-shrink:0}
.ha-pill.ha-g{border-color:var(--card-line,#3a3a3a);color:var(--ink-soft,#9a9a9a)}`;
    document.head.appendChild(css);
  }

  const norm = t => (t || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // destaca o começo das palavras que casam com o digitado
  function realce(texto, q) {
    const toks = norm(q).split(' ').filter(Boolean);
    if (!toks.length) return esc(texto);
    return texto.split(/(\s+)/).map(p => {
      const n = norm(p);
      const t = toks.find(t => n.startsWith(t));
      if (!t) return esc(p);
      // acha quantos caracteres originais cobrem o token (ignora acento)
      let i = 0, c = 0;
      while (i < p.length && c < t.length) { if (norm(p[i])) c++; i++; }
      return '<em>' + esc(p.slice(0, i)) + '</em>' + esc(p.slice(i));
    }).join('');
  }

  const discografias = {};   // artista normalizado -> promessa (1 consulta por artista por página)
  function discografia(artista) {
    const k = norm(artista);
    if (!k) return Promise.resolve([]);
    if (!discografias[k]) {
      discografias[k] = apiFetch(`${API_URL}/sugestoes/discografia?artista=${encodeURIComponent(artista)}`)
        .then(r => r.ok ? r.json() : { itens: [] }).then(d => d.itens || []).catch(() => []);
    }
    return discografias[k];
  }

  function ligar(cfg) {
    const inArt = cfg.artista, inAlb = cfg.album;
    if (!inArt || !inAlb || inArt.dataset.haLigado) return;
    inArt.dataset.haLigado = inAlb.dataset.haLigado = '1';
    let artistaEscolhido = '';   // artista confirmado por toque numa sugestão

    function montar(input, campo) {
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('role', 'combobox');
      input.setAttribute('aria-autocomplete', 'list');
      input.setAttribute('aria-expanded', 'false');
      const wrap = document.createElement('div');
      wrap.className = 'ha-wrap';
      input.parentNode.insertBefore(wrap, input);
      wrap.appendChild(input);
      const lista = document.createElement('div');
      lista.className = 'ha-lista'; lista.setAttribute('role', 'listbox'); lista.hidden = true;
      wrap.appendChild(lista);
      let itens = [], sel = -1, timer = null, pedido = 0;

      const fechar = () => { lista.hidden = true; input.setAttribute('aria-expanded', 'false'); sel = -1; };
      function desenhar(q) {
        if (!itens.length) return fechar();
        lista.innerHTML = itens.map((it, i) => {
          if (campo === 'artista') {
            return `<button type="button" class="ha-it" role="option" data-i="${i}"><span class="ha-cv"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span>
              <span class="ha-tx"><b>${realce(it.artista, q)}</b><span>${it.meus ? it.meus + (it.meus > 1 ? ' discos seus' : ' disco seu') : 'na Hilla'}</span></span>
              ${it.meus ? '<span class="ha-pill">seu</span>' : ''}</button>`;
          }
          const sub = [artistaEscolhido && norm(artistaEscolhido) === norm(it.artista) ? '' : it.artista, it.ano, it.onde === 'prateleira' ? it.formato : ''].filter(Boolean).join(' · ');
          const pill = it.onde === 'prateleira' ? '<span class="ha-pill">na prateleira</span>' : it.onde === 'wishlist' ? '<span class="ha-pill ha-g">na wishlist</span>' : '';
          const cv = it.capa_url ? `<span class="ha-cv" style="background-image:url('${esc(it.capa_url)}')"></span>` : '<span class="ha-cv"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span>';
          return `<button type="button" class="ha-it" role="option" data-i="${i}">${cv}
            <span class="ha-tx"><b>${realce(it.album, q)}</b><span>${esc(sub)}</span></span>${pill}</button>`;
        }).join('');
        lista.hidden = false; input.setAttribute('aria-expanded', 'true');
        // no celular: sobe o campo pra lista não ficar atrás do teclado
        if (window.innerWidth < 700) setTimeout(() => input.scrollIntoView({ block: 'start', behavior: 'smooth' }), 50);
      }

      async function buscar() {
        const q = input.value.trim();
        const art = campo === 'album' ? (inArt.value.trim()) : '';
        if (campo === 'artista' && norm(q).length < 2) { itens = []; return fechar(); }
        if (campo === 'album' && !art && norm(q).length < 2) { itens = []; return fechar(); }
        const meu = ++pedido;
        const url = `${API_URL}/sugestoes?campo=${campo}&q=${encodeURIComponent(q)}` + (art ? `&artista=${encodeURIComponent(art)}` : '');
        let lst = [];
        try { const r = await apiFetch(url); if (r.ok) lst = (await r.json()).itens || []; } catch {}
        // álbum com artista preenchido: completa com a discografia (MusicBrainz, 1x por artista)
        if (campo === 'album' && art && lst.length < 8) {
          const disc = await discografia(art);
          const vistos = new Set(lst.map(x => norm(x.album)));
          const toks = norm(q).split(' ').filter(Boolean);
          for (const d of disc) {
            const n = norm(d.album);
            if (vistos.has(n) || !toks.every(t => n.split(' ').some(p => p.startsWith(t)))) continue;
            vistos.add(n); lst.push({ artista: art, album: d.album, ano: d.ano });
            if (lst.length >= 8) break;
          }
        }
        if (meu !== pedido || document.activeElement !== input) return;
        itens = lst; sel = -1; desenhar(q);
      }

      function escolher(i) {
        const it = itens[i];
        if (!it) return;
        if (campo === 'artista') {
          input.value = it.artista; artistaEscolhido = it.artista;
          fechar();
          discografia(it.artista);   // já adianta a discografia
          inAlb.focus();
        } else {
          inAlb.value = it.album;
          if (!inArt.value.trim() || norm(inArt.value) !== norm(it.artista)) inArt.value = it.artista;
          artistaEscolhido = it.artista;
          fechar();
          if (cfg.aoEscolher) cfg.aoEscolher(it);
        }
        input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        fechar();
      }

      input.addEventListener('input', (ev) => {
        if (!ev.isTrusted) return;
        if (campo === 'artista') artistaEscolhido = '';
        clearTimeout(timer); timer = setTimeout(buscar, 180);
      });
      input.addEventListener('focus', () => { if (campo === 'album' && inArt.value.trim()) buscar(); });
      input.addEventListener('keydown', (ev) => {
        if (lista.hidden) return;
        const bts = lista.querySelectorAll('.ha-it');
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
          ev.preventDefault();
          sel = (sel + (ev.key === 'ArrowDown' ? 1 : -1) + bts.length) % bts.length;
          bts.forEach((b, i) => b.classList.toggle('ha-on', i === sel));
        } else if (ev.key === 'Enter' && sel >= 0) { ev.preventDefault(); escolher(sel); }
        else if (ev.key === 'Escape') fechar();
      });
      lista.addEventListener('mousedown', ev => ev.preventDefault());   // não tira o foco antes do clique
      lista.addEventListener('click', ev => { const b = ev.target.closest('.ha-it'); if (b) escolher(+b.dataset.i); });
      input.addEventListener('blur', () => setTimeout(fechar, 120));
    }
    montar(inArt, 'artista');
    montar(inAlb, 'album');
  }

  window.HillaAuto = { ligar };
})();
