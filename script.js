const apiUrl = 'https://api.exchangerate.host/timeseries?start_date=2023-07-10&end_date=2023-07-13&base=USD&symbols=EUR';

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const labels = Object.keys(data.rates);
        const prices = labels.map(date => data.rates[date].EUR);

        // Calcula indicadores técnicos
        const bollingerBands = calculateBollingerBands(prices);
        const rsi = calculateRSI(prices);

        const ctx = document.getElementById('tradingChart').getContext('2d');
        const tradingChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Precio de Cierre',
                        data: prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Bollinger Bands SMA',
                        data: bollingerBands.sma,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        borderDash: [5, 5]
                    },
                    {
                        label: 'Bollinger Bands Upper',
                        data: bollingerBands.upperBand,
                        borderColor: 'rgba(255, 99, 132, 0.5)',
                        borderWidth: 1,
                        borderDash: [5, 5]
                    },
                    {
                        label: 'Bollinger Bands Lower',
                        data: bollingerBands.lowerBand,
                        borderColor: 'rgba(255, 99, 132, 0.5)',
                        borderWidth: 1,
                        borderDash: [5, 5]
                    },
                    {
                        label: 'RSI',
                        data: rsi,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    },
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

// Funciones para calcular indicadores técnicos
function calculateBollingerBands(prices) {
    const period = 20;
    const stdDevMultiplier = 2;
    let sma = [];
    let upperBand = [];
    let lowerBand = [];

    for (let i = 0; i < prices.length; i++) {
        if (i >= period - 1) {
            const slice = prices.slice(i - period + 1, i + 1);
            const mean = slice.reduce((a, b) => a + b, 0) / period;
            const stdDev = Math.sqrt(slice.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / period);
            sma.push(mean);
            upperBand.push(mean + stdDevMultiplier * stdDev);
            lowerBand.push(mean - stdDevMultiplier * stdDev);
        } else {
            sma.push(null);
            upperBand.push(null);
            lowerBand.push(null);
        }
    }

    return { sma, upperBand, lowerBand };
}

function calculateRSI(prices) {
    const period = 14;
    let gains = [];
    let losses = [];
    let rsi = [];

    for (let i = 1; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        gains.push(change > 0 ? change : 0);
        losses.push(change < 0 ? Math.abs(change) : 0);

        if (i >= period) {
            const avgGain = gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
            const avgLoss = losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
            const rs = avgGain / avgLoss;
            rsi.push(100 - (100 / (1 + rs)));
        } else {
            rsi.push(null);
        }
    }

    return rsi;
}
