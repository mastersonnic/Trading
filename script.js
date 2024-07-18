function calcularCombinaciones() {
    const colorInicial = document.getElementById('colorInicial').value;
    const longitudSecuencia = parseInt(document.getElementById('longitudSecuencia').value);
    const posicionCalculo = parseInt(document.getElementById('posicionCalculo').value);

    // Lógica para calcular las combinaciones según el color inicial
    let combinaciones = 0;
    if (colorInicial === 'verde') {
        // Calcula las permutaciones de velas verdes y rojas
        combinaciones = calcularPermutaciones(longitudSecuencia);
    } else if (colorInicial === 'rojo') {
        // Calcula las combinaciones de velas rojas y verdes
        combinaciones = calcularCombinacionesRojas(longitudSecuencia);
    }

    // Muestra el resultado
    const resultado = `Combinaciones en la posición ${posicionCalculo}: ${combinaciones}`;
    document.getElementById('resultado').textContent = resultado;
}

function calcularPermutaciones(n) {
    // Fórmula para permutaciones: P(n) = n!
    let resultado = 1;
    for (let i = 1; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

function calcularCombinacionesRojas(n) {
    // Fórmula para combinaciones: C(n, k) = n! / (k! * (n - k)!)
    // En este caso, k es la longitud de la secuencia
    const k = n;
    const numerador = calcularPermutaciones(n);
    const denominador = calcularPermutaciones(k) * calcularPermutaciones(n - k);
    return numerador / denominador;
}
