// Capturar el valor de BCH pasado en la URL
let urlParams = new URLSearchParams(window.location.search);
let bchValue = urlParams.get('bchValue');

// Verificar si se recibió el valor de BCH y pegarlo en el campo de texto
if (bchValue) {
    document.getElementById('bchOutput').value = bchValue;
} else {
    alert("No se encontró ningún valor de BCH en la URL.");
}
