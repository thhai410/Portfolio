/**
 * Doan Thanh Hai (thhai) — Soumyajit Style Portfolio Script
 * Features: Typewriter engine, Starry space canvas, Theme toggle, I18n switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;

  // 1. Typewriter Engine
  const typewriterText = document.getElementById('typewriter-text');
  const rolesVI = [
    "AI Engineer",
    "Computer Vision Researcher",
    "Frontend Developer",
    "UI/UX Specialist @ Figma",
    "Computer Engineering @ HUST (GPA 3.61)"
  ];
  const rolesEN = [
    "AI Engineer",
    "Computer Vision Researcher",
    "Frontend Developer",
    "UI/UX Specialist @ Figma",
    "Computer Engineering @ HUST (GPA 3.61)"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typewriterSpeed = 100;

  function typeEffect() {
    let currentRoles = (html.getAttribute('lang') === 'en') ? rolesEN : rolesVI;
    let currentRole = currentRoles[roleIndex % currentRoles.length];

    if (isDeleting) {
      charIndex--;
      typewriterSpeed = 50;
    } else {
      charIndex++;
      typewriterSpeed = 100;
    }

    if (typewriterText) {
      typewriterText.textContent = currentRole.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typewriterSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex++;
      typewriterSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typewriterSpeed);
  }

  if (typewriterText) {
    typeEffect();
  }

  // 2. Starry Canvas Engine
  const canvas = document.getElementById('star-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2,
      opacity: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }));

    function animateStars() {
      ctx.clearRect(0, 0, width, height);
      const isDark = html.getAttribute('data-theme') === 'dark';

      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.speed = -star.speed;
        }

        ctx.fillStyle = isDark
          ? `rgba(205, 95, 248, ${star.opacity * 0.7})`
          : `rgba(126, 34, 206, ${star.opacity * 0.5})`;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animateStars);
    }
    animateStars();
  }

  // Interactive Cursor Glow Following Mouse
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
      if (!cursorGlow.classList.contains('active')) {
        cursorGlow.classList.add('active');
      }
    });

    window.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });
  }

  // ─── Koboyo Page-Mascot: Faithful port of the official library algorithm ───
  // Sprite sheet: 3×3 grid, background-size 300% 300%, positions via %
  // Direction order (row-major): up-left, up, up-right, left, center, right, down-left, down, down-right
  const DIRECTIONS = ['up-left', 'up', 'up-right', 'left', 'center', 'right', 'down-left', 'down', 'down-right'];
  const REACTIONS = ['blink', 'heart', 'sparkle', 'surprised', 'wink', 'bashful', 'sleepy', 'dizzy', 'delighted'];

  // Clockwise from right (matches atan2 with y pointing down)
  const CLOCKWISE = ['right', 'down-right', 'down', 'down-left', 'left', 'up-left', 'up', 'up-right'];
  const SECTOR = (Math.PI * 2) / CLOCKWISE.length; // 45°
  const HYSTERESIS = 0.12;  // radians: prevents flickering at sector boundaries
  const DEAD_ZONE = 40;    // px: distance from center where mascot stays 'center'

  // Map direction name → background-position via cell index
  function cellStyle(index) {
    return {
      x: (index % 3) * 50,        // 0%, 50%, 100%
      y: Math.floor(index / 3) * 50 // 0%, 50%, 100%
    };
  }
  function wrapAngle(a) { return Math.atan2(Math.sin(a), Math.cos(a)); }

  function applyCell(el, index) {
    const { x, y } = cellStyle(index);
    el.style.backgroundPosition = `${x}% ${y}%`;
  }

  const mascotContainer = document.getElementById('mascotContainer');
  const mascotDir = document.getElementById('mascotDir');      // directions layer
  const mascotReact = document.getElementById('mascotReact');     // reactions layer
  const mascotSquash = document.getElementById('mascotSquash');    // squash wrapper

  if (mascotContainer && mascotDir && mascotReact) {
    let currentSector = -1;
    let pointerPos = null;
    const boopsRef = { count: 0, at: 0 };
    let timers = [];
    let currentReaction = null;

    // Boop payoffs & timing (matches library exactly)
    const PAYOFFS = ['heart', 'sparkle', 'delighted'];
    const BOOP_PAYOFF = 120;   // ms until payoff reaction
    const BOOP_END = 560;   // ms until reaction clears
    const SQUASH_MS = 420;
    const DIZZY_AFTER = 4;
    const DIZZY_WINDOW = 1600;
    const DIZZY_END = 1100;
    const SQUASH_FRAMES = [
      { transform: 'scale(1,1)', easing: 'ease-in' },
      { transform: 'scale(1.10,0.86)', offset: 0.18, easing: 'ease-out' },
      { transform: 'scale(0.95,1.08)', offset: 0.45, easing: 'ease-in-out' },
      { transform: 'scale(1.03,0.97)', offset: 0.72, easing: 'ease-in-out' },
      { transform: 'scale(1,1)' }
    ];

    function setReaction(r) {
      currentReaction = r;
      if (r === null) {
        mascotDir.style.opacity = '1';
        mascotReact.style.opacity = '0';
      } else {
        const idx = REACTIONS.indexOf(r);
        applyCell(mascotReact, idx);
        mascotDir.style.opacity = '0';
        mascotReact.style.opacity = '1';
      }
    }

    function setDirection(name) {
      const idx = DIRECTIONS.indexOf(name);
      if (idx >= 0) applyCell(mascotDir, idx);
    }

    // Initial direction
    setDirection('center');
    setReaction(null);
    // Pre-load reactions sprite position
    applyCell(mascotReact, REACTIONS.indexOf('blink'));

    // Aim function (called on pointermove + scroll)
    // Use mascotSquash (the actual sprite) as center reference for accuracy
    function aim() {
      if (!pointerPos) return;
      const target = mascotSquash || mascotContainer;
      const box = target.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const dx = pointerPos.x - cx;
      const dy = pointerPos.y - cy;

      if (Math.hypot(dx, dy) < DEAD_ZONE) {
        currentSector = -1;
        setDirection('center');
        return;
      }

      const angle = Math.atan2(dy, dx);

      // Hold current sector if pointer hasn't clearly crossed into a new one
      if (
        currentSector !== -1 &&
        Math.abs(wrapAngle(angle - currentSector * SECTOR)) < SECTOR / 2 + HYSTERESIS
      ) return;

      currentSector = (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length;
      setDirection(CLOCKWISE[currentSector]);
    }

    // Only enable on devices with a fine pointer (mouse / trackpad)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('pointermove', (e) => {
        pointerPos = { x: e.clientX, y: e.clientY };
        aim();
      }, { passive: true });
      window.addEventListener('scroll', aim, { passive: true });
    }

    // Boop on click
    mascotContainer.addEventListener('click', () => {
      timers.forEach(clearTimeout);
      timers = [];
      const later = (ms, r) => { timers.push(setTimeout(() => setReaction(r), ms)); };

      const now = Date.now();
      const boops = boopsRef;
      boops.count = (now - boops.at < DIZZY_WINDOW) ? boops.count + 1 : 1;
      boops.at = now;

      if (boops.count >= DIZZY_AFTER) {
        boops.count = 0;
        setReaction('dizzy');
        later(DIZZY_END, null);
      } else {
        setReaction('blink');
        later(BOOP_PAYOFF, PAYOFFS[(boops.count - 1) % PAYOFFS.length]);
        later(BOOP_END, null);
      }

      // Squash-stretch animation
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && mascotSquash) {
        mascotSquash.animate(SQUASH_FRAMES, { duration: SQUASH_MS, easing: 'linear' });
      }
    });
  }



  // 3. Dual Theme Engine (Dark / Light)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('thhai_soumyajit_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('thhai_soumyajit_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // 4. Multi-Language Switcher (EN <-> VI)
  const langToggleBtn = document.getElementById('langToggleBtn');
  let currentLang = localStorage.getItem('thhai_soumyajit_lang') || 'vi';

  applyLanguage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'vi' ? 'en' : 'vi';
      localStorage.setItem('thhai_soumyajit_lang', currentLang);
      applyLanguage(currentLang);
    });
  }

  function applyLanguage(lang) {
    html.setAttribute('lang', lang);
    if (langToggleBtn) {
      langToggleBtn.textContent = lang === 'vi' ? '🌐 VI' : '🌐 EN';
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        el.innerHTML = i18n[lang][key];
      }
    });
  }

  // 5. Mobile Navigation Menu Toggle
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 6. Active Nav Link — scroll-based (reliable across all section sizes)
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sectionIds = ['home', 'about', 'contact'];

  function updateActiveNav() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    let current = 'home';

    for (const id of sectionIds) {
      const el = document.getElementById(id)
        || document.querySelector(`[id="${id}"]`);
      if (!el) continue;
      const sectionTop = el.getBoundingClientRect().top + scrollY;
      // Section becomes active when its top enters upper 60% of viewport
      if (scrollY >= sectionTop - windowH * 0.6) {
        current = id;
      }
    }

    // Edge case: if scrolled to the very bottom, activate last section
    if (scrollY + windowH >= docH - 10) {
      current = sectionIds[sectionIds.length - 1];
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav(); // set correct state on page load
});

// I18n Dictionary
const i18n = {
  vi: {
    nav_home: 'Trang chủ',
    nav_about: 'Giới thiệu',
    nav_contact: 'Liên hệ',
    greeting: 'Xin chào!',
    hero_title: 'MÌNH LÀ <span class="highlight">ĐOÀN THANH HẢI</span>',
    hero_intro: 'Mình là sinh viên năm cuối ngành <b>Kỹ thuật Máy tính</b> tại <b>HUST</b>, có 1 năm kinh nghiệm thực tế làm <span class="accent">AI Engineer</span>. Hiện tại mình đang tìm hiểu về <span class="accent">Computer Vision R&amp;D</span> và phát triển kỹ năng <span class="accent">Frontend / UI/UX</span>.',
    btn_cv: '📄 Tải CV',
    btn_contact: '✉ Liên hệ',
    about_title: 'ĐỂ MÌNH <span class="accent">TỰ GIỚI THIỆU</span>',
    about_p1: 'Mình là sinh viên năm cuối ngành <b>Kỹ thuật Máy tính tại HUST</b> với kết quả học tập <b>CPA 3.61 / 4.0</b>.',
    about_p2: 'Mình có 1 năm kinh nghiệm làm <span class="accent">AI Engineer tại A-Star Group</span> và hiện đang là <span class="accent">Intern Frontend Developer &amp; UI/UX tại VNet JSC</span>. Đam mê của mình là tìm hiểu về <span class="accent">Computer Vision R&amp;D</span>.',
    about_p3: 'Mình dành thời gian đọc <b>Research Papers</b>, thử nghiệm các mô hình CV và code với <b>Python, C/C++</b> kết hợp <b>Figma &amp; Frontend Web</b>.',
    skills_label: 'Kỹ năng &amp; Công cụ',
    contact_title: 'TÌM MÌNH TRÊN <span class="accent">MẠNG XÃ HỘI</span>',
    contact_sub: 'Đừng ngần ngại <span class="accent">kết nối</span> với mình nhé!'
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_contact: 'Contact',
    greeting: 'Hi There!',
    hero_title: "I'M <span class=\"highlight\">DOAN THANH HAI</span>",
    hero_intro: 'I am a final-year <b>Computer Engineering</b> student at <b>HUST</b>, with 1 year of hands-on experience as an <span class="accent">AI Engineer</span>. I am currently exploring <span class="accent">Computer Vision R&amp;D</span> and building my <span class="accent">Frontend / UI/UX</span> skills.',
    btn_cv: '📄 Download CV',
    btn_contact: '✉ Get in Touch',
    about_title: 'LET ME <span class="accent">INTRODUCE MYSELF</span>',
    about_p1: 'I am a final-year student majoring in <b>Computer Engineering at HUST</b> with an academic record of <b>CPA 3.61 / 4.0</b>.',
    about_p2: 'I have 1 year of experience as an <span class="accent">AI Engineer at A-Star Group</span> and currently work as an <span class="accent">Intern Frontend Developer &amp; UI/UX at VNet JSC</span>. My passion is <span class="accent">Computer Vision R&amp;D</span>.',
    about_p3: 'I spend my time reading <b>Research Papers</b>, experimenting with CV models and coding with <b>Python, C/C++</b> alongside <b>Figma &amp; Frontend Web</b>.',
    skills_label: 'Skills &amp; Tools',
    contact_title: 'FIND ME <span class="accent">ON</span>',
    contact_sub: 'Feel free to <span class="accent">connect</span> with me!'
  }
};

