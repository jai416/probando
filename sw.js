const CACHE_NAME = 'iprbv-v4';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/javascript/main.js',
    '/javascript/chatbot.js',
    '/icons.svg',
    '/assets/icon-512.webp',
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
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
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
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
            if (resp.status === 200 && e.request.method === 'GET') {
                const clone = resp.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
            }
            return resp;
        }).catch(() => caches.match('/index.html')))
    );
});
