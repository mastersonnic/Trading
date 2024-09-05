document.addEventListener("DOMContentLoaded", function() {
    const  = document.getElementById('mis-fichas');

    function actualizarVisorJ1() {
        const fichasSeleccionadas = document.querySelectorAll('#fichas input[type="checkbox"]:checked');
        visorJ1.innerHTML = ''; 
        fichasSeleccionadas.forEach(checkbox => {
            const fichaLabel = checkbox.nextSibling.textContent;
            visorJ1.innerHTML += `<div>${fichaLabel}</div>`;
        });
    }

    const checkboxes = document.querySelectorAll('#fichas input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', actualizarVisorJ1);
    });

    actualizarVisorJ1(); // Inicializa el visor
});

