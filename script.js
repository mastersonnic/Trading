// script.js
function calcularCombinaciones() {
    const longitud = parseInt(document.getElementById('longitud-secuencia').value);
    const combinaciones = calcularPermutaciones(longitud);
    document.getElementById('resultado').textContent = `Hay ${combinaciones} formas posibles de combinar las velas.`;
}

function calcularPermutaciones(n) {
    return Math.pow(2, n);
}
