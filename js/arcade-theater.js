/**
 * RETROARCH - MOTOR DE SIMULACIÓN ARCADE EN VIVO (ARCADE THEATER)
 * - Escena 1: Pac-Man (Laberinto, pellets, energizer y persecución de fantasmas en 20s)
 * - Escena 2: Donkey Kong (Donkey Kong lanzando barriles, vigas inclinadas, Mario saltando)
 * - Escena 3: Space Invaders (Marcha alienígena, tanque láser disparando y ovni nodriza)
 * - Ciclo automático de 20 segundos con barra de progreso y selector manual
 * - Pausa automática vía IntersectionObserver (Cero impacto en CPU cuando no está a la vista)
 */

(() => {
  'use strict';

  // Configuración de Juegos
  const GAMES = [
    { id: 'pacman', name: 'PAC-MAN', icon: '🟡', duration: 20 },
    { id: 'donkey_kong', name: 'DONKEY KONG', icon: '🦍', duration: 20 },
    { id: 'space_invaders', name: 'SPACE INVADERS', icon: '👾', duration: 20 }
  ];

  let currentGameIndex = 0;
  let gameTime = 0; // Segundos transcurridos en el juego actual
  let isPaused = false;
  let animFrameId = null;
  let isSectionVisible = false;
  let lastTimestamp = 0;

  // Marcador del Gabinete
  let score1UP = 2540;
  let highScore = 99990;

  // Canvas y Contexto
  let canvas, ctx;
  let screenWidth = 800;
  let screenHeight = 440;

  // ==========================================================================
  // ESCENA 1: PAC-MAN (20 SEGUNDOS)
  // ==========================================================================
  const pacmanState = {
    x: 120,
    y: 220,
    dir: 1, // 1: derecha, -1: izquierda
    mouthAngle: 0.25,
    speed: 95,
    powerPelletActive: false,
    dots: [],
    ghosts: [
      { name: 'blinky', color: '#ff2a55', x: 260, y: 220, dir: 1, eaten: false },
      { name: 'pinky', color: '#ff69b4', x: 310, y: 220, dir: 1, eaten: false },
      { name: 'inky', color: '#00f0ff', x: 360, y: 220, dir: 1, eaten: false },
      { name: 'clyde', color: '#ffaa00', x: 410, y: 220, dir: 1, eaten: false }
    ],
    popups: []
  };

  const resetPacman = () => {
    pacmanState.x = 80;
    pacmanState.y = 220;
    pacmanState.dir = 1;
    pacmanState.speed = 105;
    pacmanState.powerPelletActive = false;
    pacmanState.popups = [];

    // Generar línea de pellets
    pacmanState.dots = [];
    for (let x = 90; x < screenWidth - 90; x += 30) {
      pacmanState.dots.push({ x, y: 220, eaten: false });
    }

    // Posiciones iniciales de los fantasmas
    pacmanState.ghosts = [
      { name: 'blinky', color: '#ff2a55', x: 280, y: 220, dir: 1, eaten: false },
      { name: 'pinky', color: '#ff69b4', x: 340, y: 220, dir: 1, eaten: false },
      { name: 'inky', color: '#00f0ff', x: 400, y: 220, dir: 1, eaten: false },
      { name: 'clyde', color: '#ffaa00', x: 460, y: 220, dir: 1, eaten: false }
    ];
  };

  const updatePacman = (dt) => {
    // Fase 1 (0s a 7.5s): Pac-man avanza comiendo pellets hacia la derecha
    // Fase 2 (7.5s a 8.5s): Pac-man alcanza el Power Pellet, fantasmas se vuelven azules
    // Fase 3 (8.5s a 17s): Pac-man se da la vuelta y persigue a los fantasmas
    // Fase 4 (17s a 20s): Pac-man come fruta y "STAGE CLEAR"

    if (gameTime < 8.0) {
      // Pac-Man persigue hacia la derecha
      pacmanState.dir = 1;
      pacmanState.x += pacmanState.speed * dt;

      // Comer pellets
      pacmanState.dots.forEach(dot => {
        if (!dot.eaten && Math.abs(pacmanState.x - dot.x) < 15) {
          dot.eaten = true;
          score1UP += 10;
        }
      });

      // Fantasmas huyen o patrullan adelante
      pacmanState.ghosts.forEach(g => {
        g.x += 65 * dt;
      });

    } else if (gameTime >= 8.0 && gameTime < 8.5) {
      // Activación del Power Pellet
      pacmanState.powerPelletActive = true;
      pacmanState.dir = -1; // Se gira para perseguir

    } else if (gameTime >= 8.5 && gameTime < 17.5) {
      // Pac-Man en modo cazador con velocidad aumentada
      pacmanState.dir = -1;
      pacmanState.x -= 135 * dt;

      // Fantasmas azules asustados huyen hacia la izquierda
      pacmanState.ghosts.forEach((g, idx) => {
        if (!g.eaten) {
          g.x -= 55 * dt;
          // Pac-Man los atrapa
          if (Math.abs(pacmanState.x - g.x) < 22) {
            g.eaten = true;
            const pts = (idx + 1) * 200;
            score1UP += pts;
            pacmanState.popups.push({ x: g.x, y: g.y - 15, text: `+${pts}`, timer: 1.2 });
          }
        }
      });
    }

    // Boca abriéndose y cerrándose
    pacmanState.mouthAngle = Math.abs(Math.sin(gameTime * 14)) * 0.28 + 0.05;

    // Actualizar popups
    pacmanState.popups.forEach(p => p.timer -= dt);
    pacmanState.popups = pacmanState.popups.filter(p => p.timer > 0);
  };

  const drawPacman = () => {
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    // Dibujar paredes del laberinto estilo arcade neon azul
    ctx.strokeStyle = '#0055ff';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#0055ff';
    ctx.shadowBlur = 10;

    // Pasillo superior e inferior
    ctx.strokeRect(40, 160, screenWidth - 80, 120);
    ctx.strokeRect(40, 60, screenWidth - 80, 60);
    ctx.strokeRect(40, 320, screenWidth - 80, 60);

    // Obstáculos internos
    ctx.strokeRect(180, 160, 40, 120);
    ctx.strokeRect(580, 160, 40, 120);
    ctx.shadowBlur = 0;

    // Dibujar Pellets (Puntos amarillos)
    pacmanState.dots.forEach(dot => {
      if (!dot.eaten) {
        ctx.fillStyle = '#ffbe0b';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Dibujar Power Pellet parpadeante en los extremos
    const pelletPulse = Math.sin(gameTime * 8) > 0;
    if (pelletPulse && gameTime < 8.2) {
      ctx.fillStyle = '#ffe600';
      ctx.shadowColor = '#ffe600';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(screenWidth - 100, 220, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Dibujar Pac-Man
    ctx.fillStyle = '#ffe600';
    ctx.shadowColor = '#ffe600';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    const startAngle = pacmanState.dir === 1 
      ? pacmanState.mouthAngle * Math.PI 
      : (1 + pacmanState.mouthAngle) * Math.PI;
    const endAngle = pacmanState.dir === 1 
      ? (2 - pacmanState.mouthAngle) * Math.PI 
      : (3 - pacmanState.mouthAngle) * Math.PI;

    ctx.arc(pacmanState.x, pacmanState.y, 22, startAngle, endAngle);
    ctx.lineTo(pacmanState.x, pacmanState.y);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Dibujar Fantasmas
    pacmanState.ghosts.forEach(g => {
      if (g.eaten) {
        // Solo ojos flotantes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(g.x - 7, g.y - 4, 5, 6);
        ctx.fillRect(g.x + 2, g.y - 4, 5, 6);
        ctx.fillStyle = '#00f0ff';
        ctx.fillRect(g.x - 5, g.y - 2, 2.5, 2.5);
        ctx.fillRect(g.x + 4, g.y - 2, 2.5, 2.5);
        return;
      }

      const isScared = pacmanState.powerPelletActive;
      const ghostColor = isScared ? (gameTime > 15 && Math.sin(gameTime * 12) > 0 ? '#ffffff' : '#1e40af') : g.color;

      ctx.fillStyle = ghostColor;
      ctx.beginPath();
      ctx.arc(g.x, g.y - 4, 18, Math.PI, 0, false);
      ctx.lineTo(g.x + 18, g.y + 16);
      // Pies en olas
      ctx.lineTo(g.x + 9, g.y + 11);
      ctx.lineTo(g.x, g.y + 16);
      ctx.lineTo(g.x - 9, g.y + 11);
      ctx.lineTo(g.x - 18, g.y + 16);
      ctx.closePath();
      ctx.fill();

      // Ojos
      if (!isScared) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(g.x - 10, g.y - 8, 7, 9);
        ctx.fillRect(g.x + 3, g.y - 8, 7, 9);
        ctx.fillStyle = '#002288';
        ctx.fillRect(g.x - (pacmanState.dir === 1 ? 6 : 9), g.y - 5, 3.5, 4);
        ctx.fillRect(g.x + (pacmanState.dir === 1 ? 7 : 4), g.y - 5, 3.5, 4);
      } else {
        // Ojos asustados
        ctx.fillStyle = '#ffbe0b';
        ctx.fillRect(g.x - 7, g.y - 6, 4, 4);
        ctx.fillRect(g.x + 3, g.y - 6, 4, 4);
      }
    });

    // Dibujar Popups de Puntos (+200, +400, etc.)
    pacmanState.popups.forEach(p => {
      ctx.font = '12px "Press Start 2P", monospace';
      ctx.fillStyle = '#00ffff';
      ctx.fillText(p.text, p.x - 18, p.y);
    });

    // Banner de Estado
    ctx.font = '12px "Press Start 2P", monospace';
    if (pacmanState.powerPelletActive && gameTime < 17.5) {
      ctx.fillStyle = '#ff2a55';
      ctx.fillText('★ CHASE MODE ACTIVE! ★', screenWidth / 2 - 130, 35);
    } else if (gameTime >= 17.5) {
      ctx.fillStyle = '#00ff88';
      ctx.fillText('★ ROUND CLEAR - BONUS CHERRY! ★', screenWidth / 2 - 180, 35);
      // Cereza 🍒
      ctx.font = '24px sans-serif';
      ctx.fillText('🍒', screenWidth / 2 - 12, 228);
    } else {
      ctx.fillStyle = '#ffbe0b';
      ctx.fillText('PAC-MAN: POWER PELLET RUN', screenWidth / 2 - 150, 35);
    }
  };

  // ==========================================================================
  // ESCENA 2: DONKEY KONG (BARRIL RUN Y MARIO)
  // ==========================================================================
  const dkState = {
    dkAnim: 0,
    dkThrowTimer: 0,
    marioX: 80,
    marioY: 380,
    marioVy: 0,
    marioJumping: false,
    barrels: [],
    popups: []
  };

  const resetDonkeyKong = () => {
    dkState.dkAnim = 0;
    dkState.dkThrowTimer = 0;
    dkState.marioX = 90;
    dkState.marioY = 380;
    dkState.marioVy = 0;
    dkState.marioJumping = false;
    dkState.barrels = [];
    dkState.popups = [];
  };

  const updateDonkeyKong = (dt) => {
    dkState.dkThrowTimer += dt;

    // Donkey Kong lanza un barril cada 3.2 segundos
    if (dkState.dkThrowTimer > 3.2) {
      dkState.dkThrowTimer = 0;
      dkState.barrels.push({
        x: 180,
        y: 110,
        vx: 135,
        level: 1,
        rotation: 0
      });
      score1UP += 50;
    }

    // Actualizar barriles rodando por las vigas
    dkState.barrels.forEach(b => {
      b.rotation += dt * 8;

      if (b.level === 1) {
        b.x += b.vx * dt;
        b.y = 110 + (b.x - 180) * 0.05; // Pendiente hacia la derecha
        if (b.x > screenWidth - 140) {
          b.level = 2;
          b.vx = -135;
          b.y = 200;
        }
      } else if (b.level === 2) {
        b.x += b.vx * dt;
        b.y = 200 + (screenWidth - 140 - b.x) * 0.05; // Pendiente hacia la izquierda
        if (b.x < 140) {
          b.level = 3;
          b.vx = 135;
          b.y = 290;
        }
      } else if (b.level === 3) {
        b.x += b.vx * dt;
        b.y = 290 + (b.x - 140) * 0.05;
        if (b.x > screenWidth - 140) {
          b.level = 4;
          b.vx = -135;
          b.y = 380;
        }
      } else if (b.level === 4) {
        b.x += b.vx * dt;
        b.y = 380;
      }
    });

    // Mario corriendo y saltando barriles
    dkState.marioX += 45 * dt;
    if (dkState.marioX > screenWidth - 160) {
      dkState.marioX = 100;
    }

    // Detectar barril cercano en nivel 4 para saltar
    dkState.barrels.forEach(b => {
      if (b.level === 4 && Math.abs(b.x - dkState.marioX) < 55 && !dkState.marioJumping) {
        dkState.marioJumping = true;
        dkState.marioVy = -260; // Impulso de salto
        score1UP += 100;
        dkState.popups.push({ x: dkState.marioX, y: dkState.marioY - 30, text: '+100', timer: 1.0 });
      }
    });

    // Física del salto de Mario
    if (dkState.marioJumping) {
      dkState.marioVy += 550 * dt; // Gravedad
      dkState.marioY += dkState.marioVy * dt;

      if (dkState.marioY >= 380) {
        dkState.marioY = 380;
        dkState.marioVy = 0;
        dkState.marioJumping = false;
      }
    }

    // Popups
    dkState.popups.forEach(p => p.timer -= dt);
    dkState.popups = dkState.popups.filter(p => p.timer > 0);
  };

  const drawDonkeyKong = () => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    // Dibujar Vigas de Acero Rojas (Girders clásicos de 1981)
    const drawGirder = (x1, y1, x2, y2) => {
      ctx.strokeStyle = '#e60012';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Patrón de celosía interna
      ctx.strokeStyle = '#220000';
      ctx.lineWidth = 2;
      for (let x = x1; x < x2; x += 18) {
        const y = y1 + ((x - x1) / (x2 - x1)) * (y2 - y1);
        ctx.beginPath();
        ctx.moveTo(x, y - 4);
        ctx.lineTo(x + 9, y + 4);
        ctx.stroke();
      }
    };

    // 4 Niveles de Vigas
    drawGirder(100, 110, screenWidth - 100, 135);
    drawGirder(100, 225, screenWidth - 100, 200);
    drawGirder(100, 290, screenWidth - 100, 315);
    drawGirder(60, 395, screenWidth - 60, 395);

    // Escaleras Azules
    const drawLadder = (x, y1, y2) => {
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 8, y1);
      ctx.lineTo(x - 8, y2);
      ctx.moveTo(x + 8, y1);
      ctx.lineTo(x + 8, y2);
      for (let y = y1; y <= y2; y += 10) {
        ctx.moveTo(x - 8, y);
        ctx.lineTo(x + 8, y);
      }
      ctx.stroke();
    };

    drawLadder(screenWidth - 130, 120, 205);
    drawLadder(150, 215, 295);
    drawLadder(screenWidth - 130, 305, 395);

    // Barriles rodando
    dkState.barrels.forEach(b => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rotation);
      ctx.fillStyle = '#ff8800';
      ctx.fillRect(-12, -9, 24, 18);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(-12, -9, 24, 18);
      ctx.restore();
    });

    // Dibujar a Donkey Kong en la cima
    const dkBeating = Math.sin(gameTime * 7) > 0;
    ctx.fillStyle = '#8b4513';
    // Cuerpo
    ctx.fillRect(90, 48, 54, 52);
    // Cabeza y Cara
    ctx.fillStyle = '#d2691e';
    ctx.fillRect(100, 34, 34, 25);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(106, 40, 6, 6);
    ctx.fillRect(122, 40, 6, 6);
    ctx.fillStyle = '#000000';
    ctx.fillRect(108, 42, 3, 3);
    ctx.fillRect(124, 42, 3, 3);
    // Brazos golpeando el pecho o listos para lanzar barril
    ctx.fillStyle = '#8b4513';
    if (dkBeating) {
      ctx.fillRect(75, 52, 18, 30);
      ctx.fillRect(140, 52, 18, 30);
    } else {
      ctx.fillRect(75, 40, 18, 30);
      ctx.fillRect(140, 40, 18, 30);
    }

    // Dibujar a Pauline pidiendo ayuda arriba
    ctx.font = '22px sans-serif';
    ctx.fillText('💃', 260, 95);
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.fillStyle = '#ff69b4';
    ctx.fillText('HELP!', 290, 75);

    // Dibujar a Mario (Jumpman)
    ctx.fillStyle = '#ff0033'; // Gorra y camisa roja
    ctx.fillRect(dkState.marioX - 8, dkState.marioY - 26, 16, 12);
    ctx.fillStyle = '#0044ff'; // Overol azul
    ctx.fillRect(dkState.marioX - 7, dkState.marioY - 14, 14, 14);
    // Cara
    ctx.fillStyle = '#ffcc99';
    ctx.fillRect(dkState.marioX - 4, dkState.marioY - 22, 10, 8);
    // Bigote
    ctx.fillStyle = '#000000';
    ctx.fillRect(dkState.marioX + 1, dkState.marioY - 18, 6, 3);

    // Barril de fuego azul en la esquina inferior izquierda
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(50, 350, 30, 45);
    ctx.fillStyle = Math.sin(gameTime * 15) > 0 ? '#00f0ff' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(65, 345, 12, 0, Math.PI * 2);
    ctx.fill();

    // Popups de puntos
    dkState.popups.forEach(p => {
      ctx.font = '11px "Press Start 2P", monospace';
      ctx.fillStyle = '#ffbe0b';
      ctx.fillText(p.text, p.x, p.y);
    });

    // Banner
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.fillStyle = '#ff2a55';
    ctx.fillText('DONKEY KONG: 25M BARREL RUN', screenWidth / 2 - 165, 30);
  };

  // ==========================================================================
  // ESCENA 3: SPACE INVADERS (DEFENSA LÁSER)
  // ==========================================================================
  const invadersState = {
    invaders: [],
    lasers: [],
    cannonX: 400,
    cannonDir: 1,
    marchDir: 1,
    marchTimer: 0,
    marchY: 80,
    ufoX: -60,
    ufoActive: false,
    popups: []
  };

  const resetSpaceInvaders = () => {
    invadersState.cannonX = 400;
    invadersState.cannonDir = 1;
    invadersState.marchDir = 1;
    invadersState.marchTimer = 0;
    invadersState.marchY = 80;
    invadersState.lasers = [];
    invadersState.ufoX = -60;
    invadersState.ufoActive = false;
    invadersState.popups = [];

    // Generar cuadrícula de 5 columnas x 3 filas
    invadersState.invaders = [];
    const colors = ['#ff2a55', '#00f0ff', '#00ff88'];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 6; col++) {
        invadersState.invaders.push({
          col,
          row,
          x: 200 + col * 75,
          y: 80 + row * 45,
          color: colors[row],
          alive: true
        });
      }
    }
  };

  const updateSpaceInvaders = (dt) => {
    // Marcha de los invasores izquierda-derecha
    invadersState.marchTimer += dt;
    if (invadersState.marchTimer > 0.45) {
      invadersState.marchTimer = 0;
      let hitEdge = false;

      invadersState.invaders.forEach(inv => {
        if (inv.alive) {
          inv.x += invadersState.marchDir * 16;
          if (inv.x > screenWidth - 120 || inv.x < 120) {
            hitEdge = true;
          }
        }
      });

      if (hitEdge) {
        invadersState.marchDir *= -1;
        invadersState.invaders.forEach(inv => {
          if (inv.alive) inv.y += 12;
        });
      }
    }

    // Tanque cañón moviéndose y disparando
    invadersState.cannonX += invadersState.cannonDir * 140 * dt;
    if (invadersState.cannonX > screenWidth - 120) invadersState.cannonDir = -1;
    if (invadersState.cannonX < 120) invadersState.cannonDir = 1;

    // Disparar láser cada 0.9 segundos
    if (Math.random() < 0.045 && invadersState.lasers.length < 3) {
      invadersState.lasers.push({ x: invadersState.cannonX, y: 380 });
    }

    // Mover láseres y detectar colisiones
    invadersState.lasers.forEach(laser => {
      laser.y -= 380 * dt;

      // Colisión con invasor
      invadersState.invaders.forEach(inv => {
        if (inv.alive && Math.abs(laser.x - inv.x) < 20 && Math.abs(laser.y - inv.y) < 16) {
          inv.alive = false;
          laser.y = -999; // Destruir láser
          const pts = (3 - inv.row) * 10;
          score1UP += pts;
          invadersState.popups.push({ x: inv.x, y: inv.y, text: `+${pts}`, timer: 0.8 });
        }
      });
    });

    invadersState.lasers = invadersState.lasers.filter(l => l.y > 0);

    // OVNI Nodriza en la parte superior
    if (gameTime > 6 && !invadersState.ufoActive) {
      invadersState.ufoActive = true;
      invadersState.ufoX = -50;
    }

    if (invadersState.ufoActive) {
      invadersState.ufoX += 160 * dt;
      if (invadersState.ufoX > screenWidth + 80) {
        invadersState.ufoActive = false;
      }
    }

    // Popups
    invadersState.popups.forEach(p => p.timer -= dt);
    invadersState.popups = invadersState.popups.filter(p => p.timer > 0);
  };

  const drawSpaceInvaders = () => {
    ctx.fillStyle = '#05070d';
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    // Dibujar Invasores
    invadersState.invaders.forEach(inv => {
      if (!inv.alive) return;

      ctx.fillStyle = inv.color;
      // Cuerpo pixelado
      ctx.fillRect(inv.x - 14, inv.y - 10, 28, 20);
      // Ojos negros
      ctx.fillStyle = '#000000';
      ctx.fillRect(inv.x - 8, inv.y - 4, 4, 6);
      ctx.fillRect(inv.x + 4, inv.y - 4, 4, 6);
    });

    // Dibujar OVNI Nodriza si está activo
    if (invadersState.ufoActive) {
      ctx.fillStyle = '#ffbe0b';
      ctx.beginPath();
      ctx.arc(invadersState.ufoX, 55, 20, Math.PI, 0, false);
      ctx.lineTo(invadersState.ufoX + 26, 64);
      ctx.lineTo(invadersState.ufoX - 26, 64);
      ctx.closePath();
      ctx.fill();
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillStyle = '#ff2a55';
      ctx.fillText('MYSTERY UFO', invadersState.ufoX - 45, 45);
    }

    // Dibujar Tanque Cañón Láser Verde
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(invadersState.cannonX - 16, 395, 32, 16);
    ctx.fillRect(invadersState.cannonX - 4, 386, 8, 10);

    // Línea de defensa verde
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 420);
    ctx.lineTo(screenWidth - 40, 420);
    ctx.stroke();

    // Dibujar Láseres
    ctx.fillStyle = '#ff2a55';
    invadersState.lasers.forEach(l => {
      ctx.fillRect(l.x - 2, l.y, 4, 14);
    });

    // Dibujar Popups
    invadersState.popups.forEach(p => {
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillStyle = '#00f0ff';
      ctx.fillText(p.text, p.x - 10, p.y);
    });

    // Título
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.fillStyle = '#00ff88';
    ctx.fillText('SPACE INVADERS: EARTH DEFENSE', screenWidth / 2 - 170, 30);
  };

  // ==========================================================================
  // GESTOR DE ESCENAS Y CICLO PRINCIPAL
  // ==========================================================================
  const switchGame = (index) => {
    currentGameIndex = (index + GAMES.length) % GAMES.length;
    gameTime = 0;

    // Resetear el estado del juego seleccionado
    if (currentGameIndex === 0) resetPacman();
    else if (currentGameIndex === 1) resetDonkeyKong();
    else if (currentGameIndex === 2) resetSpaceInvaders();

    // Actualizar botones de pestaña
    const tabs = document.querySelectorAll('.game-tab-btn');
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === currentGameIndex);
    });

    // Actualizar nombre en marquesina
    const marqueeBrand = document.getElementById('cabinet-active-game');
    if (marqueeBrand) {
      const g = GAMES[currentGameIndex];
      marqueeBrand.textContent = `${g.icon} ${g.name}`;
    }
  };

  const updateHUD = () => {
    const score1UPEl = document.getElementById('cabinet-1up-score');
    if (score1UPEl) {
      score1UPEl.textContent = score1UP < 10000 ? `0${score1UP}` : score1UP;
    }

    // Barra de progreso de ciclo
    const progressFill = document.getElementById('cycle-progress-fill');
    if (progressFill) {
      const pct = Math.min(100, (gameTime / GAMES[currentGameIndex].duration) * 100);
      progressFill.style.width = `${pct}%`;
    }
  };

  const gameLoop = (timestamp) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
    lastTimestamp = timestamp;

    if (!isPaused && isSectionVisible) {
      gameTime += dt;

      // Ciclo completado -> cambiar automáticamente de juego
      if (gameTime >= GAMES[currentGameIndex].duration) {
        switchGame(currentGameIndex + 1);
      }

      // Actualizar y dibujar escena activa
      if (currentGameIndex === 0) {
        updatePacman(dt);
        drawPacman();
      } else if (currentGameIndex === 1) {
        updateDonkeyKong(dt);
        drawDonkeyKong();
      } else if (currentGameIndex === 2) {
        updateSpaceInvaders(dt);
        drawSpaceInvaders();
      }

      updateHUD();
    }

    animFrameId = requestAnimationFrame(gameLoop);
  };

  // ==========================================================================
  // INICIALIZACIÓN Y DETECCIÓN CON INTERSECTIONOBSERVER
  // ==========================================================================
  const initArcadeTheater = () => {
    canvas = document.getElementById('arcade-theater-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      screenWidth = canvas.width = rect.width || 800;
      screenHeight = canvas.height = rect.height || 440;
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Iniciar con Pac-Man
    switchGame(0);

    // Botones selectores manuales
    const tabs = document.querySelectorAll('.game-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.dataset.gameIndex, 10);
        switchGame(idx);
      });
    });

    // Botón Pausar / Reanudar
    const pauseBtn = document.getElementById('btn-arcade-pause');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseBtn.innerHTML = isPaused ? '<span>▶️</span> REANUDAR' : '<span>⏸️</span> PAUSAR';
      });
    }

    // Observer para pausar cuando no está en pantalla (Ahorro de batería y 0 lag)
    const section = document.querySelector('.arcade-theater-section');
    if (section) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isSectionVisible = entry.isIntersecting;
        });
      }, { threshold: 0.1 });

      observer.observe(section);
    } else {
      isSectionVisible = true;
    }

    animFrameId = requestAnimationFrame(gameLoop);
  };

  document.addEventListener('DOMContentLoaded', initArcadeTheater);

})();
