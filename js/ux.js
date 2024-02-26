
// Ripple Effect
var current;
document.onpointerdown = function(t) {
  var e;
  current && (e = current, current = null, setTimeout(function() {
    e.parentNode && e.parentNode.removeChild(e)
  }, 800));
  for (var n, o, c, r, i, a, l = t.target; l && l.classList && !l.classList.contains("js-ripple");) l = l.parentNode;
  l && l.classList && l.classList.contains("js-ripple") && (n = t.x - l.getBoundingClientRect().left, o = t.y - l.getBoundingClientRect().top, c = Math.max(n, l.offsetWidth - n), r = Math.max(o, l.offsetHeight - o), c = Math.sqrt(c * c + r * r), (r = document.createElement("span")).classList.add("ripple"), l.appendChild(r), (i = document.createElement("span")).style.top = o - c + "px", i.style.left = n - c + "px", i.style.height = 2 * c + "px", i.style.width = 2 * c + "px", i.style.transform = "scale(0)", r.appendChild(i), current = r, a = setTimeout(function() {
    i.style.transform = "scale(1)"
  }, 16), document.onpointerup = document.onpointercancel = function() {
    document.onpointerup = document.onpointercancel = document.onpointermove = null, current.firstChild.style.opacity = "0"
  }, document.onpointermove = function(e) {
    (4 < t.x - e.x || t.x - e.x < -4 || 4 < t.y - e.y || t.y - e.y < -4) && (clearTimeout(a), document.onpointercancel())
  })
};






// Inmediatamente intenta aplicar el modo oscuro basado en la configuración almacenada, si está disponible
(function() {
  if (localStorage.getItem("darkmode") === "1") {
      document.documentElement.classList.add("darkmode");
      updateThemeColor();
  }
})();

// Actualiza los colores del tema basados en la configuración del modo oscuro
function updateThemeColor() {
  setTimeout(function() {
      var themeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-theme');
      document.querySelector('[name="apple-mobile-web-app-status-bar-style"]').setAttribute('content', themeColor);
      document.querySelector('[name="msapplication-navbutton-color"]').setAttribute('content', themeColor);
      document.querySelector('[name="theme-color"]').setAttribute('content', themeColor);
  }, 1);
}

// Función para manejar el clic en el botón de modo oscuro
function darkmode() {
  var darkModeToggle = document.querySelector('.darkmode-button');

  darkModeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      document.documentElement.classList.toggle("darkmode");
      
      var isDarkMode = document.documentElement.classList.contains("darkmode");
      localStorage.setItem("darkmode", isDarkMode ? "1" : "0");
      
      updateThemeColor();
  });
}

// Asegura que el código se ejecuta después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  darkmode(); // Activa la funcionalidad del botón del modo oscuro
});









