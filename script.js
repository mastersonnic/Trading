// script.js

// Variables globales
let allTiles = []; // Todas las fichas disponibles
let playerTiles = []; // Fichas del jugador (J1)
let selectedTiles = []; // Fichas seleccionadas por el jugador (J1) para jugar
let tableEnds = [null, null]; // Extremos de la mesa
let currentPlayer = null; // Jugador actual
let currentPlayerIndex = 0; // Índice del jugador actual
let passedTiles = { J2: [], J3: [], J4: [] }; // Fichas a las que han pasado los oponentes
let gameOver = false;

// Set a winning score for the game
const WINNING_SCORE = 100;

// Función para crear todas las fichas
function createAllTiles() {
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            allTiles.push([i, j]);
        }
    }
}

// Función para barajar y repartir fichas
function shuffleAndDealTiles() {
    // Barajar fichas
    allTiles.sort(() => Math.random() - 0.5);
    
    // Repartir fichas
    playerTiles = allTiles.slice(0, 7); // Jugador (J1)
    // Los otros jugadores recibirán fichas simuladas o pueden añadirse aquí
}

// Función para mostrar las fichas del jugador
function displayPlayerTiles() {
    let playerTilesContainer = document.getElementById('player-tiles');
    playerTilesContainer.innerHTML = '';
    
    playerTiles.forEach(tile => {
        let tileElement = document.createElement('div');
        tileElement.className = 'tile';
        tileElement.innerText = `${tile[0]} | ${tile[1]}`;
        playerTilesContainer.appendChild(tileElement);
    });
}

// Función para manejar el turno del jugador
function playMove(tileIndex, end) {
    if (tileIndex < 0 || tileIndex >= playerTiles.length) {
        alert('Índice de ficha inválido');
        return;
    }

    let tile = playerTiles[tileIndex];
    if (isTilePlayable(tile, end)) {
        updateTableEnds(tile, end);
        playerTiles.splice(tileIndex, 1); // Eliminar la ficha jugada de la mano del jugador
        updateBoardDisplay(tile, end);
        checkForGameOver();
    } else {
        alert('Esa ficha no es jugable en el extremo seleccionado');
    }
}

// Función para verificar si la ficha es jugable
function isTilePlayable(tile, end) {
    if (end === 'left') {
        return tile.includes(tableEnds[0]);
    } else if (end === 'right') {
        return tile.includes(tableEnds[1]);
    }
    return false;
}

// Función para actualizar los extremos de la mesa
function updateTableEnds(tile, end) {
    if (end === 'left') {
        tableEnds[0] = tile[0] === tableEnds[0] ? tile[1] : tile[0];
    } else if (end === 'right') {
        tableEnds[1] = tile[0] === tableEnds[1] ? tile[1] : tile[0];
    }
}

// Función para actualizar la visualización del tablero
function updateBoardDisplay(tile, end) {
    let board = document.getElementById('board');
    let tileElement = document.createElement('div');
    tileElement.className = 'tile';
    tileElement.innerText = `${tile[0]} | ${tile[1]}`;
    
    if (end === 'left') {
        board.insertBefore(tileElement, board.firstChild);
    } else {
        board.appendChild(tileElement);
    }

    document.getElementById('left-end').innerText = tableEnds[0];
    document.getElementById('right-end').innerText = tableEnds[1];
}

// Función para pasar el turno
function updateTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % 4;
    currentPlayer = `J${currentPlayerIndex + 1}`;
    // Simular la jugada del oponente si no es el jugador J1
    if (currentPlayer !== 'J1') {
        simulateOpponentMove();
    } else {
        suggestBestTileToPlay();
    }
}

// Función para sugerir la mejor ficha para jugar
function suggestBestTileToPlay() {
    // Lógica para sugerir la mejor ficha
    // Ejemplo de sugerencia:
    let bestTileIndex = 0; // Determinar según la estrategia
    alert(`Mejor ficha para jugar: ${playerTiles[bestTileIndex][0]} | ${playerTiles[bestTileIndex][1]}`);
}

// Function to simulate the tiles for opponents (J2, J3, J4)
function simulateOpponentTiles(player) {
    // Logic for simulating the opponent's tiles
    // You can expand this part to reflect the actual state of the game and the strategies of opponents
    return []; // Placeholder: Replace with actual logic
}

// Function to reset the game
document.getElementById('reset-game').onclick = function () {
    playerTiles = [];
    allTiles = [];
    selectedTiles = [];
    currentPlayer = null;
    currentPlayerIndex = 0;
    gameOver = false;

    document.getElementById('board').innerHTML = '';
    document.getElementById('player-tiles').innerHTML = '';
    document.getElementById('opponent-tiles').innerHTML = '';

    tableEnds = [null, null];
    document.getElementById('left-end').innerText = '?';
    document.getElementById('right-end').innerText = '?';

    passedTiles = { J2: [], J3: [], J4: [] };
    updatePassedTilesDisplay();

    createAllTiles();
    shuffleAndDealTiles();
    displayPlayerTiles();

    document.getElementById('move-options').style.display = 'block';
    suggestBestTileToPlay();
};

// Function to check for the end of the game
function checkForGameOver() {
    // Check if any player has no tiles left
    if (playerTiles.length === 0 || gameOver) {
        gameOver = true;
        declareWinner();
    } else if (passedTiles.J2.length >= 3 && passedTiles.J3.length >= 3 && passedTiles.J4.length >= 3) {
        // If all opponents have passed 3 times, the game is over
        gameOver = true;
        declareWinner();
    }
}

// Function to declare the winner and update the scores
function declareWinner() {
    let team1Score = calculateTeamScore(['J1', 'J3']);
    let team2Score = calculateTeamScore(['J2', 'J4']);

    if (team1Score < team2Score) {
        alert('¡El equipo 1 gana esta ronda!');
    } else if (team1Score > team2Score) {
        alert('¡El equipo 2 gana esta ronda!');
    } else {
        alert('¡Es un empate!');
    }

    // Actualizar los puntajes generales
    updateOverallScores(team1Score, team2Score);
}

// Función para calcular el puntaje de un equipo
function calculateTeamScore(team) {
    let score = 0;
    team.forEach(player => {
        score += getPlayerScore(player);
    });
    return score;
}

// Función para obtener el puntaje de un jugador
function getPlayerScore(player) {
    let tiles = getPlayerTiles(player);
    let score = 0;
    tiles.forEach(tile => {
        score += tile[0] + tile[1];
    });
    return score;
}

// Función para obtener las fichas de un jugador específico
function getPlayerTiles(player) {
    switch (player) {
        case 'J1':
            return playerTiles;
        case 'J2':
        case 'J3':
        case 'J4':
            return simulateOpponentTiles(player); // Esta función simula las fichas de los oponentes
        default:
            return [];
    }
}

// Función para actualizar los puntajes generales después de cada ronda
function updateOverallScores(team1Score, team2Score) {
    let currentTeam1Score = parseInt(document.getElementById('team1-score').innerText.split(' ')[2]);
    let currentTeam2Score = parseInt(document.getElementById('team2-score').innerText.split(' ')[2]);

    document.getElementById('team1-score').innerText = `Equipo 1: ${currentTeam1Score + team1Score}`;
    document.getElementById('team2-score').innerText = `Equipo 2: ${currentTeam2Score + team2Score}`;

    // Verificar si algún equipo ha alcanzado el puntaje ganador
    if ((currentTeam1Score + team1Score) >= WINNING_SCORE) {
        alert('¡El equipo 1 gana el juego!');
        resetGame();
    } else if ((currentTeam2Score + team2Score) >= WINNING_SCORE) {
        alert('¡El equipo 2 gana el juego!');
        resetGame();
    } else {
        // Si ningún equipo ha ganado, comenzar una nueva ronda
        resetRound();
    }
}

// Función para reiniciar la ronda sin reiniciar todo el juego
function resetRound() {
    // Restablecer las variables necesarias y comenzar una nueva ronda
playerTiles = [];
allTiles = [];
selectedTiles = [];
currentPlayer = null;
currentPlayerIndex = 0;
gameOver = false;

document.getElementById('board').innerHTML = '';
document.getElementById('player-tiles').innerHTML = '';
document.getElementById('opponent-tiles').innerHTML = '';

tableEnds = [null, null];
document.getElementById('left-end').innerText = '?';
document.getElementById('right-end').innerText = '?';

passedTiles = { J2: [], J3: [], J4: [] };
updatePassedTilesDisplay();

// Barajar y repartir las fichas nuevamente
createAllTiles();
shuffleAndDealTiles();
displayPlayerTiles();

document.getElementById('move-options').style.display = 'block';
suggestBestTileToPlay();

// Código adicional para manejar el final del juego, actualizar puntuaciones y más lógica compleja del juego

// Función para verificar si el juego ha terminado
function checkForGameOver() {
    // Verificar si algún jugador no tiene fichas restantes
    if (playerTiles.length === 0 || gameOver) {
        gameOver = true;
        declareWinner();
    } else if (passedTiles.J2.length >= 3 && passedTiles.J3.length >= 3 && passedTiles.J4.length >= 3) {
        // Si todos los oponentes han pasado 3 veces, el juego termina
        gameOver = true;
        declareWinner();
    }
}

// Función para declarar al ganador y actualizar las puntuaciones
function declareWinner() {
    let team1Score = calculateTeamScore(['J1', 'J3']);
    let team2Score = calculateTeamScore(['J2', 'J4']);

    if (team1Score < team2Score) {
        alert('¡El equipo 1 gana esta ronda!');
    } else if (team1Score > team2Score) {
        alert('¡El equipo 2 gana esta ronda!');
    } else {
        alert('¡Es un empate!');
    }

    // Actualizar las puntuaciones totales
    updateOverallScores(team1Score, team2Score);
}

// Función para calcular la puntuación de un equipo
function calculateTeamScore(team) {
    let score = 0;
    team.forEach(player => {
        score += getPlayerScore(player);
    });
    return score;
}

// Función para obtener la puntuación de un solo jugador
function getPlayerScore(player) {
    let tiles = getPlayerTiles(player);
    let score = 0;
    tiles.forEach(tile => {
        score += tile[0] + tile[1];
    });
    return score;
}

// Función para obtener las fichas de un jugador específico
function getPlayerTiles(player) {
    switch (player) {
        case 'J1':
            return playerTiles;
        case 'J2':
        case 'J3':
        case 'J4':
            return simulateOpponentTiles(player); // Esta función simula las fichas de los oponentes
        default:
            return [];
    }
}

// Función para actualizar las puntuaciones generales después de cada ronda
function updateOverallScores(team1Score, team2Score) {
    let currentTeam1Score = parseInt(document.getElementById('team1-score').innerText.split(' ')[2]);
    let currentTeam2Score = parseInt(document.getElementById('team2-score').innerText.split(' ')[2]);

    document.getElementById('team1-score').innerText = `Equipo 1: ${currentTeam1Score + team1Score}`;
    document.getElementById('team2-score').innerText = `Equipo 2: ${currentTeam2Score + team2Score}`;

    // Verificar si algún equipo ha alcanzado la puntuación ganadora
    if ((currentTeam1Score + team1Score) >= WINNING_SCORE) {
        alert('¡El equipo 1 gana el juego!');
        resetGame();
    } else if ((currentTeam2Score + team2Score) >= WINNING_SCORE) {
        alert('¡El equipo 2 gana el juego!');
        resetGame();
    } else {
        // Si ningún equipo ha ganado, comenzar una nueva ronda
        resetRound();
    }
}

// Función para restablecer la ronda sin restablecer todo el juego
function resetRound() {
    // Restablecer las variables necesarias y comenzar una nueva ronda
    playerTiles = [];
    allTiles = [];
    selectedTiles = [];
    currentPlayer = null;
    currentPlayerIndex = 0;
    gameOver = false;

    document.getElementById('board').innerHTML = '';
    document.getElementById('player-tiles').innerHTML = '';
    document.getElementById('opponent-tiles').innerHTML = '';

    tableEnds = [null, null];
    document.getElementById('left-end').innerText = '?';
    document.getElementById('right-end').innerText = '?';

    passedTiles = { J2: [], J3: [], J4: [] };
    updatePassedTilesDisplay();

    // Barajar y repartir las fichas nuevamente
    createAllTiles();
    shuffleAndDealTiles();
    displayPlayerTiles();

    document.getElementById('move-options').style.display = 'block';
    suggestBestTileToPlay();
}

// Función para simular las fichas de los oponentes (J2, J3, J4)
function simulateOpponentTiles(player) {
    // Lógica para simular las fichas de los oponentes
    // Puedes expandir esta parte para reflejar el estado actual del juego y las estrategias de los oponentes
    return []; // Placeholder: Reemplazar con lógica real
}

// Función para actualizar la visualización de las fichas pasadas
function updatePassedTilesDisplay() {
    document.getElementById('passed-tiles').innerText = `Fichas Pasadas: J2: ${passedTiles.J2.join(', ')}, J3: ${passedTiles.J3.join(', ')}, J4: ${passedTiles.J4.join(', ')}`;
}

// Establecer una puntuación ganadora para el juego
const WINNING_SCORE = 100;

// Función para restablecer todo el juego
function resetGame() {
    // Restablecer las variables y estados para iniciar un nuevo juego
    playerTiles = [];
    allTiles = [];
    selectedTiles = [];
    currentPlayer = null;
    currentPlayerIndex = 0;
    gameOver = false;

    document.getElementById('board').innerHTML = '';
    document.getElementById('player-tiles').innerHTML = '';
    document.getElementById('opponent-tiles').innerHTML = '';
    document.getElementById('team1-score').innerText = 'Equipo 1: 0';
    document.getElementById('team2-score').innerText = 'Equipo 2: 0';

    tableEnds = [null, null];
    document.getElementById('left-end').innerText = '?';
    document.getElementById('right-end').innerText = '?';

    passedTiles = { J2: [], J3: [], J4: [] };
    updatePassedTilesDisplay();

    // Barajar y repartir las fichas nuevamente
    createAllTiles();
    shuffleAndDealTiles();
    displayPlayerTiles();

    document.getElementById('move-options').style.display = 'block';
    suggestBestTileToPlay();
}

// Función para crear todas las fichas posibles
function createAllTiles() {
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            allTiles.push([i, j]);
        }
    }
}

// Función para barajar y repartir las fichas
function shuffleAndDealTiles() {
    allTiles = allTiles.sort(() => Math.random() - 0.5);
    playerTiles = allTiles.splice(0, 7);
    // Aquí puedes agregar lógica para repartir las fichas a los oponentes
}

// Función para mostrar las fichas del jugador
function displayPlayerTiles() {
    let tilesHTML = '';
    playerTiles.forEach((tile, index) => {
        tilesHTML += `<div class="tile" id="tile-${index}" onclick="selectTile(${index})">${tile[0]} | ${tile[1]}</div>`;
    });
    document.getElementById('player-tiles').innerHTML = tilesHTML;
}

// Función para sugerir la mejor ficha a jugar
function suggestBestTileToPlay() {
    // Aquí iría la lógica para sugerir la mejor ficha según las estrategias del juego
    // Mostrar la sugerencia al jugador
}

// Función para seleccionar una ficha (al hacer clic en ella)
function selectTile(index) {
    selectedTiles.push(playerTiles[index]);
    // Continuar la lógica para jugar la ficha seleccionada
}

// Inicializar el juego al cargar la página
resetGame();
