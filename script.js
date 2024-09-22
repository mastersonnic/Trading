// Lista de criptomonedas a trabajar
const cryptos = ['LTC', 'XRP', 'DOGE', 'DASH', 'ZEC', 'USDTTRC20', 'USDTPOLYGON', 'USDTBEP20', 'TRX', 'BNBBEP20'];

// Variables para manejar persistencia
let currentCryptoFrom = cryptos[0];
let currentCryptoTo = cryptos[1];
let currentIndex = 0;
let cryptoData = {};

// MasterKey para JSONBin.io
const MASTERKEY_JSONBIN = '$2a$10$4u7LzMqHthfqTnLdy1eyIOM3pWZhu0tY6U2/0S6jxA0rtmCh2CIuG';
const ARBITRAKEYJSON = '$2a$10$VVTPL39yTToMDqSetpEHnO3NEuUpz1dLAm/irTt7EgYR3jRVG8kjC';

// URL base para JSONBin.io
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/';

// Guardar datos en JSONBin.io
async function saveToJsonBin(data) {
    const response = await fetch(`${JSONBIN_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTERKEY_JSONBIN
        },
        body: JSON.stringify(data)
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}

// Obtener datos desde JSONBin.io
async function getFromJsonBin() {
    const response = await fetch(`${JSONBIN_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTERKEY_JSONBIN
        }
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}

// Guardar en cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Leer cookies
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

// Guardar en sessionStorage
function saveToSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

// Leer de sessionStorage
function getFromSessionStorage(key) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Función para actualizar y persistir los datos
function persistData() {
    const data = {
        cryptoFrom: currentCryptoFrom,
        cryptoTo: currentCryptoTo,
        index: currentIndex,
        cryptoData: cryptoData
    };

    // Guardar en Cookies
    setCookie('cryptoData', JSON.stringify(data), 1);
    // Guardar en sessionStorage
    saveToSessionStorage('cryptoData', data);
    // Guardar en JSONBin.io
    saveToJsonBin(data).then((response) => {
        console.log('Datos guardados en JSONBin:', response);
    });
}

// Función para cargar los datos persistidos
function loadPersistedData() {
    // Verificar si hay datos en Cookies
    let cookieData = getCookie('cryptoData');
    if (cookieData) {
        return JSON.parse(cookieData);
    }

    // Verificar si hay datos en sessionStorage
    let sessionData = getFromSessionStorage('cryptoData');
    if (sessionData) {
        return sessionData;
    }

    // Verificar si hay datos en JSONBin.io
    return getFromJsonBin().then((jsonBinData) => {
        return jsonBinData ? jsonBinData.record : null;
    });
}

// Función para cambiar de criptomoneda
function changeCrypto() {
    currentIndex++;

    // Si se llega al final de la lista, reinicia
    if (currentIndex >= cryptos.length) {
        currentIndex = 0;
    }

    // Actualiza las criptomonedas
    currentCryptoFrom = cryptos[currentIndex];
    currentCryptoTo = cryptos[(currentIndex + 1) % cryptos.length];

    // Persistir los datos después del cambio
    persistData();

    // Redirigir a la nueva URL de Crypto-Store
    const newUrl = `https://crypto-store.cc/?locale=en&cur_from=${currentCryptoFrom}&cur_to=${currentCryptoTo}`;
    setTimeout(() => {
        window.location.href = newUrl;
    }, 5000);  // Espera 5 segundos antes de cambiar la URL
}

// Función principal de inicio
function init() {
    // Intentar cargar los datos persistidos
    loadPersistedData().then((persistedData) => {
        if (persistedData) {
            currentCryptoFrom = persistedData.cryptoFrom;
            currentCryptoTo = persistedData.cryptoTo;
            currentIndex = persistedData.index;
            cryptoData = persistedData.cryptoData;
        }

        // Mostrar la criptomoneda actual
        document.getElementById('crypto-info').innerText = `Trabajando con ${currentCryptoFrom} y ${currentCryptoTo}`;

        // Cambiar a la siguiente criptomoneda después de 5 segundos
        setTimeout(() => {
            changeCrypto();
        }, 5000);
    });
}

// Llamar a la función de inicio
init();
