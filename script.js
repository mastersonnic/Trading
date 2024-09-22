// Esta función simula la recepción de datos desde el script inyectado
// Aquí se insertarán los valores de las criptomonedas capturados
const cryptoValues = [
    {crypto: 'LTC', amount: 0.015},
    {crypto: 'XRP', amount: 1.65},
    {crypto: 'XMR', amount: 0.0057},
    {crypto: 'DOGE', amount: 9.19},
    {crypto: 'MATIC', amount: 0.015},
    {crypto: 'DASH', amount: 0.000187},
    {crypto: 'ZEC', amount: 0.000193},
    {crypto: 'USDT (TRC20)', amount: 0.0062},
    {crypto: 'TRX', amount: 0.04},
    {crypto: 'BNB (BEP20)', amount: 0.0000103},
    {crypto: 'SOL', amount: 0.0000407}
];

// Función para renderizar los valores en la tabla HTML
function renderCryptoValues() {
    const tbody = document.getElementById('crypto-values');
    tbody.innerHTML = '';  // Limpiamos cualquier contenido previo

    cryptoValues.forEach(crypto => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const amountCell = document.createElement('td');

        nameCell.textContent = crypto.crypto;
        amountCell.textContent = crypto.amount;

        row.appendChild(nameCell);
        row.appendChild(amountCell);
        tbody.appendChild(row);
    });
}

// Ejecutamos la función para mostrar los valores en la tabla
renderCryptoValues();
