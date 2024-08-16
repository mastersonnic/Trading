function inicializarJuego() {
    let fichas = [];
    for (let i = 0; i < 7; i++) {
        for (let j = i; j < 7; j++) {
            fichas.push([i, j]);
        }
    }
    fichas = fichas.sort(() => Math.random() - 0.5);
    return fichas;
}

function distribuirFichas(fichas) {
    let manos = [];
    for (let i = 0; i < 4; i++) {
        manos.push(fichas.splice(0, 7));
    }
    return manos;
}

function puedeJugar(ficha, extremos) {
    return ficha.includes(extremos[0]) || ficha.includes(extremos[1]);
}

function jugarFicha(ficha, extremos) {
    if (ficha[0] === extremos[0]) {
        return [[ficha[1], extremos[1]], "izquierdo"];
    } else if (ficha[1] === extremos[0]) {
        return [[ficha[0], extremos[1]], "izquierdo"];
    } else if (ficha[0] === extremos[1]) {
        return [[extremos[0], ficha[1]], "derecho"];
    } else if (ficha[1] === extremos[1]) {
        return [[extremos[0], ficha[0]], "derecho"];
    }
    return [extremos, null];
}

function calcularPuntos(mano) {
    return mano.reduce((total, ficha) => total + ficha[0] + ficha[1], 0);
}

function mostrarEstado(manos, mesa, extremos, jugadorActual) {
    let estado = `Turno del Jugador ${jugadorActual + 1}\n`;
    estado += `Mano: ${JSON.stringify(manos[jugadorActual])}\n`;
    estado += `Mesa: ${JSON.stringify(mesa)}\n`;
    estado += `Extremos: ${JSON.stringify(extremos)}\n\n`;
    document.getElementById('gameState').innerText += estado;
}

function estrategiaAvanzada(mano, extremos, jugadorActual) {
    let jugadasValidas = mano.filter(ficha => puedeJugar(ficha, extremos));
    if (jugadorActual === 1 || jugadorActual === 3) {
        jugadasValidas.sort((a, b) => (b[0] + b[1]) - (a[0] + a[1]));
    } else {
        jugadasValidas.sort((a, b) => (b[0] + b[1]) - (a[0] + a[1]));
    }
    return jugadasValidas[0] || null;
}

function jugarPartida() {
    let fichas = inicializarJuego();
    let manos = distribuirFichas(fichas);
    let mesa = [];
    let jugadorActual = Math.floor(Math.random() * 3) + 1;
    let fichaInicial = manos[jugadorActual].shift();
    mesa.push(fichaInicial);
    let extremos = fichaInicial;

    document.getElementById('gameState').innerText = `El Jugador ${jugadorActual + 1} inicia el juego con ${JSON.stringify(fichaInicial)}.\n\n`;

    while (true) {
        mostrarEstado(manos, mesa, extremos, jugadorActual);
        let fichaAJugar = estrategiaAvanzada(manos[jugadorActual], extremos, jugadorActual);
        if (fichaAJugar) {
            [extremos, lado] = jugarFicha(fichaAJugar, extremos);
            mesa.push(fichaAJugar);
            manos[jugadorActual] = manos[jugadorActual].filter(ficha => ficha !== fichaAJugar);
            document.getElementById('gameState').innerText += `El Jugador ${jugadorActual + 1} jugó ${JSON.stringify(fichaAJugar)} por el extremo ${lado}. Quedan los extremos ${JSON.stringify(extremos)}.\n\n`;
        } else {
            document.getElementById('gameState').innerText += `El Jugador ${jugadorActual + 1} pasa.\n\n`;
        }

        if (manos[jugadorActual].length === 0) {
            document.getElementById('gameState').innerText += `El Jugador ${jugadorActual + 1} se queda sin fichas. ¡Su equipo gana!\n\n`;
            return;
        }

        if (manos.every(mano => mano.every(ficha => !puedeJugar(ficha, extremos)))) {
            break;
        }

        jugadorActual = (jugadorActual + 1) % 4;
    }

    let puntosEquipo1 = calcularPuntos(manos[0]) + calcularPuntos(manos[2]);
    let puntosEquipo2 = calcularPuntos(manos[1]) + calcularPuntos(manos[3]);

    if (puntosEquipo1 < puntosEquipo2) {
        document.getElementById('gameState').innerText += "El equipo 1 gana por menor número de puntos.\n\n";
    } else {
        document.getElementById('gameState').innerText += "El equipo 2 gana por menor número de puntos.\n\n";
    }
}

document.getElementById('startGame').addEventListener('click', jugarPartida);
