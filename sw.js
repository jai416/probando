const CACHE_NAME = 'iprbv-v6';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/javascript/main.js',
    '/javascript/chatbot.js',
    '/js/data.js',
    '/icons.svg',
    '/assets/icon-512.png',
    '/assets/icon-192.png',
    '/assets/icon-512.webp',
    '/assets/apple-touch-icon.png',
    '/gallery.html',
    '/noticias.html',
    '/pagina-informatica.html',
    '/pagina-electronica.html',
    '/pagina-automatica.html',
    '/en/',
    '/site.webmanifest'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache =>
            Promise.all(
                ASSETS.map(url => cache.add(url).catch(() => {}))
            )
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    e.respondWith(
        caches.match(e.request).then(r => {
            if (r) return r;
            return fetch(e.request).then(resp => {
                if (resp.status === 200) {
                    const clone = resp.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                }
                return resp;
            }).catch(() => {
                if (e.request.destination === 'document') {
                    return caches.match('/index.html');
                }
                return new Response('', { status: 503 });
            });
        })
    );
});
