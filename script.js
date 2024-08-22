document.addEventListener('DOMContentLoaded', function () {
    let fichasDisponibles = document.getElementById('fichas-disponibles');
    let fichasSeleccionadas = document.getElementById('fichas-seleccionadas');
    let confirmarFichasBtn = document.getElementById('confirmar-fichas');
    let seleccionSalida = document.getElementById('seleccion-salida');
    let turnoActual = document.getElementById('turno-actual');
    let tablero = document.getElementById('tablero');
    let extremos = document.getElementById('extremos');
    let mejorJugada = document.getElementById('mejor-jugada');
    let menuJuego = document.getElementById('menu-juego');
    let juegoEnProgreso = document.getElementById('juego-en-progreso');
    let reiniciarBtn = document.getElementById('reiniciar-juego');

    let fichas = generarFichas();
    let misFichas = [];
    let jugadorQueSale = '';
    let turnoJugador = '';

    function generarFichas() {
        let fichas = [];
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                fichas.push([i, j]);
            }
        }
        return fichas;
    }

    function mostrarFichas() {
        fichasDisponibles.innerHTML = '';
        fichas.forEach((ficha, index) => {
            let fichaElem = document.createElement('div');
            fichaElem.classList.add('ficha');
            fichaElem.innerHTML = `<span>${ficha[0]}|${ficha[1]}</span>`;
            fichaElem.addEventListener('click', function () {
                seleccionarFicha(index);
            });
            fichasDisponibles.appendChild(fichaElem);
        });
    }

    function seleccionarFicha(index) {
        if (misFichas.length < 7) {
            misFichas.push(fichas[index]);
            fichas.splice(index, 1);
            actualizarFichasSeleccionadas();
            mostrarFichas();
        }
    }

    function actualizarFichasSeleccionadas() {
        fichasSeleccionadas.innerHTML = '';
        misFichas.forEach((ficha, index) => {
            let fichaElem = document.createElement('div');
            fichaElem.classList.add('ficha');
            fichaElem.innerHTML = `<span>${ficha[0]}|${ficha[1]}</span>`;
            fichaElem.addEventListener('click', function () {
                removerFicha(index);
            });
            fichasSeleccionadas.appendChild(fichaElem);
        });
    }

    function removerFicha(index) {
        fichas.push(misFichas[index]);
        misFichas.splice(index, 1);
        actualizarFichasSeleccionadas();
        mostrarFichas();
    }

    confirmarFichasBtn.addEventListener('click', function () {
        if (misFichas.length === 7) {
            fichasDisponibles.classList.add('oculto');
            fichasSeleccionadas.classList.add('oculto');
            confirmarFichasBtn.classList.add('oculto');
            seleccionSalida.classList.remove('oculto');
            juegoEnProgreso.classList.remove('oculto');
            reiniciarBtn.classList.remove('oculto');
        } else {
            alert('Debes seleccionar exactamente 7 fichas.');
        }
    });

    document.querySelectorAll('.seleccionar-jugador').forEach(btn => {
        btn.addEventListener('click', function () {
            jugadorQueSale = btn.getAttribute('data-jugador');
            turnoJugador = jugadorQueSale;
            seleccionSalida.classList.add('oculto');
            menuJuego.classList.remove('oculto');
            actualizarTurno();
        });
    });

    function actualizarTurno() {
        turnoActual.innerHTML = `Turno de ${turnoJugador}`;
        if (turnoJugador === 'J1') {
            mostrarMenuJ1();
        } else {
            // Lógica para otros jugadores
            let jugada = elegirJugada(turnoJugador);
            if (jugada) {
                jugarFicha(jugada);
            } else {
                pasarTurno();
            }
        }
    }

    function mostrarMenuJ1() {
        menuJuego.innerHTML = `
            <button id="jugar-ficha">Jugar</button>
            <button id="pasar-turno">Pasar</button>
            <button id="reiniciar-juego">Reiniciar</button>
        `;
        document.getElementById('jugar-ficha').addEventListener('click', function () {
            // Lógica para jugar ficha J1
            jugarMejorFicha();
        });
        document.getElementById('pasar-turno').addEventListener('click', function () {
            pasarTurno();
        });
    }

    function jugarMejorFicha() {
        let mejorFicha = calcularMejorFicha();
        if (mejorFicha) {
            jugarFicha(mejorFicha);
        } else {
            alert('No hay fichas jugables.');
        }
    }

    function jugarFicha(ficha) {
        tablero.innerHTML += `<div class="ficha"><span>${ficha[0]}|${ficha[1]}</span></div>`;
        actualizarExtremos(ficha);
        turnoJugador = siguienteJugador(turnoJugador);
        actualizarTurno();
    }

    function actualizarExtremos(ficha) {
        // Lógica para actualizar los extremos del tablero
    }

    function calcularMejorFicha() {
        // Lógica para calcular la mejor ficha basada en las reglas dadas
        return misFichas[0]; // Placeholder, ajustar según la lógica
    }

    function pasarTurno() {
        turnoJugador = siguienteJugador(turnoJugador);
        actualizarTurno();
    }

    function siguienteJugador(actual) {
        if (actual === 'J1') return 'J2';
        if (actual === 'J2') return 'J3';
        if (actual === 'J3') return 'J4';
        if (actual === 'J4') return 'J1';
    }

    reiniciarBtn.addEventListener('click', function () {
        reiniciarJuego();
    });

    function reiniciarJuego() {
        misFichas = [];
        jugadorQueSale = '';
        turnoJugador = '';
        tablero.innerHTML = '';
        extremos.innerHTML = '';
        mejorJugada.innerHTML = '';
        turnoActual.innerHTML = '';
        menuJuego.innerHTML = '';
        fichasSeleccionadas.innerHTML = '';
        fichasDisponibles.classList.remove('oculto');
        fichasSeleccionadas.classList.remove('oculto');
        confirmarFichasBtn.classList.remove('oculto');
        seleccionSalida.classList.add('oculto');
        juegoEnProgreso.classList.add('oculto');
        reiniciarBtn.classList.add('oculto');
        mostrarFichas();
    }

    mostrarFichas();
});
