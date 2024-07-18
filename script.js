function calcularCombinaciones() {
    const colorInicial = document.getElementById('colorInicial').value;
    const colorFinal = document.getElementById('colorFinal').value;
    const longitudSecuencia = parseInt(document.getElementById('longitudSecuencia').value);

    // Lógica para calcular las combinaciones según las opciones de color
    let combinaciones = 0;
    if (colorInicial === 'indiferente' && colorFinal === 'indiferente') {
        // Todas las combinaciones posibles
        combinaciones = Math.pow(2, longitudSecuencia);
    } else if (colorInicial === 'indiferente' || colorFinal === 'indiferente') {
        // Combinaciones considerando un color indiferente
        combinaciones = 2 * Math.pow(2, longitudSecuencia - 1);
    } else {
        // Combinaciones con colores específicos
        combinaciones = Math.pow(2, longitudSecuencia);
    }

    // Muestra el resultado
    const resultado = `Combinaciones posibles: ${combinaciones}`;
    document.getElementById('resultado').textContent = resultado;
}
