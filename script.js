// script.js
function calcularCombinaciones() {
    const colorInicio = document.getElementById('color-inicio').value;
    const colorFinal = document.getElementById('color-final').value;
    const longitudSecuencia = parseInt(document.getElementById('longitud-secuencia').value);
    const combinaciones = calcularTotalCombinaciones(colorInicio, colorFinal, longitudSecuencia);
    document.getElementById('resultado').textContent = `Combinaciones posibles: ${combinaciones}`;
}

function calcularTotalCombinaciones(colorInicio, colorFinal, longitudSecuencia) {
    if (colorInicio === 'verde' && colorFinal === 'indiferente') {
        return Math.pow(2, longitudSecuencia - 1); // 2^(N-1)
    } else if (colorInicio === 'indiferente' && colorFinal === 'roja') {
        return Math.pow(2, longitudSecuencia); // 2^N
    } else {
        return 1; // Solo Roja, Roja, Roja
    }
}
