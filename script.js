document.addEventListener('DOMContentLoaded', function () {
    const availableTilesContainer = document.getElementById('available-tiles');
    const selectedTilesContainer = document.getElementById('selected-tiles');
    const playerTiles = [];
    const maxTiles = 7;

    const tiles = [
        "0|0", "0|1", "0|2", "0|3", "0|4", "0|5", "0|6",
        "1|1", "1|2", "1|3", "1|4", "1|5", "1|6",
        "2|2", "2|3", "2|4", "2|5", "2|6",
        "3|3", "3|4", "3|5", "3|6",
        "4|4", "4|5", "4|6",
        "5|5", "5|6",
        "6|6"
    ];

    // Inicializar las fichas disponibles
    function initializeTiles() {
        availableTilesContainer.innerHTML = '';
        tiles.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            tileElement.textContent = tile;
            tileElement.onclick = () => selectTile(tile, tileElement);
            availableTilesContainer.appendChild(tileElement);
        });
    }

    // Seleccionar o deseleccionar fichas
    function selectTile(tile, tileElement) {
        const tileIndex = playerTiles.indexOf(tile);
        if (tileIndex === -1) {
            if (playerTiles.length < maxTiles) {
                playerTiles.push(tile);
                tileElement.classList.add('selected');
            } else {
                alert("¡No puedes seleccionar más de 7 fichas!");
            }
        } else {
            playerTiles.splice(tileIndex, 1);
            tileElement.classList.remove('selected');
        }
        updateSelectedTiles();
    }

    // Actualizar la visualización de las fichas seleccionadas
    function updateSelectedTiles() {
        selectedTilesContainer.innerHTML = '';
        playerTiles.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            tileElement.textContent = tile;
            selectedTilesContainer.appendChild(tileElement);
        });
        document.getElementById('current-tiles').textContent = `Fichas en mano: ${playerTiles.join(', ')}`;
        // Aquí puedes agregar la lógica para calcular la "mejor ficha para salir" y la "mejor ficha para jugar"
    }

    initializeTiles();

    // Ejemplo de manejo del inicio del juego
    document.getElementById('player1-start').onclick = () => {
        alert("J1 empieza");
        // Lógica para comenzar el turno de J1
    };

    document.getElementById('player2-start').onclick = () => {
        alert("J2 empieza");
        // Lógica para comenzar el turno de J2
    };

    document.getElementById('player3-start').onclick = () => {
        alert("J3 empieza");
        // Lógica para comenzar el turno de J3
    };

    document.getElementById('player4-start').onclick = () => {
        alert("J4 empieza");
        // Lógica para comenzar el turno de J4
    };

    document.getElementById('reset-game').onclick = () => {
        location.reload();  // Reiniciar el juego
    };
});
