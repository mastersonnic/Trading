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

    const mejorFichaDiv = document.getElementById('mejor-ficha');
    const borrarValoresButton = document.getElementById('borrar-valores');
    const acabarManoButton = document.getElementById('acabar-mano');

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
        const selectedOptions = Array.from(selectElement.selectedOptions);
        selectedOptions.slice(0, 7).forEach(option => {
            if (!Array.from(visorElement.children).some(child => child.textContent === option.value)) {
                const fichaDiv = document.createElement('div');
                fichaDiv.textContent = option.value;
                visorElement.appendChild(fichaDiv);
            }
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

    const calcularMejorFicha = () => {
        const fichasDisponibles = Array.from(misFichasSelect.options).map(option => option.value);
        let mejorFicha = '';
        let mejorSumatoria = 0;
        let valoresSumados = '';

        // Condición 1: Doble con al menos dos números más del mismo doble
        fichasDisponibles.forEach(ficha => {
            const [num1, num2] = ficha.split('-').map(Number);
            if (num1 === num2) {
                const count = fichasDisponibles.filter(f => f.includes(num1)).length;
                if (count >= 3) {
                    const sumatoria = num1 * 3;
                    if (sumatoria > mejorSumatoria) {
                        mejorFicha = ficha;
                        mejorSumatoria = sumatoria;
                        valoresSumados = `${num1} + ${num1} + ${num1}`;
                    }
                }
            }
        });

        // Condición 2: Tres números del mismo en tres fichas
        if (!mejorFicha) {
            const numeros = {};
            fichasDisponibles.forEach(ficha => {
                const [num1, num2] = ficha.split('-').map(Number);
                numeros[num1] = (numeros[num1] || 0) + 1;
                numeros[num2] = (numeros[num2] || 0) + 1;
            });
            Object.keys(numeros).forEach(num => {
                if (numeros[num] >= 3) {
                    const sumatoria = num * 3;
                    if (sumatoria > mejorSumatoria) {
                        mejorFicha = fichasDisponibles.find(f => f.includes(num));
                        mejorSumatoria = sumatoria;
                        valoresSumados = `${num} + ${num} + ${num}`;
                    }
                }
            });
        }

        // Condición 3: Ficha más alta
        if (!mejorFicha) {
            fichasDisponibles.forEach(ficha => {
                const [num1, num2] = ficha.split('-').map(Number);
                const sumatoria = num1 + num2;
                if (sumatoria > mejorSumatoria) {
                    mejorFicha = ficha;
                    mejorSumatoria = sumatoria;
                    valoresSumados = `${num1} + ${num2}`;
                }
            });
        }

        mejorFichaDiv.textContent = `Mejor ficha: ${mejorFicha} (${valoresSumados})`;
    };

    misFichasSelect.addEventListener('change', () => {
        updateVisor(misFichasSelect, visor);
                calcularMejorFicha();
    });

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
        } else {
            visorSaliYo.innerHTML = '';
        }
    });
    salioIzquierdaSelect.addEventListener('change', () => {
        updateSalioVisor(salioIzquierdaSelect, visorSalioIzquierda);
        if (salioIzquierdaSelect.value !== 'no sale') {
            saliYoSelect.value = 'no sale';
            salioDerechaSelect.value = 'no sale';
            salioFrenteSelect.value = 'no sale';
        } else {
            visorSalioIzquierda.innerHTML = '';
        }
    });
    salioDerechaSelect.addEventListener('change', () => {
        updateSalioVisor(salioDerechaSelect, visorSalioDerecha);
        if (salioDerechaSelect.value !== 'no sale') {
            saliYoSelect.value = 'no sale';
            salioIzquierdaSelect.value = 'no sale';
            salioFrenteSelect.value = 'no sale';
        } else {
            visorSalioDerecha.innerHTML = '';
        }
    });
    salioFrenteSelect.addEventListener('change', () => {
        updateSalioVisor(salioFrenteSelect, visorSalioFrente);
        if (salioFrenteSelect.value !== 'no sale') {
            saliYoSelect.value = 'no sale';
            salioIzquierdaSelect.value = 'no sale';
            salioDerechaSelect.value = 'no sale';
        } else {
            visorSalioFrente.innerHTML = '';
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

    // Funcionalidad del botón "Borrar valores"
    borrarValoresButton.addEventListener('click', () => {
        const allVisors = [visor, visorPaseYo, visorPaseIzquierda, visorPaseDerecha, visorPaseFrente, visorSaliYo, visorSalioIzquierda, visorSalioDerecha, visorSalioFrente, visorJugadasYo, visorJugadasIzquierda, visorJugadasDerecha, visorJugadasFrente];
        allVisors.forEach(visor => {
            visor.innerHTML = '';
        });
    });

    // Funcionalidad del botón "Acabar mano"
    acabarManoButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres acabar la mano?')) {
            // Limpiar y reiniciar todo
            const allSelects = [misFichasSelect, paseYoSelect, paseIzquierdaSelect, paseDerechaSelect, paseFrenteSelect, saliYoSelect, salioIzquierdaSelect, salioDerechaSelect, salioFrenteSelect, jugadasYoSelect, jugadasIzquierdaSelect, jugadasDerechaSelect, jugadasFrenteSelect];
            allSelects.forEach(select => {
                select.innerHTML = '';
            });
            const allVisors = [visor, visorPaseYo, visorPaseIzquierda, visorPaseDerecha, visorPaseFrente, visorSaliYo, visorSalioIzquierda, visorSalioDerecha, visorSalioFrente, visorJugadasYo, visorJugadasIzquierda, visorJugadasDerecha, visorJugadasFrente];
            allVisors.forEach(visor => {
                visor.innerHTML = '';
            });
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
        }
    });
});

