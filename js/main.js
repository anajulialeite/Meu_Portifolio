
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('portfolioLang') || 'pt';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolioLang', lang);

    const elements = document.querySelectorAll('[data-pt][data-en]');
    elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    const flag = langToggle.querySelector('.lang-flag');
    const label = langToggle.querySelector('.lang-label');

    if (lang === 'pt') {
        flag.textContent = '🇧🇷';
        label.textContent = 'PT';
        document.documentElement.lang = 'pt-BR';
    } else {
        flag.textContent = '🇺🇸';
        label.textContent = 'EN';
        document.documentElement.lang = 'en';
    }
}

langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'pt' ? 'en' : 'pt');
});

setLanguage(currentLang);


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});


navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});


const sections = document.querySelectorAll('.section');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinkEls.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();


const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');

                setTimeout(() => card.classList.add('revealed'), 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});


const header = document.getElementById('header');

function updateHeaderBg() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (window.scrollY > 50) {
        header.style.background = isLight ? 'rgba(248, 247, 244, 0.95)' : 'rgba(10, 10, 15, 0.95)';
    } else {
        header.style.background = isLight ? 'rgba(248, 247, 244, 0.8)' : 'rgba(10, 10, 15, 0.8)';
    }
}

window.addEventListener('scroll', updateHeaderBg);


const themeToggle = document.getElementById('themeToggle');

function getPreferredTheme() {
    const saved = localStorage.getItem('portfolioTheme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolioTheme', theme);
    themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
    updateHeaderBg();
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
});

setTheme(getPreferredTheme());
