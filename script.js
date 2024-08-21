// Fichas de dominó
const fichas = [
    '0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6',
    '1-1', '1-2', '1-3', '1-4', '1-5', '1-6',
    '2-2', '2-3', '2-4', '2-5', '2-6',
    '3-3', '3-4', '3-5', '3-6',
    '4-4', '4-5', '4-6',
    '5-5', '5-6',
    '6-6'
];

let manoJ1 = [];
let manoJ2 = [];
let manoJ3 = [];
let manoJ4 = [];
let fichasMesa = [];
let extremos = [];
let jugadorActual = '';
let jugadores = ['J1', 'J2', 'J3', 'J4'];
let turno = 0;
let puntosEquipo1 = 0;
let puntosEquipo2 = 0;
const puntosGanador = 100;
let juegoEnCurso = false;

// Inicialización de fichas
function initializeFichas() {
    const listaFichas = document.getElementById('fichas-list');
    listaFichas.innerHTML = '';

    fichas.forEach(ficha => {
        const fichaElement = document.createElement('div');
        fichaElement.classList.add('ficha');
        fichaElement.textContent = ficha;
        fichaElement.onclick = () => toggleFicha(ficha);
        listaFichas.appendChild(fichaElement);
    });
}

function toggleFicha(ficha) {
    if (!juegoEnCurso) return;  // No se puede seleccionar fichas si el juego no está en curso
    if (jugadorActual === 'J1') {
        const index = manoJ1.indexOf(ficha);
        if (index > -1) {
            manoJ1.splice(index, 1); // Remover ficha si ya está seleccionada
        } else if (manoJ1.length < 7) {
            manoJ1.push(ficha); // Añadir ficha si aún no se seleccionó
        }
        updateHandDisplay();
    }
}

function updateHandDisplay() {
    const handList = document.getElementById('hand-list');
    handList.innerHTML = '';

    manoJ1.forEach(ficha => {
        const fichaElement = document.createElement('div');
        fichaElement.classList.add('ficha');
        fichaElement.textContent = ficha;
        handList.appendChild(fichaElement);
    });

    if (manoJ1.length === 7) {
        document.getElementById('hand-list').style.display = 'block';
        showPlayerSelection();
    }
}

function showPlayerSelection() {
    document.getElementById('initial-selection').style.display = 'none';
    document.getElementById('player-selection').style.display = 'block';
}

function setStartingPlayer(player) {
    jugadorActual = jugadores[player - 1];
    document.getElementById('player-selection').style.display = 'none';
    document.getElementById('gameplay').style.display = 'block';
    juegoEnCurso = true;
    updateTurn();
}

function updateTurn() {
    const currentTurnElement = document.getElementById('current-turn');
    currentTurnElement.textContent = `Turno de ${jugadorActual}`;
    updateBestPlay();
}

function play(ficha) {
    if (!juegoEnCurso) return;
    if (jugadorActual === 'J1') {
        // Lógica para cuando J1 juega
        if (manoJ1.includes(ficha)) {
            manoJ1 = manoJ1.filter(f => f !== ficha); // Quitar ficha de mano
            fichasMesa.push(ficha); // Agregar ficha a la mesa
            updateExtremos();
            updateHandDisplay();
            siguienteTurno();
        } else {
            alert('Ficha no disponible en tu mano.');
        }
    } else {
        // Lógica para otros jugadores
        // Placeholder: Solo para demostración
        alert('El jugador actual juega');
        siguienteTurno();
    }
}

function pass() {
    if (!juegoEnCurso) return;
    alert(`${jugadorActual} pasa su turno`);
    siguienteTurno();
}

function restart() {
    manoJ1 = [];
    manoJ2 = [];
    manoJ3 = [];
    manoJ4 = [];
    fichasMesa = [];
    extremos = [];
    turno = 0;
    puntosEquipo1 = 0;
    puntosEquipo2 = 0;
    juegoEnCurso = false;
    initializeFichas();
    showPlayerSelection();
}

function siguienteTurno() {
    if (jugadorActual === 'J1' && manoJ1.length === 0) {
        // J1 ya salió, pasa turno a J2
        turno = (turno + 1) % 4;
    }
    jugadorActual = jugadores[turno];
    updateTurn();
}

function updateBestPlay() {
    const bestPlayElement = document.getElementById('best-play');
    bestPlayElement.innerHTML = 'Mejor ficha para jugar: <br> Actualizar con lógica basada en las fichas de mano y los extremos';
}

function updateExtremos() {
    // Actualizar los extremos actuales de la mesa
    if (fichasMesa.length > 0) {
        extremos = [fichasMesa[0].split('-')[0], fichasMesa[fichasMesa.length - 1].split('-')[1]];
    } else {
        extremos = [];
    }
    document.getElementById('extremos').textContent = `Extremos actuales: ${extremos.join(' - ')}`;
}

function updateGameStatus() {
    // Implementar actualización del estado del juego
}

function checkGameEnd() {
    // Implementar lógica para determinar el fin del juego
}

function determineWinner() {
    // Implementar lógica para determinar el ganador
}

// Inicializa las fichas al principio
initializeFichas();
