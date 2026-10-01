const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('is-open');
    document.body.classList.remove('menu-open');
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isExpanded));
        menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
        navLinks.classList.toggle('is-open', !isExpanded);
        document.body.classList.toggle('menu-open', !isExpanded);
    });

    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            menuToggle.focus();
        }
    });

    const desktopQuery = window.matchMedia('(min-width: 761px)');
    if (desktopQuery.addEventListener) {
        desktopQuery.addEventListener('change', closeMenu);
    } else {
        desktopQuery.addListener(closeMenu);
    }
}

const revealItems = document.querySelectorAll('.js-reveal');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}

function isConfiguredPlaceholder(value) {
    return Boolean(value && !value.includes('[') && !value.includes(']'));
}

document.querySelectorAll('[data-live-demo-url]').forEach((button) => {
    const value = button.dataset.liveDemoUrl.trim();
    let demoUrl;
    try {
        demoUrl = new URL(value);
    } catch {
        button.disabled = true;
    }
    if (!demoUrl || demoUrl.protocol !== 'https:' || !isConfiguredPlaceholder(value)) {
        button.disabled = true;
        return;
    }
    button.disabled = false;
    const note = document.getElementById(button.getAttribute('aria-describedby'));
    if (note) note.textContent = 'Opens the project preview in a new tab.';
    button.addEventListener('click', () => window.open(demoUrl.href, '_blank', 'noopener,noreferrer'));
});

document.querySelectorAll('[data-project]').forEach((link) => {
    link.addEventListener('click', () => {
        const projectField = document.querySelector('#project-interest');
        if (projectField) projectField.value = link.dataset.project;
    });
});

document.querySelectorAll('[data-contact-email]').forEach((link) => {
    const email = link.dataset.contactEmail.trim();
    if (isConfiguredPlaceholder(email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        link.href = `mailto:${email}`;
    }
});

document.querySelectorAll('[data-contact-whatsapp]').forEach((link) => {
    const number = link.dataset.contactWhatsapp.trim();
    const digits = number.replace(/\D/g, '');
    if (isConfiguredPlaceholder(number) && /^\d{8,15}$/.test(digits)) {
        link.href = `https://wa.me/${digits}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        if (link.classList.contains('whatsapp-float')) {
            link.hidden = false;
            link.setAttribute('aria-label', 'Chat on WhatsApp');
        }
    }
});

document.querySelectorAll('[data-profile-url]').forEach((link) => {
    const value = link.dataset.profileUrl.trim();
    try {
        const profileUrl = new URL(value);
        if (isConfiguredPlaceholder(value) && profileUrl.protocol === 'https:') {
            link.href = profileUrl.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    } catch {
        link.href = '#contact';
    }
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!contactForm.reportValidity()) return;
        formStatus.textContent = 'Demo only: your details were not sent. Connect an email or form service before publishing.';
    });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
