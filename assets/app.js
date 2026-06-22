/* ============================================================
   Crest — JS condiviso
   Nav + footer iniettati, motion, counters, parallax, cookie
   ============================================================ */
(function () {
  'use strict';

  /* ---------- NAV (iniettata in #site-nav) ---------- */
  var NAV = '\
  <div class="sticky top-0 z-50 bg-parchment/85 backdrop-blur-md border-b border-stone/15">\
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
        <a href="/app" class="hidden sm:inline-flex items-center gap-1.5 btn border border-stone/30 text-ink/70 hover:border-stone/60 hover:text-ink px-4 py-2 text-sm">\
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 17v.5"/></svg>\
          Prova l’app\
        </a>\
        <a href="/#lista" class="btn btn-primary px-4 sm:px-5 py-2 text-sm">Unisciti alla lista</a>\
        <button id="navToggle" class="md:hidden p-2 -mr-2" aria-label="Apri menu" aria-expanded="false">\
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="#110F08" stroke-width="1.8" stroke-linecap="round"/></svg>\
        </button>\
      </div>\
    </nav>\
    <div id="mobileMenu" class="md:hidden hidden border-t border-stone/15 bg-parchment">\
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
            Prova l'app →\
          </a>\
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
  <div id="cookieBar" class="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:max-w-sm z-[60] rounded-2xl bg-ink text-parchment shadow-2xl p-5 hidden">\
    <p class="text-sm leading-relaxed text-parchment/85">Usiamo cookie tecnici per far funzionare il sito e, con il tuo consenso, cookie di misurazione anonima. Dettagli nella <a href="/cookie" class="underline">Cookie Policy</a>.</p>\
    <div class="mt-4 flex gap-2">\
      <button data-cookie="accept" class="btn btn-clay px-4 py-2 text-sm flex-1">Accetta</button>\
      <button data-cookie="reject" class="btn btn-ghost border-parchment/30 text-parchment hover:border-parchment px-4 py-2 text-sm flex-1">Solo necessari</button>\
    </div>\
  </div>';

  function inject(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }

  document.addEventListener('DOMContentLoaded', function () {
    inject('site-nav', NAV);
    inject('site-footer', FOOTER);

    // anno corrente
    Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (e) { e.textContent = new Date().getFullYear(); });

    // mobile nav
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobileMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', String(open));
      });
      menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') menu.classList.add('hidden'); });
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
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = eased * target;
        el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var counters = document.querySelectorAll('[data-count-to]');
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { countTo(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.6 });
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

      wlForm.addEventListener('submit', function (ev) {
        ev.preventDefault();
        if (wlErr) wlErr.classList.add('hidden');
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
              if (wlDone) wlDone.classList.remove('hidden');
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

    // cookie banner
    if (!localStorage.getItem('crest-cookie')) {
      var wrap = document.createElement('div');
      wrap.innerHTML = COOKIE;
      document.body.appendChild(wrap);
      var bar = document.getElementById('cookieBar');
      if (bar) {
        setTimeout(function () { bar.classList.remove('hidden'); }, 800);
        bar.addEventListener('click', function (e) {
          var choice = e.target.getAttribute('data-cookie');
          if (choice) { localStorage.setItem('crest-cookie', choice); bar.remove(); }
        });
      }
    }
  });
})();
