function runMonteCarlo() {
    const iterations = document.getElementById('iterations').value;
    const results = [];

    for (let i = 0; i < iterations; i++) {
        let result = simulateTrade();
        results.push(result);
    }

    displayResults(results);
}

function simulateTrade() {
    // Simulación simple: ganancia o pérdida aleatoria
    return Math.random() > 0.5 ? 1 : -1;
}

function displayResults(results) {
    const total = results.reduce((acc, val) => acc + val, 0);
    const average = total / results.length;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>Total: ${total}</p>
        <p>Promedio: ${average}</p>
    `;
}
