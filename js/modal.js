document.addEventListener('DOMContentLoaded', function() {
  // Función para crear y mostrar un modal
  function crearYMostrarModal(contenidoHTML) {
      // Crear el contenedor del modal
      const modal = document.createElement('div');
      modal.className = 'modal';
      
      // Configurar el HTML interno del modal con el contenido recibido
      modal.innerHTML = contenidoHTML;

      // Añadir el modal al final del cuerpo del documento
      document.body.appendChild(modal);

      // Mostrar el modal
      modal.style.display = 'block';

      // Función para cerrar el modal
      function cerrarModal() {
          modal.style.display = 'none';
          modal.removeEventListener('click', cerrarEnFondo);
          const closeBtn = modal.querySelector('.close');
          if (closeBtn) {
              closeBtn.removeEventListener('click', cerrarModal);
          }
          modal.parentNode.removeChild(modal);
      }

      // Agregar evento al botón de cerrar si existe
      const closeBtn = modal.querySelector('.close');
      if (closeBtn) {
          closeBtn.addEventListener('click', cerrarModal);
      }

      // Evento para cerrar el modal al hacer clic fuera de él
      function cerrarEnFondo(event) {
          if (event.target === modal) {
              cerrarModal();
          }
      }
      window.addEventListener('click', cerrarEnFondo);
  }

  // Contenido HTML para el modal de Detalle de Venta
  const contenidoDetalleVenta = `
      <div class="modal-content">
          <div class="modal-header">
              <span class="close">&times;</span>
              <h2>Detalle de Venta</h2>
          </div>
          <div class="modal-body">
              <p>Contenido del detalle de venta...</p>
          </div>
          <div class="modal-footer">
              <h3>Cerrar</h3>
          </div>
      </div>
  `;

  // Contenido HTML para el modal de Mostrar Pagos
  const contenidoMostrarPagos = `
      <div class="modal-content">
          <div class="modal-header">
              <span class="close">&times;</span>
              <h2>Mostrar Pagos</h2>
          </div>
          <div class="modal-body">
              <p>Contenido de mostrar pagos...</p>
          </div>
          <div class="modal-footer">
              <h3>Cerrar</h3>
          </div>
      </div>
  `;

  // ... Define aquí el resto de tus contenidos modales ...

  // Event listeners para botones
  document.getElementById('botonDetalleVenta').addEventListener('click', function() {
      crearYMostrarModal(contenidoDetalleVenta);
  });

  document.getElementById('botonMostrarPagos').addEventListener('click', function() {
      crearYMostrarModal(contenidoMostrarPagos);
  });

  // ... Agrega aquí los event listeners para el resto de tus botones ...
});
