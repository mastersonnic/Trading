// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de variables
    const grid = document.querySelector('table');
    const cells = grid.querySelectorAll('td');
    const switchContainers = document.querySelectorAll('.switch-container');
    const dominoContainer = document.querySelector('.domino-container');
    const bestMoveHighlightClass = 'highlight';
    const scoreCells = document.querySelectorAll('.score');
    const resetButton = document.querySelector('button.reset');
    
    let currentMove = 0; // Almacena el turno actual del juego
    let selectedCell = null; // Almacena la celda seleccionada
    let currentScore = 0; // Almacena la puntuación actual
    let bestMove = null; // Almacena la mejor ficha para jugar

    // Genera la cuadrícula y asigna eventos de clic
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.dataset.index = Array.from(cells).indexOf(cell);
    });

    // Manejo del clic en las celdas
    function handleCellClick(event) {
        const cell = event.target;

        // Validación para que no se pueda seleccionar celdas deshabilitadas
        if (cell.classList.contains('disabled')) {
            alert('Esta celda está deshabilitada. Elige otra celda.');
            return;
        }

        // Limpiar cualquier selección previa
        if (selectedCell) {
            selectedCell.classList.remove('selected');
        }

        // Seleccionar la nueva celda
        selectedCell = cell;
        selectedCell.classList.add('selected');

        // Actualizar el movimiento actual
        currentMove = parseInt(cell.dataset.index, 10);

        // Buscar la mejor jugada disponible
        findBestMove();
    }

    // Función para encontrar la mejor jugada disponible
    function findBestMove() {
        let maxScore = -Infinity;
        bestMove = null;

        cells.forEach(cell => {
            const cellValue = parseInt(cell.textContent, 10);

            if (cellValue > maxScore && !cell.classList.contains('disabled')) {
                maxScore = cellValue;
                bestMove = cell;
            }
        });

        highlightBestMove();
    }

    // Resalta la mejor jugada en la cuadrícula
    function highlightBestMove() {
        cells.forEach(cell => {
            cell.classList.remove(bestMoveHighlightClass);
        });

        if (bestMove) {
            bestMove.classList.add(bestMoveHighlightClass);
        }
    }

    // Gestión de switches
    switchContainers.forEach(switchContainer => {
        const switchElement = switchContainer.querySelector('.switch input');

        switchElement.addEventListener('change', function(event) {
            const isChecked = event.target.checked;

            // Logica de lo que ocurre cuando el switch se activa o desactiva
            handleSwitchToggle(isChecked, switchContainer);
        });
    });

    // Lógica al activar/desactivar un switch
    function handleSwitchToggle(isChecked, switchContainer) {
        const cellsAffected = Array.from(cells).filter(cell => cell.dataset.group === switchContainer.dataset.group);

        cellsAffected.forEach(cell => {
            if (isChecked) {
                cell.classList.remove('disabled');
            } else {
                cell.classList.add('disabled');
            }
        });

        // Buscar la mejor jugada tras el cambio
        findBestMove();
    }

    // Generar fichas de dominó
    function generateDominoTiles() {
        const dominoes = [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
            [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
            [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
            [3, 3], [3, 4], [3, 5], [3, 6],
            [4, 4], [4, 5], [4, 6],
            [5, 5], [5, 6],
            [6, 6]
        ];

        dominoes.forEach(domino => {
            const tile = document.createElement('div');
            tile.className = 'domino';

            const half1 = document.createElement('div');
            half1.className = 'domino-half';
            half1.innerHTML = generateDots(domino[0]);

            const half2 = document.createElement('div');
            half2.className = 'domino-half';
            half2.innerHTML = generateDots(domino[1]);

            tile.appendChild(half1);
            tile.appendChild(half2);

            dominoContainer.appendChild(tile);
        });
    }

    // Generar los puntos en las fichas de dominó
    function generateDots(num) {
        let dots = '';
        for (let i = 0; i < num; i++) {
            dots += '<div class="dot"></div>';
        }
        return dots;
    }

    // Actualizar puntuación
    function updateScore(scoreChange) {
        currentScore += scoreChange;
        scoreCells.forEach(cell => {
            cell.textContent = currentScore;
        });
    }

    // Reiniciar el juego
    resetButton.addEventListener('click', function() {
        cells.forEach(cell => {
            cell.classList.remove('selected', 'highlight', 'disabled');
            cell.textContent = '';
        });

        currentMove = 0;
        currentScore = 0;
        selectedCell = null;
        bestMove = null;

        dominoContainer.innerHTML = '';

        updateScore(0);
        generateDominoTiles();
        findBestMove();
    });

    // Inicializar el juego al cargar la página
    generateDominoTiles();
    findBestMove();
});
