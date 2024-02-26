
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






        //<![CDATA[
          function darkmode_head() {
                    if (localStorage.getItem("darkmode") == 1) {
                        document.getElementsByTagName('html')[0].setAttribute('class','darkmode');
                    }
           setTimeout(function(){
                        var $theme_color = getComputedStyle(document.head).getPropertyValue('--color-theme');
                        document.querySelector('[name="apple-mobile-web-app-status-bar-style"]').setAttribute( 'content', $theme_color );
                        document.querySelector('[name="msapplication-navbutton-color"]').setAttribute( 'content', $theme_color );
                        document.querySelector('[name="theme-color"]').setAttribute( 'content', $theme_color );
           }, 1);
                }
          darkmode_head();
          //]]>
   
// Dark Mode
function darkmode() {
  if (localStorage.getItem("darkmode") == 1) {
      $('.darkmode-button').toggleClass('');
  }
  $('.darkmode-button').on('click', function(e) {
      e.preventDefault();
      $("html").toggleClass("darkmode");
      $('.darkmode-button').toggleClass('');
      if (localStorage.getItem("darkmode") == 1) {
          localStorage.setItem("darkmode", 0);
      } else {
          localStorage.setItem("darkmode", 1);
      }
      darkmode_head();
  });
};
darkmode();









