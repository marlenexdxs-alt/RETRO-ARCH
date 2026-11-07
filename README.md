# 👾 RetroArch · Tienda Retro y Emulación

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-Native%20SFX-FF5722?style=for-the-badge)](https://developer.mozilla.org/es/docs/Web/API/Web_Audio_API)
[![Status](https://img.shields.io/badge/Status-Completado-success?style=for-the-badge)](#)

> **Plataforma web de comercio y exhibición interactiva de videojuegos retro, consolas PlayStation (PS1 - PS5), arcades clásicos y coleccionables, impulsada con estética Retro-Cyber, interfaz inspirada en la XMB de PS3 y un motor de efectos 8-bit sintetizados en tiempo real.**

---

## 🕹️ Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Arquitectura Visual y Motores](#-arquitectura-visual-y-motores)
- [Páginas del Proyecto](#-páginas-del-proyecto)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación y Uso Rápido](#-instalación-y-uso-rápido)
- [Detalles de Implementación](#-detalles-de-implementación)
- [Autores y Créditos](#-autores-y-créditos)

---

## 🚀 Características Principales

- **🎮 Barra de Navegación Estilo XMB (PS3 / PSP):**
  - Menú horizontal fluido inspirado en la Cross Media Bar de Sony.
  - Acceso directo a consolas (PS1, PS2, PS3, PS4, PS5, Retro, Accesorios).
  - Badges dinámicos con contador en tiempo real para carrito y lista de favoritos.

- **🕹️ HUD Retro Cyber & Arcade (RedMagic Style):**
  - Monitor de estado en vivo del núcleo (`CORE: RETROARCH-OS`).
  - Botón **INSERT COIN 🪙** interactivo con contador de créditos y efectos de sonido.
  - Conmutador **CRT ON/OFF 📺** con scanlines analógicas y viñeteado de TV vintage.
  - Conmutador **SFX ON/OFF 🔊** para silenciar o activar efectos sonoros.

- **🔊 Motor de Audio Sintetizado 8-Bit (Web Audio API):**
  - Efectos de sonido generados matemáticamente mediante osciladores nativos del navegador, sin dependencias externas:
    - Sonido de moneda arcade (`Insert Coin`).
    - Efectos al hacer click (`UI Beep`).
    - Sonido de encendido y advertencias retro.

- **🛒 Sistema de E-Commerce Completo (Client-Side):**
  - **Catálogo Dinámico:** Filtrado por plataforma, categoría, rango de precios y ordenación.
  - **Buscador Predictivo:** Búsqueda en tiempo real de títulos y accesorios.
  - **Carrito de Compras:** Gestión de cantidades, cálculo de subtotales, impuestos y persistencia con `localStorage`.
  - **Favoritos (Wishlist):** Guardado de productos deseados con toggle interactivo.
  - **Ficha de Producto Detallada:** Galería de imágenes, selector de unidades, especificaciones técnicas y productos relacionados.

- **🎬 Arcade Theater y Efectos Cinemáticos:**
  - Lienzo interactivo en Canvas (efecto rejilla horizonte retro estilo Synthwave/Outrun).
  - Fondo de video con modo cinema y efectos de tilt 3D reactivos al cursor.
  - Elementos flotantes interactivos (Pac-Man y Fantasmas retro) que no interfieren con el puntero.

---

## 🏛️ Páginas del Proyecto

| Archivo | Descripción |
|---|---|
| [`index.html`](file:///C:/Users/marle/Desktop/RETRO%20ARCH/index.html) | Portada principal, banner cinemático con Canvas 3D, destacados de consolas y acceso rápido al catálogo. |
| [`catalogo.html`](file:///C:/Users/marle/Desktop/RETRO%20ARCH/catalogo.html) | Catálogo general con filtros dinámicos por plataforma (PS1-PS5, Retro), ordenación y paginación. |
| [`producto.html`](file:///C:/Users/marle/Desktop/RETRO%20ARCH/producto.html) | Vista individual del producto con detalles técnicos, fotos de alta resolución y botón de compra. |
| [`carrito.html`](file:///C:/Users/marle/Desktop/RETRO%20ARCH/carrito.html) | Resumen del carrito de compras, modificación de unidades, código de descuento y checkout simulado. |
| [`favoritos.html`](file:///C:/Users/marle/Desktop/RETRO%20ARCH/favoritos.html) | Lista de deseos guardada por el usuario de forma persistente. |
| [`historia.html`](file:///C:/Users/marle/Desktop/RETRO%20ARCH/historia.html) | Línea de tiempo interactiva con la evolución histórica de las consolas de videojuegos. |
| [`nosotros.html`](file:///C:/Users/marle/Desktop/RETRO%20ARCH/nosotros.html) | Información sobre la filosofía del proyecto, el equipo y la pasión por la emulación y preservación del videojuego. |
| [`contacto.html`](file:///C:/Users/marle/Desktop/RETRO%20ARCH/contacto.html) | Formulario de contacto interactivo con validaciones y enlaces a soporte técnico. |

---

## 📂 Estructura del Proyecto

```text
RETRO ARCH/
│
├── index.html                 # Página de inicio
├── catalogo.html              # Catálogo de productos
├── producto.html              # Vista de detalle de producto
├── carrito.html               # Carrito de compras
├── favoritos.html             # Lista de deseos / favoritos
├── historia.html              # Línea temporal interactiva de consolas
├── nosotros.html              # Acerca de RetroArch
├── contacto.html              # Formulario y soporte
├── README.md                  # Documentación oficial del proyecto
│
├── css/
│   ├── estilos.css            # Estilos globales y diseño responsivo base
│   ├── retro-cyber.css        # Paletas neón, estética cyberpunk y overlays CRT
│   └── arcade-theater.css     # Estilos para el reproductor y modo arcade
│
├── js/
│   ├── app.js                 # Lógica global, inicialización y eventos base
│   ├── retro-engine.js        # Motor de audio 8-bit, HUD RedMagic, Canvas 3D y CRT
│   ├── arcade-theater.js      # Experiencia interactiva Arcade Theater
│   ├── productos.js           # Base de datos centralizada de productos (JSON/JS)
│   ├── catalogo.js            # Filtros, ordenación y renderizado dinámico de productos
│   ├── producto.js            # Renderizado de la ficha de detalle individual
│   ├── carrito.js             # Lógica de carrito, cálculo de totales y almacenamiento
│   ├── favoritos.js           # Gestión de lista de deseos
│   └── contacto.js            # Validación y simulación de envío de formulario
│
├── img/                       # Recursos gráficos y carátulas de juegos/consolas
└── IMAGENES/                  # Colección adicional de activos visuales
```

---

## 💻 Tecnologías Utilizadas

- **HTML5 Semántico:** Estructura accesible con `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` y `<footer>`.
- **CSS3 Moderno:**
  - Variables CSS (`Custom Properties`) para temas oscuros y efectos neón.
  - Maquetación híbrida con **CSS Grid** y **Flexbox**.
  - Sombras luminiscentes (`text-shadow`, `box-shadow`) y filtros de post-procesado SVG/CSS (`scanlines`, `vignette`).
  - Animaciones y transiciones a 60/120 FPS.
- **JavaScript Vanilla (ES6+):**
  - **Web Audio API:** Generador de audio retro analógico en tiempo real.
  - **HTML5 Canvas:** Renderizado dinámico de perspectiva 3D.
  - **Web Storage API (`localStorage`):** Persistencia instantánea de pedidos y favoritos sin servidor requerido.
  - **Intersection Observer API:** Animaciones eficientes al hacer scroll liberando CPU/GPU.

---

## ⚡ Instalación y Uso Rápido

No requiere instalación de paquetes adicionales ni compiladores. Funciona de manera 100% nativa en cualquier navegador web moderno.

### Opción 1: Abrir directamente en el navegador
1. Descarga o clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/retro-arch.git
   ```
2. Dirígete a la carpeta del proyecto:
   ```bash
   cd "RETRO ARCH"
   ```
3. Haz doble click sobre [`index.html`](file:///C:/Users/marle/Desktop/RETRO%20ARCH/index.html) para abrirlo en tu navegador favorito (Chrome, Firefox, Edge, Brave, etc.).

### Opción 2: Con un servidor local (Recomendado para video y audio)
Para disfrutar de la mejor experiencia sin restricciones de origen local (CORS):

- **Con Live Server en VS Code:**
  Haz click derecho en `index.html` y selecciona **"Open with Live Server"**.

- **Con Python:**
  ```bash
  python -m http.server 8080
  ```
  Luego abre en tu navegador: `http://localhost:8080`

- **Con Node.js (npx serve):**
  ```bash
  npx serve .
  ```

---

## 🛠️ Detalles de Implementación

### Controles del HUD y Atajos
- **🪙 Monedas / Créditos:** Presiona `INSERT COIN` para recargar tus créditos de juego arcade y disparar el sintetizador sonoro.
- **📺 Modo CRT:** Activa o desactiva las líneas de exploración de tubos de rayos catódicos con un solo click.
- **🔊 SFX:** Alterna los efectos de sonido retro si prefieres navegar en silencio.
- **💾 Persistencia:** Tu carrito y tus productos favoritos se mantendrán guardados incluso si cierras o recargas la pestaña.

---

## 👾 Créditos y Licencia

Desarrollado con ❤️ para los amantes del coleccionismo, el gaming retro y la preservación de videojuegos clásicos.

*Proyecto educativo y de demostración multimedia.*
