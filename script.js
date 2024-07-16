document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('candlestickChart').getContext('2d');

    const candlestickData = [
        { t: new Date('2024-07-15T00:00:00Z'), o: 1.30, h: 1.32, l: 1.28, c: 1.31 },
        { t: new Date('2024-07-15T01:00:00Z'), o: 1.31, h: 1.33, l: 1.29, c: 1.30 },
        // Agrega más datos aquí
    ];

    const chart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: 'GBP/USD',
                data: candlestickData
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    }
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // Simulación de actualización de datos en vivo
    setInterval(() => {
        const newCandle = {
            t: new Date(),
            o: 1.30 + Math.random() * 0.02 - 0.01,
            h: 1.32 + Math.random() * 0.02 - 0.01,
            l: 1.28 + Math.random() * 0.02 - 0.01,
            c: 1.31 + Math.random() * 0.02 - 0.01
        };
        candlestickData.push(newCandle);
        chart.update();
    }, 60000); // Actualiza cada minuto
});
