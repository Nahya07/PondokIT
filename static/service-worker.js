const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/static/index.html',
  '/static/assets/icons/icon-192x192.png',
  '/static/assets/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika respons ada di cache, gunakan itu.
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan.
        return fetch(event.request);
      })
  );
});
