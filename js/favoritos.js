/**
 * PIXELVAULT - Lógica de Favoritos
 * Renderizado de lista de deseos, adición directa al carrito y eliminación
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('favoritos-grid');
  const countDisplay = document.getElementById('favoritos-count');

  const renderizarFavoritos = () => {
    actualizarBadges();

    if (typeof productos === 'undefined') return;

    const favoritosIds = obtenerFavoritos();
    const productosFavoritos = productos.filter(p => favoritosIds.includes(p.id));

    if (countDisplay) {
      countDisplay.textContent = `${productosFavoritos.length} producto${productosFavoritos.length === 1 ? '' : 's'}`;
    }

    if (!container) return;

    if (productosFavoritos.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; width: 100%;">
          <div class="empty-state-icon">❤️</div>
          <h3>Aún no tienes favoritos</h3>
          <p>Explora nuestras consolas PlayStation y juegos retro y presiona el corazón para guardarlos aquí.</p>
          <a href="catalogo.html" class="btn-neon">
            Explorar Catálogo
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = productosFavoritos.map(prod => `
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
            class="btn-fav-float is-fav" 
            data-id="${prod.id}" 
            title="Quitar de favoritos"
            onclick="quitarDeFavoritosView(${prod.id})"
            aria-label="Quitar de favoritos"
          >
            ❤️
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
    `).join('');
  };

  // Función específica para quitar y re-renderizar de inmediato en esta vista
  window.quitarDeFavoritosView = (id) => {
    toggleFavoritoGlobal(id);
    renderizarFavoritos();
  };

  // Render inicial
  renderizarFavoritos();
});
