const CACHE_NAME = 'app-cache-v8';
const urlsToCache = [
  '/', // Harus selalu ada untuk halaman utama
  '/static/index.html',
  '/static/manifest.json',
  '/static/service-worker.js',
  '/static/asset/icon-192x192.png',
  '/static/asset/icon-512x512.png',
  // Hanya masukkan file yang ada di server Anda
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
