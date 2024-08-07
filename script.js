document.addEventListener('DOMContentLoaded', () => {
    const fichasContainer = document.getElementById('fichas');
    const visores = {
        'visor': document.getElementById('visor'),
        'visor-pase-yo': document.getElementById('visor-pase-yo'),
        'visor-sali-yo': document.getElementById('visor-sali-yo'),
        'visor-jugadas-yo': document.getElementById('visor-jugadas-yo'),
        'visor-pase-izquierda': document.getElementById('visor-pase-izquierda'),
        'visor-salio-izquierda': document.getElementById('visor-salio-izquierda'),
        'visor-jugadas-izquierda': document.getElementById('visor-jugadas-izquierda'),
        'visor-pase-derecha': document.getElementById('visor-pase-derecha'),
        'visor-salio-derecha': document.getElementById('visor-salio-derecha'),
        'visor-jugadas-derecha': document.getElementById('visor-jugadas-derecha'),
        'visor-pase-frente': document.getElementById('visor-pase-frente'),
        'visor-salio-frente': document.getElementById('visor-salio-frente'),
        'visor-jugadas-frente': document.getElementById('visor-jugadas-frente')
    };
    const mejorFichaDiv = document.getElementById('mejor-ficha');
    const borrarValoresButtons = document.querySelectorAll('.borrar-valores');
    const acabarManoButton = document.getElementById('acabar-mano');
    const switchFrente = document.getElementById('switch-frente');
    const frente = document.getElementById('frente');
    let activeVisor = null;

        const fichas = ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '2-2', '2-3', '2-4', '2-5', '2-6', '3-3', '3-4', '3-5', '3-6', '4-4', '4-5', '4-6', '5-5', '5-6', '6-6']; 
    // Funcionalidad al hacer clic en una ficha
    fichas.forEach(ficha => {
        const fichaDiv = document.createElement('div');
        fichaDiv.className = 'ficha';
        fichaDiv.textContent = ficha;
        fichaDiv.addEventListener('click', () => {
            if (activeVisor) {
                const fichaElement = document.createElement('div');
                fichaElement.textContent = ficha;
                visores[activeVisor].appendChild(fichaElement);
            }
        });
        fichasContainer.appendChild(fichaDiv);
    });

    document.querySelectorAll('input[name="visor-switch"]').forEach(switchElement => {
        switchElement.addEventListener('change', () => {
            activeVisor = switchElement.id.replace('switch-', '');
        });
    });

    borrarValoresButtons.forEach(button => {
        button.addEventListener('click', () => {
            const visorId = button.previousElementSibling.id.replace('switch-', 'visor-');
            visores[visorId].innerHTML = '';
        });
    });

    const calcularMejorFicha = () => {
        const fichasDisponibles = Array.from(fichasContainer.children).map(fichaDiv => fichaDiv.textContent);
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

    // Funcionalidad del botón "Acabar mano"
    acabarManoButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres acabar la mano?')) {
            // Limpiar y reiniciar todo
            Object.values(visores).forEach(visor => {
                visor.innerHTML = '';
            });
            fichasContainer.innerHTML = '';
            fichas.forEach(ficha => {
    const fichaDiv = document.createElement('div');
    fichaDiv.className = 'ficha';
    fichaDiv.textContent = ficha;
    fichaDiv.addEventListener('click', () => {
        if (activeVisor) {
            const fichaElement = document.createElement('div');
            fichaElement.textContent = ficha;
            visores[activeVisor].appendChild(fichaElement);
            // Actualizar la "mejor ficha para salir" con la ficha seleccionada
            mejorFichaDiv.textContent = `Mejor ficha: ${ficha}`;
        }
    });
    fichasContainer.appendChild(fichaDiv);
});
        }
    });

    calcularMejorFicha();
});
