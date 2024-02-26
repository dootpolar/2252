
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






      // Cambia el tema de la página a oscuro o claro según la preferencia guardada
function darkmode_head() {
  if (localStorage.getItem("darkmode") == "1") {
      document.documentElement.classList.add("darkmode");
  } else {
      document.documentElement.classList.remove("darkmode");
  }

  setTimeout(function() {
      var themeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-theme');
      document.querySelector('[name="apple-mobile-web-app-status-bar-style"]').setAttribute('content', themeColor);
      document.querySelector('[name="msapplication-navbutton-color"]').setAttribute('content', themeColor);
      document.querySelector('[name="theme-color"]').setAttribute('content', themeColor);
  }, 1);
}

// Activa o desactiva el modo oscuro y guarda la preferencia del usuario
function darkmode() {
  var darkModeToggle = document.querySelector('.darkmode-button');

  if (localStorage.getItem("darkmode") == "1") {
      document.documentElement.classList.add("darkmode");
  }

  darkModeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      document.documentElement.classList.toggle("darkmode");
      
      if (localStorage.getItem("darkmode") == "1") {
          localStorage.setItem("darkmode", "0");
      } else {
          localStorage.setItem("darkmode", "1");
      }
      
      darkmode_head();
  });
}

// Asegura que el código se ejecuta después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  darkmode_head(); // Aplica el tema según la configuración almacenada al cargar la página
  darkmode(); // Activa la funcionalidad del botón del modo oscuro
});









