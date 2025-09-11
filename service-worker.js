const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://www.transparenttextures.com/patterns/arabesque.png',
  'https://cdn.pixabay.com/video/2022/09/23/131953-755734533_large.mp4',
  'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg',
  'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg',
  'https://archive.org/download/AzanMakkah/Azan%20Makkah.mp3',
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
