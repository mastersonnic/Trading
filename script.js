let previousPrices = {};

document.getElementById('update-interval').addEventListener('change', function() {
    clearInterval(updateInterval);
    updateInterval = setInterval(fetchPrices, this.value);
});

let updateInterval = setInterval(fetchPrices, 10000);

async function fetchPrices() {
    try {
        const response = await fetch('https://ff.io/rates/float.xml');
        const text = await response.text();
        displayLastDownload(text);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const prices = parsePrices(xmlDoc);
        displayPrices(prices);
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

function parsePrices(xmlDoc) {
    const prices = {};
    const items = xmlDoc.getElementsByTagName('item');
    for (let item of items) {
        const symbol = item.getElementsByTagName('symbol')[0].textContent;
        const price = parseFloat(item.getElementsByTagName('price')[0].textContent);
        prices[symbol] = price;
    }
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

function displayLastDownload(text) {
    const lastDownloadDiv = document.getElementById('last-download');
    lastDownloadDiv.textContent = text;
}
