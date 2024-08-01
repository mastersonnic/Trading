let previousPrices = {};
let intervalId;

async function fetchPrices() {
    try {
        console.log('Fetching prices...');
        const response = await fetch('https://ff.io/rates/float.xml');
        const text = await response.text();
        console.log('Fetched data:', text);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'application/xml');
        const prices = parsePrices(xmlDoc);
        console.log('Parsed prices:', prices);
        displayPrices(prices);
        displayRawData(text);
        detectChanges(prices);
        previousPrices = prices;
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

function parsePrices(xmlDoc) {
    const prices = {};
    const rates = xmlDoc.getElementsByTagName('rate');
    for (let rate of rates) {
        const asset = rate.getElementsByTagName('symbol')[0].textContent;
        const price = parseFloat(rate.getElementsByTagName('price')[0].textContent);
        prices[asset] = price;
    }
    return prices;
}

function displayPrices(prices) {
    const pricesDiv = document.getElementById('prices');
    pricesDiv.innerHTML = '';
    for (let [asset, price] of Object.entries(prices)) {
        const priceElement = document.createElement('div');
        priceElement.textContent = `${asset}: ${price}`;
        pricesDiv.appendChild(priceElement);
    }
}

function displayRawData(data) {
    const rawDataDiv = document.getElementById('raw-data');
    rawDataDiv.innerHTML = `<pre>${data}</pre>`;
}

function detectChanges(newPrices) {
    for (let asset in newPrices) {
        if (previousPrices[asset] && Math.abs((newPrices[asset] - previousPrices[asset]) / previousPrices[asset]) > 0.001) {
            const priceElement = document.createElement('div');
            priceElement.textContent = `Cambio en ${asset}: ${previousPrices[asset]} -> ${newPrices[asset]}`;
            priceElement.classList.add('price-change');
            document.getElementById('prices').appendChild(priceElement);
        }
    }
}

function updateInterval() {
    const interval = document.getElementById('update-interval').value;
    clearInterval(intervalId);
    intervalId = setInterval(fetchPrices, interval);
    fetchPrices(); // Llamar inmediatamente al cambiar el intervalo
}

document.getElementById('update-interval').addEventListener('change', updateInterval);

// Inicializar con el intervalo predeterminado de 10 segundos
intervalId = setInterval(fetchPrices, 10000);
fetchPrices(); // Llamar inmediatamente al cargar la página
