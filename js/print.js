function convertTableToPDFMakeFormat(tableElement) {
  var body = [];
  
  // Encabezado de la tabla
  var headerCells = tableElement.querySelectorAll('thead th');
  var header = Array.from(headerCells).map(function(headerCell) {
      return headerCell.innerText;
  });
  body.push(header);
  
  // Cuerpo de la tabla
  var rows = tableElement.querySelectorAll('tbody tr');
  rows.forEach(function(row) {
      var dataCells = row.querySelectorAll('td');
      var dataRow = Array.from(dataCells).map(function(cell) {
          return cell.innerText;
      });
      body.push(dataRow);
  });

  // Pie de la tabla (tfoot)
  var footerRows = tableElement.querySelectorAll('tfoot tr');
  footerRows.forEach(function(row) {
      var footerCells = row.querySelectorAll('td');
      var footerRow = Array.from(footerCells).map(function(cell) {
          // Puede que necesites ajustar este código si tu pie de página tiene un formato especial
          return cell.innerText;
      });
      body.push(footerRow);
  });
  
  return body;
}

function downloadPDF() {
  var tableElement = document.querySelector('table'); // Asegúrate de seleccionar tu tabla correctamente
  var tableData = convertTableToPDFMakeFormat(tableElement);
  
  var docDefinition = {
      content: [
          {
              table: {
                  headerRows: 1,
                  widths: '*', // Ajusta las anchuras de las columnas como necesites
                  body: tableData
              }
          }
      ]
  };
  
  pdfMake.createPdf(docDefinition).download('table.pdf');
}

// Asignar el evento al botón 'Exportar pdf'
document.querySelector('#export-pdf-button').addEventListener('click', downloadPDF);
