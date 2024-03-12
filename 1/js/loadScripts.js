(function() {
  function loadScript(url, callback) {
      var script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.onload = callback;
      document.getElementsByTagName('head')[0].appendChild(script);
  }

  // Cargando los scripts en secuencia
  loadScript('modal.js', function() {
      console.log('modal.js cargado exitosamente.');
      loadScript('js/funciones.js', function() {
          console.log('funciones.js cargado exitosamente.');
          loadScript('js/print.js', function() {
              console.log('print.js cargado exitosamente.');
              loadScript('js/ux.js', function() {
                  console.log('ux.js cargado exitosamente.');
                  loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/pdfmake.min.js', function() {
                      console.log('pdfmake.min.js cargado exitosamente.');
                      loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/vfs_fonts.js', function() {
                          console.log('vfs_fonts.js cargado exitosamente.');
                          // Aquí puedes agregar cualquier código adicional que dependa de los scripts cargados
                      });
                  });
              });
          });
      });
  });
})();