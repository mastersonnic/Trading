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

    const saliYoSelect = document.getElementById('sali-yo');
    const visorSaliYo = document.getElementById('visor-sali-yo');
    const salioIzquierdaSelect = document.getElementById('salio-izquierda');
    const visorSalioIzquierda = document.getElementById('visor-salio-izquierda');
    const salioDerechaSelect = document.getElementById('salio-derecha');
    const visorSalioDerecha = document.getElementById('visor-salio-derecha');
    const salioFrenteSelect = document.getElementById('salio-frente');
    const visorSalioFrente = document.getElementById('visor-salio-frente');

    const jugadasYoSelect = document.getElementById('jugadas-yo');
    const visorJugadasYo = document.getElementById('visor-jugadas-yo');
    const jugadasIzquierdaSelect = document.getElementById('jugadas-izquierda');
    const visorJugadasIzquierda = document.getElementById('visor-jugadas-izquierda');
    const jugadasDerechaSelect = document.getElementById('jugadas-derecha');
    const visorJugadasDerecha = document.getElementById('visor-jugadas-derecha');
    const jugadasFrenteSelect = document.getElementById('jugadas-frente');
    const visorJugadasFrente = document.getElementById('visor-jugadas-frente');

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

        const optionSaliYo = option.cloneNode(true);
        saliYoSelect.appendChild(optionSaliYo);

        const optionSalioIzquierda = option.cloneNode(true);
        salioIzquierdaSelect.appendChild(optionSalioIzquierda);

        const optionSalioDerecha = option.cloneNode(true);
        salioDerechaSelect.appendChild(optionSalioDerecha);

        const optionSalioFrente = option.cloneNode(true);
        salioFrenteSelect.appendChild(optionSalioFrente);

        const optionJugadasYo = option.cloneNode(true);
        jugadasYoSelect.appendChild(optionJugadasYo);

        const optionJugadasIzquierda = option.cloneNode(true);
        jugadasIzquierdaSelect.appendChild(optionJugadasIzquierda);

        const optionJugadasDerecha = option.cloneNode(true);
        jugadasDerechaSelect.appendChild(optionJugadasDerecha);

        const optionJugadasFrente = option.cloneNode(true);
        jugadasFrenteSelect.appendChild(optionJugadasFrente);
    });

    const updateVisor = (selectElement, visorElement) => {
        visorElement.innerHTML = '';
        const selectedOptions = Array.from(selectElement.selectedOptions);
        selectedOptions.slice(0, 7).forEach(option => {
            const fichaDiv = document.createElement('div');
            fichaDiv.textContent = option.value;
            visorElement.appendChild(fichaDiv);
        });
    };

    const updateSalioVisor = (selectElement, visorElement) => {
        visorElement.innerHTML = '';
        const selectedOption = selectElement.selectedOptions[0];
        if (selectedOption && selectedOption.value !== 'no sale') {
            const fichaDiv = document.createElement('div');
            fichaDiv.textContent = selectedOption.value;
            visorElement.appendChild(fichaDiv);
        }
    };

    const updateJugadasVisor = (selectElement, visorElement) => {
        visorElement.innerHTML = '';
        const selectedOptions = Array.from(selectElement.selectedOptions);
        selectedOptions.slice(0, 7).forEach(option => {
            const fichaDiv = document.createElement('div');
            fichaDiv.textContent = option.value;
            visorElement.appendChild(fichaDiv);
        });
    };

    const removeFichaFromAllJugadas = (ficha) => {
        const jugadasSelects = [jugadasYoSelect, jugadasIzquierdaSelect, jugadasDerechaSelect, jugadasFrenteSelect];
        jugadasSelects.forEach(select => {
            const optionToRemove = Array.from(select.options).find(option => option.value === ficha);
            if (optionToRemove) {
                select.removeChild(optionToRemove);
            }
        });
    };

    misFichasSelect.addEventListener('change', () => updateVisor(misFichasSelect, visor));
    paseYoSelect.addEventListener('change', () => updateVisor(paseYoSelect, visorPaseYo));
    paseIzquierdaSelect.addEventListener('change', () => updateVisor(paseIzquierdaSelect, visorPaseIzquierda));
    paseDerechaSelect.addEventListener('change', () => updateVisor(paseDerechaSelect, visorPaseDerecha));
    paseFrenteSelect.addEventListener('change', () => updateVisor(paseFrenteSelect, visorPaseFrente));

    saliYoSelect.addEventListener('change', () => {
        updateSalioVisor(saliYoSelect, visorSaliYo);
        if (saliYoSelect.value !== 'no sale') {
            salioIzquierdaSelect.value = 'no sale';
            salioDerechaSelect.value = 'no sale';
            salioFrenteSelect.value = 'no sale';
        }
    });
    salioIzquierdaSelect.addEventListener('change', () => {
        updateSalioVisor(salioIzquierdaSelect, visorSalioIzquierda);
        if (salioIzquierdaSelect.value !== 'no sale') {
            saliYoSelect.value = 'no sale';
            salioDerechaSelect.value = 'no sale';
            salioFrenteSelect.value = 'no sale';
        }
    });
    salioDerechaSelect.addEventListener('change', () => {
        updateSalioVisor(salioDerechaSelect, visorSalioDerecha);
        if (salioDerechaSelect.value !== 'no sale') {
            saliYoSelect.value = 'no sale';
            salioIzquierdaSelect.value = 'no sale';
            salioFrenteSelect.value = 'no sale';
        }
    });
    salioFrenteSelect.addEventListener('change', () => {
        updateSalioVisor(salioFrenteSelect, visorSalioFrente);
        if (salioFrenteSelect.value !== 'no sale') {
            saliYoSelect.value = 'no sale';
            salioIzquierdaSelect.value = 'no sale';
            salioDerechaSelect.value = 'no sale';
        }
    });

    jugadasYoSelect.addEventListener('change', () => {
        updateJugadasVisor(jugadasYoSelect, visorJugadasYo);
        const selectedOptions = Array.from(jugadasYoSelect.selectedOptions);
        selectedOptions.forEach(option => removeFichaFromAllJugadas(option.value));
    });
    jugadasIzquierdaSelect.addEventListener('change', () => {
        updateJugadasVisor(jugadasIzquierdaSelect, visorJugadasIzquierda);
        const selectedOptions = Array.from(jugadasIzquierdaSelect.selectedOptions);
        selectedOptions.forEach(option => removeFichaFromAllJugadas(option.value));
    });
        jugadasDerechaSelect.addEventListener('change', () => {
        updateJugadasVisor(jugadasDerechaSelect, visorJugadasDerecha);
        const selectedOptions = Array.from(jugadasDerechaSelect.selectedOptions);
        selectedOptions.forEach(option => removeFichaFromAllJugadas(option.value));
    });
    jugadasFrenteSelect.addEventListener('change', () => {
        updateJugadasVisor(jugadasFrenteSelect, visorJugadasFrente);
        const selectedOptions = Array.from(jugadasFrenteSelect.selectedOptions);
        selectedOptions.forEach(option => removeFichaFromAllJugadas(option.value));
    });

    // Mostrar u ocultar la sección "Mi Frente" según el estado del checkbox
    switchFrente.addEventListener('change', () => {
        if (switchFrente.checked) {
            frente.style.display = 'block';
        } else {
            frente.style.display = 'none';
        }
    });

    // Inicializar la visibilidad de la sección "Mi Frente"
    if (!switchFrente.checked) {
        frente.style.display = 'none';
    }
});
