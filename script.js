// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    // Variables para almacenar el estado del juego
    let tiles = [];
    let currentPlayer = null;
    let players = ['J1', 'J2', 'J3', 'J4'];
    let passedTiles = {
        'J1': [],
        'J2': [],
        'J3': [],
        'J4': []
    };
    let placedEnds = {
        'J1': [],
        'J2': [],
        'J3': [],
        'J4': []
    };
    let teamScores = { 'Team1': 0, 'Team2': 0 };
    let currentEnds = [];
    let tileCounts = { 'J1': 0, 'J2': 0, 'J3': 0, 'J4': 0 };
    let selectedTiles = [];
    let bestTileToExit = null;
    let bestTileToPlay = null;
    let isGameActive = true;

    // Referencias a los elementos del DOM
    const tilesContainer = document.querySelector('.domino-container');
    const whoStartsList = document.querySelector('#whoStartsList');
    const playList = document.querySelector('#playList');
    const passButtons = {
        'J1': document.querySelector('#passJ1'),
        'J2': document.querySelector('#passJ2'),
        'J3': document.querySelector('#passJ3'),
        'J4': document.querySelector('#passJ4')
    };
    const switchButtons = {
        'J1': document.querySelector('#switchJ1'),
        'J2': document.querySelector('#switchJ2'),
        'J3': document.querySelector('#switchJ3'),
        'J4': document.querySelector('#switchJ4'),
        'myTiles': document.querySelector('#switchMyTiles')
    };
    const resetButton = document.querySelector('.reset');
    const bestTileExitCell = document.querySelector('#bestTileToExit');
    const bestTilePlayCell = document.querySelector('#bestTileToPlay');
    const currentEndsCell = document.querySelector('#currentEnds');
    const scoreCells = {
        'Team1': document.querySelector('#scoreTeam1'),
        'Team2': document.querySelector('#scoreTeam2')
    };

    // Generar fichas de dominó
    function generateTiles() {
        tiles = [];
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                tiles.push({ left: i, right: j });
            }
        }
        renderTiles();
    }

    // Renderizar fichas de dominó en la interfaz
    function renderTiles() {
        tilesContainer.innerHTML = '';
        tiles.forEach(tile => {
            const tileDiv = document.createElement('div');
            tileDiv.className = 'domino-tile';
            tileDiv.innerHTML = `${tile.left} | ${tile.right}`;
            tileDiv.addEventListener('click', () => {
                handleTileClick(tile);
            });
            tilesContainer.appendChild(tileDiv);
        });
    }

    // Manejar clic en una ficha de dominó
    function handleTileClick(tile) {
        if (selectedTiles.length < 7 && !selectedTiles.includes(tile)) {
            selectedTiles.push(tile);
            updateSelectedTilesDisplay();
        }
    }

    // Actualizar la visualización de las fichas seleccionadas
    function updateSelectedTilesDisplay() {
        const selectedTilesDisplay = document.querySelector('#selectedTilesDisplay');
        selectedTilesDisplay.innerHTML = selectedTiles.map(tile => `${tile.left} | ${tile.right}`).join('<br>');
        updateBestTiles();
    }

    // Actualizar la mejor ficha para salir y jugar
    function updateBestTiles() {
        // Ejemplo simplificado, agregar lógica real aquí
        bestTileToExit = selectedTiles[0];
        bestTileToPlay = selectedTiles[1] || bestTileToExit;
        bestTileExitCell.innerHTML = bestTileToExit ? `${bestTileToExit.left} | ${bestTileToExit.right}` : 'N/A';
        bestTilePlayCell.innerHTML = bestTileToPlay ? `${bestTileToPlay.left} | ${bestTileToPlay.right}` : 'N/A';
    }

    // Manejar el cambio de quién sale
    whoStartsList.addEventListener('change', (event) => {
        currentPlayer = event.target.value;
        updateCurrentPlayer();
    });

    // Actualizar el jugador actual
    function updateCurrentPlayer() {
        if (currentPlayer) {
            // Implementar lógica específica para actualizar el jugador actual
        }
    }

    // Manejar los botones de pase
    Object.keys(passButtons).forEach(player => {
        passButtons[player].addEventListener('click', () => {
            if (currentPlayer) {
                handlePass(player);
            }
        });
    });

    // Manejar el pase de un jugador
    function handlePass(player) {
        if (isGameActive) {
            // Implementar lógica para manejar el pase
            passedTiles[player].push(...selectedTiles);
            selectedTiles = [];
            updateSelectedTilesDisplay();
            moveToNextPlayer();
        }
    }

    // Mover al siguiente jugador
    function moveToNextPlayer() {
        const currentIndex = players.indexOf(currentPlayer);
        const nextIndex = (currentIndex + 1) % players.length;
        currentPlayer = players[nextIndex];
        updateCurrentPlayer();
    }

    // Manejar el botón de reinicio
    resetButton.addEventListener('click', () => {
        resetGame();
    });

    // Reiniciar el juego
    function resetGame() {
        tiles = [];
        selectedTiles = [];
        passedTiles = { 'J1': [], 'J2': [], 'J3': [], 'J4': [] };
        placedEnds = { 'J1': [], 'J2': [], 'J3': [], 'J4': [] };
        teamScores = { 'Team1': 0, 'Team2': 0 };
        currentEnds = [];
        tileCounts = { 'J1': 0, 'J2': 0, 'J3': 0, 'J4': 0 };
        bestTileToExit = null;
        bestTileToPlay = null;
        isGameActive = true;
        generateTiles();
    }

    // Inicializar el juego
    generateTiles();
    updateCurrentPlayer();
});
