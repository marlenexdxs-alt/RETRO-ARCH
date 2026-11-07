/**
 * PIXELVAULT - Detalle del Producto
 * Lectura de ID por URL, renderizado de información y productos relacionados
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof productos === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');
  const productoId = Number(idParam);

  const container = document.getElementById('producto-detalle-container');
  const relatedSection = document.getElementById('seccion-relacionados');
  const relatedGrid = document.getElementById('productos-relacionados-grid');

  const producto = productos.find(p => p.id === productoId);

  // Si no se encuentra el producto o ID inválido
  if (!producto) {
    document.title = 'Producto no encontrado · PixelVault';

    if (container) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; width: 100%;">
          <div class="empty-state-icon">⚠️</div>
          <h2 class="pixel-font" style="font-size: 1.3rem; margin-bottom: 1rem; color: #fca5a5;">¡Producto no encontrado!</h2>
          <p>El producto solicitado con ID [${idParam || 'vacío'}] no existe en nuestro catálogo de PixelVault.</p>
          <a href="catalogo.html" class="btn-neon" style="margin-top: 1.5rem;">
            ← Volver al Catálogo
          </a>
        </div>
      `;
    }

    if (relatedSection) {
      relatedSection.style.display = 'none';
    }
    return;
  }

  // Actualizar el título de la pestaña del navegador
  document.title = `${producto.titulo} · PixelVault`;

  // Renderizar detalle
  if (container) {
    const favoritos = obtenerFavoritos();
    const esFav = favoritos.includes(producto.id);

    container.innerHTML = `
      <div class="product-detail-layout">
        <!-- Galería / Imagen Principal -->
        <div class="detail-gallery-box">
          <img 
            src="${producto.imagen}" 
            alt="${producto.titulo}" 
            class="detail-img"
            onerror="this.onerror=null; this.src=getFallbackImageById(${producto.id});"
          >
        </div>

        <!-- Información y Compra -->
        <div class="detail-info-box">
          <div class="detail-tags">
            <span class="tag-platform">${producto.plataforma}</span>
            <span class="tag-year">Año: ${producto.anio}</span>
          </div>

          <h1 class="detail-title">${producto.titulo}</h1>

          <div class="detail-meta-list">
            <div class="detail-meta-item">
              <strong>Categoría</strong>
              <span>${producto.categoria}</span>
            </div>
            <div class="detail-meta-item">
              <strong>Género</strong>
              <span>${producto.genero}</span>
            </div>
            <div class="detail-meta-item">
              <strong>Plataforma</strong>
              <span>${producto.plataforma}</span>
            </div>
            <div class="detail-meta-item">
              <strong>Estado</strong>
              <span class="detail-stock-badge">✓ En catálogo demostrativo</span>
            </div>
          </div>

          <div class="detail-price-box">
            <div class="detail-price"><small>$</small>${producto.precio} <small style="font-size: 0.8rem; color: var(--text-muted);">USD</small></div>
          </div>

          <p class="detail-description">${producto.descripcion}</p>

          <!-- Acciones de Compra -->
          <div class="detail-actions">
            <div class="qty-control">
              <button class="qty-btn" id="btn-qty-minus" type="button" aria-label="Disminuir">-</button>
              <input type="number" id="detail-qty" class="qty-input" value="1" min="1" max="99" readonly>
              <button class="qty-btn" id="btn-qty-plus" type="button" aria-label="Aumentar">+</button>
            </div>

            <button class="btn-neon" id="btn-add-detail-cart" type="button">
              🛒 Agregar al Carrito
            </button>

            <button class="btn-detail-fav ${esFav ? 'is-fav' : ''}" id="btn-detail-fav" type="button">
              <span id="fav-icon">${esFav ? '❤️' : '🤍'}</span>
              <span id="fav-text">${esFav ? 'En Favoritos' : 'Añadir a Favoritos'}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Manejador del selector de cantidad
    const qtyInput = document.getElementById('detail-qty');
    const btnMinus = document.getElementById('btn-qty-minus');
    const btnPlus = document.getElementById('btn-qty-plus');

    if (btnMinus && qtyInput) {
      btnMinus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 1;
        if (val > 1) qtyInput.value = val - 1;
      });
    }

    if (btnPlus && qtyInput) {
      btnPlus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 1;
        if (val < 99) qtyInput.value = val + 1;
      });
    }

    // Botón Agregar al Carrito con cantidad seleccionada
    const btnAddToCart = document.getElementById('btn-add-detail-cart');
    if (btnAddToCart && qtyInput) {
      btnAddToCart.addEventListener('click', () => {
        const qty = parseInt(qtyInput.value) || 1;
        agregarAlCarritoGlobal(producto.id, qty);
      });
    }

    // Botón de Favorito en Detalle
    const btnFav = document.getElementById('btn-detail-fav');
    if (btnFav) {
      btnFav.addEventListener('click', () => {
        toggleFavoritoGlobal(producto.id);
        const favsActualizados = obtenerFavoritos();
        const estaEnFavs = favsActualizados.includes(producto.id);
        btnFav.classList.toggle('is-fav', estaEnFavs);
        document.getElementById('fav-icon').textContent = estaEnFavs ? '❤️' : '🤍';
        document.getElementById('fav-text').textContent = estaEnFavs ? 'En Favoritos' : 'Añadir a Favoritos';
      });
    }
  }

  // Renderizar 4 productos relacionados
  // Misma plataforma o categoría, excluyendo el producto actual
  if (relatedGrid) {
    let relacionados = productos.filter(p => 
      p.id !== producto.id && (p.plataforma === producto.plataforma || p.categoria === producto.categoria)
    );

    // Si hay menos de 4, completar con otros productos
    if (relacionados.length < 4) {
      const extras = productos.filter(p => p.id !== producto.id && !relacionados.includes(p));
      relacionados = [...relacionados, ...extras];
    }

    const seleccionados = relacionados.slice(0, 4);

    relatedGrid.innerHTML = seleccionados
      .map(prod => crearTarjetaProductoHTML(prod))
      .join('');
  }
});
