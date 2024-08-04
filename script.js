let manoActual = [];
let historialJugadas = [];
let mesa = [];

function guardarMano() {
    historialJugadas.push([...manoActual]);
    alert("Mano guardada");
}

function devolverUltimaJugada() {
    if (historialJugadas.length > 0) {
        manoActual = historialJugadas.pop();
        alert("Última jugada devuelta");
    } else {
        alert("No hay jugadas anteriores");
    }
}

function terminarMano() {
    manoActual = [];
    mesa = [];
    alert("Mano terminada");
}

function comenzarNuevaMano() {
    manoActual = [];
    historialJugadas = [];
    mesa = [];
    alert("Nueva mano comenzada");
}

function abrirManoGuardada() {
    if (historialJugadas.length > 0) {
        manoActual = historialJugadas[historialJugadas.length - 1];
        alert("Mano guardada abierta");
    } else {
        alert("No hay manos guardadas");
    }
}

function seleccionarFicha(jugador, ficha, extremo) {
    mesa.push({ jugador, ficha, extremo });
    actualizarMesa();
}

function actualizarMesa() {
    const mesaDiv = document.getElementById('mesa');
    mesaDiv.innerHTML = '';
    mesa.forEach(jugada => {
        const fichaDiv = document.createElement('div');
        fichaDiv.className = 'ficha';
        fichaDiv.innerText = `${jugada.ficha} (${jugada.jugador})`;
        fichaDiv.style.backgroundColor = obtenerColorJugador(jugada.jugador);
        mesaDiv.appendChild(fichaDiv);
    });
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

function determinarMejorFichaParaSalir(mano) {
    let mejorFicha = null;
    let maxPuntaje = -1;

    mano.forEach(ficha => {
        const [num1, num2] = ficha.split('-').map(Number);
        let puntaje = 0;

        if (num1 === num2) {
            puntaje += 2;
        }
        if (mano.filter(f => f.includes(num1)).length >= 3 || mano.filter(f => f.includes(num2)).length >= 3) {
            puntaje += 1;
        }
        if (puntaje > maxPuntaje) {
            maxPuntaje = puntaje;
            mejorFicha = ficha;
        }
    });

    return mejorFicha;
}

function determinarMejorFichaParaJugar(mano, mesa) {
    let mejorFicha = null;
    let maxPuntaje = -1;

    mano.forEach(ficha => {
        const [num1, num2] = ficha.split('-').map(Number);
        let puntaje = 0;

        // No jugar la salida de mi izquierda o mi derecha
        if (mesa.some(jugada => (jugada.jugador === 'izquierda' || jugada.jugador === 'derecha') && jugada.ficha === ficha)) {
            return;
        }

        // No jugar la ficha que han jugado más de dos veces
        if (mesa.filter(jugada => jugada.ficha === ficha).length > 2) {
            return;
        }

        // Jugar de las que tengo más fichas o números
        const num1Count = mano.filter(f => f.includes(num1)).length;
        const num2Count = mano.filter(f => f.includes(num2)).length;
        puntaje += Math.max(num1Count, num2Count);

        if (puntaje > maxPuntaje) {
            maxPuntaje = puntaje;
            mejorFicha = ficha;
        }
    });

    return mejorFicha;
}

// Ejemplo de cómo podrías llenar las listas desplegables y visores
document.getElementById('mi-tengo').innerHTML = generarOpcionesFichas();
document.getElementById('derecha-jugando').innerHTML = generarOpcionesFichas();
document.getElementById('frente-jugando').innerHTML = generarOpcionesFichas();
document.getElementById('izquierda-jugando').innerHTML = generarOpcionesFichas();

function generarOpcionesFichas() {
    let opciones = '';
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            opciones += `<option value="${i}-${j}">${i}-${j}</option>`;
        }
    }
    return opciones;
}
