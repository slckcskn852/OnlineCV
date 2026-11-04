gsap.registerPlugin(ScrollTrigger);

// Smooth scroll
const lenis = new Lenis({ lerp: 0.09 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', e => { e.preventDefault(); lenis.scrollTo(a.getAttribute('href')); }));

// Loader + hero intro
gsap.timeline()
  .to('.loader span', { scale: 1.2, opacity: 0, duration: .6, delay: .4 })
  .to('.loader', { yPercent: -100, duration: .8, ease: 'expo.inOut' }, '-=.2')
  .from('.title .line span', { yPercent: 110, stagger: .12, duration: 1.1, ease: 'expo.out' }, '-=.3')
  .from('.hero .reveal', { y: 30, opacity: 0, stagger: .12, duration: .8 }, '-=.7');

// Scroll reveals
gsap.utils.toArray('section .reveal').forEach(el =>
  gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' } }));

// Word-by-word scrub
document.querySelectorAll('.split').forEach(el => {
  el.innerHTML = el.textContent.split(' ').map(w => `<span class="w">${w}</span>`).join(' ');
  gsap.to(el.querySelectorAll('.w'), { opacity: 1, stagger: .05,
    scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 30%', scrub: true } });
});

// Counters
document.querySelectorAll('[data-count]').forEach(el => {
  const o = { v: 0 };
  gsap.to(o, { v: +el.dataset.count, duration: 2, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%' },
    onUpdate: () => el.textContent = Math.round(o.v) });
});

// Parallax
gsap.to('.photo img', { yPercent: -15, ease: 'none', scrollTrigger: { trigger: '.photo', scrub: true } });
gsap.to('.title', { yPercent: 40, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', scrub: true } });
ScrollTrigger.create({ onUpdate: s => gsap.to('.marquee', { skewY: gsap.utils.clamp(-15, 15, s.getVelocity() / -300), duration: .3, overwrite: true }) });

// Cursor
const cur = document.querySelector('.cursor');
addEventListener('mousemove', e => gsap.to(cur, { x: e.clientX, y: e.clientY, duration: .15 }));
document.querySelectorAll('a,.tilt').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});

// 3D tilt + glow follow
document.querySelectorAll('.tilt').forEach(el => {
  const glow = el.querySelector('.glow');
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    gsap.to(el, { rotateY: x * 10, rotateX: -y * 10, transformPerspective: 900, duration: .4 });
    if (glow) gsap.set(glow, { left: e.clientX - r.left, top: e.clientY - r.top });
  });
  el.addEventListener('mouseleave', () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: .6 }));
});

// Magnetic buttons
document.querySelectorAll('.magnetic').forEach(b => {
  b.addEventListener('mousemove', e => {
    const r = b.getBoundingClientRect();
    gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .3, y: (e.clientY - r.top - r.height / 2) * .3, duration: .3 });
  });
  b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.4)' }));
});

// Particle network background
const c = document.getElementById('bg'), ctx = c.getContext('2d');
let W, H, pts = [], mouse = { x: -999, y: -999 };
const resize = () => {
  W = c.width = innerWidth; H = c.height = innerHeight;
  pts = Array.from({ length: Math.min(90, W / 15) }, () => ({
    x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 }));
};
resize(); addEventListener('resize', resize);
addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
(function draw() {
  ctx.clearRect(0, 0, W, H);
  for (const p of pts) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
    if (dm < 150) { p.x += (p.x - mouse.x) / dm; p.y += (p.y - mouse.y) / dm; }
    ctx.fillStyle = 'rgba(255,45,85,.7)'; ctx.fillRect(p.x, p.y, 2, 2);
  }
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
    if (d < 130) {
      ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 130) * .35})`;
      ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
})();
