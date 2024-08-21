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
let fichaElegida = '';
let jugadores = ['J1', 'J2', 'J3', 'J4'];
let jugadorActual = '';
let turno = 0;
let puntosEquipo1 = 0;
let puntosEquipo2 = 0;
const puntosGanador = 100;

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
    if (jugadorActual === 'J1') {
        const index = manoJ1.indexOf(ficha);
        if (index > -1) {
            manoJ1.splice(index, 1);
        } else if (manoJ1.length < 7) {
            manoJ1.push(ficha);
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
    updateTurn();
}

function updateTurn() {
    const currentTurnElement = document.getElementById('current-turn');
    currentTurnElement.textContent = `Turno de ${jugadorActual}`;
    updateBestPlay();
}

function play() {
    // Implement play logic
    if (jugadorActual === 'J1') {
        // J1 juega
        alert('Elige una ficha para jugar');
        // Implement logic to play the selected ficha
        // For example, remove ficha from manoJ1 and add to fichasMesa
        // Update extremos
        // Check game status
        siguienteTurno();
    } else {
        // Other players' turns to play
        // Example placeholder implementation
        alert('El jugador actual juega');
        siguienteTurno();
    }
}

function pass() {
    // Implement pass logic
    alert(`${jugadorActual} pasa su turno`);
    siguienteTurno();
}

function restart() {
    // Implement restart logic
    manoJ1 = [];
    manoJ2 = [];
    manoJ3 = [];
    manoJ4 = [];
    fichasMesa = [];
    extremos = [];
    turno = 0;
    puntosEquipo1 = 0;
    puntosEquipo2 = 0;
    initializeFichas();
    showPlayerSelection();
}

function siguienteTurno() {
    turno = (turno + 1) % 4;
    jugadorActual = jugadores[turno];
    updateTurn();
}

function updateBestPlay() {
    // Implement logic to update the best ficha to play
    const bestPlayElement = document.getElementById('best-play');
    bestPlayElement.innerHTML = 'Mejor ficha para jugar: <br> Actualizar con lógica basada en las fichas de mano y los extremos';
}

function updateGameStatus() {
    // Implement logic to update the game status
    const fichasPasadasElement = document.getElementById('fichas-pasadas');
    fichasPasadasElement.innerHTML = 'Fichas pasadas: <br> Actualizar con las fichas pasadas por cada jugador';

    const fichasJugadasElement = document.getElementById('fichas-jugadas');
    fichasJugadasElement.innerHTML = 'Fichas jugadas: <br> Actualizar con las fichas jugadas en la mesa';

    const turnHistoryElement = document.getElementById('turn-history');
    turnHistoryElement.innerHTML = 'Historial de turnos: <br> Actualizar con el historial de jugadas y pases';
}

function checkGameEnd() {
    // Implement game end logic
    // Check if any player has won or if the game is blocked
    const winner = determineWinner();
    if (winner) {
        alert(`Juego terminado. Ganador: ${winner}`);
        restart();
    }
}

function determineWinner() {
    // Implement logic to determine the winner
    // Check if a player has no fichas or if a team reaches 100 points
    // Example placeholder implementation
    if (puntosEquipo1 >= puntosGanador) {
        return 'Equipo 1';
    } else if (puntosEquipo2 >= puntosGanador) {
        return 'Equipo 2';
    }
    return null;
}

// Inicializa las fichas al principio
initializeFichas();
