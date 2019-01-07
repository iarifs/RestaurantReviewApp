const fileName = "worker-v-1";

const cacheFiles = [
    './',
    "./css/styles.css",
    "./css/secondStyle.css",
    "./img/1.jpg",
    "./img/2.jpg",
    "./img/3.jpg",
    "./img/4.jpg",
    "./img/5.jpg",
    "./img/6.jpg",
    "./img/7.jpg",
    "./img/8.jpg",
    "./img/9.jpg",
    "./img/10.jpg",
    "./img/icon.png",
    "./data/restaurants.json",
    "./js/dbhelper.js",
    "./js/main.js",
    "./js/restaurant_info.js",
    "./index.html",
    "./manifest.json",
    "./restaurant.html",
]

//Pull data from local machine first

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            return response || fetch(e.request);
        })
    )
})

//Installing service worker 
self.addEventListener('install', event => {

    event.waitUntil(
        caches.open(fileName)
        .then(cache => {
            return cache.addAll(cacheFiles);
        }).catch((err)=>console.log(err))
    )
})

//also activate service worker 
self.addEventListener('activate', event => {

    event.waitUntil(
        caches.keys().then((cacheNames) => {

            return Promise.all(
                cacheNames.filter(cacheName => {
                    
                    return cacheName.startsWith('worker') && cacheName !== fileName;
                }).map(newCache => {
                    return caches.delete(newCache);
                })
            )
        })
    )

})
