/**
 * PIXELVAULT - Lógica Principal y Utilidades Globales
 * Manejo de Carrito, Favoritos, Toasts y Página de Inicio
 */

// ==========================================================================
// UTILIDADES DE ALMACENAMIENTO (localStorage)
// ==========================================================================
const STORAGE_KEYS = {
  CARRITO: 'pixelvault_carrito',
  FAVORITOS: 'pixelvault_favoritos'
};

// Obtener carrito desde localStorage
const obtenerCarrito = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CARRITO);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error al leer el carrito de localStorage:', e);
    return [];
  }
};

// Guardar carrito en localStorage
const guardarCarrito = (carrito) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CARRITO, JSON.stringify(carrito));
    actualizarBadges();
  } catch (e) {
    console.error('Error al guardar el carrito en localStorage:', e);
  }
};

// Obtener lista de IDs de favoritos
const obtenerFavoritos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITOS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error al leer favoritos de localStorage:', e);
    return [];
  }
};

// Guardar favoritos en localStorage
const guardarFavoritos = (favoritos) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITOS, JSON.stringify(favoritos));
    actualizarBadges();
  } catch (e) {
    console.error('Error al guardar favoritos en localStorage:', e);
  }
};

// ==========================================================================
// BADGES DEL MENÚ XMB (Contador de Carrito y Favoritos)
// ==========================================================================
const actualizarBadges = () => {
  const carrito = obtenerCarrito();
  const favoritos = obtenerFavoritos();

  const totalItemsCarrito = carrito.reduce((acum, item) => acum + (item.cantidad || 1), 0);
  const totalFavoritos = favoritos.length;

  const cartBadge = document.getElementById('cart-count');
  if (cartBadge) {
    cartBadge.textContent = totalItemsCarrito;
  }

  const favBadge = document.getElementById('fav-count');
  if (favBadge) {
    favBadge.textContent = totalFavoritos;
  }
};

// ==========================================================================
// SISTEMA DE NOTIFICACIONES TOAST RETRO
// ==========================================================================
const mostrarToast = (titulo, mensaje, icono = '🎮') => {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">${icono}</div>
    <div class="toast-content">
      <div class="toast-title">${titulo}</div>
      <div class="toast-msg">${mensaje}</div>
    </div>
  `;

  container.appendChild(toast);

  // Auto-eliminar después de 3.2 segundos con animación suave
  setTimeout(() => {
    toast.classList.add('toast-hide');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 3200);
};

// ==========================================================================
// ACCIONES GLOBALES: AGREGAR AL CARRITO Y FAVORITOS
// ==========================================================================
const agregarAlCarritoGlobal = (idProducto, cantidad = 1) => {
  if (typeof productos === 'undefined') return;

  const prod = productos.find(p => p.id === Number(idProducto));
  if (!prod) return;

  const carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === prod.id);

  if (index !== -1) {
    carrito[index].cantidad += Number(cantidad);
  } else {
    carrito.push({
      id: prod.id,
      titulo: prod.titulo,
      plataforma: prod.plataforma,
      precio: prod.precio,
      imagen: prod.imagen,
      cantidad: Number(cantidad)
    });
  }

  guardarCarrito(carrito);
  mostrarToast('¡Agregado al Carrito!', `${prod.titulo} se añadió a tu orden.`, '🛒');
};

const toggleFavoritoGlobal = (idProducto, elementoBoton = null) => {
  if (typeof productos === 'undefined') return;

  const id = Number(idProducto);
  const prod = productos.find(p => p.id === id);
  if (!prod) return;

  let favoritos = obtenerFavoritos();
  const index = favoritos.indexOf(id);

  if (index !== -1) {
    favoritos.splice(index, 1);
    guardarFavoritos(favoritos);
    if (elementoBoton) {
      elementoBoton.classList.remove('is-fav');
      elementoBoton.innerHTML = '🤍';
    }
    mostrarToast('Eliminado de Favoritos', `${prod.titulo} se quitó de tu lista.`, '💔');
  } else {
    favoritos.push(id);
    guardarFavoritos(favoritos);
    if (elementoBoton) {
      elementoBoton.classList.add('is-fav');
      elementoBoton.innerHTML = '❤️';
    }
    mostrarToast('¡Guardado en Favoritos!', `${prod.titulo} se añadió a favoritos.`, '❤️');
  }

  // Refrescar todas las tarjetas activas del producto si existen en la vista
  document.querySelectorAll(`.btn-fav-float[data-id="${id}"]`).forEach(btn => {
    const isFav = favoritos.includes(id);
    btn.classList.toggle('is-fav', isFav);
    btn.innerHTML = isFav ? '❤️' : '🤍';
  });
};

// ==========================================================================
// GENERADOR DINÁMICO DE TARJETA HTML (Seguro y a prueba de errores de comillas)
// ==========================================================================
const crearTarjetaProductoHTML = (prod) => {
  const favoritos = obtenerFavoritos();
  const esFavorito = favoritos.includes(prod.id);

  return `
    <article class="product-card" data-id="${prod.id}">
      <div class="card-media-wrapper">
        <a href="producto.html?id=${prod.id}">
          <img 
            src="${prod.imagen}" 
            alt="${prod.titulo}" 
            class="card-img" 
            loading="lazy" 
            onerror="this.onerror=null; this.src=getFallbackImageById(${prod.id});"
          >
        </a>
        <button 
          class="btn-fav-float ${esFavorito ? 'is-fav' : ''}" 
          data-id="${prod.id}" 
          title="Guardar en favoritos"
          onclick="toggleFavoritoGlobal(${prod.id}, this)"
        >
          ${esFavorito ? '❤️' : '🤍'}
        </button>
        <div class="card-badges">
          <span class="tag-platform">${prod.plataforma}</span>
          <span class="tag-year">${prod.anio}</span>
        </div>
      </div>
      <div class="card-content">
        <div class="card-category-genre">
          <span>${prod.categoria}</span> · <span>${prod.genero}</span>
        </div>
        <a href="producto.html?id=${prod.id}">
          <h3 class="card-title">${prod.titulo}</h3>
        </a>
        <p class="card-desc">${prod.descripcion}</p>
        <div class="card-footer">
          <div class="card-price"><small>$</small>${prod.precio}</div>
          <button 
            class="btn-add-cart" 
            onclick="agregarAlCarritoGlobal(${prod.id}, 1)"
            title="Añadir al carrito"
          >
            <span>+</span> Carrito
          </button>
        </div>
      </div>
    </article>
  `;
};

// ==========================================================================
// INICIALIZACIÓN GENERAL Y PÁGINA DE INICIO (index.html)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  actualizarBadges();

  // Menú hamburguesa responsivo
  const mobileToggle = document.getElementById('mobile-toggle');
  const menuWrapper = document.getElementById('xmb-menu-wrapper');
  if (mobileToggle && menuWrapper) {
    mobileToggle.addEventListener('click', () => {
      menuWrapper.classList.toggle('open');
    });

    // Cerrar menú móvil al hacer clic en cualquier enlace
    document.querySelectorAll('.xmb-link').forEach(link => {
      link.addEventListener('click', () => {
        menuWrapper.classList.remove('open');
      });
    });
  }

  // Renderizar Consolas Destacadas en index.html
  // Lista requerida: PS1, PS2, PS3, PS4, PS5, PSP, Nintendo Switch, Nintendo 64, Super Nintendo, Sega Genesis, Game Boy y Atari
  const consolasGrid = document.getElementById('consolas-grid');
  if (consolasGrid && typeof productos !== 'undefined') {
    const plataformasConsolas = [
      'PS1', 'PS2', 'PS3', 'PS4', 'PS5', 'PSP',
      'Nintendo Switch', 'Nintendo 64', 'Super Nintendo', 'Sega Genesis',
      'Game Boy', 'Atari'
    ];

    const consolasFiltradas = productos.filter(p => 
      p.categoria === 'Consola' && plataformasConsolas.includes(p.plataforma)
    );

    consolasGrid.innerHTML = consolasFiltradas
      .map(prod => crearTarjetaProductoHTML(prod))
      .join('');
  }

  // Renderizar 8 Juegos Destacados en index.html
  const juegosGrid = document.getElementById('juegos-destacados-grid');
  if (juegosGrid && typeof productos !== 'undefined') {
    const juegosDestacados = productos
      .filter(p => p.categoria === 'Juego' && p.destacado)
      .slice(0, 8);

    juegosGrid.innerHTML = juegosDestacados
      .map(prod => crearTarjetaProductoHTML(prod))
      .join('');
  }

  // Renderizar 4 Accesorios Destacados en index.html
  const accesoriosGrid = document.getElementById('accesorios-destacados-grid');
  if (accesoriosGrid && typeof productos !== 'undefined') {
    const accesoriosDestacados = productos
      .filter(p => p.categoria === 'Accesorio')
      .slice(0, 4);

    accesoriosGrid.innerHTML = accesoriosDestacados
      .map(prod => crearTarjetaProductoHTML(prod))
      .join('');
  }
});
