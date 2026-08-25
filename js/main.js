
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('portfolioLang') || 'pt';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolioLang', lang);

    const elements = document.querySelectorAll('[data-pt][data-en]');
    elements.forEach(el => {
        if (el.hasAttribute('placeholder')) {
            el.placeholder = el.getAttribute(`data-${lang}`);
        } else {
            el.textContent = el.getAttribute(`data-${lang}`);
        }
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


function setupFilters(containerSelector, btnSelector, cardSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const filterBtns = document.querySelectorAll(btnSelector);
    const cards = document.querySelectorAll(cardSelector);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
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
}

setupFilters('.project-filters', '.project-filters .filter-btn', '.project-card');
setupFilters('.skill-filters', '.skill-filters .filter-btn', '.skill-card');


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

// G1 style update time calculation (Dynamic from GitHub Commits)
const updateTimeEl = document.getElementById('updateTime');
if (updateTimeEl) {
    let updateDate = new Date(); // default to now, will be replaced
    let isFetched = false;

    function updateElapsed() {
        if (!isFetched) return;
        const now = new Date();
        let diffMs = now - updateDate;
        if (diffMs < 0) diffMs = 0;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        let elapsedPt = '';
        let elapsedEn = '';
        
        if (diffMins < 60) {
            elapsedPt = diffMins <= 1 ? 'há 1 minuto' : `há ${diffMins} minutos`;
            elapsedEn = diffMins <= 1 ? '1 minute ago' : `${diffMins} minutes ago`;
        } else if (diffHours < 24) {
            elapsedPt = diffHours === 1 ? 'há 1 hora' : `há ${diffHours} horas`;
            elapsedEn = diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
        } else if (diffDays < 30) {
            elapsedPt = diffDays === 1 ? 'há 1 dia' : `há ${diffDays} dias`;
            elapsedEn = diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            elapsedPt = months === 1 ? 'há 1 mês' : `há ${months} meses`;
            elapsedEn = months === 1 ? '1 month ago' : `${months} months ago`;
        } else {
            const years = Math.floor(diffDays / 365);
            elapsedPt = years === 1 ? 'há 1 ano' : `há ${years} anos`;
            elapsedEn = years === 1 ? '1 year ago' : `${years} years ago`;
        }
        
        const day = String(updateDate.getDate()).padStart(2, '0');
        const month = String(updateDate.getMonth() + 1).padStart(2, '0');
        const year = updateDate.getFullYear();
        const hours = String(updateDate.getHours()).padStart(2, '0');
        const minutes = String(updateDate.getMinutes()).padStart(2, '0');
        
        const isEn = document.documentElement.lang === 'en';
        if (isEn) {
            updateTimeEl.textContent = `${month}/${day}/${year} ${hours}:${minutes} • Updated ${elapsedEn}`;
        } else {
            updateTimeEl.textContent = `${day}/${month}/${year} ${hours}h${minutes} • Atualizado ${elapsedPt}`;
        }
    }
    
    // Fetch latest commit date from GitHub API
    fetch('https://api.github.com/repos/anajulialeite/Meu_Portifolio/commits?per_page=1')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0 && data[0].commit) {
                updateDate = new Date(data[0].commit.committer.date);
                isFetched = true;
                updateElapsed();
            }
        })
        .catch(err => console.error("Error fetching commit date:", err));

    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => setTimeout(updateElapsed, 50));
    }
}
