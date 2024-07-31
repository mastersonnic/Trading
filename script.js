document.addEventListener('DOMContentLoaded', () => {
    const pricesDiv = document.getElementById('prices');

    const exchanges = [
        { name: 'FixedFloat', url: 'https://ff.io/' },
        { name: 'SimpleSwap', url: 'https://simpleswap.io/' },
        // Agrega más exchanges aquí
    ];

    exchanges.forEach(exchange => {
        fetch(exchange.url)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                // Aquí debes ajustar el selector para encontrar los precios en la página del exchange
                const price = doc.querySelector('.price-selector').innerText;
                const priceItem = document.createElement('div');
                priceItem.className = 'price-item';
                priceItem.innerHTML = `<strong>${exchange.name}:</strong> ${price}`;
                pricesDiv.appendChild(priceItem);
            })
            .catch(error => {
                console.error(`Error al raspar ${exchange.name}:`, error);
            });
    });
});
