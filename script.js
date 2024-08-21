document.addEventListener('DOMContentLoaded', () => {
    const fichas = Array.from({ length: 28 }, (_, i) => `${Math.floor(i / 7)}-${i % 7}`);
    let fichasSeleccionadas = [];
    let jugadorActual = null;
    let extremosMesa = [];
    let fichasJugadas = [];
    let fichasPasadas = { J2: [], J3: [], J4: [] };
    let puntosEquipo1 = 0;
    let puntosEquipo2 = 0;
    const puntosGanador = 100;

    const fichaListElement = document.getElementById('fichas-list');
    const confirmFichasBtn = document.getElementById('confirm-fichas');
    const playerTurnDiv = document.getElementById('player-turn');
    const gameInfoDiv = document.getElementById('game-info');
    const extremosDiv = document.getElementById('extremos');
    const mejorFichaDiv = document.getElementById('mejor-ficha');
    const fichasManoDiv = document.getElementById('fichas-mano');
    const fichasPasadasDiv = document.getElementById('fichas-pasadas');
    const fichasJugadasDiv = document.getElementById('fichas-jugadas');
    
    const actualizarFichasList = () => {
        fichaListElement.innerHTML = fichas.map(ficha => `<option value="${ficha}">${ficha}</option>`).join('');
    };

    const mostrarFichasEnMano = () => {
        fichasManoDiv.innerHTML = fichasSeleccionadas.join(', ');
    };

    const mostrarExtremos = () => {
        extremosDiv.innerHTML = extremosMesa.join(' | ');
    };

    const mostrarMejorFicha = () => {
        const mejorFicha = calcularMejorFichaParaJugar();
        mejorFichaDiv.innerHTML = mejorFicha ? mejorFicha.ficha : 'Ninguna ficha adecuada';
    };

    const calcularMejorFichaParaJugar = () => {
        // Lógica simplificada; reemplazar con lógica real
        return fichasSeleccionadas.map(ficha => ({ ficha, comentario: 'Por definir' }))[0];
    };

    const actualizarJuego = () => {
        mostrarFichasEnMano();
        mostrarExtremos();
        mostrarMejorFicha();
        fichasPasadasDiv.innerHTML = `J2: ${fichasPasadas.J2.join(', ')}<br>J3: ${fichasPasadas.J3.join(', ')}<br>J4: ${fichasPasadas.J4.join(', ')}`;
        fichasJugadasDiv.innerHTML = fichasJugadas.join(', ');
    };

    confirmFichasBtn.addEventListener('click', () => {
        fichasSeleccionadas = Array.from(fichaListElement.selectedOptions).map(option => option.value);
        jugadorActual = 'J1';
        playerTurnDiv.style.display = 'block';
        gameInfoDiv.style.display = 'block';
        actualizarJuego();
    });

    document.getElementById('play-btn').addEventListener('click', () => {
        if (jugadorActual === 'J1') {
            alert('No puedes jugar inmediatamente después de salir.');
            return;
        }
        // Implementar lógica de jugar
        jugadorActual = siguienteJugador();
        actualizarJuego();
    });

    document.getElementById('pass-btn').addEventListener('click', () => {
        jugadorActual = siguienteJugador();
        actualizarJuego();
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        location.reload();
    });

    const siguienteJugador = () => {
        const orden = ['J1', 'J2', 'J3', 'J4'];
        let index = orden.indexOf(jugadorActual);
        return orden[(index + 1) % 4];
    };

    // Inicializar la lista de fichas
    actualizarFichasList();
});
