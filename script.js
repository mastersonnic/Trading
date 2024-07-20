// Obtener datos de la API de Binance (puedes usar fetch o axios)
const apiUrl = 'https://api.binance.com/api/v3/klines?symbol=GBPUSD&interval=15m&limit=100'; // Cambia el límite según tus necesidades

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Procesar los datos (candlesticks, líneas, etc.)
        const chartData = data.map(item => ({
            timestamp: item[0],
            open: parseFloat(item[1]),
            high: parseFloat(item[2]),
            low: parseFloat(item[3]),
            close: parseFloat(item[4]),
        }));

        // Configurar el gráfico (puedes usar Chart.js, Highcharts, etc.)
        // Aquí solo un ejemplo básico:
        const ctx = document.getElementById('chart-container').getContext('2d');
        new Chart(ctx, {
            type: 'candlestick',
            data: {
                datasets: [{
                    label: 'GBP/USD',
                    data: chartData,
                    borderColor: 'blue',
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour', // Cambia la unidad según tus necesidades
                        },
                    },
                    y: {
                        beginAtZero: false,
                    },
                },
            },
        });
    })
    .catch(error => console.error('Error al obtener datos:', error));
