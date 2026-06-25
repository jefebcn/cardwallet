/* ============================================================
   Crest — animazioni GSAP (homepage only)
   Entrance hero, nav transparency, scroll reveals, parallax
   ============================================================ */
window.addEventListener('DOMContentLoaded', function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('gsap-on');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================================================================
     SMOOTH SCROLL (Lenis) — solo desktop con puntatore fine.
     Su mobile/touch resta lo scroll nativo (non tocca i fix mobile).
  ================================================================ */
  if (window.Lenis && !reduce &&
      window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) {
    var lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    // i link àncora usano lo scroll fluido di Lenis
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (!a) return;
      var hash = a.getAttribute('href').replace(/^\//, '');
      if (hash.length < 2) return;
      var tgt = document.querySelector(hash);
      if (tgt) { e.preventDefault(); lenis.scrollTo(tgt, { offset: -80 }); }
    });
    window.__lenis = lenis;
  }
  if (reduce) {
    gsap.set('.reveal', { opacity: 1, y: 0, clearProps: 'transform' });
    gsap.set(['#hero-l1', '#hero-l2', '#hero-l3'], { y: '0%', clearProps: 'transform' });
    gsap.set(['#hero-badge', '#hero-sub', '#hero-proof', '#hero-device', '#hero-card', '#hero-notif', '#hero-scroll-ind'], { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'all' });
    return;
  }

  /* ---- barra avanzamento scroll ---- */
  var bar = document.createElement('div');
  bar.id = 'scrollProgress';
  document.body.appendChild(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.25 } });

  /* ================================================================
     NAV TRANSPARENCY — trasparente sul hero scuro, solida dopo
  ================================================================ */
  var siteNav = document.getElementById('site-nav');
  function updateNavTransparency() {
    if (!siteNav) return;
    var hero = document.getElementById('hero');
    var threshold = hero ? hero.offsetHeight * 0.45 : 300;
    if (window.scrollY < threshold) {
      siteNav.classList.add('nav-hero');
    } else {
      siteNav.classList.remove('nav-hero');
    }
  }
  window.addEventListener('scroll', updateNavTransparency, { passive: true });
  updateNavTransparency();

  /* ================================================================
     HERO ENTRANCE — animazione di caricamento
  ================================================================ */
  var heroTl = gsap.timeline({ delay: 0.15 });

  // phone device: sale e appare
  heroTl.to('#hero-device', {
    opacity: 1, y: 0, scale: 1,
    duration: 1.1, ease: 'power4.out'
  }, 0.05);

  // badge
  heroTl.to('#hero-badge', {
    opacity: 1, y: 0,
    duration: 0.7, ease: 'power3.out'
  }, 0.25);

  // titolo: le 3 righe salgono in sequenza (text-reveal effect)
  heroTl.to('#hero-l1', {
    y: '0%', duration: 0.9, ease: 'power4.out'
  }, 0.35);
  heroTl.to('#hero-l2', {
    y: '0%', duration: 0.9, ease: 'power4.out'
  }, 0.47);
  heroTl.to('#hero-l3', {
    y: '0%', duration: 0.9, ease: 'power4.out'
  }, 0.59);

  // card + notifica sul telefono
  heroTl.to('#hero-card', {
    opacity: 1, duration: 0.7, ease: 'power3.out'
  }, 0.6);
  heroTl.to('#hero-notif', {
    opacity: 1, x: 0, duration: 0.6, ease: 'power3.out'
  }, 0.72);

  // sub + proof
  heroTl.to('#hero-sub', {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
  }, 0.68);
  heroTl.to('#hero-proof', {
    opacity: 1, duration: 0.6, ease: 'power2.out'
  }, 0.80);

  // scroll indicator
  heroTl.to('#hero-scroll-ind', {
    opacity: 1, duration: 0.6, ease: 'power2.out'
  }, 1.05);

  // scroll dot bounce
  gsap.to('#scroll-dot', {
    y: 8, duration: 0.75, ease: 'power2.inOut', yoyo: true, repeat: -1, delay: 1.4
  });

  /* ================================================================
     HERO SCROLL PARALLAX — profondità quando scendi
  ================================================================ */
  var hero = document.getElementById('hero');
  if (hero) {
    var isMobile = window.matchMedia('(max-width: 767px)').matches;
    // phone si muove verso l'alto — solo desktop (su mobile il GSAP ticker ogni frame causa jank)
    if (!isMobile) {
      gsap.to('#hero-device', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
    }
    // L'INTERO blocco di testo (badge, titolo, sottotitolo + pulsanti CTA, proof)
    // si muove come UNA sola unità con una leggera parallasse: nessun elemento
    // sfuma e niente parallasse separata sul titolo. Così i pulsanti e il
    // contatore "318" restano coesi e visibili finché l'hero è in vista.
    // BUG STORICO: prima il titolo aveva una parallasse propria (yPercent:12)
    // mentre sub/proof no e il proof sfumava — il titolo "restava" sullo schermo
    // e sottotitolo, pulsanti e contatore sparivano subito appena si scrollava.
    var heroCopy = document.getElementById('hero-copy');
    if (heroCopy && !isMobile) {
      gsap.to(heroCopy, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
    }
    // scroll indicator scompare subito
    gsap.to('#hero-scroll-ind', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: '12% top', scrub: true }
    });
  }

  /* ================================================================
     MOUSE PARALLAX — il gruppo device reagisce al cursore (3D depth)
     Scrive su --px-x/--px-y (proprietà `translate`), niente conflitti.
  ================================================================ */
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canHover && hero) {
    var pxLayers = Array.prototype.slice.call(hero.querySelectorAll('.px-layer'));
    var targetX = 0, targetY = 0, curX = 0, curY = 0, rafId = null;

    function loop() {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      pxLayers.forEach(function (el) {
        var depth = parseFloat(el.getAttribute('data-px')) || 0;
        el.style.setProperty('--px-x', (curX * depth).toFixed(2) + 'px');
        el.style.setProperty('--px-y', (curY * depth).toFixed(2) + 'px');
      });
      if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
        rafId = requestAnimationFrame(loop);
      } else { rafId = null; }
    }
    // disattivo la transizione CSS: qui guida il rAF (più fluido)
    pxLayers.forEach(function (el) { el.style.transition = 'none'; });
    window.addEventListener('pointermove', function (e) {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;   // -1 .. 1
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!rafId) rafId = requestAnimationFrame(loop);
    }, { passive: true });
    // leggera inclinazione 3D del telefono col mouse
    var phoneEl = hero.querySelector('.phone.px-layer');
    if (phoneEl) {
      var phoneFloat = phoneEl.closest('.device-float');
      if (phoneFloat) phoneFloat.style.perspective = '1200px';
      gsap.set(phoneEl, { transformStyle: 'preserve-3d' });
      var rotX = gsap.quickTo(phoneEl, 'rotationX', { duration: 0.6, ease: 'power2.out' });
      var rotY = gsap.quickTo(phoneEl, 'rotationY', { duration: 0.6, ease: 'power2.out' });
      window.addEventListener('pointermove', function (e) {
        rotY((e.clientX / window.innerWidth - 0.5) * 10);
        rotX((e.clientY / window.innerHeight - 0.5) * -7);
      }, { passive: true });
    }
  }

  /* ================================================================
     REVEAL CON STAGGER — elementi .reveal in tutte le sezioni
  ================================================================ */
  gsap.set('.reveal', { opacity: 0, y: 34 });
  ScrollTrigger.batch('.reveal', {
    start: 'top 95%',
    once: true,
    onEnter: function (els) {
      gsap.to(els, {
        opacity: 1, y: 0,
        duration: 0.9, ease: 'power3.out',
        stagger: 0.09, overwrite: true
      });
      // Re-trigger counters that may have animated while the container was invisible
      els.forEach(function (el) {
        el.querySelectorAll('[data-count-to]').forEach(function (counter) {
          if (typeof window.countTo === 'function') window.countTo(counter);
        });
      });
    }
  });

  /* ================================================================
     PARALLAX SCRUB — mockup .parallax con data-speed
  ================================================================ */
  gsap.utils.toArray('.parallax').forEach(function (el) {
    var speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
    gsap.fromTo(el,
      { y: speed * 130 },
      { y: -speed * 130, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
  });

  /* ================================================================
     RISE SCRUB — pannelli mockup salgono entrando
  ================================================================ */
  gsap.utils.toArray('[data-gsap-rise]').forEach(function (el) {
    gsap.fromTo(el,
      { yPercent: 14 },
      { yPercent: -4, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 35%', scrub: true }
      }
    );
  });

  /* ================================================================
     TITOLI DISPLAY — leggera salita scrubbata
  ================================================================ */
  gsap.utils.toArray('[data-gsap-title]').forEach(function (el) {
    gsap.fromTo(el,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 55%', scrub: true }
      }
    );
  });

  ScrollTrigger.refresh();

  // Refresh after all resources (fonts, images) are fully loaded
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });

  // iOS Safari: address bar hides/shows on scroll, changing viewport height
  if (window.visualViewport) {
    var vpTimer;
    window.visualViewport.addEventListener('resize', function () {
      clearTimeout(vpTimer);
      vpTimer = setTimeout(function () { ScrollTrigger.refresh(); }, 150);
    });
  }
});
