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
// CACHE_NAME tem número de versão — se algum dia mudar o que entra
// no "esqueleto" (nova página, etc.), sobe esse número, igual já
// fazemos com style.css?v=N.
const CACHE_NAME = 'discoteca-shell-v1';

const ARQUIVOS_DO_ESQUELETO = [
  './index.html',
  './wishlist.html',
  './colecao.html',
  './estatisticas.html',
  './importar.html',
  './perfil.html',
  './perfil-publico.html',
  './style.css?v=8',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS_DO_ESQUELETO))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evento) => {
  // Limpa cache de versões antigas do próprio service worker
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

  // Arquivo do próprio site: tenta cache primeiro (abre rápido),
  // busca na rede se não tiver ou se for algo novo.
  evento.respondWith(
    caches.match(evento.request).then((respostaCache) => {
      if (respostaCache) return respostaCache;
      return fetch(evento.request).then((respostaRede) => {
        // Guarda uma cópia pra próxima vez, só de resposta válida
        if (respostaRede && respostaRede.status === 200) {
          const copia = respostaRede.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(evento.request, copia));
        }
        return respostaRede;
      }).catch(() => {
        // Sem rede e sem cache pra essa página específica — deixa o
        // navegador mostrar seu erro padrão, não tenta inventar nada.
        return caches.match('./index.html');
      });
    })
  );
});
