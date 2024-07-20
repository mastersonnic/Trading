// Función para obtener los precios de cierre en tiempo real
async function obtenerPrecios() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/klines?symbol=GBPUSD&interval=15m&limit=100');
        const data = await response.json();
        const preciosCierre = data.map(item => parseFloat(item[4])); // Extraemos los precios de cierre
        mostrarPrecios(preciosCierre);
    } catch (error) {
        console.error('Error al obtener los precios:', error);
    }
}

// Función para mostrar los precios en el elemento con ID "precios"
function mostrarPrecios(precios) {
    const preciosDiv = document.getElementById('precios');
    preciosDiv.innerHTML = '<h2>Precios de cierre GBP/USD (últimas 100 velas)</h2>';
    precios.forEach((precio, index) => {
        preciosDiv.innerHTML += `<p>Vela ${index + 1}: $${precio.toFixed(5)}</p>`;
    });
}

// Llama a la función para obtener los precios al cargar la página
window.addEventListener('load', obtenerPrecios);
