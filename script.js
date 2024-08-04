document.addEventListener('DOMContentLoaded', () => {
    const misFichasSelect = document.getElementById('mis-fichas');
    const visor = document.getElementById('visor');
    const switchFrente = document.getElementById('switch-frente');
    const frente = document.getElementById('frente');

    const paseYoSelect = document.getElementById('pase-yo');
    const visorPaseYo = document.getElementById('visor-pase-yo');
    const paseIzquierdaSelect = document.getElementById('pase-izquierda');
    const visorPaseIzquierda = document.getElementById('visor-pase-izquierda');
    const paseDerechaSelect = document.getElementById('pase-derecha');
    const visorPaseDerecha = document.getElementById('visor-pase-derecha');
    const paseFrenteSelect = document.getElementById('pase-frente');
    const visorPaseFrente = document.getElementById('visor-pase-frente');

    // Añadir opciones a las listas desplegables
    const fichas = ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '2-2', '2-3', '2-4', '2-5', '2-6', '3-3', '3-4', '3-5', '3-6', '4-4', '4-5', '4-6', '5-5', '5-6', '6-6'];
    fichas.forEach(ficha => {
        const option = document.createElement('option');
        option.value = ficha;
        option.textContent = ficha;
        misFichasSelect.appendChild(option);

        const optionPaseYo = option.cloneNode(true);
        paseYoSelect.appendChild(optionPaseYo);

        const optionPaseIzquierda = option.cloneNode(true);
        paseIzquierdaSelect.appendChild(optionPaseIzquierda);

        const optionPaseDerecha = option.cloneNode(true);
        paseDerechaSelect.appendChild(optionPaseDerecha);

        const optionPaseFrente = option.cloneNode(true);
        paseFrenteSelect.appendChild(optionPaseFrente);
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

    // Mostrar fichas seleccionadas en los visores de "Pasé(ó)"
    const updateVisor = (selectElement, visorElement) => {
        visorElement.innerHTML = '';
        const selectedOptions = Array.from(selectElement.selectedOptions);
        selectedOptions.slice(0, 7).forEach(option => {
            const fichaDiv = document.createElement('div');
            fichaDiv.textContent = option.value;
            visorElement.appendChild(fichaDiv);
        });
    };

    paseYoSelect.addEventListener('change', () => updateVisor(paseYoSelect, visorPaseYo));
    paseIzquierdaSelect.addEventListener('change', () => updateVisor(paseIzquierdaSelect, visorPaseIzquierda));
    paseDerechaSelect.addEventListener('change', () => updateVisor(paseDerechaSelect, visorPaseDerecha));
    paseFrenteSelect.addEventListener('change', () => updateVisor(paseFrenteSelect, visorPaseFrente));

    // Mostrar u ocultar el jugador "Mi Frente"
    switchFrente.addEventListener('change', () => {
        frente.style.display = switchFrente.checked ? 'block' : 'none';
    });

    // Inicialmente mostrar "Mi Frente"
    frente.style.display = 'block';
});
