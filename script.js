const fichas = [
    "0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6",
    "1-1", "1-2", "1-3", "1-4", "1-5", "1-6",
    "2-2", "2-3", "2-4", "2-5", "2-6",
    "3-3", "3-4", "3-5", "3-6",
    "4-4", "4-5", "4-6",
    "5-5", "5-6",
    "6-6"
];

let fichasMano = [];
let fichasDisponibles = [];
let extremosMesa = [];
let fichasJugadas = [];
let mejorSalida = [];
let mejorJugar = [];
let jugadores = ['J1', 'J2', 'J3', 'J4'];
let jugadorActual = null;
let turnoIndex = 0;

function setupGame() {
    const fichaList = document.getElementById('ficha-list');
    fichaList.innerHTML = fichas.map(ficha => `<button onclick="selectFicha('${ficha}')">${ficha}</button>`).join('');
}

function startGame() {
    if (fichasMano.length !== 7) {
        alert('Debes seleccionar 7 fichas para comenzar.');
        return;
    }
    fichasDisponibles = fichas.filter(ficha => !fichasMano.includes(ficha));
    document.getElementById('setup').style.display = 'none';
    document.getElementById('choose-start').style.display = 'block';
}

function setStarter(jugador) {
    jugadorActual = jugador;
    document.getElementById('choose-start').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    updateUI();
}

function updateUI() {
    document.getElementById('player-turn').textContent = `Turno de: ${jugadorActual}`;
    document.getElementById('fichas-seleccionadas').innerHTML = fichasMano.join(', ');
    document.getElementById('fichas-disponibles').innerHTML = fichasDisponibles.join(', ');
    document.getElementById('extremos-mesa').innerHTML = extremosMesa.join(', ');
    document.getElementById('mejor-salida').innerHTML = mejorSalida.join(', ');
    document.getElementById('mejor-jugar').innerHTML = mejorJugar.join(', ');
}

function selectFicha(ficha) {
    if (fichasMano.length < 7 && !fichasMano.includes(ficha)) {
        fichasMano.push(ficha);
        fichasDisponibles = fichas.filter(fichaDisponible => !fichasMano.includes(fichaDisponible));
        updateUI();
    }
}

function play() {
    if (!fichasMano.length) return;
    // Implementar lógica para jugar una ficha
    // Actualizar extremosMesa y fichasJugadas
    siguienteJugador();
}

function pass() {
    if (!fichasMano.length) return;
    // Implementar lógica para pasar turno
    siguienteJugador();
}

function reset() {
    document.getElementById('setup').style.display = 'block';
    document.getElementById('choose-start').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    fichasMano = [];
    fichasDisponibles = fichas.slice();
    extremosMesa = [];
    fichasJugadas = [];
    mejorSalida = [];
    mejorJugar = [];
    turnoIndex = 0;
    setupGame();
}

function siguienteJugador() {
    turnoIndex = (turnoIndex + 1) % jugadores.length;
    jugadorActual = jugadores[turnoIndex];
    updateUI();
}

// Inicializar el juego
setupGame();
