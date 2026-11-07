/**
 * PIXELVAULT - Lógica de Catálogo
 * Filtros por Categoría, Plataforma, Género, Búsqueda en tiempo real y Ordenación
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof productos === 'undefined') return;

  const catalogGrid = document.getElementById('catalog-products-grid');
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('filter-category');
  const platformFilter = document.getElementById('filter-platform');
  const genreFilter = document.getElementById('filter-genre');
  const sortFilter = document.getElementById('filter-sort');
  const btnReset = document.getElementById('btn-reset-filters');
  const countDisplay = document.getElementById('catalog-count');
  const activeFiltersDisplay = document.getElementById('active-filters-tags');

  // Plataformas consideradas "Retro" para el acceso rápido del menú XMB
  const PLATAFORMAS_RETRO = [
    'Super Nintendo', 'Nintendo 64', 'Sega Genesis', 'Game Boy', 'Atari', 'Arcade'
  ];

  let filtroRetroActivo = false;

  // Sincronizar filtros según URL
  const sincronizarDesdeURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramPlataforma = urlParams.get('plataforma');
    const paramCategoria = urlParams.get('categoria');

    if (paramPlataforma === 'Retro' || paramCategoria === 'Retro') {
      filtroRetroActivo = true;
      if (platformFilter) platformFilter.value = 'Todas';
    } else if (paramPlataforma && platformFilter) {
      filtroRetroActivo = false;
      platformFilter.value = paramPlataforma;
    } else {
      filtroRetroActivo = false;
      if (platformFilter) platformFilter.value = 'Todas';
    }

    if (paramCategoria && categoryFilter && paramCategoria !== 'Retro') {
      categoryFilter.value = paramCategoria;
    } else if (!paramCategoria && categoryFilter) {
      categoryFilter.value = 'Todas';
    }

    actualizarEstiloMenuActivo(paramPlataforma, paramCategoria);
  };

  // Resaltar visualmente el ítem correspondiente en la barra de navegación XMB
  const actualizarEstiloMenuActivo = (plat, cat) => {
    document.querySelectorAll('.xmb-link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      if (plat === 'Retro' && href.includes('plataforma=Retro')) {
        link.classList.add('active');
      } else if (plat && href.includes(`plataforma=${plat}`)) {
        link.classList.add('active');
      } else if (cat && href.includes(`categoria=${cat}`)) {
        link.classList.add('active');
      }
    });
  };

  // Interceptar clics en el menú XMB cuando ya estamos en la página del catálogo
  document.querySelectorAll('.xmb-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('catalogo.html?')) {
        e.preventDefault();
        const url = new URL(href, window.location.href);
        window.history.pushState({}, '', href);
        sincronizarDesdeURL();
        aplicarFiltrosYRenderizar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Función principal de filtrado y ordenación
  const aplicarFiltrosYRenderizar = () => {
    const textoBusqueda = (searchInput ? searchInput.value.toLowerCase().trim() : '');
    const categoriaSeleccionada = categoryFilter ? categoryFilter.value : 'Todas';
    const plataformaSeleccionada = platformFilter ? platformFilter.value : 'Todas';
    const generoSeleccionado = genreFilter ? genreFilter.value : 'Todos';
    const ordenSeleccionado = sortFilter ? sortFilter.value : 'defecto';

    // 1. Filtrar productos
    let resultado = productos.filter(p => {
      // Coincidencia con buscador (título o descripción)
      const coincideBusqueda = 
        p.titulo.toLowerCase().includes(textoBusqueda) || 
        p.descripcion.toLowerCase().includes(textoBusqueda);

      // Coincidencia con categoría
      const coincideCategoria = 
        categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada;

      // Coincidencia con plataforma (incluye caso especial Retro)
      let coincidePlataforma = true;
      if (filtroRetroActivo) {
        coincidePlataforma = PLATAFORMAS_RETRO.includes(p.plataforma);
      } else if (plataformaSeleccionada !== 'Todas') {
        coincidePlataforma = p.plataforma === plataformaSeleccionada;
      }

      // Coincidencia con género
      const coincideGenero = 
        generoSeleccionado === 'Todos' || p.genero === generoSeleccionado;

      return coincideBusqueda && coincideCategoria && coincidePlataforma && coincideGenero;
    });

    // 2. Ordenar productos
    if (ordenSeleccionado === 'precio-menor') {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (ordenSeleccionado === 'precio-mayor') {
      resultado.sort((a, b) => b.precio - a.precio);
    } else if (ordenSeleccionado === 'nombre-az') {
      resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (ordenSeleccionado === 'anio-desc') {
      resultado.sort((a, b) => b.anio - a.anio);
    } else if (ordenSeleccionado === 'defecto') {
      // Mostrar primero los productos destacados
      resultado.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    }

    // 3. Actualizar contador
    if (countDisplay) {
      countDisplay.textContent = `Mostrando ${resultado.length} de ${productos.length} productos`;
    }

    // 4. Mostrar tags de filtros activos
    actualizarTagsFiltros(categoriaSeleccionada, plataformaSeleccionada, generoSeleccionado, textoBusqueda);

    // 5. Renderizar en el DOM
    if (!catalogGrid) return;

    if (resultado.length === 0) {
      catalogGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; width: 100%;">
          <div class="empty-state-icon">👾</div>
          <h3>No encontramos productos</h3>
          <p>No hay coincidencias con los filtros seleccionados. Intenta restablecer los filtros o busca con otro término.</p>
          <button class="btn-neon btn-neon-secondary" id="btn-empty-reset" type="button">
            Limpiar Filtros
          </button>
        </div>
      `;
      const btnEmptyReset = document.getElementById('btn-empty-reset');
      if (btnEmptyReset && btnReset) {
        btnEmptyReset.addEventListener('click', () => btnReset.click());
      }
    } else {
      catalogGrid.innerHTML = resultado
        .map(prod => crearTarjetaProductoHTML(prod))
        .join('');
    }
  };

  // Actualizar indicadores visuales de filtros
  const actualizarTagsFiltros = (cat, plat, gen, busq) => {
    if (!activeFiltersDisplay) return;

    let tags = [];
    if (busq) tags.push(`Búsqueda: "${busq}"`);
    if (cat !== 'Todas') tags.push(`Categoría: ${cat}`);
    if (filtroRetroActivo) {
      tags.push(`Sección: Retro Clásicos`);
    } else if (plat !== 'Todas') {
      tags.push(`Plataforma: ${plat}`);
    }
    if (gen !== 'Todos') tags.push(`Género: ${gen}`);

    if (tags.length === 0) {
      activeFiltersDisplay.innerHTML = `<span style="color: var(--text-muted); font-size: 0.8rem;">Sin filtros activos (mostrando todo)</span>`;
    } else {
      activeFiltersDisplay.innerHTML = tags
        .map(t => `<span class="badge-active-filter">⚡ ${t}</span>`)
        .join(' ');
    }
  };

  // Event Listeners para interacción reactiva
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      aplicarFiltrosYRenderizar();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      aplicarFiltrosYRenderizar();
    });
  }

  if (platformFilter) {
    platformFilter.addEventListener('change', () => {
      filtroRetroActivo = false;
      aplicarFiltrosYRenderizar();
    });
  }

  if (genreFilter) {
    genreFilter.addEventListener('change', () => {
      aplicarFiltrosYRenderizar();
    });
  }

  if (sortFilter) {
    sortFilter.addEventListener('change', () => {
      aplicarFiltrosYRenderizar();
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (categoryFilter) categoryFilter.value = 'Todas';
      if (platformFilter) platformFilter.value = 'Todas';
      if (genreFilter) genreFilter.value = 'Todos';
      if (sortFilter) sortFilter.value = 'defecto';
      filtroRetroActivo = false;

      // Limpiar URL
      window.history.replaceState({}, document.title, window.location.pathname);
      actualizarEstiloMenuActivo(null, null);

      aplicarFiltrosYRenderizar();
      mostrarToast('Filtros Reiniciados', 'Mostrando todo el catálogo completo.', '🔄');
    });
  }

  // Soporte para botón atrás/adelante en el historial del navegador
  window.addEventListener('popstate', () => {
    sincronizarDesdeURL();
    aplicarFiltrosYRenderizar();
  });

  // Ejecución inicial
  sincronizarDesdeURL();
  aplicarFiltrosYRenderizar();
});
