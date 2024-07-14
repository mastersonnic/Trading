async function fetchData() {
    const response = await fetch('https://api.exchangerate.host/timeseries?start_date=2023-07-10&end_date=2023-07-13&base=GBP&symbols=USD');
    const data = await response.json();
    return data.rates;
}

function generateSignals(data) {
    const signals = [];
    const dates = Object.keys(data);
    for (let i = 2; i < dates.length; i++) {
        const close1 = data[dates[i-2]].USD;
        const close2 = data[dates[i-1]].USD;
        const close3 = data[dates[i]].USD;
        if (close1 < close2 && close2 < close3) {
            signals.push({ date: dates[i], signal: 'sell' });
        } else if (close1 > close2 && close2 > close3) {
            signals.push({ date: dates[i], signal: 'buy' });
        }
    }
    return signals;
}

function runMonteCarlo() {
    const iterations = document.getElementById('iterations').value;
    fetchData().then(data => {
        const signals = generateSignals(data);
        const results = [];
        for (let i = 0; i < iterations; i++) {
            let profit = 0;
            signals.forEach(signal => {
                profit += signal.signal === 'buy' ? 1 : -1;
            });
            results.push(profit);
        }
        displayResults(results);
    });
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
