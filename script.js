document.getElementById('trading-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const totalAmount = document.getElementById('total-amount').value;
    const betAmount = document.getElementById('bet-amount').value;
    console.log('Monto Total:', totalAmount);
    console.log('Monto por Apuesta:', betAmount);
    fetchDataAndCalculate(totalAmount, betAmount);
});

async function fetchDataAndCalculate(totalAmount, betAmount) {
    try {
        const response = await fetch('https://api.exchangerate.host/symbols');
        const symbols = await response.json();
        const assets = Object.keys(symbols.symbols);
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        let results = [];

        for (let i = 0; i < assets.length; i++) {
            for (let j = i + 1; j < assets.length; j++) {
                const asset1 = assets[i];
                const asset2 = assets[j];
                const data = await fetch(`https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${asset1}&symbols=${asset2}`)
                    .then(response => response.json())
                    .then(data => data.rates);

                const df = Object.keys(data).map(date => ({
                    date: date,
                    close: data[date][asset2]
                }));

                const alligator = calculateAlligator(df);
                const ratios = calculateRatios(alligator);
                results.push({ asset1, asset2, ...ratios });
            }
        }

        displayResults(results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function calculateAlligator(data) {
    let jaw = [];
    let teeth = [];
    let lips = [];
    
    for (let i = 0; i < data.length; i++) {
        if (i >= 13) {
            jaw.push(data.slice(i - 13, i).reduce((sum, val) => sum + val.close, 0) / 13);
        } else {
            jaw.push(null);
        }
        if (i >= 8) {
            teeth.push(data.slice(i - 8, i).reduce((sum, val) => sum + val.close, 0) / 8);
        } else {
            teeth.push(null);
        }
        if (i >= 5) {
            lips.push(data.slice(i - 5, i).reduce((sum, val) => sum + val.close, 0) / 5);
        } else {
            lips.push(null);
        }
    }

    return data.map((d, i) => ({
        ...d,
        jaw: jaw[i],
        teeth: teeth[i],
        lips: lips[i]
    }));
}

function calculateRatios(data) {
    let returns = data.map((d, i) => i > 0 ? (d.close - data[i - 1].close) / data[i - 1].close : 0).slice(1);
    let meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    let stdDev = Math.sqrt(returns.map(r => Math.pow(r - meanReturn, 2)).reduce((sum, r) => sum + r, 0) / returns.length);
    let downsideDev = Math.sqrt(returns.filter(r => r < 0).map(r => Math.pow(r, 2)).reduce((sum, r) => sum + r, 0) / returns.length);
    let maxDrawdown = Math.max(...data.map((d, i) => Math.max(...data.slice(0, i + 1).map(dd => dd.close)) - d.close));

    let sharpe = meanReturn / stdDev * Math.sqrt(252);
    let sortino = meanReturn / downsideDev * Math.sqrt(252);
    let calmar = meanReturn / maxDrawdown;

    return {
        sharpe: sharpe,
        sortino: sortino,
        calmar: calmar
    };
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2>Resultados</h2>';
    results.forEach(result => {
        resultsDiv.innerHTML += `<p>Pares: ${result.asset1}/${result.asset2} - Sharpe: ${result.sharpe.toFixed(2)} - Sortino: ${result.sortino.toFixed(2)} - Calmar: ${result.calmar.toFixed(2)}</p>`;
    });
}
