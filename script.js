// Variables globales
let dominoTiles = [];
let playerHands = [[], [], [], []];
let selectedTiles = [];
let tilesOnTable = [];
let currentPlayer = 0;

// Función para inicializar el juego
function initializeGame() {
    dominoTiles = generateDominoTiles();
    shuffleTiles(dominoTiles);
    dealTiles();
    updateBoard();
    displayMessage('Elige quién sale:');
    setupPlayerSelection();
}

// Función para generar las 28 fichas de dominó
function generateDominoTiles() {
    let tiles = [];
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            tiles.push([i, j]);
        }
    }
    return tiles;
}

// Función para mezclar las fichas de dominó
function shuffleTiles(tiles) {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

// Función para repartir las fichas entre los jugadores
function dealTiles() {
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 4; j++) {
            playerHands[j].push(dominoTiles.pop());
        }
    }
}

// Función para configurar la selección del jugador que sale
function setupPlayerSelection() {
    const playerSelectionContainer = document.getElementById('player-selection');
    playerSelectionContainer.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
        const button = document.createElement('button');
        button.textContent = `Jugador ${i}`;
        button.value = i;
        button.addEventListener('click', handlePlayerSelection);
        playerSelectionContainer.appendChild(button);
    }
}

// Función para manejar los clics en las fichas de la mano
function handleTileClick(event) {
    const tileIndex = parseInt(event.target.getAttribute('data-index'));
    if (selectedTiles.includes(tileIndex)) {
        selectedTiles = selectedTiles.filter(index => index !== tileIndex);
    } else if (selectedTiles.length < 7) {
        selectedTiles.push(tileIndex);
    }
    updateSelectedTiles();
}

// Función para actualizar la visualización de las fichas seleccionadas
function updateSelectedTiles() {
    const selectedTilesContainer = document.getElementById('selected-tiles');
    selectedTilesContainer.innerHTML = '';
    selectedTiles.forEach(index => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('domino-tile');
        tileElement.textContent = `${dominoTiles[index][0]}|${dominoTiles[index][1]}`;
        selectedTilesContainer.appendChild(tileElement);
    });
}

// Función para manejar la selección de quién sale
function handlePlayerSelection(event) {
    const selectedPlayer = event.target.value;
    currentPlayer = selectedPlayer - 1;

    if (currentPlayer === 0) {
        displayMessage('Selecciona una ficha para salir');
        const playableTiles = getPlayableTiles();
        displayTileOptions(playableTiles, handleTileSelectionForPlay);
    } else {
        displayMessage(`Jugador ${selectedPlayer} sale con ficha:`);
        const availableTiles = getAvailableTiles();
        displayTileOptions(availableTiles, handleTileSelectionForPlay);
    }
}

// Función para obtener las fichas disponibles
function getAvailableTiles() {
    const availableTiles = [];
    for (let i = 0; i < dominoTiles.length; i++) {
        if (!tilesOnTable.includes(i) && !selectedTiles.includes(i)) {
            availableTiles.push(i);
        }
    }
    return availableTiles;
}

// Función para manejar la selección de fichas para jugar
function handleTileSelectionForPlay(tileIndex) {
    tilesOnTable.push(tileIndex);
    updateBoard();
    currentPlayer = (currentPlayer + 1) % 4;

    if (currentPlayer === 0) {
        const playableTiles = getPlayableTiles();
        if (playableTiles.length > 0) {
            displayTileOptions(playableTiles, handleTileSelectionForPlay);
        } else {
            passTurn();
        }
    } else {
        const availableTiles = getAvailableTiles();
        displayTileOptions(availableTiles, handleTileSelectionForPlay);
    }
}

// Función para obtener las fichas jugables
function getPlayableTiles() {
    if (tilesOnTable.length === 0) {
        return selectedTiles;
    } else {
        const leftEnd = dominoTiles[tilesOnTable[0]][0];
        const rightEnd = dominoTiles[tilesOnTable[tilesOnTable.length - 1]][1];
        return selectedTiles.filter(index => 
            dominoTiles[index][0] === leftEnd || dominoTiles[index][1] === leftEnd ||
            dominoTiles[index][0] === rightEnd || dominoTiles[index][1] === rightEnd
        );
    }
}

// Función para mostrar opciones de fichas
function displayTileOptions(tiles, callback) {
    const tileOptionsContainer = document.getElementById('tile-options');
    tileOptionsContainer.innerHTML = '';
    tiles.forEach(index => {
        const tileElement = document.createElement('button');
        tileElement.classList.add('domino-tile');
        tileElement.textContent = `${dominoTiles[index][0]}|${dominoTiles[index][1]}`;
        tileElement.addEventListener('click', () => callback(index));
        tileOptionsContainer.appendChild(tileElement);
    });
}

// Función para pasar el turno
function passTurn() {
    currentPlayer = (currentPlayer + 1) % 4;
    if (currentPlayer === 0) {
        const playableTiles = getPlayableTiles();
        if (playableTiles.length > 0) {
            displayTileOptions(playableTiles, handleTileSelectionForPlay);
        } else {
            passTurn();
        }
    } else {
        const availableTiles = getAvailableTiles();
        displayTileOptions(availableTiles, handleTileSelectionForPlay);
    }
}

// Función para actualizar la visualización del tablero
function updateBoard() {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';
    tilesOnTable.forEach(index => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('domino-tile');
        tileElement.textContent = `${dominoTiles[index][0]}|${dominoTiles[index][1]}`;
        boardContainer.appendChild(tileElement);
    });

    updateScore();
    updatePlayableTiles();
}

// Función para actualizar la visualización de los extremos jugables
function updatePlayableTiles() {
    if (tilesOnTable.length > 0) {
        const leftEnd = dominoTiles[tilesOnTable[0]][0];
        const rightEnd = dominoTiles[tilesOnTable[tilesOnTable.length - 1]][1];
        document.getElementById('playable-ends').textContent = `Extremos jugables: ${leftEnd}, ${rightEnd}`;
    } else {
        document.getElementById('playable-ends').textContent = '';
    }
}

// Función para actualizar el puntaje de los equipos
function updateScore() {
    const team1Score = calculateTeamScore([0, 2]); // J1 y J3
    const team2Score = calculateTeamScore([1, 3]); // J2 y J4

    document.getElementById('team1-score').textContent = `Equipo 1: ${team1Score} puntos`;
    document.getElementById('team2-score').textContent = `Equipo 2: ${team2Score} puntos`;

    if (team1Score >= 100 || team2Score >= 100) {
        displayMessage(`¡El equipo ${team1Score >= 100 ? 1 : 2} ha ganado el juego!`);
        document.getElementById('menu-restart').style.display = 'block';
    }
}

// Función para calcular el puntaje de un equipo
function calculateTeamScore(players) {
    let score = 0;
    players.forEach(player => {
        score += playerHands[player].reduce((sum, index) => sum + dominoTiles[index][0] + dominoTiles[index][1], 0);
    });
    return score;
}

// Función para mostrar un mensaje en la interfaz
function displayMessage(message) {
    document.getElementById('message').textContent = message;
}

// Inicialización del juego al cargar la página
window.onload = () => {
    initializeGame();
};
