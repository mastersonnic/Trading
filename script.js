const API_KEY = '69djlZdJU7cEHzbTP9g4NuzuttXinRl9waKJ5Rzk';
const API_SECRET = 'is17cKtqqOcUs2lAwj3MuxtmsmXOvjBCRgeEq3aw';
const URL = 'https://ff.io/api/v2/getRates';

let previousPrices = {};

document.getElementById('update-interval').addEventListener('change', function() {
    clearInterval(updateInterval);
    updateInterval = setInterval(fetchPrices, this.value);
});

let updateInterval = setInterval(fetchPrices, 60000); // Default to 1 minute

async function fetchPrices() {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY': API_KEY,
                'X-API-SIGN': getSignature('{}', API_SECRET)
            },
            body: '{}'
        });
        const data = await response.json();
        displayLastDownload(data);
        const prices = parsePrices(data);
        displayPrices(prices);
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

function getSignature(data, secret) {
    return CryptoJS.HmacSHA256(data, secret).toString();
}

function parsePrices(data) {
    const prices = {};
    data.forEach(item => {
        const symbol = item.symbol;
        const price = parseFloat(item.price);
        prices[symbol] = price;
    });
    return prices;
}

function displayPrices(prices) {
    const pricesDiv = document.getElementById('prices');
    pricesDiv.innerHTML = '';
    for (let symbol in prices) {
        const price = prices[symbol];
        const previousPrice = previousPrices[symbol];
        const priceChange = previousPrice ? ((price - previousPrice) / previousPrice) * 100 : 0;
        const priceElement = document.createElement('div');
        priceElement.textContent = `${symbol}: ${price}`;
        if (Math.abs(priceChange) > 0.1) {
            priceElement.classList.add('price-change');
        }
        pricesDiv.appendChild(priceElement);
    }
    previousPrices = prices;
}

function displayLastDownload(data) {
    const lastDownloadDiv = document.getElementById('last-download');
    lastDownloadDiv.textContent = JSON.stringify(data, null, 2);
}
