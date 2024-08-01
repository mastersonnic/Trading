document.addEventListener("DOMContentLoaded", function() {
    const exchanges = [
        { select: document.getElementById("exchange1"), iframe: document.getElementById("iframe1"), link: document.getElementById("link1") },
        { select: document.getElementById("exchange2"), iframe: document.getElementById("iframe2"), link: document.getElementById("link2") },
        { select: document.getElementById("exchange3"), iframe: document.getElementById("iframe3"), link: document.getElementById("link3") },
        { select: document.getElementById("exchange4"), iframe: document.getElementById("iframe4"), link: document.getElementById("link4") }
    ];

    function updateIframes() {
        exchanges.forEach(exchange => {
            exchange.iframe.src = exchange.select.value;
            exchange.link.href = exchange.select.value;
            exchange.link.textContent = `Abrir ${exchange.select.options[exchange.select.selectedIndex].text}`;
        });
    }

    exchanges.forEach(exchange => {
        exchange.select.addEventListener("change", updateIframes);
    });

    // Inicializar iframes con los valores por defecto
    updateIframes();
});
