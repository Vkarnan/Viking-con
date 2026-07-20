// START OF FILE sw.js
// ---------------------------------------------------------------------
// ⚙️ SELF-UPDATING SERVICE WORKER (NETWORK-FIRST WITH OFFLINE FALLBACK)
// BREADCRUMB: REPLACES sw.js IN YOUR GITHUB ROOT DIRECTORY
// CONTENT: DUPLICATE FETCH BLOCKS REMOVED & OFFLINE FONT CACHING INTEGRATED
// ---------------------------------------------------------------------
const CACHE_NAME = 'v_forge_cache_v3_9_9'; // Incremented to align with core performance upgrades
const ASSETS = [
  './',
  './index.html',
  './background.webp',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@600;900&family=Space+Grotesk:wght@400;700&display=swap' // Caches design typography to prevent plain system font resets offline
];

// 1. Install Event - Force immediate activation and cache base assets
self.addEventListener('install', event => {
  self.skipWaiting(); // Instantly terminates old service worker in the background
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

// 3. Fetch Event - Network-First Strategy (Pulls fresh from GitHub, falls back to cache only when offline)
self.addEventListener('fetch', event => {
  // Safely skip caching for non-http/https protocols (like local extensions)
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
        // If offline, pull instantly from local cache fallback
        return caches.match(event.request);
      })
  );
});
// END OF FILE sw.js// START OF FILE sw.js
// ---------------------------------------------------------------------
// ⚙️ SELF-UPDATING SERVICE WORKER (NETWORK-FIRST WITH OFFLINE FALLBACK)
// BREADCRUMB: REPLACES sw.js IN YOUR GITHUB ROOT DIRECTORY
// CONTENT: DUPLICATE FETCH BLOCKS REMOVED & OFFLINE FONT CACHING INTEGRATED
// ---------------------------------------------------------------------
const CACHE_NAME = 'v_forge_cache_v3_9_9'; // Incremented to align with core performance upgrades
const ASSETS = [
  './',
  './index.html',
  './background.webp',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@600;900&family=Space+Grotesk:wght@400;700&display=swap' // Caches design typography to prevent plain system font resets offline
];

// 1. Install Event - Force immediate activation and cache base assets
self.addEventListener('install', event => {
  self.skipWaiting(); // Instantly terminates old service worker in the background
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

// 3. Fetch Event - Network-First Strategy (Pulls fresh from GitHub, falls back to cache only when offline)
self.addEventListener('fetch', event => {
  // Safely skip caching for non-http/https protocols (like local extensions)
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
        // If offline, pull instantly from local cache fallback
        return caches.match(event.request);
      })
  );
});
// END OF FILE sw.js
