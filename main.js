// ── Sticky nav
const nav = document.getElementById('nav');
if (nav) {
    if (nav.classList.contains('solid')) {
        // subpage nav — always solid, no scroll toggle needed
    } else {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }
}

// ── Mobile menu
const ham      = document.getElementById('ham');
const mobMenu  = document.getElementById('mobileMenu');
const mobClose = document.getElementById('mobileClose');
const mobLinks = document.querySelectorAll('.mob-link, .mob-sublink, .mob-cta');

if (ham && mobMenu) {
    ham.addEventListener('click', () => {
        mobMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    const close = () => { mobMenu.classList.remove('open'); document.body.style.overflow = ''; };
    if (mobClose) mobClose.addEventListener('click', close);
    mobLinks.forEach(l => l.addEventListener('click', close));
}

// ── Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// ── Scroll reveal
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ── Animated counters
const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const target = +e.target.dataset.count;
        let n = 0; const step = target / 36;
        const id = setInterval(() => {
            n = Math.min(n + step, target);
            e.target.textContent = Math.floor(n);
            if (n >= target) clearInterval(id);
        }, 38);
        co.unobserve(e.target);
    });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(c => co.observe(c));
