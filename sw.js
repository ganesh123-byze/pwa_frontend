const CACHE_NAME = "static-v1";

self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(["./", "./index.html", "./styles.css"]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cache) => cache !== CACHE_NAME)
                    .map((cache) => caches.delete(cache))
            );
        })
    );
});
