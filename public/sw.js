/**
 * 📱 Service Worker per MyZubster PWA
 */

const CACHE_NAME = 'myzubster-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json'
];

// Installa service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('🗂️ Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Attiva service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercetta richieste
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - restituisci la risposta
        if (response) {
          return response;
        }

        // Clona la richiesta
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Controlla se la risposta è valida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la risposta
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Gestione push notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '👽 MyZubster';
  const options = {
    body: data.body || 'Hai una nuova notifica!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    actions: [
      {
        action: 'open',
        title: 'Apri',
        icon: '/icons/open.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Gestione click notifiche
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('📱 Service Worker MyZubster caricato!');
