const cache_name = "currency-converter-cache";

const resources = [
  '/',
  '/style.css',
  'service-reg.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cache_name);
    cache.addAll(resources);
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== cache_name) {
            return caches.delete(cacheName);
          }
        })
      ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(cache_name);

    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request);

          // Save the resource in the cache and return it.
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          console.log(e.message);
        }
    }
  })());
});
