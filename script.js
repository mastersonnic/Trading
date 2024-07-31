document.addEventListener("DOMContentLoaded", function() {
    const exchange1 = document.getElementById("exchange1");
    const exchange2 = document.getElementById("exchange2");
    const iframe1 = document.getElementById("iframe1");
    const iframe2 = document.getElementById("iframe2");

    function updateIframes() {
        iframe1.src = exchange1.value;
        iframe2.src = exchange2.value;
    }

    exchange1.addEventListener("change", updateIframes);
    exchange2.addEventListener("change", updateIframes);

    // Inicializar iframes con los valores por defecto
    updateIframes();
});
