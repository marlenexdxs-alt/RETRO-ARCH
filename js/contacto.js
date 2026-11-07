/**
 * PIXELVAULT - Lógica del Formulario de Contacto
 * Validaciones en tiempo real y envío simulado sin backend
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const inputAsunto = document.getElementById('asunto');
  const inputMensaje = document.getElementById('mensaje');
  const contactModal = document.getElementById('contact-success-modal');
  const btnCloseContactModal = document.getElementById('btn-close-contact-modal');

  // Regex para validación de email estándar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Funciones de validación de campos
  const validarCampoRequerido = (input, idError) => {
    const errorEl = document.getElementById(idError);
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      if (errorEl) {
        errorEl.textContent = 'Este campo no puede estar vacío.';
        errorEl.classList.add('show');
      }
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorEl) errorEl.classList.remove('show');
      return true;
    }
  };

  const validarEmail = () => {
    const errorEl = document.getElementById('error-email');
    const valor = inputEmail.value.trim();

    if (!valor) {
      inputEmail.classList.add('is-invalid');
      if (errorEl) {
        errorEl.textContent = 'Por favor ingresa tu correo electrónico.';
        errorEl.classList.add('show');
      }
      return false;
    } else if (!emailRegex.test(valor)) {
      inputEmail.classList.add('is-invalid');
      if (errorEl) {
        errorEl.textContent = 'Ingresa un formato de correo válido (ej: usuario@correo.com).';
        errorEl.classList.add('show');
      }
      return false;
    } else {
      inputEmail.classList.remove('is-invalid');
      if (errorEl) errorEl.classList.remove('show');
      return true;
    }
  };

  // Validación reactiva al escribir o desenfocar
  if (inputNombre) {
    inputNombre.addEventListener('blur', () => validarCampoRequerido(inputNombre, 'error-nombre'));
    inputNombre.addEventListener('input', () => {
      if (inputNombre.value.trim()) {
        inputNombre.classList.remove('is-invalid');
        document.getElementById('error-nombre')?.classList.remove('show');
      }
    });
  }

  if (inputEmail) {
    inputEmail.addEventListener('blur', validarEmail);
    inputEmail.addEventListener('input', () => {
      if (emailRegex.test(inputEmail.value.trim())) {
        inputEmail.classList.remove('is-invalid');
        document.getElementById('error-email')?.classList.remove('show');
      }
    });
  }

  if (inputAsunto) {
    inputAsunto.addEventListener('blur', () => validarCampoRequerido(inputAsunto, 'error-asunto'));
    inputAsunto.addEventListener('input', () => {
      if (inputAsunto.value.trim()) {
        inputAsunto.classList.remove('is-invalid');
        document.getElementById('error-asunto')?.classList.remove('show');
      }
    });
  }

  if (inputMensaje) {
    inputMensaje.addEventListener('blur', () => validarCampoRequerido(inputMensaje, 'error-mensaje'));
    inputMensaje.addEventListener('input', () => {
      if (inputMensaje.value.trim()) {
        inputMensaje.classList.remove('is-invalid');
        document.getElementById('error-mensaje')?.classList.remove('show');
      }
    });
  }

  // Manejo del Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const esValidoNombre = validarCampoRequerido(inputNombre, 'error-nombre');
      const esValidoEmail = validarEmail();
      const esValidoAsunto = validarCampoRequerido(inputAsunto, 'error-asunto');
      const esValidoMensaje = validarCampoRequerido(inputMensaje, 'error-mensaje');

      if (esValidoNombre && esValidoEmail && esValidoAsunto && esValidoMensaje) {
        const nombreEnviado = inputNombre.value.trim();

        // Mostrar notificación Toast
        mostrarToast('¡Mensaje Enviado!', `Gracias ${nombreEnviado}, te responderemos pronto.`, '✉️');

        // Mostrar Modal de confirmación retro
        if (contactModal) {
          document.getElementById('contact-modal-sender').textContent = nombreEnviado;
          contactModal.classList.add('active');
        }

        // Limpiar el formulario
        form.reset();
      } else {
        mostrarToast('Formulario Incompleto', 'Por favor corrige los campos señalados.', '⚠️');
      }
    });
  }

  // Cierre de modal
  if (btnCloseContactModal && contactModal) {
    btnCloseContactModal.addEventListener('click', () => {
      contactModal.classList.remove('active');
    });

    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
      }
    });
  }
});
