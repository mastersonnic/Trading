// Función para obtener datos de URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const results = {};
    params.forEach((value, key) => {
        results[key] = value;
    });
    return results;
}

// Función para obtener datos de cookies
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Función para obtener datos de sessionStorage
function getSessionData() {
    const results = {};
    const cryptos = ['LTC', 'XRP', 'DOGE', 'DASH', 'ZEC', 'USDTTRC20', 'USDTPOLYGON', 'USDTBEB20', 'TRX', 'BNBBEP20'];
    cryptos.forEach(crypto => {
        const value = sessionStorage.getItem(crypto);
        if (value) results[crypto] = value;
    });
    return results;
}

// Función para obtener datos de JSONBin.io
function getJsonBinData() {
    const masterKey = '$2a$10$4u7LzMqHthfqTnLdy1eyIOM3pWZhu0tY6U2/0S6jxA0rtmCh2CIuG';
    const binId = '$2a$10$VVTPL39yTToMDqSetpEHnO3NEuUpz1dLAm/irTt7EgYR3jRVG8kjC';
    
    return fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: {
            'X-Master-Key': masterKey
        }
    })
    .then(response => response.json())
    .then(data => data.record)
    .catch(error => console.error('Error obteniendo datos de JSONBin:', error));
}

// Función para mostrar los resultados
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    for (const crypto in results) {
        const value = results[crypto];
        const resultItem = document.createElement('div');
        resultItem.textContent = `${crypto}: ${value}`;
        resultsDiv.appendChild(resultItem);
    }
}

// Obtener y mostrar los resultados de todos los métodos
(async function() {
    const urlParams = getUrlParams();
    const cookieData = cryptos.reduce((acc, crypto) => ({ ...acc, [crypto]: getCookie(crypto) }), {});
    const sessionData = getSessionData();
    const jsonBinData = await getJsonBinData();

    const allResults = { ...urlParams, ...cookieData, ...sessionData, ...jsonBinData };
    displayResults(allResults);
})();
