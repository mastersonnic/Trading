document.addEventListener("DOMContentLoaded", function() {
    const exchange1 = document.getElementById("exchange1");
    const exchange2 = document.getElementById("exchange2");
    const link1 = document.getElementById("link1");
    const link2 = document.getElementById("link2");

    function updateLinks() {
        link1.href = exchange1.value;
        link1.textContent = `Abrir ${exchange1.options[exchange1.selectedIndex].text}`;
        link2.href = exchange2.value;
        link2.textContent = `Abrir ${exchange2.options[exchange2.selectedIndex].text}`;
    }

    exchange1.addEventListener("change", updateLinks);
    exchange2.addEventListener("change", updateLinks);

    // Inicializar enlaces con los valores por defecto
    updateLinks();
});
