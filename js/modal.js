document.addEventListener('DOMContentLoaded', function() {
// Contenidos de los modales como literales de plantilla
const contenidoDetalleVenta = `



<div class="modal-content">
            <div class="modal-header">
               <span class="close">&times;</span>
               <h2>Editar Venta</h2>
            </div>
            <div class="modal-body">
               <div class="button-container">
                  <button type="button" class="btn green">Editar venta</button>
                  <button type="button" class="btn blue">Enviar por wspp</button>
                  <button type="button" class="btn lightblue">Enviar SMS</button>
                  <button type="button" class="btn orange">Descargar PDF</button>
                  <button type="button" class="btn gray">Imprimir venta</button>
                  <button type="button" class="btn red">Eliminar venta</button>
               </div>
               <div class="three-columns">
                  <!-- Información del cliente -->
                  <div class="info-section column">
                     <h3>Información del cliente</h3>
                     <p>Phyliss J. Cortés</p>
                     <p>Phyliss@ejemplo.com</p>
                     <p>0454 12 34 45</p>
                     <p>22, Nueva York, EE. UU.</p>
                  </div>
                  <!-- Información de venta -->
                  <div class="info-section column">
                     <h3>Información de venta</h3>
                     <p>Referencia: SO-20230616-035252</p>
                     <p>Estado: Ordenado</p>
                     <p>Estado de pago: Pagado</p>
                     <p>Fecha: 2024-01-02 09:56:05</p>
                     <p>Almacén: Almacén 2</p>
                  </div>
                  <!-- Dirección de envío -->
                  <div class="info-section column">
                     <h3>DIRECCIÓN DE ENVÍO</h3>
                     <p>Juan Parker</p>
                     <p>Sunset Str 598</p>
                     <p>Melbourne</p>
                     <p>Australia, 11-671</p>
                     <p>(999) 888-7777</p>
                     <p>empresa@ejemplo.com</p>
                  </div>
               </div>
               <h2>Toda la lista de pedidos</h2>
               <table>
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Nombre del Producto</th>
                        <th>Precio Unitario</th>
                        <th>Cantidad</th>
                        <th>Descuentos</th>
                        <th>Subtotal</th>
                     </tr>
                  </thead>
                  <tbody>
                     <!-- Productos ficticios con descuentos -->
                     <tr>
                        <td>1</td>
                        <td>Producto A</td>
                        <td>S/50.00</td>
                        <td>2</td>
                        <td>S/10.00</td>
                        <td>S/90.00</td>
                     </tr>
                     <tr>
                        <td>2</td>
                        <td>Producto B</td>
                        <td>S/30.00</td>
                        <td>1</td>
                        <td>S/5.00</td>
                        <td>S/25.00</td>
                     </tr>
                     <!-- Agregar más filas según sea necesario -->
                  </tbody>
               </table>
               <!-- Sección de Pagos -->
               <h2>Toda la lista de pagos</h2>
               <table>
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Referencia</th>
                        <th>Monto</th>
                     </tr>
                  </thead>
                  <tbody>
                     <!-- Pagos ficticios -->
                     <tr>
                        <td>1</td>
                        <td>2024-01-08</td>
                        <td>REF001</td>
                        <td>S/70.00</td>
                     </tr>
                     <tr>
                        <td>2</td>
                        <td>2024-01-09</td>
                        <td>REF002</td>
                        <td>S/30.00</td>
                     </tr>
                     <!-- Agregar más filas según sea necesario -->
                  </tbody>
               </table>
               <!-- Sección Total -->
               <div class="total-section">
                  <p>Total Pedidos: <span>S/115.00</span></p>
                  <p>Total Pagado: <span>S/100.00</span></p>
                  <p>Saldo Restante: <span>S/15.00</span></p>
               </div>
            </div>
            <div class="modal-footer">
               <h3>Cerrar</h3>
            </div>
         </div>




















`; // Tu contenido HTML aquí
const contenidoMostrarPagos = `...`; // Tu contenido HTML aquí
const contenidoRegistrarPagos = `...`; // Tu contenido HTML aquí
const contenidoEliminarPedido = `...`; // Tu contenido HTML aquí

// Función para mostrar el modal con transiciones
function mostrarModal(titulo, contenido) {
  const modal = document.getElementById('modal');
  const modalTitulo = document.getElementById('modalTitulo');
  const modalCuerpo = document.getElementById('modalCuerpo');

  // Actualizar el título y contenido del modal
  modalTitulo.innerHTML = titulo;
  modalCuerpo.innerHTML = contenido;

  // Mostrar el modal con efecto de transición
  modal.style.display = "block";
  document.body.classList.add("modal-active");
  setTimeout(() => {
    modal.style.opacity = "1";
    modal.querySelector('.modal-content').style.opacity = "1";
    modal.querySelector('.modal-content').style.transform = "scale(1)";
  }, 10);
}

// Función para cerrar el modal con transiciones
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.opacity = "0";
  modal.querySelector('.modal-content').style.opacity = "0";
  modal.querySelector('.modal-content').style.transform = "scale(0.7)";
  setTimeout(() => {
    modal.style.display = "none";
    document.body.classList.remove("modal-active");
  }, 300);
}


// Event listeners para cada botón
document.getElementById('DetalleVenta').addEventListener('click', function() {
  mostrarModal('Detalle Venta', contenidoDetalleVenta);
});
document.getElementById('mostrarPagosBtn').addEventListener('click', function() {
  mostrarModal('Mostrar Pagos', contenidoMostrarPagos);
});
document.getElementById('mostrarPagosBtn').addEventListener('click', function() {
  mostrarModal('Mostrar Pagos', contenidoMostrarPagos);
});
document.getElementById('mostrarPagosBtn').addEventListener('click', function() {
  mostrarModal('Mostrar Pagos', contenidoMostrarPagos);
});
document.getElementById('mostrarPagosBtn').addEventListener('click', function() {
  mostrarModal('Mostrar Pagos', contenidoMostrarPagos);
});
// ... Repite para los demás botones ...

// Evento para cerrar el modal cuando se hace clic en el botón de cierre o fuera del modal
document.querySelector('.close').addEventListener('click', closeModal);
window.addEventListener('click', function(event) {
  const modal = document.getElementById('modal');
  if (event.target == modal) {
    closeModal();
  }
});

// Asegúrate de tener un elemento con class="close" en tu HTML de modal para que esto funcione















});