// script.js
fetch('https://ff.io/rates/float.xml')
  .then(response => response.text())
  .then(data => {
    document.getElementById('xml-content').textContent = data;
  })
  .catch(error => console.error('Error al cargar el XML:', error));
