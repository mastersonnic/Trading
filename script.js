document.addEventListener('DOMContentLoaded', () => {
    const tiles = generateTiles();
    let playerHand = [];
    let board = [];
    let leftEnd = null;
    let rightEnd = null;
    let currentPlayer = 'J1';
    let gameStarted = false;

    const playerTilesContainer = document.getElementById('player-tiles');
    const boardTilesContainer = document.getElementById('board-tiles');
    const leftEndElement = document.getElementById('left-end');
    const rightEndElement = document.getElementById('right-end');
    const logContent = document.getElementById('log-content');
    
    const btnStart = document.getElementById('btn-start');
    const btnPlay = document.getElementById('btn-play');
    const btnPass = document.getElementById('btn-pass');
    const btnRestart = document.getElementById('btn-restart');

    btnStart.addEventListener('click', startGame);
    btnPlay.addEventListener('click', playTile);
    btnPass.addEventListener('click', passTurn);
    btnRestart.addEventListener('click', restartGame);

    function startGame() {
        if (!gameStarted) {
            playerHand = selectPlayerTiles();
            renderPlayerHand();
            log('J1, select a tile to start the game.');
            gameStarted = true;
            btnPlay.disabled = false;
            btnPass.disabled = false;
            btnStart.disabled = true;
        }
    }

    function playTile() {
        const selectedTile = getSelectedTile();
        if (selectedTile) {
            board.push(selectedTile);
            updateBoardEnds(selectedTile);
            renderBoard();
            renderPlayerHand();
            log(`${currentPlayer} played ${tileToString(selectedTile)}`);
            if (playerHand.length === 0) {
                endGame(`${currentPlayer} has no more tiles. ${getCurrentTeam()} wins!`);
            } else {
                switchPlayer();
            }
        }
    }

    function passTurn() {
        log(`${currentPlayer} passed.`);
        switchPlayer();
    }

    function restartGame() {
        playerHand = [];
        board = [];
        leftEnd = null;
        rightEnd = null;
        currentPlayer = 'J1';
        gameStarted = false;
        playerTilesContainer.innerHTML = '';
        boardTilesContainer.innerHTML = '';
        leftEndElement.innerHTML = '';
        rightEndElement.innerHTML = '';
        logContent.innerHTML = '';
        btnPlay.disabled = true;
        btnPass.disabled = true;
        btnStart.disabled = false;
    }

    function switchPlayer() {
        if (currentPlayer === 'J1') {
            currentPlayer = 'J2';
        } else if (currentPlayer === 'J2') {
            currentPlayer = 'J3';
        } else if (currentPlayer === 'J3') {
            currentPlayer = 'J4';
        } else if (currentPlayer === 'J4') {
            currentPlayer = 'J1';
        }
        log(`It's ${currentPlayer}'s turn.`);
    }

    function updateBoardEnds(tile) {
        if (leftEnd === null && rightEnd === null) {
            leftEnd = tile[0];
            rightEnd = tile[1];
        } else {
            if (tile.includes(leftEnd)) {
                leftEnd = tile[0] === leftEnd ? tile[1] : tile[0];
            } else if (tile.includes(rightEnd)) {
                rightEnd = tile[0] === rightEnd ? tile[1] : tile[0];
            }
        }
        leftEndElement.innerHTML = leftEnd;
        rightEndElement.innerHTML = rightEnd;
    }

    function renderPlayerHand() {
        playerTilesContainer.innerHTML = '';
        playerHand.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            tileElement.dataset.index = index;
            tileElement.innerHTML = tileToString(tile);
            tileElement.addEventListener('click', () => selectTile(index));
            playerTilesContainer.appendChild(tileElement);
        });
    }

    function renderBoard() {
        boardTilesContainer.innerHTML = '';
        board.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            tileElement.innerHTML = tileToString(tile);
            boardTilesContainer.appendChild(tileElement);
        });
    }

    function log(message) {
        const logEntry = document.createElement('p');
        logEntry.innerHTML = message;
        logContent.appendChild(logEntry);
        logContent.scrollTop = logContent.scrollHeight;
    }

    function endGame(message) {
        log(message);
        btnPlay.disabled = true;
        btnPass.disabled = true;
    }

    function selectTile(index) {
        const selectedTileElement = document.querySelector(`.tile[data-index="${index}"]`);
        selectedTileElement.classList.toggle('selected');
    }

    function getSelectedTile() {
        const // Continuación del script.js

selectedTileElement = document.querySelector('.tile.selected');
if (!selectedTileElement) return;

const selectedTile = selectedTileElement.dataset.index;
const index = selectedTiles.indexOf(selectedTile);

if (index === -1) {
  // Si la ficha no está seleccionada, la agregamos
  if (selectedTiles.length < 7) {
    selectedTiles.push(selectedTile);
    selectedTileElement.classList.add('selected');
  } else {
    alert('Solo puedes seleccionar 7 fichas.');
  }
} else {
  // Si la ficha ya está seleccionada, la quitamos
  selectedTiles.splice(index, 1);
  selectedTileElement.classList.remove('selected');
}

updateSelectedTiles();
}

// Actualiza la lista visible de fichas seleccionadas
function updateSelectedTiles() {
  const selectedTilesContainer = document.getElementById('selected-tiles');
  selectedTilesContainer.innerHTML = '';

  selectedTiles.forEach(index => {
    const tile = tiles[index];
    const tileElement = createTileElement(tile, index);
    selectedTilesContainer.appendChild(tileElement);
  });

  if (selectedTiles.length === 7) {
    document.getElementById('confirm-selection').disabled = false;
  } else {
    document.getElementById('confirm-selection').disabled = true;
  }
}

// Función para confirmar la selección de las 7 fichas y proceder al juego
function confirmSelection() {
  if (selectedTiles.length === 7) {
    playerHand = selectedTiles.map(index => tiles[index]);
    document.getElementById('selection-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    updatePlayerHand();
    updateBestTile();
    promptStartingPlayer();
  } else {
    alert('Debes seleccionar exactamente 7 fichas.');
  }
}

// Actualiza la visualización de las fichas en la mano del jugador J1
function updatePlayerHand() {
  const playerHandContainer = document.getElementById('player-hand');
  playerHandContainer.innerHTML = '';

  playerHand.forEach((tile, index) => {
    const tileElement = createTileElement(tile, index);
    playerHandContainer.appendChild(tileElement);
  });
}

// Muestra un prompt para seleccionar el jugador que sale
function promptStartingPlayer() {
  const startingPlayer = prompt('Elige quién sale (1: J1, 2: J2, 3: J3, 4: J4):');
  if (['1', '2', '3', '4'].includes(startingPlayer)) {
    currentPlayer = parseInt(startingPlayer) - 1;
    if (currentPlayer === 0) {
      selectTileForPlay();
    } else {
      playAI(currentPlayer);
    }
  } else {
    alert('Opción inválida. Elige un número entre 1 y 4.');
    promptStartingPlayer();
  }
}

// Selecciona la ficha para salir o jugar del jugador J1
function selectTileForPlay() {
  // Solo mostrar fichas jugables en los extremos actuales
  const playableTiles = getPlayableTiles(playerHand, boardEnds);

  if (playableTiles.length === 0) {
    alert('No tienes fichas jugables. Debes pasar.');
    passTurn();
    return;
  }

  const selectedTileIndex = prompt(`Elige una ficha para jugar: ${playableTiles.map((tile, index) => `${index + 1}: [${tile.join('|')}]`).join(', ')}`);

  if (selectedTileIndex && !isNaN(selectedTileIndex)) {
    const tileIndex = parseInt(selectedTileIndex) - 1;
    if (tileIndex >= 0 && tileIndex < playableTiles.length) {
      const tile = playableTiles[tileIndex];
      playTile(tile, currentPlayer);
    } else {
      alert('Opción inválida.');
      selectTileForPlay();
    }
  } else {
    alert('Opción inválida.');
    selectTileForPlay();
  }
}

// Lógica para que los jugadores AI jueguen automáticamente
function playAI(playerIndex) {
  // Aquí puedes agregar la lógica de la IA para seleccionar una ficha
  const aiHand = playerHands[playerIndex];
  const playableTiles = getPlayableTiles(aiHand, boardEnds);

  if (playableTiles.length > 0) {
    const tile = playableTiles[Math.floor(Math.random() * playableTiles.length)];
    playTile(tile, playerIndex);
  } else {
    passTurn();
  }
}

// Juega la ficha seleccionada y actualiza el tablero y el estado del juego
function playTile(tile, playerIndex) {
  const tileIndex = playerHands[playerIndex].indexOf(tile);
  playerHands[playerIndex].splice(tileIndex, 1);
  updateBoard(tile);
  updatePlayerHand();
  checkGameEnd();
  nextTurn();
}

// Pasa el turno al siguiente jugador
function passTurn() {
  alert(`El jugador ${currentPlayer + 1} pasa su turno.`);
  nextTurn();
}

// Verifica si el juego ha terminado
function checkGameEnd() {
  // Verificar si algún jugador se quedó sin fichas o si se alcanzaron los 100 puntos
  const playerPoints = playerHands.map(hand => hand.reduce((sum, tile) => sum + tile[0] + tile[1], 0));
  const team1Points = playerPoints[0] + playerPoints[2];
  const team2Points = playerPoints[1] + playerPoints[3];

  if (playerHands.some(hand => hand.length === 0)) {
    alert(`¡El jugador ${playerHands.findIndex(hand => hand.length === 0) + 1} se ha quedado sin fichas!`);
    determineWinner(team1Points, team2Points);
  } else if (team1Points >= 100 || team2Points >= 100) {
    determineWinner(team1Points, team2Points);
  } else if (playerHands.every(hand => getPlayableTiles(hand, boardEnds).length === 0)) {
    alert('El juego se ha trancado.');
    determineWinner(team1Points, team2Points);
  }
}

// Determina el equipo ganador y reinicia el juego
function determineWinner(team1Points, team2Points) {
  if (team1Points < team2Points) {
    alert('¡El equipo 1 ha ganado!');
  } else if (team2Points < team1Points) {
    alert('¡El equipo 2 ha ganado!');
  } else {
    alert('¡Es un empate!');
  }
  resetGame();
}

// Resetea el juego y vuelve a la pantalla de selección
function resetGame() {
  selectedTiles = [];
  playerHands = [[], [], [], []];
  boardEnds = [];
  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('selection-screen').style.display = 'block';
}

// Actualiza los extremos del tablero tras jugar una ficha
function updateBoard(tile) {
  if (boardEnds.length === 0) {
    boardEnds.push(...tile);
  } else {
    const leftEnd = boardEnds[0];
    const rightEnd = boardEnds[1];
    if (tile[0] === leftEnd) {
      boardEnds[0] = tile[1];
    } else if (tile[1] === leftEnd) {
      boardEnds[0] = tile[0];
    } else if (tile[0] === rightEnd) {
      boardEnds[1] = tile[1];
    } else if (tile[1] === rightEnd) {
      boardEnds[1] = tile[0];
    }
  }
  updateBoardDisplay();
}

// Actualiza la visualización del tablero
function updateBoardDisplay() {
  const boardContainer = document.getElementById('board');
  boardContainer.innerHTML = '';
  
  boardEnds.forEach(end => {
    const endElement = document.createElement('div');
    endElement.className = 'board-end';
    endElement.textContent = end;
    boardContainer.appendChild(endElement);
  });
}

// Obtiene las fichas jugables basadas en los extremos del tablero
function getPlayableTiles(hand, ends) {
  if (ends.length === 0) return hand;
  return hand.filter(tile => tile.includes(ends[0]) || tile.includes(ends[1]));
}

// Inicializa el juego
document.getElementById('confirm-selection').addEventListener('click', confirmSelection);

document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', handleTileSelection);
});
