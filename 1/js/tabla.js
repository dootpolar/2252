


document.addEventListener('DOMContentLoaded', function() {
  const rowsPerPageSelect = document.getElementById('rows-per-page-select');
  const tableBody = document.querySelector('.sticky-header-table tbody');
  const paginationContainer = document.getElementById('pagination-container');
  let searchText = '';
  let currentCheckboxFilters = {
    'estado': new Set(['completado', 'pendiente', 'parcial', 'retorno']),
    'comprobante': new Set(['facturado', 'boleta simple', 'boleta electronica'])
  };
  let currentPage = 0;

  function updateTableDisplay() {
    let rows = Array.from(tableBody.getElementsByTagName('tr'));
    let filteredRows = rows.filter(row => {
      let rowText = row.textContent.toLowerCase();
      let matchesText = searchText === '' || rowText.includes(searchText);
      let matchesCheckbox = [...currentCheckboxFilters['estado']].some(filter => rowText.includes(filter));
      let matchesComprobante = [...currentCheckboxFilters['comprobante']].some(filter => rowText.includes(filter));
      return matchesText && matchesCheckbox && matchesComprobante;
    });

    // Llamar a calculateFilteredValues justo después de filtrar las filas
    calculateFilteredValues(filteredRows);

    let rowsPerPage = parseInt(rowsPerPageSelect.value);
    let startRow = currentPage * rowsPerPage;
    let endRow = startRow + rowsPerPage;
    rows.forEach(row => row.style.display = 'none');
    filteredRows.slice(startRow, endRow).forEach(row => row.style.display = '');

    updatePagination(filteredRows.length, rowsPerPage);
  }

  function handleCheckboxChange(group, checkbox) {
    if (checkbox.checked) {
      currentCheckboxFilters[group].add(checkbox.value.toLowerCase());
    } else {
      currentCheckboxFilters[group].delete(checkbox.value.toLowerCase());
      if (currentCheckboxFilters[group].size === 0) {
        // If all checkboxes are unchecked, re-check the current one to enforce at least one selection
        checkbox.checked = true;
        currentCheckboxFilters[group].add(checkbox.value.toLowerCase());
      }
    }
    currentPage = 0;
    updateTableDisplay();
  }

  document.querySelectorAll('.sticky-header-table thead input[type="text"]').forEach(input => {
    input.addEventListener('input', function(e) {
      searchText = e.target.value.toLowerCase();
      currentPage = 0;
      updateTableDisplay();
    });
  });

  document.querySelectorAll('#estado input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      handleCheckboxChange('estado', checkbox);
    });
  });

  document.querySelectorAll('#comprobante input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      handleCheckboxChange('comprobante', checkbox);
    });
  });

  rowsPerPageSelect.addEventListener('change', function() {
    currentPage = 0;
    updateTableDisplay();
  });

  function updatePagination(totalRows, rowsPerPage) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    for (let i = 0; i < totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.innerText = i + 1;
      pageLink.href = '#';
      pageLink.dataset.page = i;
      pageLink.className = currentPage === i ? 'active' : '';
      pageLink.addEventListener('click', function(e) {
        e.preventDefault();
        currentPage = parseInt(this.dataset.page);
        updateTableDisplay();
      });
      paginationContainer.appendChild(pageLink);
    }
  }

  updateTableDisplay();
});






// Buscar en toda la tabla

function searchTable() {
  const searchText = document.querySelector('.fnd-inp').value.toLowerCase();
  const tableBody = document.querySelector('.sticky-header-table tbody');
  const rows = tableBody.getElementsByTagName('tr');
  for (let row of rows) {
    const cells = row.getElementsByTagName('td');
    let rowText = '';
    for (let cell of cells) {
      rowText += cell.textContent.toLowerCase();
    }
    if (rowText.includes(searchText)) {
      row.style.display = ''; 
    } else {
      row.style.display = 'none'; 
    }
  }
}

document.querySelector('.fnd-inp').addEventListener('input', searchTable);
document.querySelector('.btn-crear').addEventListener('click', function() {
  console.log('Abrir formulario de creación');
});











  // Selec ----------------


  function calculateFilteredValues(filteredRows) {
    let totalfilas = filteredRows.length;
    let totalMonto = 0;
    let totalPagado = 0;
    let totalPendiente = 0;
  
    filteredRows.forEach(row => {
      const cells = row.getElementsByTagName('td');
      totalMonto += parseFloat(cells[4].textContent.replace('S/', '')) || 0; // Índice 4 para Monto
      totalPagado += parseFloat(cells[5].textContent.replace('S/', '')) || 0; // Índice 5 para Pagado
      totalPendiente += parseFloat(cells[6].textContent.replace('S/', '')) || 0; // Índice 6 para Pendiente
    });
  
    // Actualizar los totales y el conteo de filas en la interfaz de usuario
    document.querySelectorAll('.totalfilas').forEach(el => el.textContent = totalfilas);
    document.querySelectorAll('.totalMonto').forEach(el => el.textContent = `S/${totalMonto.toFixed(2)}`);
    document.querySelectorAll('.Pagado').forEach(el => el.textContent = `S/${totalPagado.toFixed(2)}`);
    document.querySelectorAll('.totalPendiente').forEach(el => el.textContent = `S/${totalPendiente.toFixed(2)}`);
  }