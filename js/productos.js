/**
 * PIXELVAULT - Catálogo de Productos
 * Estructura de datos estática para la tienda web
 * Imágenes centralizadas directamente en la carpeta: img/
 */

const productos = [
  // ==========================================
  // CONSOLAS (13 Consolas)
  // ==========================================
  {
    id: 1,
    titulo: "PlayStation 1 (PS One)",
    categoria: "Consola",
    plataforma: "PS1",
    genero: "Consola",
    precio: 149,
    anio: 1994,
    imagen: "img/consola-ps1.jpg",
    descripcion: "La legendaria consola de 32 bits de Sony que revolucionó la industria del videojuego con sus gráficos 3D poligonales y formato en CD-ROM.",
    destacado: true
  },
  {
    id: 2,
    titulo: "PlayStation 2 (Slim)",
    categoria: "Consola",
    plataforma: "PS2",
    genero: "Consola",
    precio: 199,
    anio: 2000,
    imagen: "img/consola-ps2.jpg",
    descripcion: "La consola más vendida de todos los tiempos. Reproductor de DVD integrado y un catálogo legendario de miles de títulos.",
    destacado: true
  },
  {
    id: 3,
    titulo: "PlayStation 3 (Slim)",
    categoria: "Consola",
    plataforma: "PS3",
    genero: "Consola",
    precio: 249,
    anio: 2006,
    imagen: "img/consola-ps3.jpg",
    descripcion: "Pionera en alta definición con lector Blu-ray, procesador Cell Broadband Engine y la icónica interfaz multimedia XMB.",
    destacado: true
  },
  {
    id: 4,
    titulo: "PlayStation 4 Pro (1TB)",
    categoria: "Consola",
    plataforma: "PS4",
    genero: "Consola",
    precio: 299,
    anio: 2013,
    imagen: "img/consola-ps4.jpg",
    descripcion: "Potencia gráfica con soporte para resolución 4K dinámica, HDR vibrante y el control DualShock 4 con panel táctil.",
    destacado: true
  },
  {
    id: 5,
    titulo: "PlayStation 5",
    categoria: "Consola",
    plataforma: "PS5",
    genero: "Consola",
    precio: 499,
    anio: 2020,
    imagen: "img/consola-ps5.jpg",
    descripcion: "Consola de nueva generación con SSD ultrarrápido, retroalimentación háptica en el DualSense y trazado de rayos.",
    destacado: true
  },
  {
    id: 6,
    titulo: "PlayStation Portable (PSP 3000)",
    categoria: "Consola",
    plataforma: "PSP",
    genero: "Consola",
    precio: 129,
    anio: 2004,
    imagen: "img/consola-psp.jpg",
    descripcion: "Consola portátil icónica de Sony con pantalla panorámica brillante, discos UMD y conectividad Wi-Fi para partidas multijugador.",
    destacado: true
  },
  {
    id: 7,
    titulo: "PlayStation Vita",
    categoria: "Consola",
    plataforma: "PS Vita",
    genero: "Consola",
    precio: 179,
    anio: 2011,
    imagen: "img/consola-psvita.jpg",
    descripcion: "Portátil prémium con hermosa pantalla OLED táctil de 5 pulgadas, doble stick analógico y panel táctil trasero.",
    destacado: false
  },
  {
    id: 8,
    titulo: "Nintendo Switch (Modelo OLED)",
    categoria: "Consola",
    plataforma: "Nintendo Switch",
    genero: "Consola",
    precio: 299,
    anio: 2017,
    imagen: "img/consola-switch.jpg",
    descripcion: "Consola híbrida versátil que te permite jugar en el televisor o llevar tus títulos favoritos a cualquier lugar con pantalla OLED.",
    destacado: true
  },
  {
    id: 9,
    titulo: "Nintendo 64",
    categoria: "Consola",
    plataforma: "Nintendo 64",
    genero: "Consola",
    precio: 169,
    anio: 1996,
    imagen: "img/consola-n64.jpg",
    descripcion: "Hito del videojuego que definió los entornos tridimensionales con su revolucionario stick analógico y cuatro puertos para mandos.",
    destacado: true
  },
  {
    id: 10,
    titulo: "Super Nintendo Entertainment System (SNES)",
    categoria: "Consola",
    plataforma: "Super Nintendo",
    genero: "Consola",
    precio: 159,
    anio: 1990,
    imagen: "img/consola-snes.jpg",
    descripcion: "La reina dorada de los 16 bits. Gráficos con Modo 7, sonido estereofónico muestreado y obras maestras atemporales.",
    destacado: false
  },
  {
    id: 11,
    titulo: "Sega Genesis (Mega Drive)",
    categoria: "Consola",
    plataforma: "Sega Genesis",
    genero: "Consola",
    precio: 139,
    anio: 1988,
    imagen: "img/consola-genesis.jpg",
    descripcion: "Consola de 16 bits sinónimo de velocidad, actitud noventera y el nacimiento del erizo azul más famoso del mundo.",
    destacado: false
  },
  {
    id: 12,
    titulo: "Game Boy Advance SP",
    categoria: "Consola",
    plataforma: "Game Boy",
    genero: "Consola",
    precio: 109,
    anio: 2001,
    imagen: "img/consola-gba.jpg",
    descripcion: "Consola portátil plegable de 32 bits con pantalla retroiluminada de alta nitidez y batería recargable de iones de litio.",
    destacado: false
  },
  {
    id: 13,
    titulo: "Atari 2600",
    categoria: "Consola",
    plataforma: "Atari",
    genero: "Consola",
    precio: 119,
    anio: 1977,
    imagen: "img/consola-atari.jpg",
    descripcion: "La pionera absoluta que popularizó el uso de cartuchos intercambiables y llevó los salones recreativos a los hogares.",
    destacado: false
  },

  // ==========================================
  // JUEGOS DE PLAYSTATION (21 títulos)
  // ==========================================
  // --- PS1 ---
  {
    id: 14,
    titulo: "Crash Bandicoot",
    categoria: "Juego",
    plataforma: "PS1",
    genero: "Plataformas",
    precio: 35,
    anio: 1996,
    imagen: "img/juego-crash-bandicoot.jpg",
    descripcion: "Acompaña al marsupial naranja en su alocada odisea por las islas Wumpa para derrotar al malvado Dr. Neo Cortex.",
    destacado: true
  },
  {
    id: 15,
    titulo: "Metal Gear Solid",
    categoria: "Juego",
    plataforma: "PS1",
    genero: "Acción",
    precio: 45,
    anio: 1998,
    imagen: "img/juego-metal-gear.jpg",
    descripcion: "La obra maestra de espionaje táctico creada por Hideo Kojima. Encarna a Solid Snake en las heladas instalaciones de Shadow Moses.",
    destacado: true
  },
  {
    id: 16,
    titulo: "Final Fantasy VII",
    categoria: "Juego",
    plataforma: "PS1",
    genero: "RPG",
    precio: 40,
    anio: 1997,
    imagen: "img/juego-ff7.jpg",
    descripcion: "El épico juego de rol que conmovió a una generación. Cloud Strife y AVALANCHA luchan contra la corporación Shinra y el temible Sephiroth.",
    destacado: true
  },
  {
    id: 17,
    titulo: "Tekken 3",
    categoria: "Juego",
    plataforma: "PS1",
    genero: "Peleas",
    precio: 35,
    anio: 1998,
    imagen: "img/juego-tekken3.jpg",
    descripcion: "Considerado el mejor juego de lucha de 32 bits, con Jin Kazama, Hwoarang y Eddy Gordo en fluidos combates tridimensionales.",
    destacado: false
  },
  {
    id: 18,
    titulo: "Spyro the Dragon",
    categoria: "Juego",
    plataforma: "PS1",
    genero: "Plataformas",
    precio: 32,
    anio: 1998,
    imagen: "img/juego-spyro.jpg",
    descripcion: "Vuela, embiste y escupe fuego a través de coloridos mundos mágicos para rescatar a tus compañeros dragones de Gnasty Gnorc.",
    destacado: false
  },

  // --- PS2 ---
  {
    id: 19,
    titulo: "God of War",
    categoria: "Juego",
    plataforma: "PS2",
    genero: "Acción",
    precio: 39,
    anio: 2005,
    imagen: "img/juego-gow1.jpg",
    descripcion: "El sangriento debut de Kratos, el Fantasma de Esparta, armado con las Espadas del Caos en su venganza contra Ares.",
    destacado: true
  },
  {
    id: 20,
    titulo: "GTA San Andreas",
    categoria: "Juego",
    plataforma: "PS2",
    genero: "Acción",
    precio: 39,
    anio: 2004,
    imagen: "img/juego-gta-sa.jpg",
    descripcion: "CJ regresa a Los Santos para salvar a su familia y dominar las calles en el mundo abierto más ambicioso de PlayStation 2.",
    destacado: true
  },
  {
    id: 21,
    titulo: "Shadow of the Colossus",
    categoria: "Juego",
    plataforma: "PS2",
    genero: "Aventura",
    precio: 42,
    anio: 2005,
    imagen: "img/juego-shadow-colossus.jpg",
    descripcion: "Una poética y colosal aventura donde el joven Wander debe escalar y derrotar a 16 majestuosos colosos para devolver la vida a Mono.",
    destacado: true
  },
  {
    id: 22,
    titulo: "Silent Hill 2",
    categoria: "Juego",
    plataforma: "PS2",
    genero: "Terror",
    precio: 48,
    anio: 2001,
    imagen: "img/juego-silent-hill-2.jpg",
    descripcion: "Cumbre del terror psicológico. James Sunderland viaja al enigmático pueblo envuelto en niebla tras recibir una carta de su difunta esposa.",
    destacado: false
  },

  // --- PS3 ---
  {
    id: 23,
    titulo: "The Last of Us",
    categoria: "Juego",
    plataforma: "PS3",
    genero: "Aventura",
    precio: 39,
    anio: 2013,
    imagen: "img/juego-tlou1.jpg",
    descripcion: "Un desgarrador viaje postapocalíptico donde Joel y Ellie deben cruzar unos Estados Unidos devastados por el hongo Cordyceps.",
    destacado: true
  },
  {
    id: 24,
    titulo: "Uncharted 2: Among Thieves",
    categoria: "Juego",
    plataforma: "PS3",
    genero: "Aventura",
    precio: 30,
    anio: 2009,
    imagen: "img/juego-uncharted2.jpg",
    descripcion: "Nathan Drake recorre cumbres nevadas del Tíbet y templos ancestrales en búsqueda de la legendaria piedra Cintamani de Shambhala.",
    destacado: false
  },
  {
    id: 25,
    titulo: "God of War III",
    categoria: "Juego",
    plataforma: "PS3",
    genero: "Acción",
    precio: 32,
    anio: 2010,
    imagen: "img/juego-gow3.jpg",
    descripcion: "La culminación de la trilogía griega: Kratos escala el Monte Olimpo a lomos de los Titanes para desatar el caos final contra Zeus.",
    destacado: false
  },
  {
    id: 26,
    titulo: "Demon's Souls",
    categoria: "Juego",
    plataforma: "PS3",
    genero: "RPG",
    precio: 35,
    anio: 2009,
    imagen: "img/juego-demons-souls.jpg",
    descripcion: "El título de FromSoftware que dio origen al género soulslike. Desafío implacable y atmósfera gótica en el reino maldito de Boletaria.",
    destacado: false
  },

  // --- PS4 ---
  {
    id: 27,
    titulo: "Uncharted 4: A Thief's End",
    categoria: "Juego",
    plataforma: "PS4",
    genero: "Aventura",
    precio: 35,
    anio: 2016,
    imagen: "img/juego-uncharted4.jpg",
    descripcion: "La última gran travesía de Nathan Drake en busca de Libertalia, la utopía pirata de Henry Avery, junto a su hermano Sam.",
    destacado: true
  },
  {
    id: 28,
    titulo: "The Last of Us Part II",
    categoria: "Juego",
    plataforma: "PS4",
    genero: "Aventura",
    precio: 45,
    anio: 2020,
    imagen: "img/juego-tlou2.jpg",
    descripcion: "Una intensa y emotiva historia sobre el ciclo de la venganza, las consecuencias de la violencia y la búsqueda de redención con Ellie y Abby.",
    destacado: false
  },
  {
    id: 29,
    titulo: "God of War (2018)",
    categoria: "Juego",
    plataforma: "PS4",
    genero: "Acción",
    precio: 39,
    anio: 2018,
    imagen: "img/juego-gow-2018.jpg",
    descripcion: "Kratos ahora vive en los dominios nórdicos junto a su hijo Atreus, empuñando el Hacha Leviatán en un plano secuencia cinematográfico inolvidable.",
    destacado: false
  },
  {
    id: 30,
    titulo: "Marvel’s Spider-Man",
    categoria: "Juego",
    plataforma: "PS4",
    genero: "Acción",
    precio: 39,
    anio: 2018,
    imagen: "img/juego-spiderman-ps4.jpg",
    descripcion: "Balancéate a toda velocidad por los rascacielos de Manhattan y enfréntate a los Seis Siniestros con un Peter Parker maduro y heroico.",
    destacado: false
  },

  // --- PS5 ---
  {
    id: 31,
    titulo: "Marvel’s Spider-Man 2",
    categoria: "Juego",
    plataforma: "PS5",
    genero: "Acción",
    precio: 69,
    anio: 2023,
    imagen: "img/juego-spiderman2.jpg",
    descripcion: "Peter Parker y Miles Morales unen fuerzas con poderes simbióticos y alas de telaraña para enfrentar la amenaza devastadora de Venom y Kraven.",
    destacado: true
  },
  {
    id: 32,
    titulo: "God of War Ragnarök",
    categoria: "Juego",
    plataforma: "PS5",
    genero: "Acción",
    precio: 69,
    anio: 2022,
    imagen: "img/juego-gow-ragnarok.jpg",
    descripcion: "El invierno del Fimbulvetr se cierne sobre los Nueve Reinos. Padre e hijo deciden el destino de los dioses nórdicos en el Ragnarök.",
    destacado: true
  },
  {
    id: 33,
    titulo: "Gran Turismo 7",
    categoria: "Juego",
    plataforma: "PS5",
    genero: "Carreras",
    precio: 59,
    anio: 2022,
    imagen: "img/juego-gt7.jpg",
    descripcion: "El simulador de conducción definitivo con más de 400 vehículos minuciosamente modelados, clima dinámico y respuesta de gatillos adaptativos.",
    destacado: false
  },
  {
    id: 34,
    titulo: "Horizon Forbidden West",
    categoria: "Juego",
    plataforma: "PS5",
    genero: "Aventura",
    precio: 59,
    anio: 2022,
    imagen: "img/juego-horizon2.jpg",
    descripcion: "Únete a Aloy mientras explora el majestuoso y peligroso Oeste Prohibido, enfrentando máquinas descomunales para sanar la biosfera terrestre.",
    destacado: false
  },

  // ==========================================
  // JUEGOS RETRO CLÁSICOS (8 títulos)
  // ==========================================
  {
    id: 35,
    titulo: "Super Mario Bros",
    categoria: "Juego",
    plataforma: "Nintendo Switch",
    genero: "Plataformas",
    precio: 29,
    anio: 1985,
    imagen: "img/juego-mario.jpg",
    descripcion: "El videojuego que redefinió la industria mundial. Salta tuberías, recolecta monedas y rescata a la Princesa Peach en el Reino Champiñón.",
    destacado: true
  },
  {
    id: 36,
    titulo: "The Legend of Zelda: Ocarina of Time",
    categoria: "Juego",
    plataforma: "Nintendo 64",
    genero: "Aventura",
    precio: 39,
    anio: 1998,
    imagen: "img/juego-zelda-oot.jpg",
    descripcion: "Ampliamente aclamado como una de las máximas obras de arte del medio interactivo. Viaja a través del tiempo para salvar a Hyrule de Ganondorf.",
    destacado: true
  },
  {
    id: 37,
    titulo: "Sonic the Hedgehog",
    categoria: "Juego",
    plataforma: "Sega Genesis",
    genero: "Plataformas",
    precio: 29,
    anio: 1991,
    imagen: "img/juego-sonic.jpg",
    descripcion: "Corre a la velocidad de la luz en Green Hill Zone recolectando anillos dorados y frustrando los perversos planes del Dr. Robotnik.",
    destacado: false
  },
  {
    id: 38,
    titulo: "Street Fighter II: The World Warrior",
    categoria: "Juego",
    plataforma: "Super Nintendo",
    genero: "Peleas",
    precio: 34,
    anio: 1992,
    imagen: "img/juego-street-fighter-2.jpg",
    descripcion: "El fenómeno que creó la cultura de los torneos de lucha. Domina el Hadouken de Ryu y derrota a los mejores guerreros mundiales.",
    destacado: false
  },
  {
    id: 39,
    titulo: "Mortal Kombat II",
    categoria: "Juego",
    plataforma: "Super Nintendo",
    genero: "Peleas",
    precio: 32,
    anio: 1993,
    imagen: "img/juego-mortal-kombat-2.jpg",
    descripcion: "Gráficos digitalizados, fatalities brutales y combates viscerales en el torneo del Outworld presidido por el emperador Shao Kahn.",
    destacado: false
  },
  {
    id: 40,
    titulo: "Pac-Man",
    categoria: "Juego",
    plataforma: "Arcade",
    genero: "Arcade",
    precio: 25,
    anio: 1980,
    imagen: "img/juego-pacman.jpg",
    descripcion: "El clásico inmortal del laberinto arcade. Devora puntos luminosos, esquiva a Blinky, Pinky, Inky y Clyde y bate récords mundiales.",
    destacado: false
  },
  {
    id: 41,
    titulo: "Donkey Kong Country",
    categoria: "Juego",
    plataforma: "Super Nintendo",
    genero: "Plataformas",
    precio: 35,
    anio: 1994,
    imagen: "img/juego-donkey-kong.jpg",
    descripcion: "Gráficos pre-renderizados revolucionarios de Rare, banda sonora magistral de David Wise y jugabilidad plataformera insuperable.",
    destacado: false
  },
  {
    id: 42,
    titulo: "Pokémon Rojo / Azul",
    categoria: "Juego",
    plataforma: "Game Boy",
    genero: "RPG",
    precio: 39,
    anio: 1996,
    imagen: "img/juego-pokemon-rojo.jpg",
    descripcion: "Inicia tu aventura como entrenador en Pueblo Paleta, desafía a los 8 líderes de gimnasio, derrota al Alto Mando y ¡hazte con todos los 151!",
    destacado: true
  },

  // ==========================================
  // ACCESORIOS (8 accesorios)
  // ==========================================
  {
    id: 43,
    titulo: "Control Inalámbrico DualSense Blanco",
    categoria: "Accesorio",
    plataforma: "PS5",
    genero: "Consola",
    precio: 69,
    anio: 2020,
    imagen: "img/accesorio-dualsense.jpg",
    descripcion: "Retroalimentación háptica inmersiva, gatillos adaptativos dinámicos y micrófono integrado con diseño ergonómico de vanguardia.",
    destacado: true
  },
  {
    id: 44,
    titulo: "Control Inalámbrico DualShock 4 Jet Black",
    categoria: "Accesorio",
    plataforma: "PS4",
    genero: "Consola",
    precio: 49,
    anio: 2013,
    imagen: "img/accesorio-dualshock4.jpg",
    descripcion: "Mando oficial con barra luminosa multicolor, botón Share para capturar tus mejores momentos y panel táctil de alta precisión.",
    destacado: false
  },
  {
    id: 45,
    titulo: "Mando Oficial PlayStation 2 DualShock 2",
    categoria: "Accesorio",
    plataforma: "PS2",
    genero: "Consola",
    precio: 29,
    anio: 2000,
    imagen: "img/accesorio-mando-ps2.jpg",
    descripcion: "El control clásico en color negro mate con botones sensibles a la presión y doble motor de vibración analógico.",
    destacado: false
  },
  {
    id: 46,
    titulo: "Memory Card 8MB Oficial Sony PS2",
    categoria: "Accesorio",
    plataforma: "PS2",
    genero: "Consola",
    precio: 19,
    anio: 2000,
    imagen: "img/accesorio-memory-ps2.jpg",
    descripcion: "Tarjeta de memoria original MagicGate de 8 megabytes para guardar partidas de tus juegos favoritos de PlayStation 2.",
    destacado: false
  },
  {
    id: 47,
    titulo: "Audífonos Inalámbricos Pulse 3D Wireless",
    categoria: "Accesorio",
    plataforma: "PS5",
    genero: "Consola",
    precio: 99,
    anio: 2020,
    imagen: "img/accesorio-audifonos-pulse.jpg",
    descripcion: "Optimizados para el audio 3D Tempest de PS5, con almohadillas refinadas y dos micrófonos con cancelación de ruido.",
    destacado: true
  },
  {
    id: 48,
    titulo: "Estación de Carga para Controles DualSense",
    categoria: "Accesorio",
    plataforma: "PS5",
    genero: "Consola",
    precio: 29,
    anio: 2020,
    imagen: "img/accesorio-base-carga.jpg",
    descripcion: "Carga hasta dos mandos DualSense simultáneamente sin necesidad de conectarlos a tu consola PS5 mediante un diseño de acoplamiento con clic.",
    destacado: false
  },
  {
    id: 49,
    titulo: "Cable HDMI 2.1 Ultra High Speed 4K/120Hz",
    categoria: "Accesorio",
    plataforma: "PS5",
    genero: "Consola",
    precio: 19,
    anio: 2020,
    imagen: "img/accesorio-cable-hdmi.jpg",
    descripcion: "Transmisión de ancho de banda de 48 Gbps con soporte HDR dinámico, eARC y frecuencia de actualización variable (VRR).",
    destacado: false
  },
  {
    id: 50,
    titulo: "Tarjeta de Memoria Original PS Vita 32GB",
    categoria: "Accesorio",
    plataforma: "PS Vita",
    genero: "Consola",
    precio: 39,
    anio: 2011,
    imagen: "img/accesorio-memoria-psvita.jpg",
    descripcion: "Almacenamiento oficial propietario para descargas de juegos digitales de PS Vita, partidas guardadas y contenido multimedia.",
    destacado: false
  },

  // ==========================================
  // COLECCIONABLES (3 coleccionables)
  // ==========================================
  {
    id: 51,
    titulo: "Estatua Kratos & Atreus Edición Coleccionista",
    categoria: "Coleccionable",
    plataforma: "PS4",
    genero: "Acción",
    precio: 129,
    anio: 2018,
    imagen: "img/coleccionable-estatua-kratos.jpg",
    descripcion: "Estatua de polirresina de 23 cm minuciosamente esculpida y pintada a mano por Gentle Giant Studios conmemorando la odisea nórdica.",
    destacado: true
  },
  {
    id: 52,
    titulo: "Libro de Arte Oficial: Historia 30 Aniversario",
    categoria: "Coleccionable",
    plataforma: "PS5",
    genero: "Consola",
    precio: 49,
    anio: 2024,
    imagen: "img/coleccionable-libro-arte.jpg",
    descripcion: "Edición de lujo en tapa dura con bocetos inéditos, entrevistas a creadores y el archivo visual completo de las 5 generaciones de PlayStation.",
    destacado: false
  },
  {
    id: 53,
    titulo: "Figura Articulada Crash Bandicoot Clásica",
    categoria: "Coleccionable",
    plataforma: "PS1",
    genero: "Plataformas",
    precio: 39,
    anio: 1996,
    imagen: "img/coleccionable-figura-crash.jpg",
    descripcion: "Figura de colección oficial con más de 16 puntos de articulación y caja temática con diseño de cartón retro noventero.",
    destacado: false
  }
];

// Helper global para fallback visual por ID de producto
function getFallbackImageById(id) {
  const prod = (typeof productos !== 'undefined') ? productos.find(p => p.id === Number(id)) : null;
  const titulo = prod ? prod.titulo : 'PixelVault';
  const plataforma = prod ? prod.plataforma : 'Retro';
  return getFallbackImage(titulo, plataforma);
}

// Helper global para fallback visual de imágenes si aún no han sido descargadas
function getFallbackImage(titulo, plataforma) {
  const safeTitle = (titulo || 'PixelVault')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '’')
    .substring(0, 24);

  const safePlat = (plataforma || 'PIXELVAULT')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '’');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#190628"/>
        <stop offset="50%" stop-color="#2d0b42"/>
        <stop offset="100%" stop-color="#120320"/>
      </linearGradient>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#a855f7"/>
        <stop offset="100%" stop-color="#c084fc"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <circle cx="200" cy="170" r="85" fill="none" stroke="url(#glow)" stroke-width="3" opacity="0.4"/>
    <path d="M140 180 C130 150, 150 140, 170 140 L230 140 C250 140, 270 150, 260 180 L250 210 C245 225, 235 225, 225 210 L215 195 L185 195 L175 210 C165 225, 155 225, 150 210 Z" fill="#200a33" stroke="#a855f7" stroke-width="4"/>
    <rect x="160" y="160" width="15" height="15" fill="#a855f7" rx="3"/>
    <circle cx="230" cy="162" r="5" fill="#e9d5ff"/>
    <circle cx="242" cy="172" r="5" fill="#a855f7"/>
    <text x="200" y="275" font-family="'Press Start 2P', monospace" font-size="14" fill="#e9d5ff" text-anchor="middle">${safePlat}</text>
    <text x="200" y="310" font-family="'Poppins', sans-serif" font-weight="600" font-size="13" fill="#a855f7" text-anchor="middle">${safeTitle}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
