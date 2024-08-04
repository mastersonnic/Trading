let historialJugadas = [];
let manoActual = [];

document.addEventListener('DOMContentLoaded', () => {
    inicializarJuego();
});

function inicializarJuego() {
    const jugadores = ['yo', 'derecha', 'frente', 'izquierda'];
    jugadores.forEach(jugador => {
        const jugadasSelect = document.getElementById(`jugadas-${jugador}`);
        const jugandoSelect = document.getElementById(`jugando-${jugador}`);
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                const ficha = `${i}-${j}`;
                const option = document.createElement('option');
                option.value = ficha;
                option.text = ficha;
                jugadasSelect.appendChild(option.cloneNode(true));
                jugandoSelect.appendChild(option.cloneNode(true));
            }
        }
    });
}

function guardarMano() {
    historialJugadas.push([...manoActual]);
    console.log('Mano guardada:', historialJugadas);
}

function devolverUltimaJugada() {
    if (manoActual.length > 0) {
        const ultimaJugada = manoActual.pop();
        console.log('Última jugada devuelta:', ultimaJugada);
    } else {
        console.log('No hay jugadas para devolver');
    }
}

function terminarMano() {
    manoActual = [];
    console.log('Mano terminada');
}

function comenzarNuevaMano() {
    historialJugadas = [];
    manoActual = [];
    console.log('Nueva mano comenzada');
}

function seleccionarFicha(jugador, ficha, extremo) {
    const fichasMesa = document.getElementById('fichas-mesa');
    const fichaElemento = document.createElement('div');
    fichaElemento.className = 'ficha';
    fichaElemento.innerText = ficha;
    fichaElemento.style.backgroundColor = obtenerColorJugador(jugador);
    fichasMesa.appendChild(fichaElemento);
    manoActual.push({ jugador, ficha, extremo });
    console.log(`Jugador ${jugador} coloca ${ficha} en el extremo ${extremo}`);
}

function obtenerColorJugador(jugador) {
    switch (jugador) {
        case 'yo': return 'blue';
        case 'derecha': return 'red';
        case 'frente': return 'green';
        case 'izquierda': return 'yellow';
        default: return 'black';
    }
}
