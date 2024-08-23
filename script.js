// Variables globales
let playerTiles = [];
let allTiles = [];
let selectedTiles = [];
let currentPlayer = null;
let currentPlayerIndex = 0;
let gameOver = false;

let tableEnds = [null, null];
let passedTiles = { J2: [], J3: [], J4: [] };
let opponentExtremes = { left: 0, right: 0 };
const WINNING_SCORE = 100;
let teamScores = { team1: 0, team2: 0 };

// Crear todas las fichas posibles
function createAllTiles() {
    allTiles = [];
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            allTiles.push([i, j]);
        }
    }
}

// Barajar y repartir las fichas
function shuffleAndDealTiles() {
    allTiles = allTiles.sort(() => Math.random() - 0.5);
    playerTiles = allTiles.splice(0, 7);
    displayPlayerTiles();
}

// Mostrar las fichas del jugador
function displayPlayerTiles() {
    let tilesHTML = '';
    playerTiles.forEach((tile, index) => {
        tilesHTML += `<div class="tile" id="tile-${index}" onclick="selectTile(${index})">${tile[0]} | ${tile[1]}</div>`;
    });
    document.getElementById('player-tiles').innerHTML = tilesHTML;
}

// Iniciar el juego
function startGame() {
    resetRound();
    currentPlayer = document.getElementById('start-player').value;
    if (currentPlayer === 'J1') {
        suggestBestTileToPlay();
        suggestBestTileToStart();
    }
}

// Reiniciar el juego completo
function resetGame() {
    resetRound();
    teamScores = { team1: 0, team2: 0 };
    updateScores();
}

// Reiniciar la ronda
function resetRound() {
    playerTiles = [];
    allTiles = [];
    selectedTiles = [];
    currentPlayerIndex = 0;
    gameOver = false;
    tableEnds = [null, null];
    passedTiles = { J2: [], J3: [], J4: [] };
    opponentExtremes = { left: 0, right: 0 };
    document.getElementById('left-end').innerText = '?';
    document.getElementById('right-end').innerText = '?';
    document.getElementById('passed-tiles').innerText = 'J2: [], J3: [], J4: []';
    document.getElementById('opponent-extremes').innerText = '?';
    document.getElementById('mejor-ficha-jugar').innerText = '?';
    document.getElementById('mejor-ficha-salir').innerText = '?';

    createAllTiles();
    shuffleAndDealTiles();
}

// Función para cuando un jugador pasa
function passTurn() {
    passedTiles[currentPlayer].push('Pasó');
    updatePassedTilesDisplay();
    nextPlayer();
}

// Función para actualizar la visualización de las fichas pasadas
function updatePassedTilesDisplay() {
    document.getElementById('passed-tiles').innerText = `J2: ${passedTiles.J2.join(', ')}, J3: ${passedTiles.J3.join(', ')}, J4: ${passedTiles.J4.join(', ')}`;
}

// Función para sugerir la mejor ficha para jugar
function suggestBestTileToPlay() {
    let bestTile = playerTiles[0]; // Aquí puedes agregar la lógica para determinar la mejor ficha para jugar
    document.getElementById('mejor-ficha-jugar').innerText = bestTile ? `${bestTile[0]} | ${bestTile[1]}` : 'Ninguna';
}

// Función para sugerir la mejor ficha para salir
function suggestBestTileToStart() {
    let bestTile = playerTiles[0]; // Aquí puedes agregar la lógica para determinar la mejor ficha para salir
    document.getElementById('mejor-ficha-salir').innerText = bestTile ? `${bestTile[0]} | ${bestTile[1]}` : 'Ninguna';
}

// Función para seleccionar una ficha (al hacer clic en ella)
function selectTile(index) {
    selectedTiles.push(playerTiles[index]);
    // Lógica para jugar la ficha seleccionada
    playTile(index);
}

// Lógica para jugar una ficha seleccionada
function playTile(index) {
    let selectedTile = playerTiles[index];
    // Determinar si la ficha puede ser jugada en alguno de los extremos
    if (tableEnds[0] === null || tableEnds[1] === null) {
        // Es la primera jugada
        tableEnds[0] = selectedTile[0];
        tableEnds[1] = selectedTile[1];
    } else if (selectedTile[0] === tableEnds[0]) {
        tableEnds[0] = selectedTile[1];
    } else if (selectedTile[1] === tableEnds[0]) {
        tableEnds[0] = selectedTile[0];
    } else if (selectedTile[0] === tableEnds[1]) {
        tableEnds[1] = selectedTile[1];
    } else if (selectedTile[1] === tableEnds[1]) {
        tableEnds[1] = selectedTile[0];
    } else {
        alert('Esta ficha no puede ser jugada en los extremos actuales.');
        return;
    }
    
    // Eliminar la ficha jugada de las fichas del jugador
    playerTiles.splice(index, 1);
    displayPlayerTiles();
    updateTableEndsDisplay();
    suggestBestTileToPlay();
    nextPlayer();
}

// Mostrar los extremos actuales de la mesa
function updateTableEndsDisplay() {
    document.getElementById('left-end').innerText = tableEnds[0] !== null ? tableEnds[0] : '?';
    document.getElementById('right-end').innerText = tableEnds[1] !== null ? tableEnds[1] : '?';
}

// Pasar al siguiente jugador y esperar su acción
function nextPlayer() {
    const players = ['J1', 'J2', 'J3', 'J4'];
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    currentPlayer = players[currentPlayerIndex];
    
    // Esperar a que el usuario informe la acción del siguiente jugador
    alert(`Es el turno de ${currentPlayer}. Por favor, informa la jugada o si pasa.`);
}

// Función para manejar la acción del jugador actual
function handlePlayerAction(action, tile = null) {
    if (action === 'jugar') {
        playTile(tile);
    } else if (action === 'pasar') {
        passTurn();
    }
}

// Actualizar el marcador de los equipos
function updateScores() {
    document.getElementById('team1-score').innerText = teamScores.team1;
    document.getElementById('team2-score').innerText = teamScores.team2;
}
