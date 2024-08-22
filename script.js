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
    let currentPlayer = 1;
    let playedTiles = [];
    let tableEnds = [];
    let team1Points = 0;
    let team2Points = 0;
    const players = { J1: [], J2: [], J3: [], J4: [] };
    const passedTiles = { J1: [], J2: [], J3: [], J4: [] };
    const opponentRepeatedEnds = [];
    const maxPoints = 100;

    const selectTilesContainer = document.querySelector('.select-tiles');
    const gameMessage = document.querySelector('.game-message');
    const playButton = document.getElementById('play');
    const passButton = document.getElementById('pass');
    const restartButton = document.getElementById('restart');
    const tableEndsContainer = document.querySelector('.table-ends');
    const opponentEndsContainer = document.querySelector('.opponent-ends');
    const handContainer = document.querySelector('.player-hand');
    const passedTilesContainer = document.querySelector('.passed-tiles');

    // Crear fichas para seleccionar
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
            alert("Debes seleccionar exactamente 7 fichas para comenzar.");
            return;
        }
        gameMessage.textContent = "Elige quién empieza.";
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
            trackOpponentEnds(tile);
        } else {
            alert("Movimiento no válido. La ficha no coincide con ninguno de los extremos.");
            return;
        }
        updateTableEnds();
        updatePlayerHand();
        nextTurn();
    }

    function nextTurn() {
        if (players.J1.length === 0 || players.J2.length === 0 || players.J3.length === 0 || players.J4.length === 0) {
            checkForWinner();
            return;
        }
        currentPlayer = currentPlayer < 4 ? currentPlayer + 1 : 1;
        gameMessage.textContent = `Turno de J${currentPlayer}`;
    }

    function passTurn() {
        passedTiles[`J${currentPlayer}`].push([...tableEnds]);
        updatePassedTiles();
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
        opponentRepeatedEnds.length = 0;
        gameMessage.textContent = "Selecciona tus 7 fichas.";
        selectTilesContainer.innerHTML = '';
        updateOpponentEnds();
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
            alert("¡El Equipo 1 gana!");
        } else if (team2Remaining === 0 || team2Points >= maxPoints) {
            alert("¡El Equipo 2 gana!");
        } else {
            alert(`El equipo ${team1Remaining < team2Remaining ? 1 : 2} gana por tener menos puntos.`);
        }
        restartGame();
    }

    function updateTableEnds() {
        tableEndsContainer.textContent = `Extremos de la mesa: ${tableEnds.join(' | ')}`;
    }

    function updatePassedTiles() {
        passedTilesContainer.innerHTML = '';
        Object.keys(passedTiles).forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.textContent = `${player}: ${passedTiles[player].map(e => e.join('|')).join(', ')}`;
            passedTilesContainer.appendChild(playerDiv);
        });
    }

    function trackOpponentEnds(tile) {
        const opponent = currentPlayer === 2 || currentPlayer === 4;
        if (opponent) {
            const tileEnds = [...tile];
            tileEnds.forEach(end => {
                const count = opponentRepeatedEnds.filter(e => e === end).length;
                if (count === 1) {
                    opponentRepeatedEnds.push(end);
                } else if (count > 1) {
                    opponentEndsContainer.textContent = `Extremos repetidos por el oponente: ${opponentRepeatedEnds.join(' | ')}`;
                }
            });
        }
    }

    function updateOpponentEnds() {
        opponentEndsContainer.textContent = `Extremos repetidos por el oponente: ${opponentRepeatedEnds.join(' | ')}`;
    }

    playButton.addEventListener('click', () => {
        const playableTiles = players[`J${currentPlayer}`].filter(tile => 
            tableEnds.length === 0 || tile.includes(tableEnds[0]) || tile.includes(tableEnds[1])
        );
        if (playableTiles.length === 0) {
            alert("No tienes fichas jugables. Pasa tu turno.");
            return;
        }
        const tileIndex = players[`J${currentPlayer}`].indexOf(playableTiles[0]);
        playTile(tileIndex);
    });

    passButton.addEventListener('click', passTurn);
    restartButton.addEventListener('click', restartGame);
});
