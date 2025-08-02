self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/images/shoe.jpg'
      ]);
    })
  );
  console.log('✅ Service Worker Installed');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
// Add offline.html to cache during install
cache.addAll([
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/offline.html', // <- Add this
  '/images/shoe.jpg'
]);

// Add this to fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('/offline.html'));
    })
  );
});

