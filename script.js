// script.js
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const apiKey = "69djlZdJU7cEHzbTP9g4NuzuttXinRl9waKJ5Rzk"; // Reemplaza con tu clave de API
        const apiSecret = "is17cKtqqOcUs2lAwj3MuxtmsmXOvjBCRgeEq3aw"; // Reemplaza con tu secreto de API

        const response = await fetch("https://ff.io/api/v2/candles/BTCUSD/1m", {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "X-API-KEY": apiKey,
                "X-API-SIGN": apiSecret,
            },
        });

        const data = await response.json();
        const priceList = document.getElementById("price-list");

        data.forEach((candle) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Cierre: ${candle.close}`;
            priceList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
});
