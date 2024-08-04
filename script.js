document.addEventListener('DOMContentLoaded', () => {
    const misFichasSelect = document.getElementById('mis-fichas');
    const visor = document.getElementById('visor');
    const switchFrente = document.getElementById('switch-frente');
    const frente = document.getElementById('frente');

    // Añadir opciones a la lista desplegable
    const fichas = ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '2-2', '2-3', '2-4', '2-5', '2-6', '3-3', '3-4', '3-5', '3-6', '4-4', '4-5', '4-6', '5-5', '5-6', '6-6'];
    fichas.forEach(ficha => {
        const option = document.createElement('option');
        option.value = ficha;
        option.textContent = ficha;
        misFichasSelect.appendChild(option);
    });

    // Mostrar fichas seleccionadas en el visor
    misFichasSelect.addEventListener('change', () => {
        visor.innerHTML = '';
        const selectedOptions = Array.from(misFichasSelect.selectedOptions);
        selectedOptions.slice(0, 7).forEach(option => {
            const fichaDiv = document.createElement('div');
            fichaDiv.textContent = option.value;
            visor.appendChild(fichaDiv);
        });
    });

    // Mostrar u ocultar el jugador "Mi Frente"
    switchFrente.addEventListener('change', () => {
        frente.style.display = switchFrente.checked ? 'block' : 'none';
    });
});
