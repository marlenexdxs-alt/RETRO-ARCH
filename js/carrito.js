/**
 * PIXELVAULT - Lógica del Carrito de Compras
 * Renderizado de productos, modificación de cantidades, cálculo de totales
 * y simulación interactiva de compra
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cart-items-container');
  const summaryBox = document.getElementById('cart-summary-box');
  const btnEmptyCart = document.getElementById('btn-empty-cart');
  const btnCheckout = document.getElementById('btn-checkout');
  const checkoutModal = document.getElementById('checkout-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');

  // Renderizar la tabla de productos del carrito
  const renderizarCarrito = () => {
    const carrito = obtenerCarrito();

    // Actualizar badge del menú superior
    actualizarBadges();

    // Si el carrito está vacío
    if (carrito.length === 0) {
      if (container) {
        container.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1; width: 100%;">
            <div class="empty-state-icon">🛒</div>
            <h3>Tu carrito está vacío</h3>
            <p>Parece que aún no has agregado ninguna consola, juego o accesorio legendario a tu inventario.</p>
            <a href="catalogo.html" class="btn-neon">
              Explorar Catálogo
            </a>
          </div>
        `;
      }

      if (summaryBox) {
        summaryBox.style.display = 'none';
      }
      return;
    }

    if (summaryBox) {
      summaryBox.style.display = 'block';
    }

    // Renderizar lista de ítems
    if (container) {
      container.innerHTML = carrito.map(item => {
        const subtotal = item.precio * item.cantidad;
        return `
          <div class="cart-item-card" data-id="${item.id}">
            <img 
              src="${item.imagen}" 
              alt="${item.titulo}" 
              class="cart-item-img"
              onerror="this.onerror=null; this.src=getFallbackImageById(${item.id});"
            >
            <div class="cart-item-info">
              <h3 class="cart-item-title">${item.titulo}</h3>
              <div class="cart-item-meta">Plataforma: <strong>${item.plataforma}</strong></div>
              <div class="cart-item-price">$${item.precio} USD</div>
            </div>

            <!-- Controles de Cantidad -->
            <div class="qty-control">
              <button class="qty-btn btn-cart-minus" data-id="${item.id}" type="button" aria-label="Disminuir">-</button>
              <input type="number" class="qty-input" value="${item.cantidad}" min="1" readonly>
              <button class="qty-btn btn-cart-plus" data-id="${item.id}" type="button" aria-label="Aumentar">+</button>
            </div>

            <div class="cart-item-subtotal">
              $${subtotal}
            </div>

            <button class="btn-remove-item" data-id="${item.id}" title="Eliminar producto" type="button" aria-label="Eliminar">
              🗑️
            </button>
          </div>
        `;
      }).join('');

      // Asociar eventos a los botones de cada ítem
      asignarEventosItems();
    }

    // Actualizar el resumen de totales
    actualizarResumen(carrito);
  };

  // Asignar eventos de incremento, decremento y eliminación
  const asignarEventosItems = () => {
    // Botones de incremento (+)
    document.querySelectorAll('.btn-cart-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        modificarCantidad(id, 1);
      });
    });

    // Botones de decremento (-)
    document.querySelectorAll('.btn-cart-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        modificarCantidad(id, -1);
      });
    });

    // Botones de eliminar (🗑️)
    document.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        eliminarItem(id);
      });
    });
  };

  // Modificar cantidad de un producto
  const modificarCantidad = (id, cambio) => {
    let carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === id);

    if (item) {
      item.cantidad += cambio;
      if (item.cantidad <= 0) {
        carrito = carrito.filter(i => i.id !== id);
        mostrarToast('Producto Eliminado', 'Se quitó el ítem del carrito.', '🗑️');
      } else {
        mostrarToast('Cantidad Actualizada', `${item.titulo} (${item.cantidad} uds)`, '✏️');
      }
      guardarCarrito(carrito);
      renderizarCarrito();
    }
  };

  // Eliminar un producto por completo
  const eliminarItem = (id) => {
    let carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === id);
    carrito = carrito.filter(i => i.id !== id);
    guardarCarrito(carrito);
    renderizarCarrito();
    mostrarToast('Eliminado', `${item ? item.titulo : 'Producto'} fue eliminado.`, '🗑️');
  };

  // Calcular subtotal, envío ficticio y total
  const actualizarResumen = (carrito) => {
    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const envio = subtotal > 0 ? 0 : 0; // Envío demostrativo gratuito
    const total = subtotal + envio;

    const elSubtotal = document.getElementById('summary-subtotal');
    const elEnvio = document.getElementById('summary-shipping');
    const elTotal = document.getElementById('summary-total');

    if (elSubtotal) elSubtotal.textContent = `$${subtotal} USD`;
    if (elEnvio) elEnvio.textContent = subtotal > 0 ? 'GRATIS (Demo)' : '$0 USD';
    if (elTotal) elTotal.textContent = `$${total} USD`;
  };

  // Evento: Vaciar Carrito
  if (btnEmptyCart) {
    btnEmptyCart.addEventListener('click', () => {
      const carrito = obtenerCarrito();
      if (carrito.length === 0) return;

      if (confirm('¿Estás seguro de que deseas vaciar todos los productos de tu carrito?')) {
        guardarCarrito([]);
        renderizarCarrito();
        mostrarToast('Carrito Vaciado', 'Se han eliminado todos los productos.', '🧹');
      }
    });
  }

  // Evento: Finalizar Pedido (Simulación interactiva)
  if (btnCheckout) {
    btnCheckout.addEventListener('click', () => {
      const carrito = obtenerCarrito();
      if (carrito.length === 0) {
        mostrarToast('Carrito Vacío', 'Agrega productos antes de finalizar la compra.', '⚠️');
        return;
      }

      const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
      const totalArticulos = carrito.reduce((acc, i) => acc + i.cantidad, 0);

      // Abrir modal de simulación
      if (checkoutModal) {
        document.getElementById('checkout-modal-total').textContent = `$${total} USD`;
        document.getElementById('checkout-modal-items-count').textContent = totalArticulos;
        checkoutModal.classList.add('active');

        // Vaciar el carrito en localStorage para simular compra completada
        guardarCarrito([]);
        renderizarCarrito();
        mostrarToast('¡Orden Procesada!', 'Simulación de pedido completada con éxito.', '🎉');
      }
    });
  }

  // Cerrar Modal y volver al inicio
  if (btnCloseModal && checkoutModal) {
    btnCloseModal.addEventListener('click', () => {
      checkoutModal.classList.remove('active');
      window.location.href = 'index.html';
    });

    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) {
        checkoutModal.classList.remove('active');
      }
    });
  }

  // Ejecución inicial
  renderizarCarrito();
});
