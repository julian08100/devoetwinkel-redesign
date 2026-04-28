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

// ── Cookie banner
(function () {
    if (localStorage.getItem('dvw-cookie')) return;
    const b = document.createElement('div');
    b.id = 'cookie-banner';
    b.innerHTML = '<div class="cookie-header"><div class="cookie-icon-wrap">🍪</div><strong>Cookies & privacy</strong></div><p class="cookie-text">Wij gebruiken cookies om u de beste ervaring op onze website te bieden. Door verder te gaan gaat u akkoord met ons cookiegebruik.</p><div class="cookie-actions"><button class="cookie-accept" id="cookie-accept">Accepteren</button><button class="cookie-decline" id="cookie-decline">Weigeren</button></div>';
    document.body.appendChild(b);
    requestAnimationFrame(() => requestAnimationFrame(() => b.classList.add('visible')));
    const dismiss = () => { b.classList.remove('visible'); setTimeout(() => b.remove(), 550); };
    document.getElementById('cookie-accept').onclick = () => { localStorage.setItem('dvw-cookie', '1'); dismiss(); };
    document.getElementById('cookie-decline').onclick = () => { localStorage.setItem('dvw-cookie', '0'); dismiss(); };
})();

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
