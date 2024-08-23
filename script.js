// Variables globales
let A = generateDominoTiles();
let B = [];  // Fichas en las manos de J1
let C = [];  // Fichas dobles en las manos
let D = [];  // Fichas con al menos un número repetido en 3 o más de mis fichas
let E = [];  // Fichas cuyos puntos suman 6 o más
let F = [];  // Lista mejor ficha para salir
let G = [];  // Extremos actuales en la mesa
let H = [];  // Mejor ficha para jugar
let score1 = 0;
let score2 = 0;

// Genera las 28 fichas de dominó
function generateDominoTiles() {
    let tiles = [];
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            tiles.push([i, j]);
        }
    }
    return tiles;
}

// Inicia la elección de fichas por J1
function startTileSelection() {
    displayTiles(A, selectTile);
}

// Muestra las fichas disponibles para seleccionar
function displayTiles(tiles, onClickAction) {
    const playerTiles = document.getElementById('player-tiles');
    playerTiles.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        tileDiv.textContent = `${tile[0]}|${tile[1]}`;
        tileDiv.onclick = () => onClickAction(index);
        playerTiles.appendChild(tileDiv);
    });
}

// Selecciona una ficha para J1
function selectTile(index) {
    if (B.length < 7) {
        B.push(A[index]);
        A.splice(index, 1);
        updateHand();
    } else {
        alert("Ya has seleccionado las 7 fichas.");
    }
}

// Actualiza la visualización de las fichas en mano (B)
function updateHand() {
    const playerTiles = document.getElementById('player-tiles');
    playerTiles.innerHTML = '';
    B.forEach(tile => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        tileDiv.textContent = `${tile[0]}|${tile[1]}`;
        playerTiles.appendChild(tileDiv);
    });
    calculateBestStartTile();
    calculateBestPlayTile();
}

// Calcula la mejor ficha para salir
function calculateBestStartTile() {
    C = B.filter(tile => tile[0] === tile[1]);  // Fichas dobles
    D = B.filter(tile => B.filter(t => t.includes(tile[0]) || t.includes(tile[1])).length >= 3);
    E = B.filter(tile => (tile[0] + tile[1]) >= 6);

    F = [...new Set([...C, ...D, ...E])];
    
    document.getElementById('bestStartTile').textContent = F.length > 0 ? `${F[0][0]}|${F[0][1]}` : 'N/A';
}

// Calcula la mejor ficha para jugar
function calculateBestPlayTile() {
    H = F.filter(tile => !G.includes(tile));
    document.getElementById('bestPlayTile').textContent = H.length > 0 ? `${H[0][0]}|${H[0][1]}` : 'N/A';
}

// Elige quién sale
function choosePlayer() {
    let player = prompt("Elige quién sale (1: J1, 2: J2, 3: J3, 4: J4):");
    if (player >= 1 && player <= 4) {
        if (player == 1) {
            startGame();
        } else {
            alert("Jugador " + player + " sale.");
        }
    } else {
        alert("Por favor, selecciona un jugador válido.");
    }
}

// Inicia el juego
function startGame() {
    alert("Selecciona la ficha para salir.");
    displayTiles(B, playTile);
}

// Juega una ficha
function playTile(index) {
    let tile = B[index];
    G.push(tile[0], tile[1]);
    B.splice(index, 1);
    updateHand();
    updateGameInfo();
}

// Actualiza la información del juego
function updateGameInfo() {
    // Actualiza las fichas en las manos del jugador J1
    document.getElementById('hand-J1').innerHTML = `Fichas en mano (J1): ${hands.J1.join(', ')}`;
    
    // Actualiza la mejor ficha para jugar
    document.getElementById('best-play').innerHTML = `Mejor ficha para jugar: ${bestPlay.join(', ')}`;

    // Actualiza la mejor ficha para salir
    document.getElementById('best-leave').innerHTML = `Mejor ficha para salir: ${bestLeave.join(', ')}`;

    // Actualiza los extremos actuales de la mesa
    document.getElementById('current-ends').innerHTML = `Extremos actuales en la mesa: ${currentEnds.join(' | ')}`;

    // Actualiza los puntajes de los equipos
    document.getElementById('score-team-1').innerHTML = `Puntaje Equipo 1: ${score.team1}`;
    document.getElementById('score-team-2').innerHTML = `Puntaje Equipo 2: ${score.team2}`;

    // Actualiza la lista de fichas disponibles para la selección
    document.getElementById('available-pieces').innerHTML = `Fichas disponibles: ${availablePieces.join(', ')}`;

    // Actualiza la lista de fichas jugadas y pasadas
    document.getElementById('played-pieces').innerHTML = `Fichas jugadas: ${playedPieces.join(', ')}`;
    document.getElementById('passed-pieces').innerHTML = `Fichas pasadas por cada jugador: ${passedPieces.join(', ')}`;

    // Actualiza la lista de extremos colocados más de dos veces
    document.getElementById('frequent-ends').innerHTML = `Extremos colocados más de dos veces: ${frequentEnds.join(', ')}`;
}

// Función para manejar el evento de selección de fichas al inicio
function selectPieces() {
    const pieces = Array.from(document.querySelectorAll('.piece'));
    pieces.forEach(piece => {
        piece.addEventListener('click', () => {
            const value = piece.dataset.value;
            if (selectedPieces.includes(value)) {
                selectedPieces = selectedPieces.filter(p => p !== value);
                piece.classList.remove('selected');
            } else {
                if (selectedPieces.length < 7) {
                    selectedPieces.push(value);
                    piece.classList.add('selected');
                }
            }
            updateSelectionDisplay();
        });
    });
}

// Actualiza la visualización de las fichas seleccionadas
function updateSelectionDisplay() {
    document.getElementById('selected-pieces').innerHTML = `Fichas seleccionadas: ${selectedPieces.join(', ')}`;
    // Permitir borrar fichas seleccionadas
    document.querySelectorAll('.selected').forEach(piece => {
        piece.addEventListener('dblclick', () => {
            const value = piece.dataset.value;
            selectedPieces = selectedPieces.filter(p => p !== value);
            piece.classList.remove('selected');
            updateSelectionDisplay();
        });
    });
}

// Inicializa el juego y eventos
function initGame() {
    // Asigna fichas a la interfaz
    const piecesContainer = document.getElementById('pieces-container');
    pieces.forEach(piece => {
        const div = document.createElement('div');
        div.className = 'piece';
        div.dataset.value = piece;
        div.innerText = piece;
        piecesContainer.appendChild(div);
    });

    // Inicializa selección de fichas
    selectPieces();
    updateGameInfo(); // Actualiza la información inicial del juego
}

// Llama a initGame al cargar el documento
document.addEventListener('DOMContentLoaded', initGame);
