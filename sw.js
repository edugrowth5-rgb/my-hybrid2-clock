const CACHE_NAME = 'pink-blue-clock-v5';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// इंस्टॉल करते समय नया डेटा स्टोर करें
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assets))
  );
});

// एक्टिवेट होते ही पुराना कैश डिलीट करें (Old versions cleanup)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    }).then(() => self.clients.claim())
  );
});

// नेटवर्क से फाइलें लाएं या कैश से
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
