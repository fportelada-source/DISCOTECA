// Estatísticas em abas (Prateleira, Audições, Dinheiro, Wishlist).
// Um pedido só (/estatisticas/painel) traz os dados crus; trocar de aba,
// período, medida ou "Por formato" recalcula aqui mesmo, sem novo pedido.
(function () {
  const FMT = [
    { k: 'vinil', nome: 'Vinil', cor: 'var(--vinil-color)' },
    { k: 'cd', nome: 'CD', cor: 'var(--cd-color)' },
    { k: 'cassete', nome: 'Cassete', cor: 'var(--cassete-color)' },
    { k: 'dvd', nome: 'DVD/Blu-ray', cor: '#8FBF8A' },
    { k: 'outro', nome: 'Outros', cor: '#8A8378' }
  ];
  const MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const MES_LONGO = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const $ = id => document.getElementById(id);
  const esc = t => (typeof escapeHtml === 'function' ? escapeHtml(t) : String(t == null ? '' : t));
  const norm = t => (t || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const reais = v => 'R$ ' + Math.round(v || 0).toLocaleString('pt-BR');
  const reaisC = v => 'R$ ' + (v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const lerPref = (k, d) => { try { return localStorage.getItem('hilla_stats_' + k) || d; } catch (e) { return d; } };
  const gravarPref = (k, v) => { try { localStorage.setItem('hilla_stats_' + k, v); } catch (e) {} };

  const E = {
    dados: null, carregando: false,
    aba: lerPref('aba', 'prat'),
    per: '12m',
    modoCres: 'qtd', modoAud: 'h',
    porFmt: lerPref('fmt', '0') === '1',
    selCres: null
  };

  // ---------------- período ----------------
  function periodos() {
    const hoje = E.dados.hoje, ano = +hoje.slice(0, 4);
    const anos = new Set([...E.dados.discos.map(d => d[2].slice(0, 4)), ...E.dados.audicoes.map(a => a[0].slice(0, 4))].filter(a => /^\d{4}$/.test(a)));
    const lista = [{ k: '12m', nome: '12 meses' }, { k: 'a' + ano, nome: String(ano) }];
    if (anos.has(String(ano - 1))) lista.push({ k: 'a' + (ano - 1), nome: String(ano - 1) });
    lista.push({ k: 'tudo', nome: 'Tudo' });
    return lista;
  }
  // Faixas do gráfico: meses (12 meses ou um ano) ou anos ("Tudo")
  function faixas() {
    const hoje = E.dados.hoje, y = +hoje.slice(0, 4), m = +hoje.slice(5, 7);
    const pad = n => String(n).padStart(2, '0');
    if (E.per === '12m') {
      return Array.from({ length: 12 }, (_, i) => {
        const d = new Date(y, m - 1 - 11 + i, 1);
        const k = d.getFullYear() + '-' + pad(d.getMonth() + 1);
        return { k, rot: MES[d.getMonth()], longo: MES_LONGO[d.getMonth()] + ' de ' + d.getFullYear() };
      });
    }
    if (E.per.startsWith('a')) {
      const ano = E.per.slice(1);
      return Array.from({ length: 12 }, (_, i) => ({ k: ano + '-' + pad(i + 1), rot: MES[i], longo: MES_LONGO[i] + ' de ' + ano }));
    }
    const anos = [...E.dados.discos.map(d => +d[2].slice(0, 4)), ...E.dados.audicoes.map(a => +a[0].slice(0, 4))].filter(a => a > 1990);
    const ini = anos.length ? Math.min(...anos) : y;
    return Array.from({ length: y - ini + 1 }, (_, i) => ({ k: String(ini + i), rot: String(ini + i), longo: String(ini + i) }));
  }
  const chaveDe = data => (E.per === 'tudo' ? (data || '').slice(0, 4) : (data || '').slice(0, 7));
  function noPeriodo(data) {
    if (!data) return false;
    if (E.per === 'tudo') return true;
    const f = faixas();
    const k = data.slice(0, 7);
    return k >= f[0].k && k <= f[f.length - 1].k;
  }
  const nomePeriodo = () => E.per === '12m' ? 'nos últimos 12 meses' : E.per === 'tudo' ? 'desde o começo' : 'em ' + E.per.slice(1);

  // ---------------- peças de desenho ----------------
  // barras: [{rot, longo, partes:[{v, cor, listra}], total, legenda}]
  function barras(el, itens, opts) {
    opts = opts || {};
    const max = Math.max(1, ...itens.map(i => i.total));
    const vazio = itens.every(i => !i.total);
    el.classList.toggle('sp-bars-rolar', itens.length > 14);
    el.classList.toggle('sp-val-longo', !!(opts.fmt && opts.onSel));
    el.innerHTML = vazio ? `<div class="sp-vazio">${opts.vazio || 'Nada neste período ainda.'}</div>` : itens.map((it, idx) => {
      const partes = it.partes.filter(p => p.v > 0);
      const alt = Math.round(it.total / max * 100);
      return `<button type="button" class="sp-col${opts.sel === idx ? ' sel' : ''}" data-i="${idx}" ${opts.onSel ? '' : 'tabindex="-1"'}
        aria-label="${esc(it.longo)}: ${esc(it.legenda || it.total)}"${opts.sel === idx ? ' aria-pressed="true"' : ''}>
        <span class="sp-val">${it.total ? esc(opts.fmt ? opts.fmt(it.total) : it.total) : ''}</span>
        <span class="sp-stack" style="height:${alt}%">${partes.map(p => `<i style="flex:${p.v};background:${p.listra ? `repeating-linear-gradient(45deg, ${p.cor} 0 3px, rgba(0,0,0,.45) 3px 6px)` : p.cor}"></i>`).join('')}</span>
        <small>${esc(it.rot)}</small></button>`;
    }).join('');
    if (opts.onSel) el.querySelectorAll('.sp-col').forEach(b => b.addEventListener('click', () => opts.onSel(+b.dataset.i)));
    if (itens.length > 14) el.scrollLeft = el.scrollWidth;
  }
  function hbarras(el, linhas, vazio) {
    if (!linhas.length) { el.innerHTML = `<div class="sp-vazio">${vazio}</div>`; return; }
    const max = Math.max(...linhas.map(l => l.v), 1);
    el.innerHTML = `<div class="sp-hb">${linhas.map(l => `<div><span>${esc(l.rot)}</span><s style="width:${Math.max(3, l.v / max * 100)}%;${l.cor ? 'background:' + l.cor : ''}"></s><u>${esc(l.txt == null ? l.v : l.txt)}</u></div>`).join('')}</div>`;
  }
  function kpis(el, itens) {
    el.innerHTML = itens.map(k => `<div class="sp-k"><b>${esc(k.v)}</b><span>${esc(k.r)}</span>${k.d ? `<i class="${k.dc || ''}">${esc(k.d)}</i>` : ''}</div>`).join('');
  }
  function lista(el, itens, vazio) {
    el.innerHTML = itens.length ? `<div class="sp-lista">${itens.map(i => `<div class="sp-li"><div><b>${esc(i.t)}</b><span>${esc(i.s)}</span></div>${i.acao || ''}<em>${esc(i.v)}</em></div>`).join('')}</div>` : `<div class="sp-vazio">${vazio}</div>`;
  }
  function legendas() {
    document.querySelectorAll('.sp-leg').forEach(l => {
      l.hidden = !E.porFmt;
      const usados = new Set(E.dados.discos.map(d => d[1]));
      l.innerHTML = FMT.filter(f => usados.has(f.k)).map(f => `<span><i style="background:${f.cor}"></i>${f.nome}</span>`).join('');
    });
    document.querySelectorAll('.sp-fmt-toggle').forEach(t => { t.checked = E.porFmt; });
  }
  const partesFmt = (porK, cor) => E.porFmt ? FMT.map(f => ({ v: porK[f.k] || 0, cor: f.cor })) : [{ v: Object.values(porK).reduce((a, b) => a + b, 0), cor: cor || 'var(--terracotta)' }];

  // ---------------- audições: ligação com discos ----------------
  function indiceAudicoes() {
    const porDisco = {}, porChave = {};
    E.dados.audicoes.forEach(a => {
      if (a[2] != null) porDisco[a[2]] = (porDisco[a[2]] || 0) + 1;
      const k = norm(a[3]) + '|' + norm(a[4]);
      porChave[k] = (porChave[k] || 0) + 1;
    });
    return { vezes: d => porDisco[d[0]] || porChave[norm(d[7]) + '|' + norm(d[8])] || 0 };
  }

  // ================= PRATELEIRA =================
  function renderPrateleira() {
    const D = E.dados.discos, f = faixas();
    const noPer = D.filter(d => noPeriodo(d[2]));
    const ouvidos = new Set(E.dados.audicoes.filter(a => noPeriodo(a[0]) && a[2] != null).map(a => a[2]));
    const artistas = new Set(D.map(d => norm(d[7]))).size;
    kpis($('spKpiPrat'), [
      { v: D.length, r: 'discos na prateleira' },
      { v: '+' + noPer.length, r: 'entraram ' + nomePeriodo() },
      { v: artistas, r: artistas === 1 ? 'artista' : 'artistas' },
      { v: D.length ? Math.round(ouvidos.size / D.length * 100) + '%' : '—', r: 'da prateleira ouvida ' + nomePeriodo() }
    ]);

    // crescimento: por faixa, por formato
    const porFaixa = {};
    D.forEach(d => {
      const k = chaveDe(d[2]); if (!k) return;
      const x = porFaixa[k] = porFaixa[k] || { q: {}, r: {}, semPreco: 0 };
      x.q[d[1]] = (x.q[d[1]] || 0) + 1;
      if (d[3] > 0) x.r[d[1]] = (x.r[d[1]] || 0) + d[3]; else x.semPreco++;
    });
    let acum = {};
    D.forEach(d => { if (d[2] && d[2].slice(0, 7) < f[0].k.slice(0, 7) && E.per !== 'tudo') acum[d[1]] = (acum[d[1]] || 0) + 1; });
    const itens = f.map(b => {
      const x = porFaixa[b.k] || { q: {}, r: {}, semPreco: 0 };
      let valores = E.modoCres === 'rs' ? x.r : x.q;
      if (E.modoCres === 'acum') { FMT.forEach(t => { acum[t.k] = (acum[t.k] || 0) + (x.q[t.k] || 0); }); valores = { ...acum }; }
      const total = Object.values(valores).reduce((a, b) => a + b, 0);
      return { rot: b.rot, longo: b.longo, total, partes: partesFmt(valores), legenda: E.modoCres === 'rs' ? reais(total) : total + ' discos', x };
    });
    if (E.selCres == null || E.selCres >= itens.length) E.selCres = itens.length - 1;
    barras($('spCres'), itens, {
      sel: E.selCres, fmt: E.modoCres === 'rs' ? (v => v >= 1000 ? 'R$' + (v / 1000).toFixed(1).replace('.', ',') + 'k' : 'R$' + Math.round(v)) : null,
      vazio: 'Nenhum disco entrou neste período.',
      onSel: i => { E.selCres = i; renderPrateleira(); }
    });
    const sel = itens[E.selCres], x = sel ? sel.x : null;
    if (x) {
      const n = Object.values(x.q).reduce((a, b) => a + b, 0), g = Object.values(x.r).reduce((a, b) => a + b, 0);
      const PL = { vinil: ['vinil', 'vinis'], cd: ['CD', 'CDs'], cassete: ['cassete', 'cassetes'], dvd: ['DVD/Blu-ray', 'DVDs/Blu-rays'], outro: ['outro', 'outros'] };
      const partes = FMT.filter(t => x.q[t.k]).map(t => `${x.q[t.k]} ${PL[t.k][x.q[t.k] > 1 ? 1 : 0]}`).join(', ');
      $('spCresDet').innerHTML = n
        ? `<b>${esc(sel.longo.charAt(0).toUpperCase() + sel.longo.slice(1))}: ${n} ${n === 1 ? 'disco' : 'discos'}${g ? ' · ' + reais(g) : ''}</b><span>${esc(partes)}${x.semPreco ? ` · ${x.semPreco} sem preço informado` : ''}</span>`
        : `<span>Nenhum disco entrou em ${esc(sel.longo)}.</span>`;
    }

    // décadas
    const dec = {};
    D.forEach(d => { if (d[4] >= 1900) { const k = Math.floor(d[4] / 10) * 10; dec[k] = (dec[k] || 0) + 1; } });
    hbarras($('spDecadas'), Object.keys(dec).sort().map(k => ({ rot: k + 's', v: dec[k] })), 'Os anos dos discos ainda não foram preenchidos.');
    // gêneros
    const gen = {};
    D.forEach(d => { if (d[5]) gen[d[5]] = (gen[d[5]] || 0) + 1; });
    const gs = Object.entries(gen).sort((a, b) => b[1] - a[1]);
    const tot = gs.reduce((a, b) => a + b[1], 0);
    const top = gs.slice(0, 6), outros = gs.slice(6).reduce((a, b) => a + b[1], 0);
    hbarras($('spGeneros'), [...top.map(([g, v]) => ({ rot: g, v, txt: Math.round(v / tot * 100) + '%' })), ...(outros ? [{ rot: 'Outros', v: outros, txt: Math.round(outros / tot * 100) + '%', cor: '#555' }] : [])], 'Nenhum gênero preenchido ainda.');
    // países (artistas únicos)
    let nomes = null; try { nomes = new Intl.DisplayNames(['pt-BR'], { type: 'region' }); } catch (e) {}
    const pais = {}, vistos = new Set();
    D.forEach(d => { const p = E.dados.paises[d[7]]; const k = norm(d[7]); if (p && !vistos.has(k)) { vistos.add(k); pais[p] = (pais[p] || 0) + 1; } });
    hbarras($('spPaises'), Object.entries(pais).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([p, v]) => {
      let n = p; try { n = nomes ? nomes.of(p) : p; } catch (e) {}
      return { rot: n, v, txt: v };
    }), 'Os países aparecem conforme a Hilla identifica seus artistas (é o mesmo dado da conquista Volta ao Mundo).');
    // estado das cópias
    const est = { 'M / NM': 0, 'VG+': 0, 'VG': 0, 'G / F / P': 0, 'Sem nota': 0 };
    D.forEach(d => {
      const c = (d[6] || '').toUpperCase().replace(/\s/g, '');
      if (!c) est['Sem nota']++;
      else if (c.startsWith('M') || c.startsWith('NM')) est['M / NM']++;
      else if (c.startsWith('VG+')) est['VG+']++;
      else if (c.startsWith('VG')) est['VG']++;
      else est['G / F / P']++;
    });
    hbarras($('spEstado'), Object.entries(est).filter(([, v]) => v).map(([k, v]) => ({ rot: k, v, cor: k === 'Sem nota' ? '#555' : null })), 'Sem discos ainda.');
  }

  // ================= AUDIÇÕES =================
  function renderAudicoes() {
    const A = E.dados.audicoes.filter(a => noPeriodo(a[0]));
    const horas = A.reduce((s, a) => s + a[7], 0) / 60;
    // maior sequência de dias seguidos (no período)
    const dias = [...new Set(A.map(a => a[0]))].sort();
    let maior = 0, atual = 0, ant = null;
    dias.forEach(d => {
      const t = new Date(d + 'T12:00:00').getTime();
      atual = ant && t - ant === 86400000 ? atual + 1 : 1; ant = t; maior = Math.max(maior, atual);
    });
    // horário favorito (faixas de 2h)
    const fx = {};
    A.forEach(a => { if (a[1]) { const h = Math.floor(+a[1].slice(0, 2) / 2) * 2; fx[h] = (fx[h] || 0) + 1; } });
    const melhor = Object.entries(fx).sort((a, b) => b[1] - a[1])[0];
    const fs = A.filter(a => a[5]).length;
    kpis($('spKpiAud'), [
      { v: horas >= 10 ? Math.round(horas) + ' h' : horas.toFixed(1).replace('.', ',') + ' h', r: 'de disco ' + nomePeriodo() },
      { v: maior + (maior === 1 ? ' dia' : ' dias'), r: 'maior sequência ouvindo' },
      { v: melhor ? `${melhor[0]}h–${+melhor[0] + 2}h` : '—', r: 'seu horário de ouvir' },
      { v: fs, r: 'first spins ' + nomePeriodo() }
    ]);

    // barras por faixa
    const porFaixa = {};
    A.forEach(a => {
      const k = chaveDe(a[0]); const x = porFaixa[k] = porFaixa[k] || { h: [0, 0], n: [0, 0], fs: [0, 0] };
      const i = a[6] ? 1 : 0;
      x.h[i] += a[7] / 60; x.n[i] += 1; if (a[5]) x.fs[i] += 1;
    });
    barras($('spAud'), faixas().map(b => {
      const x = porFaixa[b.k] || { h: [0, 0], n: [0, 0], fs: [0, 0] }; const v = x[E.modoAud];
      const total = v[0] + v[1];
      return { rot: b.rot, longo: b.longo, total, legenda: E.modoAud === 'h' ? Math.round(total) + ' horas' : total,
               partes: [{ v: v[0], cor: 'var(--terracotta)' }, { v: v[1], cor: 'var(--terracotta)', listra: true }] };
    }), { fmt: E.modoAud === 'h' ? (v => (v >= 10 ? Math.round(v) : v.toFixed(1).replace('.', ',')) + 'h') : null, vazio: 'Nenhuma audição neste período.' });

    // mapa de calor: 53 semanas terminando no fim do período
    const hoje = E.dados.hoje;
    const fim = E.per.startsWith('a') && E.per.slice(1) < hoje.slice(0, 4) ? E.per.slice(1) + '-12-31' : hoje;
    const porDia = {};
    E.dados.audicoes.forEach(a => { porDia[a[0]] = (porDia[a[0]] || 0) + 1; });
    const fimD = new Date(fim + 'T12:00:00');
    const ini = new Date(fimD); ini.setDate(ini.getDate() - 52 * 7 - ((fimD.getDay() + 6) % 7));
    let celulas = '', meses = '', semana = 0, ultMes = -1;
    for (let d = new Date(ini); d <= fimD; d.setDate(d.getDate() + 1)) {
      const iso = d.toISOString().slice(0, 10), n = porDia[iso] || 0;
      const nivel = n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : 3;
      if ((d.getDay() + 6) % 7 === 0) { if (d.getMonth() !== ultMes && semana > 1) { meses += `<span style="grid-column:${semana + 1}">${MES[d.getMonth()]}</span>`; ultMes = d.getMonth(); } semana++; }
      celulas += `<i class="n${nivel}" title="${d.getDate()} ${MES[d.getMonth()]}: ${n} ${n === 1 ? 'audição' : 'audições'}"></i>`;
    }
    $('spHeat').innerHTML = `<div class="sp-heat-rolar"><div class="sp-heat-meses" style="grid-template-columns:repeat(${semana},13px)">${meses}</div><div class="sp-heat" role="img" aria-label="Audições por dia no último ano">${celulas}</div></div>
      <div class="sp-heat-leg">menos <i class="n0"></i><i class="n1"></i><i class="n2"></i><i class="n3"></i> mais</div>`;
    const rol = $('spHeat').querySelector('.sp-heat-rolar'); rol.scrollLeft = rol.scrollWidth;

    // relógio: dia da semana x faixa de 3h
    const DS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], HS = [0, 3, 6, 9, 12, 15, 18, 21];
    const grade = Array.from({ length: 7 }, () => Array(8).fill(0));
    let comHora = 0;
    A.forEach(a => { if (!a[1]) return; comHora++; const dw = (new Date(a[0] + 'T12:00:00').getDay() + 6) % 7; grade[dw][Math.floor(+a[1].slice(0, 2) / 3)]++; });
    const mx = Math.max(1, ...grade.flat());
    $('spRelogio').innerHTML = comHora ? `<div class="sp-clock"><span></span>${HS.map(h => `<span>${h}h</span>`).join('')}${grade.map((l, r) => `<span>${DS[r]}</span>${l.map((v, c) => `<i style="background:rgba(201,162,76,${v ? (0.2 + v / mx * 0.8).toFixed(2) : 0.06})" title="${DS[r]}, ${HS[c]}h–${HS[c] + 3}h: ${v}"></i>`).join('')}`).join('')}</div>
      <p class="sp-nota">${comHora} de ${A.length} audições têm hora registrada.</p>` : `<div class="sp-vazio">Registre a hora nas audições para ver quando você mais ouve.</div>`;

    // esperando a agulha (nunca ouvidos, de todos os tempos)
    const idx = indiceAudicoes();
    const nunca = E.dados.discos.filter(d => !idx.vezes(d)).sort((a, b) => (a[2] || '9').localeCompare(b[2] || '9'));
    const diasDesde = dt => dt ? Math.max(0, Math.round((new Date(hoje) - new Date(dt)) / 86400000)) : null;
    lista($('spAgulha'), nunca.slice(0, 5).map(d => {
      const n = diasDesde(d[2]);
      return { t: d[8], s: `${d[7]}${n != null ? ' · há ' + n + (n === 1 ? ' dia' : ' dias') + ' na prateleira' : ''}`, v: '',
               acao: `<button type="button" class="sp-ouvi" data-id="${d[0]}">Ouvi agora</button>` };
    }), E.dados.discos.length ? 'Você já ouviu todos os seus discos.' : 'Sem discos ainda.');
    if (nunca.length > 5) $('spAgulha').insertAdjacentHTML('beforeend', `<p class="sp-nota">E mais ${nunca.length - 5} esperando.</p>`);
    $('spAgulha').querySelectorAll('.sp-ouvi').forEach(b => b.addEventListener('click', () => ouviAgora(b)));

    // mais ouvidos no período
    const cont = {};
    A.forEach(a => { const k = norm(a[3]) + '|' + norm(a[4]); const x = cont[k] = cont[k] || { t: a[4], s: a[3], n: 0 }; x.n++; });
    lista($('spMaisOuvidos'), Object.values(cont).sort((a, b) => b.n - a.n).slice(0, 5).map(x => ({ t: x.t, s: x.s, v: x.n + '×' })), 'Nenhuma audição neste período.');
  }

  async function ouviAgora(btn) {
    const id = btn.dataset.id; btn.disabled = true; btn.textContent = 'Registrando…';
    const agora = new Date(), p2 = n => String(n).padStart(2, '0');
    const fd = new FormData();
    fd.append('colecao_id', id);
    fd.append('data', `${agora.getFullYear()}-${p2(agora.getMonth() + 1)}-${p2(agora.getDate())}`);
    fd.append('hora', `${p2(agora.getHours())}:${p2(agora.getMinutes())}`);
    fd.append('nota', ''); fd.append('first_spin', '1');   // primeira vez que toca: é um first spin
    try {
      const r = await apiFetch(`${API_URL}/audicoes`, { method: 'POST', body: fd });
      if (!r.ok) throw new Error();
      if (window.HillaNav) HillaNav.aviso('Audição registrada');
      carregar(true);
    } catch (e) { btn.disabled = false; btn.textContent = 'Ouvi agora'; if (window.HillaNav) HillaNav.aviso('Não deu para registrar agora.'); }
  }

  // ================= DINHEIRO =================
  function renderDinheiro() {
    const D = E.dados.discos, comPreco = D.filter(d => d[3] > 0);
    const valor = comPreco.reduce((s, d) => s + d[3], 0);
    const gastoPer = comPreco.filter(d => noPeriodo(d[2])).reduce((s, d) => s + d[3], 0);
    const idx = indiceAudicoes();
    const pagos = comPreco.map(d => ({ d, n: idx.vezes(d) })).filter(x => x.n > 0);
    const custoMedio = pagos.length ? pagos.reduce((s, x) => s + x.d[3] / x.n, 0) / pagos.length : 0;
    kpis($('spKpiDin'), [
      { v: valor ? reais(valor) : '—', r: 'valor da prateleira' },
      { v: reais(gastoPer), r: 'gastos ' + nomePeriodo() },
      { v: comPreco.length ? reais(valor / comPreco.length) : '—', r: 'preço médio por disco' },
      { v: pagos.length ? reaisC(custoMedio) : '—', r: 'custo médio por audição' }
    ]);

    const porFaixa = {}, qtd = {};
    comPreco.forEach(d => { const k = chaveDe(d[2]); const x = porFaixa[k] = porFaixa[k] || {}; x[d[1]] = (x[d[1]] || 0) + d[3]; });
    D.forEach(d => { const k = chaveDe(d[2]); qtd[k] = (qtd[k] || 0) + 1; });
    const f = faixas();
    const itens = f.map(b => { const x = porFaixa[b.k] || {}; const t = Object.values(x).reduce((a, c) => a + c, 0); return { rot: b.rot, longo: b.longo, total: t, legenda: reais(t), partes: partesFmt(x) }; });
    if (E.selGasto == null || E.selGasto >= itens.length) E.selGasto = itens.length - 1;
    barras($('spGasto'), itens, { sel: E.selGasto, fmt: v => v >= 1000 ? 'R$' + (v / 1000).toFixed(1).replace('.', ',') + 'k' : 'R$' + Math.round(v),
      vazio: 'Nenhum disco com preço neste período.', onSel: i => { E.selGasto = i; renderDinheiro(); } });
    // contraste: mês de maior gasto x mês de mais discos
    const maisGasto = itens.reduce((m, it, i) => it.total > (m ? itens[m.i].total : 0) ? { i } : m, null);
    const maisDiscos = f.reduce((m, b, i) => (qtd[b.k] || 0) > (m ? qtd[f[m.i].k] || 0 : 0) ? { i } : m, null);
    const sem = D.filter(d => !(d[3] > 0) && noPeriodo(d[2])).length;
    const sg = itens[E.selGasto];
    let nota = sg ? `${sg.longo.charAt(0).toUpperCase() + sg.longo.slice(1)}: ${reais(sg.total)} em ${qtd[f[E.selGasto].k] || 0} discos. ` : '';
    if (maisGasto && maisDiscos && maisGasto.i !== maisDiscos.i) nota += `Maior gasto em ${itens[maisGasto.i].longo} (${reais(itens[maisGasto.i].total)}); mais discos em ${f[maisDiscos.i].longo} (${qtd[f[maisDiscos.i].k]}). `;
    if (sem) nota += `${sem} ${sem === 1 ? 'disco' : 'discos'} sem preço ${sem === 1 ? 'não entra' : 'não entram'} na conta.`;
    $('spGastoNota').textContent = nota;

    lista($('spSePagaram'), pagos.sort((a, b) => a.d[3] / a.n - b.d[3] / b.n).slice(0, 5).map(x => ({
      t: x.d[8], s: `${reais(x.d[3])} ÷ ${x.n} ${x.n === 1 ? 'audição' : 'audições'}`, v: reaisC(x.d[3] / x.n)
    })), 'Quando um disco com preço tiver audições, ele aparece aqui.');

    const pf = {};
    comPreco.forEach(d => { const x = pf[d[1]] = pf[d[1]] || [0, 0]; x[0] += d[3]; x[1]++; });
    hbarras($('spPrecoFmt'), FMT.filter(t => pf[t.k]).map(t => ({ rot: t.nome, v: pf[t.k][0] / pf[t.k][1], txt: reais(pf[t.k][0] / pf[t.k][1]), cor: t.cor })), 'Coloque o preço nos seus discos para ver esta comparação.');
  }

  // ================= WISHLIST =================
  function renderWishlist() {
    const W = E.dados.wishlist, ativos = W.filter(w => !w[2]);
    const comPreco = E.dados.discos.filter(d => d[3] > 0);
    const vin = comPreco.filter(d => d[1] === 'vinil');
    const base = vin.length >= 3 ? vin : comPreco;
    const media = base.length ? base.reduce((s, d) => s + d[3], 0) / base.length : 0;
    const s = ativos.filter(w => w[0] === 'S').length;
    $('spFalta').innerHTML = media ? `<div class="sp-kpis sp-kpis-2">
        <div class="sp-k"><b>~${reais(media * s)}</b><span>só a prioridade S (${s} ${s === 1 ? 'disco' : 'discos'})</span></div>
        <div class="sp-k"><b>~${reais(media * ativos.length)}</b><span>a wishlist toda (${ativos.length})</span></div></div>
        <p class="sp-nota">Estimado pelo seu preço médio${base === vin ? ' de vinil' : ''} (${reais(media)}).</p>`
      : `<div class="sp-vazio">Coloque o preço nos seus discos e a Hilla estima quanto falta gastar na wishlist.</div>`;

    const ent = {}, sai = {};
    W.forEach(w => { if (w[1]) ent[chaveDe(w[1])] = (ent[chaveDe(w[1])] || 0) + 1; if (w[3]) sai[chaveDe(w[3])] = (sai[chaveDe(w[3])] || 0) + 1; });
    barras($('spWishFluxo'), faixas().map(b => {
      const e = ent[b.k] || 0, c = sai[b.k] || 0;
      return { rot: b.rot, longo: b.longo, total: e + c, legenda: `${e} entraram, ${c} comprados`, partes: [{ v: e, cor: 'var(--terracotta)' }, { v: c, cor: 'var(--colecao-color)' }] };
    }), { fmt: null, vazio: 'Nada entrou na wishlist neste período.' });
    $('spWishNota').innerHTML = `<span class="sp-leg-in"><i style="background:var(--terracotta)"></i>entraram</span><span class="sp-leg-in"><i style="background:var(--colecao-color)"></i>comprados</span> Os comprados contam a partir de 28 de outubro de 2026, quando a Hilla começou a guardar a data do "Comprei".`;
  }

  // ---------------- controle ----------------
  function renderTudo() {
    if (!E.dados) return;
    $('spPeriodo').innerHTML = periodos().map(p => `<button type="button" class="${p.k === E.per ? 'on' : ''}" data-p="${p.k}" aria-pressed="${p.k === E.per}">${p.nome}</button>`).join('');
    $('spPeriodo').querySelectorAll('button').forEach(b => b.addEventListener('click', () => { E.per = b.dataset.p; E.selCres = null; E.selGasto = null; renderTudo(); }));
    legendas();
    const r = { prat: renderPrateleira, aud: renderAudicoes, din: renderDinheiro, wish: renderWishlist };
    Object.values(r).forEach(fn => { try { fn(); } catch (e) { console.error('[estatísticas]', e); } });
  }
  function mostrarAba(aba) {
    E.aba = ['prat', 'aud', 'din', 'wish'].includes(aba) ? aba : 'prat'; gravarPref('aba', E.aba);
    document.querySelectorAll('.sp-aba').forEach(b => { const on = b.dataset.aba === E.aba; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    document.querySelectorAll('.sp-pane').forEach(p => { p.hidden = p.id !== 'pane-' + E.aba; p.classList.toggle('on', !p.hidden); });
  }
  // a barra de abas gruda logo abaixo do menu de cima (que também é fixo)
  function ajustarTopo() {
    const nav = document.querySelector('header.app-nav');
    const h = nav && getComputedStyle(nav).position === 'sticky' ? nav.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty('--sp-top', Math.round(h) + 'px');
  }
  function ligar() {
    ajustarTopo(); window.addEventListener('resize', ajustarTopo);
    document.querySelectorAll('.sp-aba').forEach(b => b.addEventListener('click', () => mostrarAba(b.dataset.aba)));
    const abas = [...document.querySelectorAll('.sp-aba')];
    abas.forEach((b, i) => b.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = abas[(i + (e.key === 'ArrowRight' ? 1 : abas.length - 1)) % abas.length]; n.focus(); mostrarAba(n.dataset.aba);
    }));
    const seg = (id, campo) => $(id).querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      E[campo] = b.dataset.m; $(id).querySelectorAll('button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); renderTudo();
    }));
    seg('spModoCres', 'modoCres'); seg('spModoAud', 'modoAud');
    document.querySelectorAll('.sp-fmt-toggle').forEach(t => t.addEventListener('change', () => { E.porFmt = t.checked; gravarPref('fmt', E.porFmt ? '1' : '0'); renderTudo(); }));
    mostrarAba(E.aba);
  }
  function esqueleto() {
    ['spKpiPrat', 'spKpiAud', 'spKpiDin'].forEach(id => { const el = $(id); if (el && !el.children.length) el.innerHTML = Array(4).fill('<div class="sp-k sp-sk"><b></b><span></span></div>').join(''); });
    ['spCres', 'spAud', 'spGasto'].forEach(id => { const el = $(id); if (el && !el.children.length) el.innerHTML = '<div class="sp-sk-barras"></div>'; });
  }
  let ligado = false;
  async function carregar(silencioso) {
    if (!$('spCres') || E.carregando) return;
    if (!ligado) { ligar(); ligado = true; }
    if (!silencioso) esqueleto();
    E.carregando = true;
    try {
      const r = await apiFetch(`${API_URL}/estatisticas/painel`);
      if (r.status === 401) { if (typeof limparSessao === 'function') limparSessao(); location.reload(); return; }
      if (!r.ok) throw new Error(r.status);
      const d = await r.json();
      if (!d || !Array.isArray(d.discos)) throw new Error('formato');
      E.dados = d;
      renderTudo();
    } catch (e) {
      if (typeof mostrarErroCarga === 'function') mostrarErroCarga($('spKpiPrat'), () => carregar());
    } finally { E.carregando = false; }
  }
  window.HillaStats = { carregar };
})();
