var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/js/jquery-3.4.1.min.js',
    '/js/main.js',
    '/image/jam.png',
    '/fallback.json'

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

    var request = event.request
    var url = new URL(request.url)


    // pisah request API dan Internal
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(request).then(function (response) {
                return response || fetch(request)

            })

        )

    } else {
        event.respondWith(
            caches.open('products-cache').then(function (cache) {
                return fetch(request).then(function (liveResponse) {
                    cache.put(request, liveResponse.clone())
                    return liveResponse
                }).catch(function () {
                    return caches.match(request).then(function (response) {
                        if (response) return response
                        return caches.match('/fallback.json')
                    })
                })
            })
        )
    }
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
