/* ============================================================
   Crest — animazioni GSAP (homepage only)
   Entrance hero, nav transparency, scroll reveals, parallax
   ============================================================ */
window.addEventListener('DOMContentLoaded', function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('gsap-on');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    // phone si muove verso l'alto (parallax contrario)
    gsap.to('#hero-device', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
    });
    // testo scivola su e sfuma
    gsap.to(['#hero-badge', '#hero-sub', '#hero-proof'], {
      yPercent: 20, opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: '55% top', scrub: true }
    });
    gsap.to(['#hero-l1', '#hero-l2', '#hero-l3'], {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: '55% top', scrub: true }
    });
    // scroll indicator scompare subito
    gsap.to('#hero-scroll-ind', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: '12% top', scrub: true }
    });
  }

  /* ================================================================
     REVEAL CON STAGGER — elementi .reveal in tutte le sezioni
  ================================================================ */
  gsap.set('.reveal', { opacity: 0, y: 34 });
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    once: true,
    onEnter: function (els) {
      gsap.to(els, {
        opacity: 1, y: 0,
        duration: 0.9, ease: 'power3.out',
        stagger: 0.09, overwrite: true
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
});
