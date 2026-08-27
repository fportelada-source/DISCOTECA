// Service Worker da Discoteca — Fase 1 do PWA (app instalável).
//
// O que isso faz: guarda uma cópia do "esqueleto" do site (páginas,
// CSS, ícones) no dispositivo, pra abrir mais rápido e não ficar em
// branco numa queda de internet rápida.
//
// O que isso NUNCA faz: cachear resposta da API (coleção, wishlist,
// preço, login). Esses dados são dinâmicos, dependem de quem está
// logado, e sempre precisam vir frescos do servidor. Cachear isso por
// engano seria mostrar dado velho ou, pior, de outra pessoa.
//
// BUG REAL JÁ ACONTECIDO E CORRIGIDO AQUI: a versão anterior deste
// arquivo tratava TUDO (incluindo as páginas .html) como "cache
// primeiro, rede depois" — isso significa que, uma vez que uma página
// entrava no cache, ela NUNCA MAIS era atualizada sozinha, mesmo que
// o arquivo no servidor mudasse (e mesmo com Ctrl+Shift+R, porque
// isso ignora o cache do NAVEGADOR, mas não o cache do SERVICE
// WORKER, que é outra camada). Página HTML muda com frequência
// durante desenvolvimento ativo — precisa ser "rede primeiro, cache
// só se a rede falhar de verdade" (offline). Só ícone/manifest, que
// quase nunca mudam, continuam cache-primeiro.
//
// CACHE_NAME tem número de versão — se algum dia mudar o que entra
// no "esqueleto" (nova página, etc.), sobe esse número, igual já
// fazemos com style.css?v=N.
const CACHE_NAME = 'discoteca-shell-v2';

const PAGINAS_HTML = [
  './index.html',
  './wishlist.html',
  './colecao.html',
  './estatisticas.html',
  './importar.html',
  './perfil.html',
  './perfil-publico.html'
];

const ARQUIVOS_ESTATICOS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([...PAGINAS_HTML, ...ARQUIVOS_ESTATICOS]))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evento) => {
  // Limpa cache de versões antigas do próprio service worker — é
  // isso que resolve o problema de página velha travada: subir o
  // CACHE_NAME já invalida tudo que tinha sido guardado antes.
  evento.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(
        nomes
          .filter((nome) => nome.startsWith('discoteca-shell-') && nome !== CACHE_NAME)
          .map((nome) => caches.delete(nome))
      )
    )
  );
  self.clients.claim();
});

function ehPaginaHtml(request) {
  // "navigate" cobre digitar a URL / clicar em link / recarregar.
  // Também cobre qualquer .html explícito, e o CSS (que já tem seu
  // próprio cache-busting via ?v=N, então tratar como rede-primeiro
  // aqui também não tem custo real — só reforça que não fica preso).
  if (request.mode === 'navigate') return true;
  const url = new URL(request.url);
  return url.pathname.endsWith('.html') || url.pathname.endsWith('.css');
}

self.addEventListener('fetch', (evento) => {
  const url = new URL(evento.request.url);

  // Regra mais importante deste arquivo: qualquer coisa que não seja
  // do MESMO domínio do site (ou seja, qualquer chamada pra API no
  // PythonAnywhere) passa direto pro servidor, sem cache nenhum aqui.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Só intercepta GET — POST/PUT/DELETE (login, salvar, editar, etc.)
  // sempre vão direto pro servidor, nunca fazem sentido em cache.
  if (evento.request.method !== 'GET') {
    return;
  }

  if (ehPaginaHtml(evento.request)) {
    // REDE PRIMEIRO: tenta buscar a versão atual; só cai pro cache
    // se a rede genuinamente falhar (offline de verdade).
    evento.respondWith(
      fetch(evento.request)
        .then((respostaRede) => {
          if (respostaRede && respostaRede.status === 200) {
            const copia = respostaRede.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(evento.request, copia));
          }
          return respostaRede;
        })
        .catch(() => caches.match(evento.request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Ícone, manifest — muda raríssimas vezes, cache primeiro é seguro
  // e deixa mais rápido.
  evento.respondWith(
    caches.match(evento.request).then((respostaCache) => {
      if (respostaCache) return respostaCache;
      return fetch(evento.request).then((respostaRede) => {
        if (respostaRede && respostaRede.status === 200) {
          const copia = respostaRede.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(evento.request, copia));
        }
        return respostaRede;
      });
    })
  );
});
