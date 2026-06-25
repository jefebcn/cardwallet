'use strict';
/* Crest — Service Worker
   Cache-first per asset statici, network-first per HTML.
   Aggiornare CACHE_NAME a ogni deploy che cambia asset critici. */

var CACHE_NAME = 'crest-v1';

var PRECACHE = [
  '/',
  '/faq',
  '/chi-siamo',
  '/contatti',
  '/assets/app.css',
  '/assets/tailwind.css',
  '/assets/fonts.css',
  '/assets/app.js',
  '/assets/gsap-anim.js',
  '/assets/vendor/gsap.min.js',
  '/assets/vendor/ScrollTrigger.min.js',
  '/assets/vendor/lenis.min.js',
  '/assets/fonts/general-sans-400.woff2',
  '/assets/fonts/general-sans-500.woff2',
  '/assets/fonts/general-sans-600.woff2',
  '/assets/fonts/general-sans-700.woff2',
  '/assets/favicon.svg',
  '/assets/apple-touch-icon.png',
  '/manifest.json',
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }

  /* Non intercettare API, admin o richieste cross-origin */
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin')) return;

  var accept = req.headers.get('Accept') || '';

  if (accept.includes('text/html')) {
    /* HTML: network-first — mantiene contenuti freschi, cade sul cache offline */
    e.respondWith(
      fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return caches.match(req); })
    );
    return;
  }

  /* Asset statici: cache-first */
  e.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
