const menuToggle = document.querySelector('.menu-toggle');
const navigationMenu = document.querySelector('.nav-menu');
const navigationLinks = document.querySelectorAll('.nav-menu a');

function setMenuOpen(isOpen) {
    if (!menuToggle || !navigationMenu) return;

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    navigationMenu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
}

menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
});

navigationLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
});

document.addEventListener('click', (event) => {
    if (menuToggle?.getAttribute('aria-expanded') !== 'true') return;
    if (!navigationMenu?.contains(event.target) && !menuToggle?.contains(event.target)) {
        setMenuOpen(false);
    }
});

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
}