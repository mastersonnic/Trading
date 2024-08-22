document.addEventListener('DOMContentLoaded', () => {
    const dominoes = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
        [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
        [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
        [3, 3], [3, 4], [3, 5], [3, 6],
        [4, 4], [4, 5], [4, 6],
        [5, 5], [5, 6],
        [6, 6]
    ];

    let selectedTiles = [];
    let turn = 0;
    let currentPlayer = 1;
    let playedTiles = [];
    let tableEnds = [];
    let team1Points = 0;
    let team2Points = 0;
    const players = { J1: [], J2: [], J3: [], J4: [] };
    const maxPoints = 100;

    const selectTilesContainer = document.querySelector('.select-tiles');
    const gameMessage = document.querySelector('.game-message');
    const playButton = document.getElementById('play');
    const passButton = document.getElementById('pass');
    const restartButton = document.getElementById('restart');

    // Create tiles for selection
    dominoes.forEach((tile, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('domino-tile');
        tileDiv.textContent = `${tile[0]}|${tile[1]}`;
        tileDiv.dataset.index = index;
        tileDiv.addEventListener('click', () => selectTile(index, tileDiv));
        selectTilesContainer.appendChild(tileDiv);
    });

    function selectTile(index, tileDiv) {
        if (selectedTiles.length < 7 && !selectedTiles.includes(index)) {
            selectedTiles.push(index);
            tileDiv.classList.add('selected');
        } else if (selectedTiles.includes(index)) {
            selectedTiles = selectedTiles.filter(i => i !== index);
            tileDiv.classList.remove('selected');
        }
        players.J1 = selectedTiles.map(i => dominoes[i]);
        updatePlayerHand();
    }

    function updatePlayerHand() {
        const handContainer = document.querySelector('.player-hand');
        handContainer.innerHTML = '';
        players.J1.forEach(tile => {
            const tileDiv = document.createElement('div');
            tileDiv.classList.add('domino-tile');
            tileDiv.textContent = `${tile[0]}|${tile[1]}`;
            handContainer.appendChild(tileDiv);
        });
    }

    function startGame() {
        if (players.J1.length !== 7) {
            alert("You must select exactly 7 tiles to start.");
            return;
        }
        gameMessage.textContent = "Choose who starts.";
        selectTilesContainer.innerHTML = '';
    }

    function playTile(tileIndex) {
        const tile = players[`J${currentPlayer}`][tileIndex];
        if (tableEnds.length === 0) {
            tableEnds = [...tile];
        } else if (tile.includes(tableEnds[0]) || tile.includes(tableEnds[1])) {
            if (tile.includes(tableEnds[0])) {
                tableEnds[0] = tile[0] === tableEnds[0] ? tile[1] : tile[0];
            } else {
                tableEnds[1] = tile[0] === tableEnds[1] ? tile[1] : tile[0];
            }
            playedTiles.push(tile);
            players[`J${currentPlayer}`].splice(tileIndex, 1);
        } else {
            alert("Invalid move. Tile does not match either end.");
            return;
        }
        updatePlayerHand();
        nextTurn();
    }

    function nextTurn() {
        if (players.J1.length === 0 || players.J2.length === 0 || players.J3.length === 0 || players.J4.length === 0) {
            checkForWinner();
            return;
        }
        currentPlayer = currentPlayer < 4 ? currentPlayer + 1 : 1;
        gameMessage.textContent = `Turn of J${currentPlayer}`;
    }

    function passTurn() {
        nextTurn();
    }

    function restartGame() {
        selectedTiles = [];
        players.J1 = [];
        players.J2 = [];
        players.J3 = [];
        players.J4 = [];
        playedTiles = [];
        tableEnds = [];
        currentPlayer = 1;
        gameMessage.textContent = "Select your 7 tiles.";
        selectTilesContainer.innerHTML = '';
        dominoes.forEach((tile, index) => {
            const tileDiv = document.createElement('div');
            tileDiv.classList.add('domino-tile');
            tileDiv.textContent = `${tile[0]}|${tile[1]}`;
            tileDiv.dataset.index = index;
            tileDiv.addEventListener('click', () => selectTile(index, tileDiv));
            selectTilesContainer.appendChild(tileDiv);
        });
    }

    function checkForWinner() {
        const team1Remaining = players.J1.length + players.J3.length;
        const team2Remaining = players.J2.length + players.J4.length;
        if (team1Remaining === 0 || team1Points >= maxPoints) {
            alert("Team 1 wins!");
        } else if (team2Remaining === 0 || team2Points >= maxPoints) {
            alert("Team 2 wins!");
        } else {
            alert(`Team ${team1Remaining < team2Remaining ? 1 : 2} wins by fewest points.`);
        }
        restartGame();
    }

    playButton.addEventListener('click', () => {
        const playableTiles = players[`J${currentPlayer}`].filter(tile => 
            tableEnds.length === 0 || tile.includes(tableEnds[0]) || tile.includes(tableEnds[1])
        );
        if (playableTiles.length === 0) {
            alert("No playable tiles. Pass your turn.");
            return;
        }
        const tileIndex = players[`J${currentPlayer}`].indexOf(playableTiles[0]);
        playTile(tileIndex);
    });

    passButton.addEventListener('click', passTurn);
    restartButton.addEventListener('click', restartGame);
});
