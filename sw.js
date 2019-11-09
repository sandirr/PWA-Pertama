var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/js/jquery-3.4.1.min.js',
    '/js/main.js',
    '/image/jam.png'

];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('in install service worker Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName != CACHE_NAME
                }).map(function (cacheName) {
                    return caches.delete(cacheName)
                })
            );
        })
    );
});