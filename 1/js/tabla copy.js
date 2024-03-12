document.addEventListener('DOMContentLoaded', function() {
  const rowsPerPageSelect = document.getElementById('rows-per-page-select');
  const tableBody = document.querySelector('.sticky-header-table tbody');
  const paginationContainer = document.getElementById('pagination-container');
  let currentFilters = [];
  let currentPage = 0;

  function filterRows() {
    const searchInputs = document.querySelectorAll('.sticky-header-table thead input[type="text"]');
    const checkboxInputs = document.querySelectorAll('.sticky-header-table thead input[type="checkbox"]:checked');
    const searchTexts = Array.from(searchInputs).map(input => input.value.toLowerCase());
    const checkboxValues = Array.from(checkboxInputs).map(checkbox => checkbox.value.toLowerCase());

    return Array.from(tableBody.getElementsByTagName('tr')).filter(row => {
      if (row.classList.contains('total')) return false;
      const textContent = row.textContent.toLowerCase();
      const textCondition = searchTexts.every(searchText => !searchText || textContent.includes(searchText));
      const checkboxCondition = checkboxValues.length === 0 || checkboxValues.some(value => textContent.includes(value));
      return textCondition && checkboxCondition;
    });
  }

  function updateTableDisplay() {
    const filteredRows = filterRows();
    const rowsPerPage = parseInt(rowsPerPageSelect.value);
    const startRow = currentPage * rowsPerPage;
    const endRow = startRow + rowsPerPage;

    Array.from(tableBody.getElementsByTagName('tr')).forEach(row => row.style.display = 'none');
    filteredRows.forEach((row, index) => {
      if (index >= startRow && index < endRow) {
        row.style.display = '';
      }
    });

    updatePagination(filteredRows.length, rowsPerPage);
  }

  function updatePagination(totalFilteredRows, rowsPerPage) {
    const totalPages = Math.ceil(totalFilteredRows / rowsPerPage);
    paginationContainer.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.innerText = i + 1;
      pageLink.href = '#';
      pageLink.dataset.page = i;
      pageLink.className = currentPage === i ? 'active' : '';
      pageLink.addEventListener('click', function(e) {
        e.preventDefault();
        currentPage = parseInt(e.target.dataset.page);
        updateTableDisplay();
      });
      paginationContainer.appendChild(pageLink);
    }
  }

  rowsPerPageSelect.addEventListener('change', function() {
    currentPage = 0;
    updateTableDisplay();
  });

  document.querySelectorAll('.sticky-header-table thead input[type="text"], .sticky-header-table thead input[type="checkbox"]').forEach(input => {
    input.addEventListener('input', updateTableDisplay);
    input.addEventListener('change', updateTableDisplay);
  });

  updateTableDisplay();
});