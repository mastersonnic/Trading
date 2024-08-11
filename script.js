document.addEventListener('DOMContentLoaded', () => {
    const jugadores = ['yo', 'izquierda', 'derecha', 'frente'];
    let activeJugador = 'yo';

    const jugadasSelects = {};
    jugadores.forEach(jugador => {
        jugadasSelects[jugador] = {
            jugadas: document.getElementById(`jugadas-${jugador}`),
            pase: document.getElementById(`pase-${jugador}`),
            salio: document.getElementById(`salio-${jugador}`)
        };
    });

    const grupoFichas = document.getElementById('grupo-fichas');
    let fichaSeleccionada = null;

    const fichas = ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '2-2', '2-3', '2-4', '2-5', '2-6', '3-3', '3-4', '3-5', '3-6', '4-4', '4-5', '4-6', '5-5', '5-6', '6-6'];

    fichas.forEach(ficha => {
        const fichaDiv = document.createElement('div');
        fichaDiv.className = 'ficha';
        fichaDiv.textContent = ficha;
        fichaDiv.addEventListener('click', () => {
            fichaSeleccionada = ficha;

            const fichaMostrada = document.createElement('div');
            fichaMostrada.textContent = ficha;
            jugadasSelects.yo.appendChild(fichaMostrada);

            const jugadasDiv = jugadasSelects[activeJugador];
            const paseDiv = jugadasSelects[`pase${activeJugador.charAt(0).toUpperCase() + activeJugador.slice(1)}`];
            const salioDiv = jugadasSelects[`salio${activeJugador.charAt(0).toUpperCase() + activeJugador.slice(1)}`];

            const fichaElement = document.createElement('div');
            fichaElement.textContent = ficha;

            if (activeJugadas.includes('jugadas')) {
                jugadasDiv.appendChild(fichaElement);
            } else if (activeJugadas.includes('pase')) {
                paseDiv.appendChild(fichaElement);
            } else if (activeJugadas.includes('salio')) {
                salioDiv.appendChild(fichaElement);
            }
        });
        grupoFichas.appendChild(fichaDiv);
    });

    document.querySelectorAll('input[name="jugadas-switch"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            activeJugador = event.target.value;
        });
    });

    const switchFrente = document.getElementById('switch-frente');
    switchFrente.addEventListener('change', () => {
        if (switchFrente.checked) {
            jugadasSelects.frente.parentElement.style.display = 'block';
        } else {
            jugadasSelects.frente.parentElement.style.display = 'none';
        }
    });

    const acabarManoButton = document.getElementById('acabar-mano');
    acabarManoButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres acabar la mano?')) {
            Object.values(jugadasSelects).forEach(select => {
                select.innerHTML = '';
            });
        }
    });
});
