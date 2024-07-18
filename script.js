// script.js
function calcularCombinaciones() {
    const longitud = parseInt(document.getElementById('longitud-secuencia').value);
    const combinaciones = calcularFactorial(longitud);
    document.getElementById('resultado').textContent = `Hay ${combinaciones} formas posibles de combinar las velas.`;
}

function calcularFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}
