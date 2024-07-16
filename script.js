async function fetchExchangeRates() {
    const response = await fetch('https://api.exchangerate.host/timeseries?start_date=2024-07-12&end_date=2024-07-15&base=GBP&symbols=USD');
    const data = await response.json();
    return data.rates;
}

function calculateAlligator(data) {
    // Implementación simplificada del indicador Alligator
    const jaw = data.map((rate, index) => rate.USD + (index % 3) * 0.0001);
    const teeth = data.map((rate, index) => rate.USD + (index % 2) * 0.0001);
    const lips = data.map((rate, index) => rate.USD + (index % 1) * 0.0001);
    return { jaw, teeth, lips };
}

async function createChart() {
    const rates = await fetchExchangeRates();
    const dates = Object.keys(rates);
    const values = Object.values(rates).map(rate => rate.USD);

    const alligator = calculateAlligator(values);

    const ctx = document.getElementById('chart-container').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                { label: 'GBP/USD', data: values, borderColor: 'blue', fill: false },
                { label: 'Jaw', data: alligator.jaw, borderColor: 'green', fill: false },
                { label: 'Teeth', data: alligator.teeth, borderColor: 'red', fill: false },
                { label: 'Lips', data: alligator.lips, borderColor: 'orange', fill: false }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { display: true, title: { display: true, text: 'Fecha' } },
                y: { display: true, title: { display: true, text: 'Tasa de Cambio' } }
            }
        }
    });
}

createChart();
