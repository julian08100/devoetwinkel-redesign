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

// ── Voetscandag announcement banner
// Update the date below when a new voetscandag is announced — the banner hides itself after this date.
(function () {
    const eventDate = '2026-08-20'; // YYYY-MM-DD — banner hides the day after this date
    const eventLabel = 'donderdag 20 augustus 2026';
    const today = new Date().toISOString().slice(0, 10);
    if (today > eventDate) return;
    if (sessionStorage.getItem('scandag-v5')) return;
    const b = document.createElement('div');
    b.id = 'scandag-banner';
    b.innerHTML = '<div class="scandag-inner"><div class="scandag-icon">📅</div><div class="scandag-text"><strong>Gratis voetscandag</strong><span>' + eventLabel + ' — op afspraak, bel 040-8446452</span></div><a href="gratis-voetscandag.html" class="scandag-cta">Meer info →</a><button class="scandag-close" id="scandag-close" aria-label="Sluiten">×</button></div>';
    document.body.appendChild(b);
    setTimeout(() => b.classList.add('visible'), 800);
    document.getElementById('scandag-close').onclick = () => {
        b.classList.remove('visible');
        sessionStorage.setItem('scandag-v5', '1');
        setTimeout(() => b.remove(), 500);
    };
})();

// ── Cookie banner (gekoppeld aan Google Consent Mode)
(function () {
    const KEUZE = 'dvw-cookie-v2';
    const lees = () => { try { return localStorage.getItem(KEUZE); } catch (e) { return null; } };
    const schrijf = v => { try { localStorage.setItem(KEUZE, v); } catch (e) {} };

    // Geef de keuze door aan GTM. Weigeren betekent ook echt weigeren:
    // analytics- en advertentiecookies blijven dan op 'denied' staan.
    const meldConsent = toegestaan => {
        if (typeof gtag !== 'function') return;
        const stand = toegestaan ? 'granted' : 'denied';
        gtag('consent', 'update', {
            'ad_storage': stand,
            'ad_user_data': stand,
            'ad_personalization': stand,
            'analytics_storage': stand
        });
        // Pas na toestemming worden GTM en ContentSquare überhaupt opgehaald.
        if (toegestaan && typeof window.dvwLaadTags === 'function') window.dvwLaadTags();
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: toegestaan ? 'cookie_accepted' : 'cookie_declined' });
    };

    if (lees() !== null) { meldConsent(lees() === '1'); return; }

    const b = document.createElement('div');
    b.id = 'cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookievoorkeuren');
    b.innerHTML = '<div class="cookie-header"><div class="cookie-icon-wrap">\u{1F36A}</div><strong>Cookies &amp; privacy</strong></div>'
        + '<p class="cookie-text">Wij gebruiken cookies om onze website te verbeteren en ons verkeer te analyseren. '
        + 'Weigert u, dan plaatsen wij alleen de cookies die nodig zijn om de site te laten werken. '
        + '<a href="privacy-policy.html">Lees ons privacybeleid</a>.</p>'
        + '<div class="cookie-actions"><button class="cookie-accept" id="cookie-accept">Accepteren</button>'
        + '<button class="cookie-decline" id="cookie-decline">Weigeren</button></div>';
    document.body.appendChild(b);
    setTimeout(() => b.classList.add('visible'), 1400);

    const sluit = () => { b.classList.remove('visible'); setTimeout(() => b.remove(), 550); };
    document.getElementById('cookie-accept').onclick = () => { schrijf('1'); meldConsent(true); sluit(); };
    document.getElementById('cookie-decline').onclick = () => { schrijf('0'); meldConsent(false); sluit(); };
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
