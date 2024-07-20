// Obtener datos de la API de Binance (puedes usar fetch o axios)
const apiUrl = 'https://api.binance.com/api/v3/klines?symbol=GBPUSD&interval=15m&limit=100'; // Cambia el límite según tus necesidades

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Procesar los datos (candlesticks, líneas, etc.)
        const chartData = data.map(item => ({
            t: new Date(item[0]),
            o: parseFloat(item[1]),
            h: parseFloat(item[2]),
            l: parseFloat(item[3]),
            c: parseFloat(item[4]),
        }));

        // Configurar el gráfico con Chart.js
        const ctx = document.getElementById('myChart').getContext('2d');
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
