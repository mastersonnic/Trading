document.addEventListener('DOMContentLoaded', () => {
    const jugadores = ['yo', 'izquierda', 'derecha', 'frente'];
    const jugadasSelects = {};

    jugadores.forEach(jugador => {
        jugadasSelects[jugador] = {
            jugadas: document.getElementById(`jugadas-${jugador}`),
            pase: document.getElementById(`pase-${jugador}`),
            salio: document.getElementById(`salio-${jugador}`)
        };
    });

    const switchFrente = document.getElementById('switch-frente');
    const acabarManoButton = document.getElementById('acabar-mano');
    const grupoFichas = document.getElementById('grupo-fichas');
    let fichaSeleccionada = null;

    const fichas = ['document.addEventListener('DOMContentLoaded', () => {
    const jugadores = ['yo', 'izquierda', 'derecha', 'frente'];
    const jugadasSelects = {};

    jugadores.forEach(jugador => {
        jugadasSelects[jugador] = {
            jugadas: document.getElementById(`jugadas-${jugador}`),
            pase: document.getElementById(`pase-${jugador}`),
            salio: document.getElementById(`salio-${jugador}`)
        };
    });

    const switchFrente = document.getElementById('switch-frente');
    const acabarManoButton = document.getElementById('acabar-mano');
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

            const activeJugador = switchFrente.checked ? 'frente' : 'yo';
            const jugadasDiv = jugadasSelects[activeJugador].jugadas;

            const fichaElement = document.createElement('div');
            fichaElement.textContent = ficha;

            jugadasDiv.appendChild(fichaElement);
        });
        grupoFichas.appendChild(fichaDiv);
    });

    switchFrente.addEventListener('change', () => {
        jugadasSelects.frente.jugadas.parentElement.style.display = switchFrente.checked ? 'block' : 'none';
    });

    acabarManoButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres acabar la mano?')) {
            Object.values(jugadasSelects).forEach(selects => {
                Object.values(selects).forEach(select => {
                    select.innerHTML = '';
                });
            });
        }
    });
});

    fichas.forEach(ficha => {
        const fichaDiv = document.createElement('div');
        fichaDiv.className = 'ficha';
        fichaDiv.textContent = ficha;
        fichaDiv.addEventListener('click', () => {
            fichaSeleccionada = ficha;

            const fichaMostrada = document.createElement('div');
            fichaMostrada.textContent = ficha;

            const activeJugador = switchFrente.checked ? 'frente' : 'yo';
            const jugadasDiv = jugadasSelects[activeJugador].jugadas;

            const fichaElement = document.createElement('div');
            fichaElement.textContent = ficha;

            jugadasDiv.appendChild(fichaElement);
        });
        grupoFichas.appendChild(fichaDiv);
    });

    switchFrente.addEventListener('change', () => {
        jugadasSelects.frente.jugadas.parentElement.style.display = switchFrente.checked ? 'block' : 'none';
    });

    acabarManoButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres acabar la mano?')) {
            Object.values(jugadasSelects).forEach(selects => {
                Object.values(selects).forEach(select => {
                    select.innerHTML = '';
                });
            });
        }
    });
});
