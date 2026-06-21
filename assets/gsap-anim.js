/* ============================================================
   Crest — animazioni scroll avanzate (GSAP + ScrollTrigger)
   Caricato solo nella homepage. Se GSAP non è disponibile,
   app.js gestisce reveal/parallax con il fallback CSS/IO.
   ============================================================ */
window.addEventListener('DOMContentLoaded', function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('gsap-on');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    gsap.set('.reveal', { opacity: 1, y: 0, clearProps: 'transform' });
    return;
  }

  /* ---- barra di avanzamento ---- */
  var bar = document.createElement('div');
  bar.id = 'scrollProgress';
  document.body.appendChild(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.25 } });

  /* ---- reveal con stagger ed easing fluido ---- */
  gsap.set('.reveal', { opacity: 0, y: 32 });
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    once: true,
    onEnter: function (els) {
      gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, overwrite: true });
    },
  });

  /* ---- parallax scrub sui mockup (.parallax) ---- */
  gsap.utils.toArray('.parallax').forEach(function (el) {
    var speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
    gsap.fromTo(el,
      { y: speed * 130 },
      { y: -speed * 130, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
    );
  });

  /* ---- rise scrub: i pannelli mockup salgono entrando ---- */
  gsap.utils.toArray('[data-gsap-rise]').forEach(function (el) {
    gsap.fromTo(el,
      { yPercent: 16 },
      { yPercent: -4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 35%', scrub: true } }
    );
  });

  /* ---- titoli display: leggera "salita" scrubbata ---- */
  gsap.utils.toArray('[data-gsap-title]').forEach(function (el) {
    gsap.fromTo(el,
      { y: 24, opacity: 0.0 },
      { y: 0, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 55%', scrub: true } }
    );
  });

  /* ---- bande forest: il contenuto si avvicina con parallax negativo ---- */
  gsap.utils.toArray('[data-gsap-band]').forEach(function (band) {
    var inner = band.querySelector('[data-gsap-band-inner]') || band;
    gsap.fromTo(inner,
      { y: 40 },
      { y: -40, ease: 'none', scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true } }
    );
  });

  ScrollTrigger.refresh();
});
