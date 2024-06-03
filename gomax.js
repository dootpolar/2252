document.addEventListener('DOMContentLoaded', function() {
    setupLogin();
    setTodayDate();
    setupDropdowns();
    dataDropdowns();
    handleCodigoSelection();
    actualizarMontoIGV();
    gestionarSeriesControl();
});


////////////////////////////////////
//Loader



function mostrarLoader() {
  document.getElementById('loader').style.display = 'none';
}

function ocultarLoader() {
  document.getElementById('loader').style.display = 'none';
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funciones relacionadas con el login y usuarios
function setupLogin() {
    var users = {
        'admin': { password: 'admin', displayName: 'ADMIN.' },
        'user1': { password: '1234', displayName: 'USUARIO 1' },
        'user2': { password: '1234', displayName: 'USUARIO 2' },
        'user3': { password: '1234', displayName: 'USUARIO 3' },
        'user4': { password: '1234', displayName: 'USUARIO 4' },
        'user5': { password: '1234', displayName: 'USUARIO 5' },
        'user6': { password: '1234', displayName: 'USUARIO 6' }
    };

    var loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var username = document.getElementById('inputUsuario').value;
        var password = document.getElementById('password').value;

        if (users[username] && users[username].password === password) {
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('main-section').classList.remove('hidden');
            document.querySelector('.user-badge').textContent = users[username].displayName;
        } else {
            alert('Usuario o contraseña incorrecta');
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Función para establecer la fecha de hoy
function setTodayDate() {
    document.getElementById('fecha').value = new Date().toISOString().substring(0, 10);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Setup de dropdowns y funciones para manejar los datos
function setupDropdowns() {
    document.querySelectorAll('.dropdown input').forEach(input => {
        input.addEventListener('click', function(event) {
            event.stopPropagation();
            closeAllDropdowns(this.parentNode.querySelector('.dropdown-content'));
            this.parentNode.querySelector('.dropdown-content').style.display = 'block';
        });

        input.addEventListener('input', function(event) {
            filtrarDropdown(this.parentNode.querySelector('.dropdown-content'), this.value);
        });
    });
/////CON ESTO FUNCIONA HTML
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.querySelectorAll('.droprow').forEach(row => {
            row.addEventListener('click', function() {
                this.parentNode.parentNode.querySelector('input').value = this.textContent;
                this.parentNode.style.display = 'none';
            });
        });
    });
////
    document.body.addEventListener('click', () => {
        closeAllDropdowns();
    });
}

function closeAllDropdowns(exception = null) {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        if (dropdown !== exception) {
            dropdown.style.display = 'none';
        }
    });
}


//////////////


/// OBTIENE DATOS DEL LADO DEL SERVIDOR MEDIANTE EL CLIENTE

function dataDropdowns() {

// PRODUCTOS
  google.script.run.withSuccessHandler(data => {
    ubicarDropdown('dropdownCodigo', data.map(row => row[1]));
  }).obtenerProductos();

// SALIDAS
google.script.run.withSuccessHandler(datosVentas => {
  ubicarDropdownUnico('dropdownIdventa', datosVentas.idVenta);
}).obtenerSalidas();

// ENTRADAS
google.script.run.withSuccessHandler(data => {
  ubicarDropdown('dropdownEntrada', data.map(row => row[0])); // Ajusta el índice según la columna correspondiente
  // Agrega más llamadas a ubicarDropdown() según las columnas que desees mostrar en los dropdowns de ENTRADAS
}).obtenerEntradas();

// CONFIG
  google.script.run.withSuccessHandler(data => {
    ubicarDropdown('dropdownProveedor', data.map(row => row[0]));
    ubicarDropdown('dropdownTienda', data.map(row => row[1]));
    ubicarDropdown('dropdownPlataforma', data.map(row => row[2]));
    ubicarDropdown('dropdownMoneda', data.map(row => row[3]));
    ubicarDropdown('dropdownEstado', data.map(row => row[4]));
    ubicarDropdown('dropdownCondicion', data.map(row => row[5]));
    ubicarDropdown('dropdownTipoPago', data.map(row => row[6]));
    ubicarDropdown('dropdownCuentas', data.map(row => row[7]));
  }).obtenerConfiguracion();
  
}



function ubicarDropdown(dropdownClass, values, callback = () => {}) {
  let dropdowns = document.getElementsByClassName(dropdownClass);
  Array.from(dropdowns).forEach(dropdown => {
    values.forEach(value => {
      if (value) {
        let option = document.createElement('div');
        option.className = 'droprow';
        option.textContent = value;
        option.addEventListener('click', function() {
          this.parentNode.previousElementSibling.value = this.textContent;
          dropdown.style.display = 'none';
          callback(this.textContent);
/////////
          // Si el dropdown es de código, llamar a handleCodigoSelection
          if (dropdownClass === 'dropdownCodigo') {
         handleCodigoSelection(this.textContent);
      //////////
          }
        });
        dropdown.appendChild(option);
      }
    });
  });
}
///////////////////////////


function ubicarDropdownUnico(dropdownClass, values, callback = () => {}) {
  let dropdowns = document.getElementsByClassName(dropdownClass);
  Array.from(dropdowns).forEach(dropdown => {
    dropdown.innerHTML = ''; // Limpiar opciones anteriores
    let valoresUnicos = [...new Set(values)]; // Obtener valores únicos
    valoresUnicos.forEach(value => {
      if (value) {
        let option = document.createElement('div');
        option.className = 'droprow';
        option.textContent = value;
        option.addEventListener('click', function() {
          this.parentNode.previousElementSibling.value = this.textContent;
          dropdown.style.display = 'none';
          callback(this.textContent);

          // Si el dropdown es de seudónimo, llamar a filtrarDocumentosPorSeudonimo
          if (dropdownClass === 'dropdownSeudonimo') {
            filtrarDocumentosPorSeudonimo(this.textContent);
          }
          // Si el dropdown es de ID de venta, llamar a handleIdventaSelection
          if (dropdownClass === 'dropdownIdventa') {
            handleIdventaSelection(this.textContent);
          }
        });
        dropdown.appendChild(option);
      }
    });
  });
}


/////////////////


function filtrarDropdown(dropdown, searchText) {
    let options = dropdown.getElementsByClassName('droprow');
    Array.from(options).forEach(option => {
        if (option.textContent.toLowerCase().includes(searchText.toLowerCase())) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });
}

function handleCodigoSelection(codigo) {
    google.script.run.withSuccessHandler(function(producto) {
        var inputProducto = document.querySelector('.productoInput');
        if (producto) {
            inputProducto.value = `${producto.marca} ${producto.modelo}`;
            inputProducto.setAttribute('data-marca', producto.marca);
            inputProducto.setAttribute('data-descripcion', producto.modelo);
        } else {
            inputProducto.value = '';
            inputProducto.removeAttribute('data-marca');
            inputProducto.removeAttribute('data-descripcion');
        }
    }).completarProducto(codigo);
}



////////////  CONVIERTIENDO EN CLASE LOS ID DEL PRODUCTO

function setProducto(index, marca, modelo) {
    var selectorBase = '[data-index="' + index + '"]';
    var marcaInput = document.querySelector('.inputMarca' + selectorBase);
    var modeloInput = document.querySelector('.inputModelo' + selectorBase);
    var productoInput = document.querySelector('.productoInput' + selectorBase);

    marcaInput.value = marca;
    modeloInput.value = modelo;
    productoInput.value = `${marca} ${modelo}`; // Muestra la combinación de marca y modelo
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Funcion para obtener marca + producto de acuerdo al codigo 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GESTIONAR SERIES SALIDA
function gestionarSeriesControl() {
    const inputSeriesControl = document.querySelector('.seriesControl');
    const seriesAlmacenadasControl = document.querySelector('.seriesAlmacenadasControl');
    
    inputSeriesControl.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nuevaSerie = this.value.trim();
            console.log('Nueva serie ingresada:', nuevaSerie); // Agregado para depuración
            if (!nuevaSerie) return; // No hacer nada si el input está vacío

            const series = seriesAlmacenadasControl.value.split(' / ').map(s => s.trim()).filter(s => s !== '');
            console.log('Series almacenadas:', series); // Agregado para depuración
            if (series.includes(nuevaSerie)) {
                alert('La serie ya ha sido ingresada');
            } else {
                // Agrega la nueva serie al inicio de la lista
                seriesAlmacenadasControl.value = nuevaSerie + (seriesAlmacenadasControl.value ? ' / ' + seriesAlmacenadasControl.value : '');
                console.log('Series actualizadas:', seriesAlmacenadasControl.value); // Agregado para depuración
                this.value = '';
            }
        }
    });
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//LEER DOCUMENTO SUBIDO

  document.getElementById('fileUploadContainer').addEventListener('click', function() {
    document.getElementById('fileUpload').click();
});

document.getElementById('fileUpload').addEventListener('change', function(e) {
    var fileName = e.target.files[0].name;
    var fileLabel = document.querySelector("#fileUploadContainer span");
    fileLabel.textContent = fileName;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////// LIMPIAR TABLA HTML VENTAS


function limpiarInputs() {
    document.querySelector('.inputCategoria').value = '';
    document.querySelector('.inputCodigo').value = '';
    document.querySelector('.inputMarca').value = '';
    document.querySelector('.inputDescripcion').value = '';

    // Limpiar el input y label del archivo
    document.getElementById('fileUpload').value = '';
    document.querySelector("#fileUploadContainer span").textContent = 'Selecciona un archivo';
}


function limpiarTablaHTML() {
    var tablas = document.getElementsByTagName('table');
    
    for (var i = 0; i < tablas.length; i++) {
        var tabla = tablas[i];
        var filas = tabla.rows;
        
        // Comenzar desde el final para evitar cambios en los índices
        for (var j = filas.length - 1; j > 0; j--) {
            tabla.deleteRow(j);
        }
    }
}


/////////////////////// AGREGAR A LA TABLA HTML VENTAS
// Función para agregar una fila a la tabla de salidas
function agregarFilaTablaSalida() {
    var tabla = document.getElementById('tablaPedidos').getElementsByTagName('tbody')[0];
    var nuevaFila = tabla.insertRow();

    var inputProducto = document.querySelector('.productoInput');
    var marca = inputProducto.getAttribute('data-marca');
    var descripcion = inputProducto.getAttribute('data-descripcion');
    var seriesControl = document.querySelector('.seriesAlmacenadasControl').value;
    var cantidad = document.getElementById('cantidad').value;
    var costoConIGV = document.getElementById('costoConIGV').value;

    // Añadir datos al resto de celdas
    nuevaFila.insertCell().textContent = cantidad;
    nuevaFila.insertCell().textContent = document.querySelector('.codigo').value;
    nuevaFila.insertCell().textContent = marca;
    nuevaFila.insertCell().textContent = descripcion;
    nuevaFila.insertCell().textContent = seriesControl;
    nuevaFila.insertCell().textContent = costoConIGV;

    // Añadir la celda de acciones
    var celdaAcciones = nuevaFila.insertCell();
    var btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = function() {
        tabla.deleteRow(nuevaFila.sectionRowIndex);
    };
    celdaAcciones.appendChild(btnEliminar);

    // Limpiar los campos después de agregar
    limpiarInputs();
}

// Función para guardar los datos de salida
function guardarDatosSalida() {
  var tabla = document.getElementById('tablaPedidos');
  var filas = tabla.getElementsByTagName('tbody')[0].rows;
  var pedidos = [];

  for (var i = 0; i < filas.length; i++) {
    var fila = filas[i];

    pedidos.push({
      fecha: document.getElementById('fecha').value,
      usuario: document.querySelector('.user-badge').textContent.trim(),
      plataforma: document.getElementById('inputPlataforma').value,
      ocplataforma: document.getElementById('inputOCPlataforma').value,
      codigo: fila.cells[1].textContent,
      marca: fila.cells[2].textContent,
      descripcion: fila.cells[3].textContent,
      seriesAlmacenadasSalida: fila.cells[4].textContent,
      cantidad: parseInt(fila.cells[0].textContent),
      montoConIGV: parseFloat(fila.cells[5].textContent),
      observaciones: 'NINGUNO'
    });
  }

  mostrarLoader(); // Mostrar el loader antes de guardar los datos

  google.script.run
    .withSuccessHandler(function(response) {
      limpiarTablaHTML();
      limpiarInputs(); // Limpiar los inputs después de guardar los datos
      ocultarLoader(); // Ocultar el loader después de guardar los datos con éxito
    })
    .withFailureHandler(function(error) {
      console.error('Error al guardar datos:', error);
      ocultarLoader(); // Ocultar el loader en caso de error
    })
    .guardarSalida(pedidos);
}





s

/////////////////////////////////////////////// ENTRADA CONTROL


function agregarFilaTablaEntrada() {
  var fileInput = document.getElementById('fileUpload');
  if (fileInput.files.length > 0) {
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var base64Content = e.target.result.split(',')[1];
      mostrarLoader(); // Mostrar el loader antes de subir el archivo
      google.script.run.withSuccessHandler(function(url) {
        continuarConAgregarFilaTabla(url);
        limpiarInputs();
        ocultarLoader(); // Ocultar el loader después de que se haya completado la carga
      }).withFailureHandler(function(error) {
        console.error('Error al subir el archivo:', error);
        alert('Error al subir archivo. Por favor, inténtalo de nuevo.');
        ocultarLoader(); // Ocultar el loader en caso de error
      }).googledrive01({
        bytes: base64Content,
        mimeType: file.type,
        nombre: file.name
      });
    };
    reader.readAsDataURL(file);
  } else {
    continuarConAgregarFilaTabla(null);
    limpiarInputs();
    ocultarLoader();
  }
}

function resetFileUpload() {
    var fileInput = document.getElementById('fileUpload');
    fileInput.value = ''; // Reiniciar el valor del campo de carga de archivos
    var fileLabel = document.querySelector("#fileUploadContainer span");
    fileLabel.textContent = 'Selecciona un archivo'; // Reiniciar el texto del label
}
function continuarConAgregarFilaTabla(urlDocumento) {
    var tabla = document.getElementById('tablaPedidos').getElementsByTagName('tbody')[0];
    var nuevaFila = tabla.insertRow();

    var inputProducto = document.querySelector('.productoInput');
    var marca = inputProducto.getAttribute('data-marca');
    var descripcion = inputProducto.getAttribute('data-descripcion');
    var seriesControl = document.querySelector('.seriesAlmacenadasControl').value;
    var cantidad = document.getElementById('cantidad').value;


    // Añadir datos al resto de celdas
    nuevaFila.insertCell().textContent = cantidad;
    nuevaFila.insertCell().textContent = document.querySelector('.codigo').value;
    nuevaFila.insertCell().textContent = marca;
    nuevaFila.insertCell().textContent = descripcion;
    nuevaFila.insertCell().textContent = seriesControl;


    // Celda para el enlace del documento
    var celdaDocumento = nuevaFila.insertCell();
    if (urlDocumento) {
        var enlaceDocumento = document.createElement('a');
        enlaceDocumento.href = urlDocumento;
        enlaceDocumento.textContent = 'VISUALIZAR';
        enlaceDocumento.target = '_blank';  // Asegura que el enlace se abra en una nueva pestaña
        celdaDocumento.appendChild(enlaceDocumento);
    } else {
        celdaDocumento.textContent = 'NINGUNO';
    }

    // Añadir la celda de acciones
    var celdaAcciones = nuevaFila.insertCell();
    var btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = function() {
        tabla.deleteRow(nuevaFila.sectionRowIndex);
    };
    celdaAcciones.appendChild(btnEliminar);

    // Limpiar los campos después de agregar
    limpiarInputs();
}



function guardarDatosEntrada() {
    var tabla = document.getElementById('tablaPedidos');
    var filas = tabla.getElementsByTagName('tbody')[0].rows;
    var pedidos = [];

    for (var i = 0; i < filas.length; i++) {
        var fila = filas[i];
        var enlaceDocumento = fila.cells[5].querySelector('a') ? fila.cells[5].querySelector('a').href : 'NINGUNO';

        pedidos.push({
            fecha: document.getElementById('fecha').value,
            usuario: document.querySelector('.user-badge').textContent.trim(),
            proveedor: document.getElementById('inputProveedor').value,
            tienda: document.getElementById('inputTienda').value,
            codigo: fila.cells[1].textContent,
            marca: fila.cells[2].textContent,
            descripcion: fila.cells[3].textContent,
            seriesAlmacenadasEntrada: fila.cells[4].textContent,
            cantidad: parseInt(fila.cells[0].textContent),
            documento: enlaceDocumento,
            observaciones: 'NINGUNO'
        });
    }

    mostrarLoader(); // Mostrar el loader antes de guardar los datos

    google.script.run
        .withSuccessHandler(function(response) {
            limpiarTablaHTML();
            ocultarLoader(); // Ocultar el loader después de guardar los datos con éxito
        })
        .withFailureHandler(function(error) {
            console.error('Error al guardar datos:', error);
            ocultarLoader(); // Ocultar el loader en caso de error
        })
        .guardarEntrada(pedidos);
}



////////////////////////////////////////////////////////////////////////////////////////////////
///AGREGAR PRODUCTO

function agregarFilaTablaProducto() {
  var fileInput = document.getElementById('fileUpload');
  if (fileInput.files.length > 0) {
    var file = fileInput.files[0];
    if (file.type.startsWith('image/')) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var base64Content = e.target.result.split(',')[1];
        mostrarLoader(); // Mostrar el loader antes de subir el archivo
        google.script.run.withSuccessHandler(function(url) {
          continuarConAgregarFilaTablaProducto(url);
          limpiarInputs();
          ocultarLoader(); // Ocultar el loader después de que se haya completado la carga
        }).withFailureHandler(function(error) {
          console.error('Error al subir el archivo:', error);
          alert('Error al subir archivo. Por favor, inténtalo de nuevo.');
          ocultarLoader(); // Ocultar el loader en caso de error
        }).googledrive01({
          bytes: base64Content,
          mimeType: file.type,
          nombre: file.name
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecciona un archivo de imagen.');
    }
  } else {
    continuarConAgregarFilaTablaProducto(null);
    limpiarInputs();
  }
}

function continuarConAgregarFilaTablaProducto(urlDocumento) {
    var tabla = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
    var nuevaFila = tabla.insertRow();

    var categoria = document.querySelector('.inputCategoria').value;
    var codigo = document.querySelector('.inputCodigo').value;
    var marca = document.querySelector('.inputMarca').value;
    var descripcion = document.querySelector('.inputDescripcion').value;

    nuevaFila.insertCell().textContent = categoria;
    nuevaFila.insertCell().textContent = codigo;
    nuevaFila.insertCell().textContent = marca;
    nuevaFila.insertCell().textContent = descripcion;

    // Celda para el enlace del documento
    var celdaDocumento = nuevaFila.insertCell();
    if (urlDocumento) {
        var enlaceDocumento = document.createElement('a');
        enlaceDocumento.href = urlDocumento;
        enlaceDocumento.textContent = 'VER IMAGEN';
        enlaceDocumento.target = '_blank';
        celdaDocumento.appendChild(enlaceDocumento);
    } else {
        celdaDocumento.textContent = 'NINGUNO';
    }

    // Añadir la celda de acciones
    var celdaAcciones = nuevaFila.insertCell();
    var btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = function() {
        tabla.deleteRow(nuevaFila.rowIndex - 1);
    };
    celdaAcciones.appendChild(btnEliminar);

    // Limpiar los inputs después de agregar la fila
    limpiarInputs();
}

function guardarDatosProducto() {
    var tabla = document.getElementById('tablaProductos');
    var filas = tabla.getElementsByTagName('tbody')[0].rows;
    var productos = [];

    for (var i = 0; i < filas.length; i++) {
        var fila = filas[i];
        var enlaceDocumento = fila.cells[4].querySelector('a') ? fila.cells[4].querySelector('a').href : 'NINGUNO';
        var usuario = document.querySelector('.user-badge').textContent.trim();

        productos.push({
            //usuario: usuario,
            categoria: fila.cells[0].textContent,
            codigo: fila.cells[1].textContent,
            marca: fila.cells[2].textContent,
            descripcion: fila.cells[3].textContent,
            imagen: enlaceDocumento
        });
    }

    mostrarLoader(); // Mostrar el loader antes de guardar los datos

    google.script.run
        .withSuccessHandler(function(response) {
            limpiarTablaHTML('tablaProductos');
            ocultarLoader(); // Ocultar el loader después de guardar los datos con éxito
        })
        .withFailureHandler(function(error) {
            console.error('Error al guardar productos:', error);
            ocultarLoader(); // Ocultar el loader en caso de error
        })
        .guardarProducto(productos);
}
