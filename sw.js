// ---------------------------------------------------------------------
// ⚙️ SELF-UPDATING SERVICE WORKER (NETWORK-FIRST WITH OFFLINE FALLBACK)
// ---------------------------------------------------------------------
const CACHE_NAME = 'v_forge_cache_v1_1_3'; // Increment this number when you push updates to force a cache wipe!
const ASSETS = [
  './',
  './index.html',
  './background.webp',
  './manifest.json'
];

// 1. Install Event - Force immediate activation
self.addEventListener('install', event => {
  self.skipWaiting(); // Instantly terminates old service worker
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activate Event - Purge old cached data and claim immediate control
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Safely purges outdated assets
          }
        })
      );
    }).then(() => self.clients.claim()) // Immediately take control of all active screens
  );
});

// 3. Fetch Event - Network-First Strategy (Pulls latest from GitHub, falls back to cache only when offline)
self.addEventListener('fetch', event => {
  // Safely skip caching for non-http/https protocols (like chrome-extension schemes)
  if (!event.request.url.startsWith('http')) {
    return; 
  }
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // If network is active, clone the fresh response and update cache dynamically
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If offline (network fails), pull instantly from local cache fallback
        return caches.match(event.request);
      })
  );
});
