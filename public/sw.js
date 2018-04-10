const cacheName = "v1::2048";
const urlRegex = /^https?\:\/\//;

self.addEventListener("install", event => {
  console.log("SW install");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  console.log("SW activate");
});

self.addEventListener("fetch", event => {
  if (!urlRegex.test(event.request.url)) {
    return;
  }

  event.respondWith(cacheFirst(event.request));
});

const cacheFirst = async request => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request.clone());
  if (cached) {
    console.log("SW from cache", request.url);
    return cached;
  }
  const response = await fetch(request.clone());
  await cache.put(request, response.clone());
  console.log("SW from net", request.url);
  return response;
};
