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
        <svg width="28" height="28" viewBox="0 0 32 32" class="shrink-0" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#1E3A2F"/><path d="M16 7l7 13h-4l-3-5.6L13 20H9z" fill="#F4EDE0"/></svg>\
        <span class="font-display text-xl font-semibold tracking-tightest">Crest</span>\
      </a>\
      <div class="hidden md:flex items-center gap-8 text-sm text-ink/70">\
        <a href="/#soluzione" class="link-underline hover:text-ink">Prodotto</a>\
        <a href="/#come-funziona" class="link-underline hover:text-ink">Come funziona</a>\
        <a href="/faq" class="link-underline hover:text-ink">FAQ</a>\
        <a href="/chi-siamo" class="link-underline hover:text-ink">Chi siamo</a>\
      </div>\
      <div class="flex items-center gap-3">\
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
        <a href="/faq" class="py-2.5 link-underline w-max">FAQ</a>\
        <a href="/chi-siamo" class="py-2.5 link-underline w-max">Chi siamo</a>\
        <a href="/contatti" class="py-2.5 link-underline w-max">Contatti</a>\
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
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 7l7 13h-4l-3-5.6L13 20H9z" fill="#F4EDE0"/></svg>\
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
            <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 7l7 13h-4l-3-5.6L13 20H9z" fill="#F4EDE0"/></svg>San Marino · IT\
          </div>\
          <a href="mailto:ciao@crest.sm" class="mt-4 block text-sm text-parchment/80 link-underline w-max">ciao@crest.sm</a>\
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

    // Tally: mostra iframe se configurato, nascondi fallback
    var iframe = document.querySelector('.js-tally-iframe');
    if (iframe && iframe.getAttribute('data-tally-src').indexOf('TALLY_FORM_ID') === -1) {
      iframe.removeAttribute('hidden');
      var fb = document.querySelector('.js-fallback-form');
      if (fb) fb.style.display = 'none';
    }
    var form = document.querySelector('.js-fallback-form');
    var done = document.querySelector('.js-fallback-done');
    if (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        form.classList.add('hidden');
        if (done) done.classList.remove('hidden');
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
