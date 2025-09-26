const CACHE_NAME = 'punjabi-music-collaboration-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/splash_screen.html',
  '/authentication.html',
  '/role_selection.html',
  '/profile_setup.html',
  '/dashboard.html',
  '/matchmaking_collaboration.html',
  '/influencer_marketplace.html',
  '/live_shows.html',
  '/events_hub.html',
  '/styles/main.css',
  '/js/main.js',
  '/assets/logo.svg',
  '/assets/user-flow-preview.png',
  '/logo.svg',
  '/role_icons.svg',
  '/ui_components.svg',
  '/navigation_icons.svg',
  '/punjabi_patterns.svg',
  '/favicon.ico',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Service Worker: Cache failed', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching', event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }

        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched response
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(err => {
            console.log('Service Worker: Fetch failed', err);
            // Return offline page or fallback
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Service Worker: Background sync completed')
    );
  }
});

// Push notifications
self.addEventListener('push', event => {
  console.log('Service Worker: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from Punjabi Music Collaboration',
    icon: '/assets/logo.svg',
    badge: '/assets/logo.svg',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/assets/logo.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/logo.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Punjabi Music Collaboration', options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
