const CACHE_NAME = 'viking-cache-v13';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.jpg',
  './icon-512.jpg',
  './background.webp'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
