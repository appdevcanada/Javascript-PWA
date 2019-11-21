importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
workbox.precaching.precacheAndRoute([
  {
    "url": "style.css",
    "revision": "628320e3f89c25f36472cda3e970e57d"
  },
  {
    "url": "main.js",
    "revision": "8952a6ec2786e6e8d62a7934bc7f1c1f"
  },
  {
    "url": "offline.html",
    "revision": "71fd8b4fc1caa6afbe21881165fe922e"
  },
  {
    "url": "sw.js",
    "revision": "e6d8cee68556db8f2c655cad6bd4717d"
  },
  {
    "url": "manifest.json",
    "revision": "4c41dc417a08a7bb6eb2f7f06788f43c"
  },
  {
    "url": "images/offline.png",
    "revision": "71dceaabcd85c771e9fa5d9fd55611f3"
  }
]);

workbox.routing.registerRoute(
  new RegExp('.html'),
  new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
  new RegExp("^https://api.openweathermap\.org/data/2\.5/"),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return getOffline('./offline.html');
      break;
    case 'image':
      return getOffline('./images/offline.png');
      break;
    default:
        return Response.error();
  }
});

workbox.routing.setDefaultHandler(async ({ url, event, params }) => {
  return fetch(event.request)
    .then(response => {
      return response;
    })
    .catch(async error => {
      return getOffline('./offline.html');
    });
});



workbox.routing.registerRoute(
  new RegExp('/$'),
  new workbox.strategies.NetworkOnly()
);



  async function getOffline(url) {
    const cache = await caches.open(workbox.core.cacheNames.precache);
    const response = await cache.match(
      workbox.precaching.getCacheKeyForURL(url)
    );
    return response;
  }