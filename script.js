// Función para obtener datos de cookies
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Mostrar los resultados en la página
function displayResults(data) {
    const resultsDiv = document.getElementById('cryptoResults');
    resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// Cargar datos de localStorage, sessionStorage, cookies, y JSONbin.io
function loadCryptoData() {
    let data = {};

    // Intentar obtener datos de localStorage
    let localData = localStorage.getItem('cryptoData');
    if (localData) {
        data.localStorage = JSON.parse(localData);
    }

    // Intentar obtener datos de sessionStorage
    let sessionData = sessionStorage.getItem('cryptoData');
    if (sessionData) {
        data.sessionStorage = JSON.parse(sessionData);
    }

    // Intentar obtener datos de cookies
    let cookieData = getCookie('cryptoData');
    if (cookieData) {
        data.cookies = JSON.parse(cookieData);
    }

    // Intentar obtener datos de JSONbin.io
    fetch('https://api.jsonbin.io/v3/b/YOUR_BIN_ID', {
        method: 'GET',
        headers: {
            'X-Master-Key': '$2a$10$4u7LzMqHthfqTnLdy1eyIOM3pWZhu0tY6U2/0S6jxA0rtmCh2CIuG'
        }
    })
    .then(response => response.json())
    .then(json => {
        data.jsonBin = json.record;
        displayResults(data);
    })
    .catch(error => {
        console.error('Error al obtener datos de JSONbin.io:', error);
        displayResults(data);
    });
}

// Iniciar carga de datos al cargar la página
window.onload = loadCryptoData;
