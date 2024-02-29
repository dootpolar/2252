// Función para abrir un modal
function openModal(modal) {
  modal.style.display = "block";
  document.body.classList.add("modal-active");
  setTimeout(() => {
    modal.style.opacity = "1";
    modal.querySelector('.modal-content').style.opacity = "1";
    modal.querySelector('.modal-content').style.transform = "scale(1)";
  }, 10);
}

// Función para cerrar el modal
function closeModal(modal) {
  modal.style.opacity = "0";
  modal.querySelector('.modal-content').style.opacity = "0";
  modal.querySelector('.modal-content').style.transform = "scale(0.7)";
  setTimeout(() => {
    modal.style.display = "none";
    document.body.classList.remove("modal-active");
  }, 300);
}

// Asignar eventos a botones para abrir modales
document.querySelectorAll('.modal-button').forEach(button => {
  button.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    openModal(modal);
  });
});

// Asignar eventos a elementos para cerrar modales
document.querySelectorAll('.close-modal').forEach(close => {
  close.addEventListener('click', function() {
    const modal = this.closest('.modal');
    closeModal(modal);
  });
});

// Cerrar modales haciendo clic fuera de ellos
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    closeModal(event.target);
  }
});





