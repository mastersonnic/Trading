document.addEventListener("DOMContentLoaded", function() {
    const exchange1 = document.getElementById("exchange1");
    const exchange2 = document.getElementById("exchange2");
    const iframe1 = document.getElementById("iframe1");
    const iframe2 = document.getElementById("iframe2");
    const link1 = document.getElementById("link1");
    const link2 = document.getElementById("link2");

    function updateIframes() {
        iframe1.src = exchange1.value;
        iframe2.src = exchange2.value;
        link1.href = exchange1.value;
        link1.textContent = `Abrir ${exchange1.options[exchange1.selectedIndex].text}`;
        link2.href = exchange2.value;
        link2.textContent = `Abrir ${exchange2.options[exchange2.selectedIndex].text}`;
    }

    exchange1.addEventListener("change", updateIframes);
    exchange2.addEventListener("change", updateIframes);

    // Inicializar iframes con los valores por defecto
    updateIframes();
});
