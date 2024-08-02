// script.js
fetch('https://ff.io/rates/float.xml')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el XML');
    }
    return response.text();
  })
  .then(data => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");
    const serializer = new XMLSerializer();
    const xmlStr = serializer.serializeToString(xmlDoc);
    document.getElementById('xml-content').textContent = xmlStr;
  })
  .catch(error => console.error('Error al cargar el XML:', error));
