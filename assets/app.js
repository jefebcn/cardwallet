/* ============================================================
   Crest — JS condiviso
   Nav + footer iniettati, motion, counters, parallax, cookie
   ============================================================ */
(function () {
  'use strict';

  /* ---------- NAV (iniettata in #site-nav) ---------- */
  var NAV = '\
  <div class="nav-wrap sticky z-50">\
    <div class="nav-bar">\
    <nav class="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">\
      <a href="/" class="flex items-center gap-2.5" aria-label="Crest — home">\
        <svg class="brand-mark shrink-0" width="22" height="28" viewBox="0 0 79.3 100" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M42.3 4.3 C41.1 5.5 39.5 7 38.7 7.6 C37.5 8.5 37 9.1 35.9 11 C34.7 12.9 33.7 14.1 32.4 14.9 C32 15.1 29.5 13.3 28.8 12.2 C28.5 11.8 27.8 11.3 27.4 11.1 L26.7 10.7 L24.7 12.9 C23.6 14.2 22.2 15.7 21.7 16.4 C20.9 17.3 20.3 17.7 19.2 18.2 C17.6 18.7 17.3 19 13.8 23.5 C13.2 24.3 11.8 26 10.8 27.4 C6.2 33 3.2 40.2 2.7 46.8 C2.6 48 2.5 49.5 2.5 50.2 C2 56.3 4.5 65.8 8 71.8 C23.3 97.3 60.3 98 76.2 73.1 C77.3 71.4 77.3 71.4 75.4 70.3 C74.8 70 72.8 68.8 70.9 67.8 C69 66.7 66.8 65.4 65.9 64.9 C58.7 60.7 56.8 59.6 56.6 59.6 C56.5 59.6 56.3 59.8 56.2 60.1 C55.8 61.5 52.2 64.6 49.7 65.8 C35.6 72.6 21.2 58.1 28.1 44.1 C33.5 33.1 49 32 56 42.2 C56.8 43.3 56.3 43.5 60.2 41.1 C61.4 40.4 62.8 39.6 63.4 39.3 C64 38.9 66.3 37.6 68.5 36.3 C70.8 35 73.6 33.3 74.9 32.6 C76.1 31.9 77.1 31.2 77.1 31 C77.1 30.6 71.4 21.3 70.5 20.4 C70.3 20.1 69.8 19.8 69.4 19.8 C67.9 19.4 67.1 18.7 65.5 15.9 C64.4 14 63.7 13 63.2 12.8 C62.7 12.5 61.5 11.5 60.4 10.5 C58.1 8.2 58.2 8.2 55.7 10.3 C53 12.6 52.8 12.5 50.9 9.1 C49.9 7.4 49.1 6.5 47 4.5 L44.4 2 L42.3 4.3 Z M43.6 6.9 C43.3 7.8 42.6 9.2 42.2 10 C41.3 11.8 41.4 11.9 42.6 11 L43.6 10.4 L43.6 11.6 C43.6 12.7 43.4 12.9 42.3 14.1 C41.7 14.8 40.5 16.4 39.8 17.5 C38.3 20.1 38.1 20.1 38.2 18.1 C38.2 17.3 38.2 16.5 38.1 16.4 C37.9 16.2 36.3 17.5 34.5 19.4 C33 20.9 29.5 23.6 29.3 23.4 C29.1 23.2 30.2 21.5 31.3 20.2 C31.9 19.6 32.5 18.5 32.8 18 C33.1 17.4 33.8 16.4 34.5 15.9 C35.3 15.2 36.1 14.1 37.1 12.4 C38.2 10.3 38.7 9.8 39.8 9 C40.5 8.5 41.8 7.4 42.5 6.4 C44.1 4.5 44.4 4.6 43.6 6.9 Z M57.6 11.9 C57.4 13.1 57.4 13.4 57.7 14 C58.2 14.8 58.2 14.8 57.1 15.9 C56.4 16.7 55.9 17 55.8 16.9 C55.5 16.6 54.7 16.8 53.5 17.3 C53.1 17.5 52.5 18.3 52 19.2 C50.9 21.2 50.6 21.4 48.2 22.1 C46.6 22.5 45.8 22.9 44.1 24.2 C41.5 26.3 41.4 26.2 43.5 23.5 C46 20.3 46.4 19.9 48.1 19.1 C49.4 18.4 49.8 18.1 50.8 16.5 C51.8 15.1 52.3 14.6 53.5 14 C54.3 13.6 55.6 12.7 56.3 11.9 C58 10.2 57.9 10.2 57.6 11.9 Z M26 14.9 C25.4 17.3 25.4 17.4 25.9 17.3 C27.5 16.9 26.5 18.6 24.4 20.1 C23 20.9 22.3 21.6 21.4 23 C20.1 25 19.9 25.1 19.6 24 C19.4 23 19.4 23 16.5 25 C15.1 26 13.8 27 13.5 27.1 C12.9 27.5 13 27.3 14.8 25 C18.6 20.3 18.7 20.2 19.6 20.1 C20.8 19.8 22 18.7 24.4 15.8 C26.5 13.2 26.5 13.2 26 14.9 Z M69.2 22 C69.6 22.3 71.3 24.8 72.4 26.6 C72.5 26.8 72 26.4 71.2 25.8 C70.4 25.1 69.5 24.4 69.1 24.1 C68.4 23.7 67.4 22.1 67.4 21.5 C67.4 21.2 68.4 21.5 69.2 22 Z"/></svg>\
        <span class="font-display text-xl font-semibold tracking-tightest">Crest</span>\
      </a>\
      <div class="hidden md:flex items-center gap-8 text-sm text-ink/70">\
        <a href="/#soluzione" class="link-underline hover:text-ink">Prodotto</a>\
        <a href="/#come-funziona" class="link-underline hover:text-ink">Come funziona</a>\
        <a href="/#piani" class="link-underline hover:text-ink">Prezzi</a>\
        <a href="/faq" class="link-underline hover:text-ink">FAQ</a>\
        <a href="/chi-siamo" class="link-underline hover:text-ink">Chi siamo</a>\
      </div>\
      <div class="flex items-center gap-2 sm:gap-3">\
        <a href="/app" class="nav-app-btn hidden sm:inline-flex items-center gap-1.5 btn border border-stone/30 text-ink/70 hover:border-stone/60 hover:text-ink px-4 py-2 text-sm">\
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 17v.5"/></svg>\
          Prova l’app\
        </a>\
        <a href="/#lista" class="btn btn-primary px-4 sm:px-5 py-2 text-sm">Unisciti alla lista</a>\
        <button id="navToggle" class="md:hidden p-2 -mr-2" aria-label="Apri menu" aria-expanded="false" aria-controls="mobileMenu">\
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="#110F08" stroke-width="1.8" stroke-linecap="round"/></svg>\
        </button>\
      </div>\
    </nav>\
    <div id="mobileMenu" class="md:hidden hidden border-t border-stone/15">\
      <div class="px-5 py-4 flex flex-col gap-1 text-ink/80">\
        <a href="/#soluzione" class="py-2.5 link-underline w-max">Prodotto</a>\
        <a href="/#come-funziona" class="py-2.5 link-underline w-max">Come funziona</a>\
        <a href="/#piani" class="py-2.5 link-underline w-max">Prezzi</a>\
        <a href="/faq" class="py-2.5 link-underline w-max">FAQ</a>\
        <a href="/chi-siamo" class="py-2.5 link-underline w-max">Chi siamo</a>\
        <a href="/contatti" class="py-2.5 link-underline w-max">Contatti</a>\
        <div class="pt-2 pb-1 border-t border-stone/15 mt-1">\
          <a href="/app" class="inline-flex items-center gap-2 py-2.5 text-sm font-semibold text-forest">\
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 17v.5"/></svg>\
            Prova l’app →\
          </a>\
        </div>\
      </div>\
    </div>\
    </div>\
  </div>';

  /* ---------- FOOTER (iniettato in #site-footer) ---------- */
  var FOOTER = '\
  <div class="bg-forest text-parchment">\
    <div class="mx-auto max-w-6xl px-5 sm:px-8 py-16">\
      <div class="grid gap-12 md:grid-cols-12">\
        <div class="md:col-span-4">\
          <a href="/" class="flex items-center gap-2.5" aria-label="Crest — home">\
            <svg width="22" height="28" viewBox="0 0 79.3 100" fill="#F4EDE0" aria-hidden="true"><path fill-rule="evenodd" d="M42.3 4.3 C41.1 5.5 39.5 7 38.7 7.6 C37.5 8.5 37 9.1 35.9 11 C34.7 12.9 33.7 14.1 32.4 14.9 C32 15.1 29.5 13.3 28.8 12.2 C28.5 11.8 27.8 11.3 27.4 11.1 L26.7 10.7 L24.7 12.9 C23.6 14.2 22.2 15.7 21.7 16.4 C20.9 17.3 20.3 17.7 19.2 18.2 C17.6 18.7 17.3 19 13.8 23.5 C13.2 24.3 11.8 26 10.8 27.4 C6.2 33 3.2 40.2 2.7 46.8 C2.6 48 2.5 49.5 2.5 50.2 C2 56.3 4.5 65.8 8 71.8 C23.3 97.3 60.3 98 76.2 73.1 C77.3 71.4 77.3 71.4 75.4 70.3 C74.8 70 72.8 68.8 70.9 67.8 C69 66.7 66.8 65.4 65.9 64.9 C58.7 60.7 56.8 59.6 56.6 59.6 C56.5 59.6 56.3 59.8 56.2 60.1 C55.8 61.5 52.2 64.6 49.7 65.8 C35.6 72.6 21.2 58.1 28.1 44.1 C33.5 33.1 49 32 56 42.2 C56.8 43.3 56.3 43.5 60.2 41.1 C61.4 40.4 62.8 39.6 63.4 39.3 C64 38.9 66.3 37.6 68.5 36.3 C70.8 35 73.6 33.3 74.9 32.6 C76.1 31.9 77.1 31.2 77.1 31 C77.1 30.6 71.4 21.3 70.5 20.4 C70.3 20.1 69.8 19.8 69.4 19.8 C67.9 19.4 67.1 18.7 65.5 15.9 C64.4 14 63.7 13 63.2 12.8 C62.7 12.5 61.5 11.5 60.4 10.5 C58.1 8.2 58.2 8.2 55.7 10.3 C53 12.6 52.8 12.5 50.9 9.1 C49.9 7.4 49.1 6.5 47 4.5 L44.4 2 L42.3 4.3 Z M43.6 6.9 C43.3 7.8 42.6 9.2 42.2 10 C41.3 11.8 41.4 11.9 42.6 11 L43.6 10.4 L43.6 11.6 C43.6 12.7 43.4 12.9 42.3 14.1 C41.7 14.8 40.5 16.4 39.8 17.5 C38.3 20.1 38.1 20.1 38.2 18.1 C38.2 17.3 38.2 16.5 38.1 16.4 C37.9 16.2 36.3 17.5 34.5 19.4 C33 20.9 29.5 23.6 29.3 23.4 C29.1 23.2 30.2 21.5 31.3 20.2 C31.9 19.6 32.5 18.5 32.8 18 C33.1 17.4 33.8 16.4 34.5 15.9 C35.3 15.2 36.1 14.1 37.1 12.4 C38.2 10.3 38.7 9.8 39.8 9 C40.5 8.5 41.8 7.4 42.5 6.4 C44.1 4.5 44.4 4.6 43.6 6.9 Z M57.6 11.9 C57.4 13.1 57.4 13.4 57.7 14 C58.2 14.8 58.2 14.8 57.1 15.9 C56.4 16.7 55.9 17 55.8 16.9 C55.5 16.6 54.7 16.8 53.5 17.3 C53.1 17.5 52.5 18.3 52 19.2 C50.9 21.2 50.6 21.4 48.2 22.1 C46.6 22.5 45.8 22.9 44.1 24.2 C41.5 26.3 41.4 26.2 43.5 23.5 C46 20.3 46.4 19.9 48.1 19.1 C49.4 18.4 49.8 18.1 50.8 16.5 C51.8 15.1 52.3 14.6 53.5 14 C54.3 13.6 55.6 12.7 56.3 11.9 C58 10.2 57.9 10.2 57.6 11.9 Z M26 14.9 C25.4 17.3 25.4 17.4 25.9 17.3 C27.5 16.9 26.5 18.6 24.4 20.1 C23 20.9 22.3 21.6 21.4 23 C20.1 25 19.9 25.1 19.6 24 C19.4 23 19.4 23 16.5 25 C15.1 26 13.8 27 13.5 27.1 C12.9 27.5 13 27.3 14.8 25 C18.6 20.3 18.7 20.2 19.6 20.1 C20.8 19.8 22 18.7 24.4 15.8 C26.5 13.2 26.5 13.2 26 14.9 Z M69.2 22 C69.6 22.3 71.3 24.8 72.4 26.6 C72.5 26.8 72 26.4 71.2 25.8 C70.4 25.1 69.5 24.4 69.1 24.1 C68.4 23.7 67.4 22.1 67.4 21.5 C67.4 21.2 68.4 21.5 69.2 22 Z"/></svg>\
            <span class="font-display text-xl font-semibold tracking-tightest">Crest</span>\
          </a>\
          <p class="mt-4 max-w-xs text-parchment/65 leading-relaxed">Finanza moderna per la Repubblica di San Marino. Costruita dalla vetta del Titano.</p>\
          <div class="mt-6 flex items-center gap-3">\
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="w-9 h-9 grid place-items-center rounded-full border border-parchment/25 hover:bg-parchment/10 transition"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>\
            <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" class="w-9 h-9 grid place-items-center rounded-full border border-parchment/25 hover:bg-parchment/10 transition"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z"/></svg></a>\
            <a href="https://x.com" target="_blank" rel="noopener" aria-label="X" class="w-9 h-9 grid place-items-center rounded-full border border-parchment/25 hover:bg-parchment/10 transition"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.3 8.3L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.8-8.9L1 2h7l4.8 6.3zm-2.4 18h1.9L7.6 4H5.6z"/></svg></a>\
          </div>\
        </div>\
        <nav class="md:col-span-2" aria-label="Prodotto">\
          <p class="text-parchment/45 uppercase tracking-wider text-xs mb-4">Prodotto</p>\
          <ul class="space-y-2.5 text-parchment/80 text-sm">\
            <li><a href="/#soluzione" class="link-underline">IBAN dedicato</a></li>\
            <li><a href="/#soluzione" class="link-underline">Carta</a></li>\
            <li><a href="/#soluzione" class="link-underline">Trasferimenti</a></li>\
            <li><a href="/#soluzione" class="link-underline">App</a></li>\
          </ul>\
        </nav>\
        <nav class="md:col-span-2" aria-label="Risorse">\
          <p class="text-parchment/45 uppercase tracking-wider text-xs mb-4">Risorse</p>\
          <ul class="space-y-2.5 text-parchment/80 text-sm">\
            <li><a href="/#come-funziona" class="link-underline">Come funziona</a></li>\
            <li><a href="/faq" class="link-underline">FAQ</a></li>\
            <li><a href="/chi-siamo" class="link-underline">Chi siamo</a></li>\
            <li><a href="/contatti" class="link-underline">Contatti</a></li>\
          </ul>\
        </nav>\
        <nav class="md:col-span-2" aria-label="Legale">\
          <p class="text-parchment/45 uppercase tracking-wider text-xs mb-4">Legale</p>\
          <ul class="space-y-2.5 text-parchment/80 text-sm">\
            <li><a href="/privacy" class="link-underline">Privacy Policy</a></li>\
            <li><a href="/cookie" class="link-underline">Cookie Policy</a></li>\
            <li><a href="/termini" class="link-underline">Termini</a></li>\
          </ul>\
        </nav>\
        <div class="md:col-span-2">\
          <p class="text-parchment/45 uppercase tracking-wider text-xs mb-4">Regione</p>\
          <div class="inline-flex items-center gap-2 rounded-full border border-parchment/25 px-3 py-1.5 text-sm text-parchment/85">\
            <svg width="13" height="16" viewBox="0 0 79.3 100" fill="#F4EDE0" aria-hidden="true"><path fill-rule="evenodd" d="M42.3 4.3 C41.1 5.5 39.5 7 38.7 7.6 C37.5 8.5 37 9.1 35.9 11 C34.7 12.9 33.7 14.1 32.4 14.9 C32 15.1 29.5 13.3 28.8 12.2 C28.5 11.8 27.8 11.3 27.4 11.1 L26.7 10.7 L24.7 12.9 C23.6 14.2 22.2 15.7 21.7 16.4 C20.9 17.3 20.3 17.7 19.2 18.2 C17.6 18.7 17.3 19 13.8 23.5 C13.2 24.3 11.8 26 10.8 27.4 C6.2 33 3.2 40.2 2.7 46.8 C2.6 48 2.5 49.5 2.5 50.2 C2 56.3 4.5 65.8 8 71.8 C23.3 97.3 60.3 98 76.2 73.1 C77.3 71.4 77.3 71.4 75.4 70.3 C74.8 70 72.8 68.8 70.9 67.8 C69 66.7 66.8 65.4 65.9 64.9 C58.7 60.7 56.8 59.6 56.6 59.6 C56.5 59.6 56.3 59.8 56.2 60.1 C55.8 61.5 52.2 64.6 49.7 65.8 C35.6 72.6 21.2 58.1 28.1 44.1 C33.5 33.1 49 32 56 42.2 C56.8 43.3 56.3 43.5 60.2 41.1 C61.4 40.4 62.8 39.6 63.4 39.3 C64 38.9 66.3 37.6 68.5 36.3 C70.8 35 73.6 33.3 74.9 32.6 C76.1 31.9 77.1 31.2 77.1 31 C77.1 30.6 71.4 21.3 70.5 20.4 C70.3 20.1 69.8 19.8 69.4 19.8 C67.9 19.4 67.1 18.7 65.5 15.9 C64.4 14 63.7 13 63.2 12.8 C62.7 12.5 61.5 11.5 60.4 10.5 C58.1 8.2 58.2 8.2 55.7 10.3 C53 12.6 52.8 12.5 50.9 9.1 C49.9 7.4 49.1 6.5 47 4.5 L44.4 2 L42.3 4.3 Z M43.6 6.9 C43.3 7.8 42.6 9.2 42.2 10 C41.3 11.8 41.4 11.9 42.6 11 L43.6 10.4 L43.6 11.6 C43.6 12.7 43.4 12.9 42.3 14.1 C41.7 14.8 40.5 16.4 39.8 17.5 C38.3 20.1 38.1 20.1 38.2 18.1 C38.2 17.3 38.2 16.5 38.1 16.4 C37.9 16.2 36.3 17.5 34.5 19.4 C33 20.9 29.5 23.6 29.3 23.4 C29.1 23.2 30.2 21.5 31.3 20.2 C31.9 19.6 32.5 18.5 32.8 18 C33.1 17.4 33.8 16.4 34.5 15.9 C35.3 15.2 36.1 14.1 37.1 12.4 C38.2 10.3 38.7 9.8 39.8 9 C40.5 8.5 41.8 7.4 42.5 6.4 C44.1 4.5 44.4 4.6 43.6 6.9 Z M57.6 11.9 C57.4 13.1 57.4 13.4 57.7 14 C58.2 14.8 58.2 14.8 57.1 15.9 C56.4 16.7 55.9 17 55.8 16.9 C55.5 16.6 54.7 16.8 53.5 17.3 C53.1 17.5 52.5 18.3 52 19.2 C50.9 21.2 50.6 21.4 48.2 22.1 C46.6 22.5 45.8 22.9 44.1 24.2 C41.5 26.3 41.4 26.2 43.5 23.5 C46 20.3 46.4 19.9 48.1 19.1 C49.4 18.4 49.8 18.1 50.8 16.5 C51.8 15.1 52.3 14.6 53.5 14 C54.3 13.6 55.6 12.7 56.3 11.9 C58 10.2 57.9 10.2 57.6 11.9 Z M26 14.9 C25.4 17.3 25.4 17.4 25.9 17.3 C27.5 16.9 26.5 18.6 24.4 20.1 C23 20.9 22.3 21.6 21.4 23 C20.1 25 19.9 25.1 19.6 24 C19.4 23 19.4 23 16.5 25 C15.1 26 13.8 27 13.5 27.1 C12.9 27.5 13 27.3 14.8 25 C18.6 20.3 18.7 20.2 19.6 20.1 C20.8 19.8 22 18.7 24.4 15.8 C26.5 13.2 26.5 13.2 26 14.9 Z M69.2 22 C69.6 22.3 71.3 24.8 72.4 26.6 C72.5 26.8 72 26.4 71.2 25.8 C70.4 25.1 69.5 24.4 69.1 24.1 C68.4 23.7 67.4 22.1 67.4 21.5 C67.4 21.2 68.4 21.5 69.2 22 Z"/></svg>San Marino · IT\
          </div>\
          <a href="mailto:supportcrest@proton.me" class="mt-4 block text-sm text-parchment/80 link-underline w-max">supportcrest@proton.me</a>\
        </div>\
      </div>\
      <div class="mt-12 pt-6 border-t border-parchment/15 space-y-4 text-xs text-parchment/55">\
        <p class="leading-relaxed max-w-3xl">Crest è un progetto in fase di pre-lancio. <strong class="text-parchment/75 font-semibold">Non è una banca, né un istituto di moneta elettronica o di pagamento autorizzato.</strong> L\'iscrizione alla lista d\'attesa non costituisce apertura di un conto né offerta di servizi finanziari, e non comporta alcun obbligo. I servizi descritti rappresentano l\'intenzione di prodotto e saranno disponibili solo a seguito delle necessarie autorizzazioni.</p>\
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">\
          <p>© <span data-year>2026</span> Crest · <span class="tracking-[0.15em]">LIBERTAS</span></p>\
          <p class="flex gap-4"><a href="/privacy" class="link-underline">Privacy</a><a href="/cookie" class="link-underline">Cookie</a><a href="/termini" class="link-underline">Termini</a></p>\
        </div>\
      </div>\
    </div>\
  </div>';

  /* ---------- Cookie banner ---------- */
  var COOKIE = '\
  <div id="cookieBar" role="dialog" aria-label="Preferenze cookie" aria-describedby="cookieBarDesc" class="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:max-w-sm z-[60] rounded-2xl bg-ink text-parchment shadow-2xl p-5 hidden">\
    <p id="cookieBarDesc" class="text-sm leading-relaxed text-parchment/85">Usiamo cookie tecnici per far funzionare il sito e, con il tuo consenso, cookie di misurazione anonima. Dettagli nella <a href="/cookie" class="underline">Cookie Policy</a>.</p>\
    <div class="mt-4 flex gap-2">\
      <button data-cookie="accept" class="btn btn-clay px-4 py-2 text-sm flex-1">Accetta</button>\
      <button data-cookie="reject" class="btn btn-ghost border-parchment/30 text-parchment hover:border-parchment px-4 py-2 text-sm flex-1">Solo necessari</button>\
    </div>\
  </div>';

  /* ---------- Pillola sticky "Unisciti alla lista" (stile QR di ZEN) ---------- */
  var FAB = '<a href="/#lista" id="waitlistFab" class="wl-fab" aria-label="Unisciti alla lista d\'attesa">Unisciti alla lista <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';

  function inject(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }

  document.addEventListener('DOMContentLoaded', function () {
    // skip link per accessibilità: inserito prima di tutto il resto
    (function () {
      var main = document.querySelector('main');
      if (!main) return;
      if (!main.id) main.id = 'main-content';
      var skip = document.createElement('a');
      skip.href = '#' + main.id;
      skip.className = 'skip-link';
      skip.textContent = 'Vai al contenuto principale';
      document.body.insertBefore(skip, document.body.firstChild);
    })();

    inject('site-nav', NAV);
    inject('site-footer', FOOTER);

    // marca il link attivo nella nav con aria-current="page"
    var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    Array.prototype.forEach.call(document.querySelectorAll('#site-nav a[href]'), function (a) {
      var href = a.getAttribute('href').replace(/\/$/, '') || '/';
      if (href === currentPath && href !== '/') {
        a.setAttribute('aria-current', 'page');
        a.style.color = ''; // usa il colore del tema
      }
    });

    // anno corrente
    Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (e) { e.textContent = new Date().getFullYear(); });

    // mobile nav
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobileMenu');
    function closeMenu() {
      if (!menu) return;
      menu.classList.add('hidden');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Apri menu');
      }
    }
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
      });
      menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    }

    // reveal — se GSAP è caricato, lo gestisce gsap-anim.js (evita conflitti)
    var reveals = window.gsap ? [] : document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
      }, { threshold: 0.14 });
      reveals.forEach(function (el) { io.observe(el); });
    } else { reveals.forEach(function (el) { el.classList.add('is-in'); }); }

    // counters
    function countTo(el) {
      var target = parseFloat(el.getAttribute('data-count-to')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1500, start = null;
      // token: annulla eventuali animazioni precedenti sullo stesso elemento
      // (evita sovrapposizioni quando il conteggio reale arriva mentre l'animazione è in corso)
      var token = (el.__countToken || 0) + 1;
      el.__countToken = token;
      function step(ts) {
        if (el.__countToken !== token) return; // superata da una nuova chiamata
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = eased * target;
        el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.setAttribute('data-counted', '1');
      }
      requestAnimationFrame(step);
    }
    window.countTo = countTo;
    var counters = document.querySelectorAll('[data-count-to]');

    // Load real waitlist count from Supabase — updates ONLY the waitlist counters
    fetch('/api/waitlist-count')
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && typeof j.count === 'number' && j.count > 0) {
          document.querySelectorAll('[data-waitlist]').forEach(function (el) {
            el.setAttribute('data-count-to', j.count);
            // se il contatore è già stato attivato (in viewport o in animazione),
            // ri-anima al valore reale; altrimenti partirà dal valore corretto
            // quando entrerà in vista (gestito dall'IntersectionObserver / reveal GSAP)
            if (el.__countToken) countTo(el);
          });
        }
      })
      .catch(function () {});

    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { countTo(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.1 });
      counters.forEach(function (el) { cio.observe(el); });
    } else { counters.forEach(countTo); }

    // parallax — se GSAP è caricato lo gestisce gsap-anim.js (scrub fluido)
    var px = window.gsap ? [] : document.querySelectorAll('.parallax');
    if (px.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
          var vh = window.innerHeight;
          px.forEach(function (el) {
            var r = el.getBoundingClientRect();
            var speed = parseFloat(el.getAttribute('data-speed')) || 0.12;
            var offset = (r.top + r.height / 2 - vh / 2) * -speed;
            el.style.setProperty('--py', offset.toFixed(1) + 'px');
          });
          ticking = false;
        });
      }, { passive: true });
    }

    // Lista d'attesa: form nativo -> POST /api/subscribe (niente servizi terzi)
    var wlForm = document.getElementById('waitlistForm');
    var wlDone = document.getElementById('waitlistDone');
    if (wlForm) {
      var wlBtn = document.getElementById('wl-submit');
      var wlErr = document.getElementById('wl-error');
      var wlLabel = wlForm.querySelector('.wl-label');
      var wlSpin = wlForm.querySelector('.wl-spin');

      var setBusy = function (busy) {
        wlBtn.disabled = busy;
        wlBtn.classList.toggle('opacity-70', busy);
        if (wlLabel) wlLabel.classList.toggle('hidden', busy);
        if (wlSpin) wlSpin.classList.toggle('hidden', !busy);
      };
      var showErr = function (msg) {
        if (!wlErr) return;
        wlErr.textContent = msg; wlErr.classList.remove('hidden');
      };
      var clearErr = function () {
        if (!wlErr) return;
        wlErr.textContent = ''; wlErr.classList.add('hidden');
      };

      // Blur-time validation: show hints when the user leaves a field with bad data
      var WL_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      var nameInp = wlForm.querySelector('[name="nome"]');
      var emailInp = wlForm.querySelector('[name="email"]');
      if (nameInp) {
        nameInp.addEventListener('focus', function () { nameInp.removeAttribute('aria-invalid'); clearErr(); });
        nameInp.addEventListener('blur', function () {
          if (!nameInp.value.trim()) {
            nameInp.setAttribute('aria-invalid', 'true');
            showErr('Inserisci il tuo nome prima di proseguire.');
          }
        });
      }
      if (emailInp) {
        emailInp.addEventListener('focus', function () { emailInp.removeAttribute('aria-invalid'); clearErr(); });
        emailInp.addEventListener('blur', function () {
          var v = emailInp.value.trim();
          if (v && !WL_EMAIL_RE.test(v)) {
            emailInp.setAttribute('aria-invalid', 'true');
            showErr('Controlla l\'indirizzo email: il formato non sembra corretto.');
          }
        });
      }

      wlForm.addEventListener('submit', function (ev) {
        ev.preventDefault();
        clearErr();
        if (nameInp) nameInp.removeAttribute('aria-invalid');
        if (emailInp) emailInp.removeAttribute('aria-invalid');
        if (!wlForm.checkValidity()) { wlForm.reportValidity(); return; }

        var payload = {
          nome: (wlForm.nome.value || '').trim(),
          email: (wlForm.email.value || '').trim(),
          castello: wlForm.castello ? wlForm.castello.value : '',
          website: wlForm.website ? wlForm.website.value : ''
        };

        setBusy(true);
        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
          .then(function (res) {
            if (res.ok && res.j && res.j.ok) {
              wlForm.classList.add('hidden');
              if (wlDone) {
                wlDone.classList.remove('hidden');
                wlDone.setAttribute('tabindex', '-1');
                wlDone.focus();
              }
              if (typeof window.plausible === 'function') window.plausible('Signup');
              // Increment only the waitlist counters by 1
              document.querySelectorAll('[data-waitlist]').forEach(function (el) {
                var prev = parseFloat(el.getAttribute('data-count-to')) || 0;
                el.setAttribute('data-count-to', prev + 1);
                countTo(el);
              });
            } else {
              showErr((res.j && res.j.error) || 'Qualcosa è andato storto. Riprova.');
              setBusy(false);
            }
          })
          .catch(function () {
            showErr('Errore di rete. Controlla la connessione e riprova.');
            setBusy(false);
          });
      });
    }

    // sticky "Unisciti alla lista" — appare dopo l'hero, si nasconde sulla sezione lista o col cookie banner
    (function initFab() {
      var holder = document.createElement('div');
      holder.innerHTML = FAB;
      var fab = holder.firstChild;
      document.body.appendChild(fab);
      var lista = document.getElementById('lista');
      var listaInView = false;
      function cookieVisible() { var c = document.getElementById('cookieBar'); return !!(c && !c.classList.contains('hidden')); }
      function update() {
        var past = window.scrollY > window.innerHeight * 0.7;
        fab.classList.toggle('is-visible', past && !listaInView && !cookieVisible());
      }
      if (lista && 'IntersectionObserver' in window) {
        new IntersectionObserver(function (es) { listaInView = es[0].isIntersecting; update(); }, { threshold: 0.05 }).observe(lista);
      }
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () { update(); ticking = false; });
      }, { passive: true });
      window.__fabUpdate = update;
      update();
    })();

    // carosello "In breve": frecce desktop + rotella verticale -> scorrimento orizzontale
    (function initHighlights() {
      var scroller = document.querySelector('.hl-scroller');
      if (!scroller) return;
      var track = scroller.querySelector('.hl-track');
      var prevBtn = document.querySelector('[data-hl-prev]');
      var nextBtn = document.querySelector('[data-hl-next]');

      function step() {
        var card = scroller.querySelector('.hl-card:not(.is-hidden)');
        if (!card) return scroller.clientWidth * 0.85;
        var cs = track ? getComputedStyle(track) : null;
        var gap = cs ? (parseFloat(cs.columnGap || cs.gap) || 24) : 24;
        return card.getBoundingClientRect().width + gap;
      }
      function maxScroll() { return scroller.scrollWidth - scroller.clientWidth; }
      function updateArrows() {
        if (!prevBtn || !nextBtn) return;
        var max = maxScroll();
        prevBtn.disabled = scroller.scrollLeft <= 1;
        nextBtn.disabled = max <= 1 || scroller.scrollLeft >= max - 1;
      }
      if (prevBtn) prevBtn.addEventListener('click', function () { scroller.scrollBy({ left: -step(), behavior: 'smooth' }); });
      if (nextBtn) nextBtn.addEventListener('click', function () { scroller.scrollBy({ left: step(), behavior: 'smooth' }); });

      var rafA = false;
      scroller.addEventListener('scroll', function () {
        if (rafA) return; rafA = true;
        requestAnimationFrame(function () { updateArrows(); rafA = false; });
      }, { passive: true });

      // rotella del mouse: converte lo scroll verticale in orizzontale (solo puntatore fine)
      if (window.matchMedia('(pointer: fine)').matches) {
        scroller.addEventListener('wheel', function (e) {
          if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // trackpad orizzontale: nativo
          var max = maxScroll();
          if (max <= 1) return;
          if ((e.deltaY < 0 && scroller.scrollLeft <= 0) ||
              (e.deltaY > 0 && scroller.scrollLeft >= max)) return; // al bordo: lascia scorrere la pagina
          e.preventDefault();
          e.stopPropagation();
          scroller.scrollLeft = Math.max(0, Math.min(max, scroller.scrollLeft + e.deltaY));
        }, { passive: false });
      }

      // apertura schede: tap da mobile apre la parte informativa, click da desktop naviga
      var cards = Array.prototype.slice.call(scroller.querySelectorAll('.hl-card'));
      var coarse = window.matchMedia('(hover: none)').matches;
      function goCard(card) {
        var href = card.getAttribute('data-href'); if (!href) return;
        if (window.__lenis && href.charAt(0) === '/' && href.indexOf('#') > -1) {
          var tgt = document.querySelector(href.replace(/^\//, ''));
          if (tgt) { window.__lenis.scrollTo(tgt, { offset: -80 }); return; }
        }
        window.location.href = href;
      }
      cards.forEach(function (card) {
        card.addEventListener('click', function (e) {
          if (e.target.closest('a')) return; // il link "Scopri di più" naviga da sé
          if (coarse) {
            var open = card.classList.contains('is-open');
            cards.forEach(function (c) { c.classList.remove('is-open'); });
            if (!open) card.classList.add('is-open');
          } else {
            goCard(card);
          }
        });
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (coarse) card.classList.toggle('is-open'); else goCard(card);
          }
        });
      });

      // tab di filtro per categoria
      var tabs = Array.prototype.slice.call(document.querySelectorAll('.hl-tab'));
      function activateTab(tab) {
        var f = tab.getAttribute('data-filter');
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', String(on));
          t.setAttribute('tabindex', on ? '0' : '-1');
        });
        cards.forEach(function (c) {
          var show = f === 'all' || c.getAttribute('data-cat') === f;
          c.classList.toggle('is-hidden', !show);
          c.classList.remove('is-open');
        });
        scroller.scrollTo({ left: 0, behavior: 'smooth' });
        updateArrows();
      }
      tabs.forEach(function (tab, idx) {
        tab.setAttribute('tabindex', tab.classList.contains('is-active') ? '0' : '-1');
        tab.addEventListener('click', function () { activateTab(tab); });
        tab.addEventListener('keydown', function (e) {
          var next = -1;
          if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
          else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
          else if (e.key === 'Home') next = 0;
          else if (e.key === 'End') next = tabs.length - 1;
          if (next >= 0) { e.preventDefault(); activateTab(tabs[next]); tabs[next].focus(); }
        });
      });

      updateArrows();
      window.addEventListener('load', updateArrows);
      window.addEventListener('resize', updateArrows);
    })();

    // carosello "Perché Crest": motivi che ruotano con dots + frecce
    (function initReasons() {
      var stage = document.querySelector('[data-rz]');
      if (!stage) return;
      var slides = Array.prototype.slice.call(stage.querySelectorAll('.rz-slide'));
      if (!slides.length) return;
      var dotsWrap = stage.querySelector('.rz-dots');
      var prevBtn = stage.querySelector('[data-rz-prev]');
      var nextBtn = stage.querySelector('[data-rz-next]');
      var cur = 0, timer = null;
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Give each slide an id and tabpanel role so dots can aria-controls them
      slides.forEach(function (s, idx) {
        s.id = 'rz-slide-' + idx;
        s.setAttribute('role', 'tabpanel');
        s.setAttribute('aria-roledescription', 'slide');
      });

      var dots = slides.map(function (_, idx) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'rz-dot' + (idx === 0 ? ' is-active' : '');
        d.setAttribute('role', 'tab');
        d.setAttribute('aria-label', 'Motivo ' + (idx + 1));
        d.setAttribute('aria-controls', 'rz-slide-' + idx);
        d.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
        d.setAttribute('tabindex', idx === 0 ? '0' : '-1');
        d.addEventListener('click', function () { show(idx, true); });
        d.addEventListener('keydown', function (e) {
          var goTo = -1;
          if (e.key === 'ArrowRight') goTo = (idx + 1) % slides.length;
          else if (e.key === 'ArrowLeft') goTo = (idx - 1 + slides.length) % slides.length;
          else if (e.key === 'Home') goTo = 0;
          else if (e.key === 'End') goTo = slides.length - 1;
          if (goTo >= 0) { e.preventDefault(); show(goTo, true); dots[goTo].focus(); }
        });
        if (dotsWrap) dotsWrap.appendChild(d);
        return d;
      });

      function stop() { if (timer) { clearInterval(timer); timer = null; } }
      function start() { if (!reduce && !timer) timer = setInterval(function () { show(cur + 1); }, 5500); }
      function show(n, user) {
        cur = (n + slides.length) % slides.length;
        slides.forEach(function (s, idx) { s.classList.toggle('is-active', idx === cur); });
        dots.forEach(function (d, idx) {
          var on = idx === cur;
          d.classList.toggle('is-active', on);
          d.setAttribute('aria-selected', String(on));
          d.setAttribute('tabindex', on ? '0' : '-1');
        });
        if (user) { stop(); start(); }
      }
      if (prevBtn) prevBtn.addEventListener('click', function () { show(cur - 1, true); });
      if (nextBtn) nextBtn.addEventListener('click', function () { show(cur + 1, true); });
      // Pause on hover or keyboard focus; resume when pointer/focus leaves
      stage.addEventListener('mouseenter', stop);
      stage.addEventListener('mouseleave', start);
      stage.addEventListener('focusin', stop);
      stage.addEventListener('focusout', function (e) {
        if (!stage.contains(e.relatedTarget)) start();
      });

      show(0);
      start();
    })();

    // condivisione social post-iscrizione
    (function initShare() {
      var nativeBtn = document.getElementById('share-native');
      var waBtn = document.getElementById('share-wa');
      var xBtn = document.getElementById('share-x');
      if (!nativeBtn || !waBtn || !xBtn) return;

      function track(channel) {
        if (typeof window.plausible === 'function') {
          window.plausible('Share', { props: { channel: channel } });
        }
      }

      var shareData = {
        title: 'Crest — wallet digitale per San Marino',
        text: 'Ho scoperto Crest, il wallet digitale per la Repubblica di San Marino 🇸🇲 — unisciti alla lista d\'attesa',
        url: 'https://crestpay.app'
      };
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        nativeBtn.classList.remove('hidden');
        waBtn.classList.add('hidden');
        xBtn.classList.add('hidden');
        nativeBtn.addEventListener('click', function () {
          track('native');
          navigator.share(shareData).catch(function () {});
        });
      } else {
        waBtn.addEventListener('click', function () { track('whatsapp'); });
        xBtn.addEventListener('click', function () { track('x'); });
      }
    })();

    // cookie banner
    if (!localStorage.getItem('crest-cookie')) {
      var wrap = document.createElement('div');
      wrap.innerHTML = COOKIE;
      document.body.appendChild(wrap);
      var bar = document.getElementById('cookieBar');
      if (bar) {
        setTimeout(function () {
          bar.classList.remove('hidden');
          if (window.__fabUpdate) window.__fabUpdate();
          var firstBtn = bar.querySelector('button');
          if (firstBtn && (document.activeElement === document.body || !document.activeElement)) {
            firstBtn.focus();
          }
        }, 800);
        bar.addEventListener('click', function (e) {
          var choice = e.target.getAttribute('data-cookie');
          if (choice) { localStorage.setItem('crest-cookie', choice); bar.remove(); if (window.__fabUpdate) window.__fabUpdate(); }
        });
      }
    }
  });
})();
