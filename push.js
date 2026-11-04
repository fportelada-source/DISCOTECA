// Notificações push no celular (Web Push). Usa o service worker (sw.js) e o
// servidor (/push/...). Precisa de API_URL e apiFetch da página.
(function () {
  const suportado = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  const ehIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const instalado = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

  function chaveBytes(b64) {
    const pad = '='.repeat((4 - b64.length % 4) % 4);
    const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
  }
  async function registro() {
    const reg = await navigator.serviceWorker.getRegistration();
    return reg || navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' });
  }
  function nomeAparelho() {
    const ua = navigator.userAgent;
    const so = /Android/.test(ua) ? 'Android' : ehIOS() ? 'iPhone' : /Mac/.test(ua) ? 'Mac' : /Windows/.test(ua) ? 'Windows' : 'Outro';
    const nav = /Edg\//.test(ua) ? 'Edge' : /Firefox/.test(ua) ? 'Firefox' : /Chrome/.test(ua) ? 'Chrome' : /Safari/.test(ua) ? 'Safari' : '';
    return (so + ' ' + nav).trim();
  }

  // 'ativo' | 'inativo' | 'bloqueado' | 'instalar' (iPhone fora da tela de início) | 'sem_suporte' | 'servidor_off'
  async function estado() {
    if (ehIOS() && !instalado()) return 'instalar';
    if (!suportado()) return 'sem_suporte';
    if (Notification.permission === 'denied') return 'bloqueado';
    try {
      const reg = await registro();
      const sub = reg && await reg.pushManager.getSubscription();
      return sub && Notification.permission === 'granted' ? 'ativo' : 'inativo';
    } catch (e) { return 'inativo'; }
  }

  async function ativar() {
    if (!suportado()) throw new Error('Este navegador não aceita notificações.');
    const r = await apiFetch(`${API_URL}/push/chave`);
    const k = await r.json();
    if (!k.chave) throw new Error('As notificações ainda não foram ligadas no servidor.');
    const perm = await Notification.requestPermission();   // só aqui o celular pergunta
    if (perm !== 'granted') throw new Error(perm === 'denied' ? 'bloqueado' : 'Permissão não concedida.');
    const reg = await registro();
    await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: chaveBytes(k.chave) });
    const s = await apiFetch(`${API_URL}/push/inscrever`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inscricao: sub.toJSON(), aparelho: nomeAparelho() })
    });
    if (!s.ok) throw new Error('Não deu para salvar a inscrição. Tente de novo.');
    return true;
  }

  async function desativar() {
    try {
      const reg = await registro();
      const sub = reg && await reg.pushManager.getSubscription();
      if (sub) {
        await apiFetch(`${API_URL}/push/cancelar`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint }) }).catch(() => {});
        await sub.unsubscribe();
      }
    } catch (e) {}
  }

  // Convite: uma vez só, depois de registrar uma audição. Só pede a permissão
  // do celular se a pessoa tocar em "Ativar".
  async function convidar() {
    try {
      const st = await estado();
      if (st !== 'inativo' || Notification.permission !== 'default') return;
      const pr = await (await apiFetch(`${API_URL}/push/preferencias`)).json();
      if (!pr || pr.convite_visto || !pr.ativo_no_servidor) return;
    } catch (e) { return; }
    const marcar = () => apiFetch(`${API_URL}/push/preferencias`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ convite_visto: true }) }).catch(() => {});
    const el = document.createElement('div');
    el.className = 'push-convite'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-labelledby', 'pushConvTit');
    el.innerHTML = `<b id="pushConvTit">Quer saber quando sair disco novo?</b>
      <p>A Hilla pode avisar no celular sobre lançamentos dos seus artistas favoritos, conquistas e quando o seu mês estiver pronto.</p>
      <div class="push-convite-l"><button type="button" class="push-nao">Agora não</button><button type="button" class="push-sim">Ativar</button></div>
      <p class="push-convite-msg" aria-live="polite"></p>`;
    document.body.appendChild(el);
    const fechar = () => el.remove();
    el.querySelector('.push-nao').onclick = () => { marcar(); fechar(); };
    el.querySelector('.push-sim').onclick = async () => {
      const msg = el.querySelector('.push-convite-msg');
      el.querySelector('.push-sim').disabled = true;
      try { await ativar(); msg.textContent = 'Pronto! Você pode mudar o que recebe em Configurações.'; setTimeout(fechar, 2500); }
      catch (e) { msg.textContent = e.message === 'bloqueado' ? 'As notificações estão bloqueadas nas configurações do navegador.' : e.message; marcar(); setTimeout(fechar, 4000); }
    };
  }

  window.HillaPush = { estado, ativar, desativar, convidar, ehIOS, instalado };
})();
