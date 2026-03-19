const CACHE_NAME = 'toxic-trait-test-v1';
const ASSETS = [
  '/toxic-trait-test/',
  '/toxic-trait-test/index.html',
  '/toxic-trait-test/js/i18n.js',
  '/toxic-trait-test/js/locales/ko.json',
  '/toxic-trait-test/js/locales/en.json',
  '/toxic-trait-test/js/locales/ja.json',
  '/toxic-trait-test/js/locales/zh.json',
  '/toxic-trait-test/js/locales/hi.json',
  '/toxic-trait-test/js/locales/ru.json',
  '/toxic-trait-test/js/locales/es.json',
  '/toxic-trait-test/js/locales/pt.json',
  '/toxic-trait-test/js/locales/id.json',
  '/toxic-trait-test/js/locales/tr.json',
  '/toxic-trait-test/js/locales/de.json',
  '/toxic-trait-test/js/locales/fr.json',
  '/toxic-trait-test/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => cached);
    })
  );
});
