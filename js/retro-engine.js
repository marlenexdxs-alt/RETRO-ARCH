/**
 * RETROARCH - MOTOR INTERACTIVO RETRO CYBER & REDMAGIC MOTION (OPTIMIZADO)
 * - Audio Sintetizado 8-Bit (Web Audio API)
 * - Fantasmas y Pac-Man Flotantes Interactivos (Sin bloqueo de puntero)
 * - Scroll Nativo 60/120 FPS sin trabas ni congelamiento
 * - 3D Tilt Optimizado con requestAnimationFrame
 * - ScrollTrigger con Auto-Unobserve para liberar CPU/GPU
 * - Canvas Horizon Retro pausado automáticamente al hacer scroll
 * - Filtro CRT Scanlines con Toggle
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. MOTOR DE AUDIO 8-BIT SINTETIZADO (WEB AUDIO API - 100% NATIVO)
  // ==========================================================================
  let audioCtx = null;
  let sfxEnabled = true;

  const initAudio = () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  // Sonido de Moneda Arcade (Insert Coin)
  const playCoinSound = () => {
    if (!sfxEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch (e) {
      console.warn('Audio notice:', e);
    }
  };

  // Sonido de Fantasma / Power-Up Arcade
  const playGhostSound = () => {
    if (!sfxEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.12);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.24);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {
      console.warn(e);
    }
  };

  // Sonido de Click / Blip Retro
  const playBlipSound = () => {
    if (!sfxEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      console.warn(e);
    }
  };

  // Sonido de Entrada al Catálogo (Doble Chime Retro Ascendente)
  const playCatalogEntrySound = () => {
    if (!sfxEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;

      // Nota 1
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.06);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.07);

      // Nota 2 aguda (Chime de selección)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now + 0.08); // A5
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.15); // D6
      gain2.gain.setValueAtTime(0.09, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.18);
    } catch (e) {
      console.warn(e);
    }
  };

  // Debounce para sonidos al pasar el ratón (evita sobrecarga durante el scroll)
  let lastBlipTime = 0;
  const triggerHoverBlip = () => {
    const now = Date.now();
    if (now - lastBlipTime > 65) {
      lastBlipTime = now;
      playBlipSound();
    }
  };

  // ==========================================================================
  // 2. SPRITES DE PAC-MAN Y FANTASMAS (BLINKY, PINKY, INKY, CLYDE)
  // ==========================================================================
  const GHOST_SVGS = {
    blinky: `
      <svg viewBox="0 0 28 28" width="100%" height="100%">
        <path d="M4 14 C4 8 8 4 14 4 C20 4 24 8 24 14 L24 24 L21 21 L18 24 L14 21 L10 24 L7 21 L4 24 Z" fill="#ff2a55"/>
        <rect x="7" y="10" width="5" height="6" rx="2" fill="#ffffff"/>
        <rect x="16" y="10" width="5" height="6" rx="2" fill="#ffffff"/>
        <rect x="10" y="12" width="2.5" height="2.5" fill="#002288"/>
        <rect x="19" y="12" width="2.5" height="2.5" fill="#002288"/>
      </svg>
    `,
    pinky: `
      <svg viewBox="0 0 28 28" width="100%" height="100%">
        <path d="M4 14 C4 8 8 4 14 4 C20 4 24 8 24 14 L24 24 L21 21 L18 24 L14 21 L10 24 L7 21 L4 24 Z" fill="#ff69b4"/>
        <rect x="7" y="10" width="5" height="6" rx="2" fill="#ffffff"/>
        <rect x="16" y="10" width="5" height="6" rx="2" fill="#ffffff"/>
        <rect x="8" y="12" width="2.5" height="2.5" fill="#002288"/>
        <rect x="17" y="12" width="2.5" height="2.5" fill="#002288"/>
      </svg>
    `,
    inky: `
      <svg viewBox="0 0 28 28" width="100%" height="100%">
        <path d="M4 14 C4 8 8 4 14 4 C20 4 24 8 24 14 L24 24 L21 21 L18 24 L14 21 L10 24 L7 21 L4 24 Z" fill="#00f0ff"/>
        <rect x="7" y="10" width="5" height="6" rx="2" fill="#ffffff"/>
        <rect x="16" y="10" width="5" height="6" rx="2" fill="#ffffff"/>
        <rect x="9" y="13" width="2.5" height="2.5" fill="#002288"/>
        <rect x="18" y="13" width="2.5" height="2.5" fill="#002288"/>
      </svg>
    `,
    clyde: `
      <svg viewBox="0 0 28 28" width="100%" height="100%">
        <path d="M4 14 C4 8 8 4 14 4 C20 4 24 8 24 14 L24 24 L21 21 L18 24 L14 21 L10 24 L7 21 L4 24 Z" fill="#ffaa00"/>
        <rect x="7" y="10" width="5" height="6" rx="2" fill="#ffffff"/>
        <rect x="16" y="10" width="5" height="6" rx="2" fill="#ffffff"/>
        <rect x="7.5" y="11" width="2.5" height="2.5" fill="#002288"/>
        <rect x="16.5" y="11" width="2.5" height="2.5" fill="#002288"/>
      </svg>
    `,
    scared: `
      <svg viewBox="0 0 28 28" width="100%" height="100%">
        <path d="M4 14 C4 8 8 4 14 4 C20 4 24 8 24 14 L24 24 L21 21 L18 24 L14 21 L10 24 L7 21 L4 24 Z" fill="#1e3a8a"/>
        <rect x="8" y="10" width="3" height="3" fill="#ffbe0b"/>
        <rect x="17" y="10" width="3" height="3" fill="#ffbe0b"/>
        <path d="M7 19 L10 17 L13 19 L16 17 L19 19 L21 17" stroke="#ffbe0b" stroke-width="1.8" fill="none"/>
      </svg>
    `
  };

  // Crear e inyectar el contenedor del mundo Pac-Man
  const initPacmanWorld = () => {
    let world = document.querySelector('.pacman-world');
    if (!world) {
      world = document.createElement('div');
      world.className = 'pacman-world';
      document.body.appendChild(world);
    }

    // Datos de los 4 fantasmas flotantes
    const ghostsData = [
      { type: 'blinky', top: '18%', left: '4%', delay: '0s', duration: '3.2s' },
      { type: 'inky', top: '35%', right: '5%', delay: '0.8s', duration: '2.8s' },
      { type: 'pinky', top: '65%', left: '6%', delay: '1.4s', duration: '3.5s' },
      { type: 'clyde', top: '78%', right: '7%', delay: '0.4s', duration: '3.0s' }
    ];

    ghostsData.forEach((data) => {
      const ghostEl = document.createElement('div');
      ghostEl.className = 'retro-ghost';
      ghostEl.dataset.type = data.type;
      ghostEl.style.top = data.top;
      if (data.left) ghostEl.style.left = data.left;
      if (data.right) ghostEl.style.right = data.right;
      ghostEl.style.animationDelay = data.delay;
      ghostEl.style.animationDuration = data.duration;
      ghostEl.innerHTML = GHOST_SVGS[data.type];

      // Interacción al hacer clic en un fantasma
      ghostEl.addEventListener('click', (e) => {
        playGhostSound();
        spawnScorePopup(e.clientX, e.clientY, '+200');
        incrementCredits(1);

        ghostEl.innerHTML = GHOST_SVGS.scared;
        setTimeout(() => {
          ghostEl.innerHTML = GHOST_SVGS[data.type];
        }, 1800);
      });

      world.appendChild(ghostEl);
    });

    startPacmanParade(world);
  };

  // Pac-Man y Fantasmas cruzando la pantalla sin bloquear eventos del mouse
  const startPacmanParade = (container) => {
    const parade = document.createElement('div');
    parade.className = 'pacman-parade';
    parade.innerHTML = `
      <div class="pacman-chomper"></div>
      <div class="pacman-dot"></div>
      <div class="pacman-dot"></div>
      <div class="pacman-dot"></div>
      <div class="retro-ghost" style="position:relative; width:34px; height:34px; pointer-events:auto;">${GHOST_SVGS.blinky}</div>
      <div class="retro-ghost" style="position:relative; width:34px; height:34px; pointer-events:auto;">${GHOST_SVGS.pinky}</div>
      <div class="retro-ghost" style="position:relative; width:34px; height:34px; pointer-events:auto;">${GHOST_SVGS.inky}</div>
      <div class="retro-ghost" style="position:relative; width:34px; height:34px; pointer-events:auto;">${GHOST_SVGS.clyde}</div>
    `;

    // Clic en chomper para puntos extra
    const chomper = parade.querySelector('.pacman-chomper');
    if (chomper) {
      chomper.style.pointerEvents = 'auto';
      chomper.addEventListener('click', (e) => {
        playGhostSound();
        spawnScorePopup(e.clientX, e.clientY, '★ 1000 PTS ★');
        incrementCredits(5);
      });
    }

    container.appendChild(parade);

    const runParade = () => {
      parade.style.transition = 'none';
      parade.style.left = '-500px';

      setTimeout(() => {
        const screenWidth = window.innerWidth;
        parade.style.transition = 'left 15s linear';
        parade.style.left = (screenWidth + 550) + 'px';
      }, 100);
    };

    setTimeout(runParade, 3500);
    setInterval(runParade, 26000);
  };

  // Mensaje flotante (+200 PTS)
  const spawnScorePopup = (x, y, text) => {
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = text;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 1000);
  };

  // ==========================================================================
  // 3. CANVAS HORIZON RETRO OPTIMIZADO (PAUSA AUTOMÁTICA EN SCROLL)
  // ==========================================================================
  const initHorizonCanvas = () => {
    const canvas = document.getElementById('retro-horizon-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    let gridOffset = 0;
    let isCanvasVisible = true;
    let animId = null;

    const stars = [];
    const numStars = 65;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.65),
          size: Math.random() * 1.8 + 0.6,
          alpha: Math.random()
        });
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Pausar el canvas cuando el banner ya no esté a la vista (Ahorro total de GPU/CPU)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isCanvasVisible = entry.isIntersecting;
        if (isCanvasVisible && !animId) {
          animId = requestAnimationFrame(draw);
        } else if (!isCanvasVisible && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      });
    }, { threshold: 0.05 });

    observer.observe(canvas.parentElement);

    const draw = () => {
      if (!isCanvasVisible) {
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Dibujar estrellas titilantes
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha += (Math.random() - 0.5) * 0.04;
        if (star.alpha < 0.15) star.alpha = 0.15;
        if (star.alpha > 0.95) star.alpha = 0.95;

        ctx.fillStyle = `rgba(0, 240, 255, ${star.alpha})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }

      // Dibujar horizonte 3D
      const horizonY = height * 0.62;

      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      // Líneas horizontales en perspectiva
      gridOffset = (gridOffset + 1.0) % 32;
      ctx.lineWidth = 1;

      for (let y = horizonY; y < height; y += 9) {
        const progress = (y - horizonY) / (height - horizonY);
        const lineSpacing = Math.pow(progress, 2) * 105;
        const currentY = horizonY + lineSpacing + (gridOffset * progress);

        if (currentY < height) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${progress * 0.32})`;
          ctx.beginPath();
          ctx.moveTo(0, currentY);
          ctx.lineTo(width, currentY);
          ctx.stroke();
        }
      }

      // Líneas verticales en fuga
      const vanishX = width / 2;
      const numVerticals = 18;
      const spread = width * 1.5;

      for (let i = 0; i <= numVerticals; i++) {
        const xBottom = (i / numVerticals) * spread - (spread - width) / 2;
        ctx.strokeStyle = 'rgba(255, 42, 85, 0.22)';
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(xBottom, height);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
  };

  // ==========================================================================
  // 4. 3D TILT ULTRA OPTIMIZADO (CON REQUESTANIMATIONFRAME)
  // ==========================================================================
  const init3DCardTilt = () => {
    const cards = document.querySelectorAll('.product-card, .feature-box');

    cards.forEach(card => {
      let isTicking = false;

      card.addEventListener('mousemove', (e) => {
        if (isTicking) return;
        isTicking = true;

        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -6.5; // Suave y responsivo
          const rotateY = ((x - centerX) / centerX) * 6.5;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
          isTicking = false;
        });
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  };

  // ==========================================================================
  // 5. ANIMACIONES AL HACER SCROLL (AUTO-UNOBSERVE PARA CERO IMPACTO EN CPU)
  // ==========================================================================
  const initScrollTrigger = () => {
    const targets = document.querySelectorAll(
      '.section-header, .feature-box, .history-intro-card, .hero-banner-card'
    );

    targets.forEach(el => el.classList.add('scroll-reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Dejar de observar una vez visible
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    });

    targets.forEach(el => observer.observe(el));
  };

  // ==========================================================================
  // 6. SISTEMA DE CRÉDITOS Y BOTÓN "INSERT COIN"
  // ==========================================================================
  let arcadeCredits = parseInt(localStorage.getItem('retroarch_credits') || '4', 10);

  const updateCreditsDisplay = () => {
    const creditEl = document.getElementById('hud-credits-count');
    if (creditEl) {
      creditEl.textContent = arcadeCredits < 10 ? `0${arcadeCredits}` : arcadeCredits;
    }
  };

  const incrementCredits = (qty = 1) => {
    arcadeCredits += qty;
    localStorage.setItem('retroarch_credits', arcadeCredits.toString());
    updateCreditsDisplay();
  };

  // ==========================================================================
  // 7. CONTROLES DEL HUD: CRT SCANLINES Y SONIDO SFX
  // ==========================================================================
  const initHUDControls = () => {
    updateCreditsDisplay();

    // Botón Insert Coin
    const coinBtn = document.getElementById('hud-btn-coin');
    if (coinBtn) {
      coinBtn.addEventListener('click', (e) => {
        playCoinSound();
        incrementCredits(1);
        spawnScorePopup(e.clientX, e.clientY, '★ COIN INSERTED ★');
      });
    }

    // Toggle CRT Scanlines
    const crtBtn = document.getElementById('hud-btn-crt');
    const crtOverlay = document.getElementById('crt-overlay');
    if (crtBtn && crtOverlay) {
      crtBtn.addEventListener('click', () => {
        playBlipSound();
        crtOverlay.classList.toggle('crt-off');
        const isOn = !crtOverlay.classList.contains('crt-off');
        crtBtn.innerHTML = `<span>📺</span> CRT: ${isOn ? 'ON' : 'OFF'}`;
        localStorage.setItem('retroarch_crt', isOn ? '1' : '0');
      });

      if (localStorage.getItem('retroarch_crt') === '0') {
        crtOverlay.classList.add('crt-off');
        crtBtn.innerHTML = '<span>📺</span> CRT: OFF';
      }
    }

    // Toggle Sonido SFX
    const sfxBtn = document.getElementById('hud-btn-sfx');
    if (sfxBtn) {
      sfxBtn.addEventListener('click', () => {
        sfxEnabled = !sfxEnabled;
        if (sfxEnabled) playCoinSound();
        sfxBtn.innerHTML = `<span>${sfxEnabled ? '🔊' : '🔇'}</span> SFX: ${sfxEnabled ? 'ON' : 'OFF'}`;
      });
    }
  };

  // ==========================================================================
  // 8. NAVEGADOR DE CATEGORÍAS FLUIDO
  // ==========================================================================
  const initCategoryTabs = () => {
    const tabButtons = document.querySelectorAll('.category-tab-btn');
    if (!tabButtons.length) return;

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        playBlipSound();
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        filtrarSecciones(filter);
      });
    });
  };

  const filtrarSecciones = (filter) => {
    const consolasSec = document.getElementById('consolas-section');
    const juegosSec = document.getElementById('juegos-section');
    const accesoriosSec = document.getElementById('accesorios-section');

    const toggleVis = (el, show) => {
      if (!el) return;
      el.style.display = show ? 'block' : 'none';
    };

    if (filter === 'all') {
      toggleVis(consolasSec, true);
      toggleVis(juegosSec, true);
      toggleVis(accesoriosSec, true);
    } else if (filter === 'consolas') {
      toggleVis(consolasSec, true);
      toggleVis(juegosSec, false);
      toggleVis(accesoriosSec, false);
    } else if (filter === 'juegos') {
      toggleVis(consolasSec, false);
      toggleVis(juegosSec, true);
      toggleVis(accesoriosSec, false);
    } else if (filter === 'accesorios') {
      toggleVis(consolasSec, false);
      toggleVis(juegosSec, false);
      toggleVis(accesoriosSec, true);
    }
  };

  // ==========================================================================
  // SONIDOS AL ENTRAR AL CATÁLOGO Y AL PASAR EL RATÓN (HOVER)
  // ==========================================================================
  const initHoverAndEntrySounds = () => {
    // 1. Sonido al hacer clic en cualquier enlace hacia el catálogo
    document.querySelectorAll('a[href*="catalogo.html"]').forEach(link => {
      link.addEventListener('click', () => {
        playCatalogEntrySound();
      });
    });

    // 2. Si ya estamos dentro de catalogo.html, sonar la fanfarria retro de entrada
    const isCatalogPage = window.location.pathname.includes('catalogo.html') || window.location.href.includes('catalogo.html');
    if (isCatalogPage) {
      let catalogSoundPlayed = false;
      const playEntryOnce = () => {
        if (catalogSoundPlayed) return;
        catalogSoundPlayed = true;
        initAudio();
        setTimeout(playCatalogEntrySound, 80);
      };

      // Intentar reproducir inmediatamente
      playEntryOnce();

      // Asegurar con primer movimiento o toque si el navegador bloqueaba audio previo
      window.addEventListener('mousemove', playEntryOnce, { once: true, passive: true });
      window.addEventListener('click', playEntryOnce, { once: true });
      window.addEventListener('scroll', playEntryOnce, { once: true, passive: true });

      // Sonido al interactuar con filtros
      document.querySelectorAll('#filter-category, #filter-platform, #filter-genre, #filter-sort, #btn-reset-filters').forEach(el => {
        el.addEventListener('change', () => playBlipSound());
        el.addEventListener('click', () => playBlipSound());
      });
    }

    // 3. Sonido retro al pasar el ratón por botones, menú y tarjetas (con debounce ligero)
    const attachHoverBlip = () => {
      const interactiveElements = document.querySelectorAll(
        '.xmb-link, .btn-nav-outline, .btn-neon, .category-tab-btn, .game-tab-btn, .product-card, .btn-add-cart, .btn-fav-float, .feature-box, .hud-btn'
      );
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', triggerHoverBlip, { passive: true });
      });
    };

    attachHoverBlip();
    setTimeout(attachHoverBlip, 450);
  };

  // ==========================================================================
  // INICIALIZACIÓN
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initPacmanWorld();
    initHorizonCanvas();
    initHUDControls();
    initCategoryTabs();
    initScrollTrigger();
    init3DCardTilt();
    initHoverAndEntrySounds();

    // Re-aplicar Tilt a tarjetas inyectadas dinámicamente por app.js
    setTimeout(() => {
      init3DCardTilt();
    }, 400);

    window.addEventListener('click', () => initAudio(), { once: true });
  });

})();
