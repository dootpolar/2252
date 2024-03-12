document.addEventListener('DOMContentLoaded', function() {
  // Eventos para los botones que activan dropdowns
  document.querySelectorAll('.dropbtn').forEach(function(dropbtn) {
    dropbtn.addEventListener('click', function(event) {
      // Cierra todos los dropdowns antes de abrir uno nuevo
      closeAllDropdownsExcept(dropbtn.getAttribute('data'));

      // Encuentra el dropdown relacionado y lo alterna
      var dropdown = document.getElementById(dropbtn.getAttribute('data'));
      dropdown.classList.toggle('show');
      
      // Evita que el evento click se propague al documento
      event.stopPropagation();
    });
  });

  // Evento para cerrar los dropdowns si se hace clic fuera de ellos
  window.addEventListener('click', function() {
    closeAllDropdowns();
  });

  // Evento para prevenir que los dropdowns se cierren al hacer clic dentro de ellos
  document.querySelectorAll('.dropdown-content').forEach(function(dropdownContent) {
    dropdownContent.addEventListener('click', function(event) {
      // Cierra el dropdown solo si se hace clic en un elemento de enlace (a)
      if (event.target.tagName === 'A') {
        dropdownContent.classList.remove('show');
      }
      // Previene la propagación para maner el dropdown abierto si se hace clic en cualquier otro lugar que no sea un enlace
      event.stopPropagation();
    });
  });

  // Función para cerrar todos los dropdowns
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach(function(dropdown) {
      dropdown.classList.remove('show');
    });
  }

  // Función para cerrar todos los dropdowns excepto el que se está alternando
  function closeAllDropdownsExcept(id) {
    document.querySelectorAll('.dropdown-content').forEach(function(dropdown) {
      if (dropdown.id !== id) {
        dropdown.classList.remove('show');
      }
    });
  }

});
