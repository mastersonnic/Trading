document.addEventListener('DOMContentLoaded', () => {
    const fichasDisponibles = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
        [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
        [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
        [3, 3], [3, 4], [3, 5], [3, 6],
        [4, 4], [4, 5], [4, 6],
        [5, 5], [5, 6],
        [6, 6]
    ];

    let fichasSeleccionadas = [];
    let jugadorActual = 1;
    let fichasJugadas = [];
    let extremosMesa = [];
    let puntosEquipo1 = 0;
    let puntosEquipo2 = 0;
    const jugadores = { J1: [], J2: [], J3: [], J4: [] };
    const fichasPasadas = { J1: [], J2: [], J3: [], J4: [] };
    const extremosRepetidosOponentes = [];

    const contenedorSeleccionarFichas = document.querySelector('.select-tiles');
    const contenedorFichasJugador = document.querySelector('.player-hand');
    const contenedorMejorFichaJugar = document.getElementById('mejor-ficha-jugar');
    const contenedorMejorFichaSalir = document.getElementById('mejor-ficha-salir');
    const contenedorExtremosActuales = document.getElementById('extremos-actuales');
    const contenedorPuntosEquipo1 = document.getElementById('puntos-equipo-1');
    const contenedorPuntosEquipo2 = document.getElementById('puntos-equipo-2');
    const botonPasarTurno = document.getElementById('pasar-turno');
    const botonReiniciarJuego = document.getElementById('reiniciar-juego');
    const contenedorFichasPasadas = document.getElementById('fichas-pasadas');
    const contenedorExtremosRepetidos = document.getElementById('extremos-repetidos');

    // Crear fichas para seleccionar
    fichasDisponibles.forEach((ficha, index) => {
        const fichaDiv = document.createElement('div');
        fichaDiv.classList.add('domino-tile');
        fichaDiv.textContent = `${ficha[0]}|${ficha[1]}`;
        fichaDiv.dataset.index = index;
        fichaDiv.addEventListener('click', () => seleccionarFicha(index, fichaDiv));
        contenedorSeleccionarFichas.appendChild(fichaDiv);
    });

    function seleccionarFicha(index, fichaDiv) {
        if (fichasSeleccionadas.length < 7 && !fichasSeleccionadas.includes(index)) {
            fichasSeleccionadas.push(index);
            fichaDiv.classList.add('selected');
        } else if (fichasSeleccionadas.includes(index)) {
            fichasSeleccionadas = fichasSeleccionadas.filter(i => i !== index);
            fichaDiv.classList.remove('selected');
        }
        jugadores.J1 = fichasSeleccionadas.map(i => fichasDisponibles[i]);
        actualizarFichasJugador();
        actualizarMejorFichaSalir();
    }

    function actualizarFichasJugador() {
        contenedorFichasJugador.innerHTML = '';
        jugadores.J1.forEach(ficha => {
            const fichaDiv = document.createElement('div');
            fichaDiv.classList.add('domino-tile');
            fichaDiv.textContent = `${ficha[0]}|${ficha[1]}`;
            contenedorFichasJugador.appendChild(fichaDiv);
        });
        actualizarMejorFichaJugar();
    }

    function actualizarMejorFichaJugar() {
        // Lógica para determinar la mejor ficha para jugar (basado en reglas específicas)
        const mejorFicha = jugadores.J1[0]; // Este es solo un ejemplo simplificado
        contenedorMejorFichaJugar.textContent = mejorFicha ? `${mejorFicha[0]}|${mejorFicha[1]}` : 'N/A';
    }

    function actualizarMejorFichaSalir() {
        // Lógica para determinar la mejor ficha para salir (basado en reglas específicas)
        const mejorFicha = jugadores.J1[0]; // Este es solo un ejemplo simplificado
        contenedorMejorFichaSalir.textContent = mejorFicha ? `${mejorFicha[0]}|${mejorFicha[1]}` : 'N/A';
    }

    function actualizarExtremosMesa() {
        contenedorExtremosActuales.textContent = extremosMesa.length ? extremosMesa.join(' | ') : 'N/A';
    }

    function actualizarFichasPasadas() {
        const fichasPasadasTexto = Object.keys(fichasPasadas)
            .map(jugador => `${jugador}: ${fichasPasadas[jugador].map(e => e.join('|')).join(', ')}`)
            .join('; ');
        contenedorFichasPasadas.textContent = fichasPasadasTexto || 'N/A';
    }

    function actualizarExtremosRepetidos() {
        contenedorExtremosRepetidos.textContent = extremosRepetidosOponentes.length 
            ? extremosRepetidosOponentes.join(', ') 
            : 'N/A';
    }

    function jugarFicha(fichaIndex) {
        const ficha = jugadores[`J${jugadorActual}`][fichaIndex];
        if (extremosMesa.length === 0) {
            extremosMesa = [...ficha];
        } else if (ficha.includes(extremosMesa[0]) || ficha.includes(extremosMesa[1])) {
            if (ficha.includes(extremosMesa[0])) {
                extremosMesa[0] = ficha[0] === extremosMesa[0] ? ficha[1] : ficha[0];
            } else {
                extremosMesa[1] = ficha[0] === extremosMesa[1] ? ficha[1] : ficha[0];
            }
            fichasJugadas.push(ficha);
            jugadores[`J${jugadorActual}`].splice(fichaIndex, 1);
            rastrearExtremosOponentes(ficha);
        } else {
            alert("Movimiento no válido. La ficha no coincide con ninguno de los extremos.");
            return;
        }
        actualizarExtremosMesa();
        actualizarFichasJugador();
        siguienteTurno();
    }

    function pasarTurno() {
        fichasPasadas[`J${jugadorActual}`].push([...extremosMesa]);
        actualizarFichasPasadas();
        siguienteTurno();
    }

    function reiniciarJuego() {
        fichasSeleccionadas = [];
        jugadores.J1 = [];
        jugadores.J2 = [];
        jugadores.J3 = [];
        jugadores.J4 = [];
        fichasJugadas = [];
        extremosMesa = [];
        fichasPasadas.J1 = [];
        fichasPasadas.J2 = [];
        fichasPasadas.J3 = [];
        fichasPasadas.J4 = [];
        extremosRepetidosOponentes.length = 0;
        puntosEquipo1 = 0;
        puntosEquipo2 = 0;
        contenedorFichasJugador.innerHTML = '';
        actualizarMejorFichaJugar();
        actualizarMejorFichaSalir();
        actualizarExtremosMesa();
        actualizarFichasPasadas();
        actualizarExtremosRepetidos();
        contenedorPuntosEquipo1.textContent = puntosEquipo1;
        contenedorPuntosEquipo2.textContent = puntosEquipo2;

        // Volver a habilitar la selección de fichas
        document.querySelectorAll('.domino-tile').forEach(tile => {
            tile.classList.remove('selected');
        });
    }

    function siguienteTurno() {
        jugadorActual = (jugadorActual % 4) + 1;
        if (jugadorActual === 1) {
            actualizarMejorFichaJugar();
        }
    }

    function rastrearExtremosOponentes(ficha) {
        // Rastrear si un extremo se ha jugado 2 o más veces por los oponentes
        const oponentes = jugadorActual === 2 || jugadorActual === 4;
        ficha.forEach(numero => {
            if (oponentes && extremosRepetidosOponentes.filter(n => n === numero).length >= 1) {
                extremosRepetidosOponentes.push(numero);
            }
        });
        actualizarExtremosRepetidos();
    }

    botonPasarTurno.addEventListener('click', pasarTurno);
    botonReiniciarJuego.addEventListener('click', reiniciarJuego);
});
