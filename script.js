document.addEventListener("DOMContentLoaded", function () {
    const allTiles = createAllTiles();
    const handTiles = [];
    let currentEnds = [null, null];
    let currentPlayer = 1;
    let team1Score = 0;
    let team2Score = 0;
    let selectedTiles = [];

    // Crea las 28 fichas de dominó
    function createAllTiles() {
        const tiles = [];
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                tiles.push([i, j]);
            }
        }
        return tiles;
    }

    function updateHandTiles() {
        const handContainer = document.getElementById("hand-tiles");
        handContainer.innerHTML = "";
        handTiles.forEach((tile, index) => {
            const tileElement = createTileElement(tile, index);
            handContainer.appendChild(tileElement);
        });
    }

    function createTileElement(tile, index) {
        const tileElement = document.createElement("div");
        tileElement.className = "tile";
        tileElement.textContent = `${tile[0]}|${tile[1]}`;
        tileElement.onclick = () => selectTile(index);
        return tileElement;
    }

    function selectTile(index) {
        const selectedTile = handTiles[index];
        if (selectedTile) {
            selectedTiles.push(selectedTile);
            handTiles.splice(index, 1);
            updateHandTiles();
            updateBestMove();
        }
    }

    function updateBestMove() {
        const bestMoveTile = determineBestMove();
        document.getElementById("best-move-tile").textContent = bestMoveTile ? `${bestMoveTile[0]}|${bestMoveTile[1]}` : "Ninguna";
    }

    function determineBestMove() {
        // Aquí aplicas tu lógica para determinar la mejor ficha para jugar
        return handTiles[0]; // Ejemplo: devolver la primera ficha en mano
    }

    function updateCurrentPlayer() {
        currentPlayer = currentPlayer === 4 ? 1 : currentPlayer + 1;
        document.getElementById("current-player").textContent = `J${currentPlayer}`;
    }

    function updateEnds(newEnds) {
        currentEnds = newEnds;
        document.getElementById("current-ends").textContent = `[${newEnds[0]}, ${newEnds[1]}]`;
    }

    function resetGame() {
        handTiles.length = 0;
        selectedTiles.length = 0;
        currentEnds = [null, null];
        team1Score = 0;
        team2Score = 0;
        updateHandTiles();
        updateBestMove();
        updateCurrentPlayer();
        updateEnds([null, null]);
        document.getElementById("team1-score").textContent = team1Score;
        document.getElementById("team2-score").textContent = team2Score;
    }

    document.getElementById("confirm-selection").onclick = function () {
        if (selectedTiles.length === 7) {
            // Pasar al siguiente paso del juego
            console.log("Fichas seleccionadas:", selectedTiles);
        } else {
            alert("Debes seleccionar exactamente 7 fichas.");
        }
    };

    document.getElementById("play-tile").onclick = function () {
        // Lógica para jugar una ficha
        updateCurrentPlayer();
    };

    document.getElementById("pass-turn").onclick = function () {
        // Lógica para pasar el turno
        updateCurrentPlayer();
    };

    document.getElementById("reset-game").onclick = function () {
        resetGame();
    };

    // Inicializar juego
    resetGame();
    allTiles.forEach(tile => {
        const tileElement = createTileElement(tile);
        document.getElementById("select-tiles").appendChild(tileElement);
    });
});
