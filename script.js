document.addEventListener('DOMContentLoaded', function () {
    const fichas = [];
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            fichas.push([i, j]);
        }
    }

    const fichasDisponibles = document.getElementById('fichas-disponibles');
    const fichasSeleccionadas = document.getElementById('fichas-seleccionadas');
    const confirmarFichasBtn = document.getElementById('confirmar-fichas');
    const seleccionSalida = document.getElementById('seleccion-salida');
    const juegoEnProgreso = document.getElementById('juego-en-progreso');
    const tablero = document.getElementById('tablero');
    const extremos = document.getElementById('extremos');
    const mejorJugada = document.getElementById('mejor-jugada');
    const turnoActual = document.getElementById('turno-actual');
    const menuJuego = document.getElementById('menu-juego');
    const reiniciarBtn = document.getElementById('reiniciar');

    let misFichas = [];
    let jugadorQueSale = '';
    let turnoJugador = '';

    function mostrarFichas() {
        fichasDisponibles.innerHTML = '';
        fichas.forEach((ficha, index) => {
            const fichaDiv = document.createElement('div');
            fichaDiv.classList.add('ficha');
            fichaDiv.textContent = `${ficha[0]}|${ficha[1]}`;
            fichaDiv.addEventListener('click', function () {
                seleccionarFicha(index);
            });
            fichasDisponibles.appendChild(fichaDiv);
        });
    }

    function seleccionarFicha(index) {
        if (misFichas.length < 7) {
            misFichas.push(fichas[index]);
            actualizarFichasSeleccionadas();
        }
    }

    function actualizarFichasSeleccionadas() {
        fichasSeleccionadas.innerHTML = '';
        misFichas.forEach((ficha, index) => {
            const fichaDiv = document.createElement('div');
            fichaDiv.classList.add('ficha', 'seleccionada');
            fichaDiv.textContent = `${ficha[0]}|${ficha[1]}`;
            fichaDiv.addEventListener('click', function () {
                eliminarFicha(index);
            });
            fichasSeleccionadas.appendChild(fichaDiv);
        });
    }

    function eliminarFicha(index) {
        misFichas.splice(index, 1);
        actualizarFichasSeleccionadas();
    }

    confirmarFichasBtn.addEventListener('click', function () {
        if (misFichas.length === 7) {
            seleccionSalida.classList.remove('oculto');
            fichasDisponibles.classList.add('oculto');
            fichasSeleccionadas.classList.add('oculto');
            confirmarFichasBtn.classList.add('oculto');
        } else {
            alert('Debes seleccionar exactamente 7 fichas.');
        }
    });

    document.querySelectorAll('.jugador').forEach(btn => {
        btn.addEventListener('click', function () {
            jugadorQueSale = this.dataset.jugador;
            iniciarJuego();
        });
    });

    function iniciarJuego() {
        seleccionSalida.classList.add('oculto');
        juegoEnProgreso.classList.remove('oculto');
        turnoJugador = jugadorQueSale;
        actualizarTurno();
    }

    function actualizarTurno() {
        turnoActual.textContent = `Turno de ${turnoJugador}`;
        if (turnoJugador === 'J1') {
            mostrarMenu();
        } else {
            // Lógica para que jueguen los otros jugadores J2, J3, J4
            // ...
            // Al finalizar, cambiar turno:
            cambiarTurno();
        }
    }

    function mostrarMenu() {
        menuJuego.innerHTML = `
            <button id="jugar">Jugar</button>
            <button id="pasar">Pasar</button>
        `;
        document.getElementById('jugar').addEventListener('click', function () {
            jugarFicha();
        });
        document.getElementById('pasar').addEventListener('click', function () {
            cambiarTurno();
        });
    }

    function jugarFicha() {
        // Lógica para que el jugador J1 juegue su ficha
        // ...
        // Al finalizar, cambiar turno:
        cambiarTurno();
    }

    function cambiarTurno() {
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

    // Mostrar fichas al inicio
    mostrarFichas();
});
