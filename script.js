let selectedCell = null;
let autoPaste = true;
let playWithFront = true;
let undoStack = [];
let redoStack = [];

document.getElementById('auto-paste-switch').addEventListener('change', function() {
    autoPaste = this.checked;
});

document.getElementById('play-with-front-switch').addEventListener('change', function() {
    playWithFront = this.checked;
});

document.getElementById('undo-button').addEventListener('click', function() {
    if (undoStack.length > 0) {
        const lastAction = undoStack.pop();
        redoStack.push(lastAction);
        lastAction.undo();
    }
});

document.getElementById('redo-button').addEventListener('click', function() {
    if (redoStack.length > 0) {
        const lastAction = redoStack.pop();
        undoStack.push(lastAction);
        lastAction.redo();
    }
});

function selectCell(cell) {
    selectedCell = cell;
}

function copyToClipboard(element) {
    const text = element.innerText.replace('|', ',');
    navigator.clipboard.writeText(text).then(() => {
        showConfirmation();
        if (autoPaste && selectedCell) {
            const currentText = selectedCell.innerText;
            const isDouble = element.matches('.domino:nth-child(1), .domino:nth-child(8), .domino:nth-child(14), .domino:nth-child(19), .domino:nth-child(23), .domino:nth-child(26), .domino:nth-child(28)');
            if (selectedCell.id === 'B3' && isDouble) {
                const targetCell = document.querySelector('#B2');
                const targetText = targetCell.innerText;
                targetCell.innerText = targetText ? targetText + ', ' + text : text;
            } else {
                selectedCell.innerText = currentText ? currentText + ', ' + text : text;
            }
            saveState();
        }
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}

function showConfirmation() {
    const confirmation = document.getElementById('confirmation');
    confirmation.style.opacity = '1';
    setTimeout(() => {
        confirmation.style.opacity = '0';
    }, 500);
}

// Evitar que la página haga zoom hacia la celda que se está editando
document.addEventListener('focusin', (e) => {
    if (e.target.tagName === 'TD' && e.target.contentEditable === 'true') {
        e.target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
});

// Lógica para determinar la mejor ficha para salir
function updateBestTile() {
    const myDoubles = document.querySelector('#B2').innerText.split(', ').map(Number);
    const myTiles = document.querySelector('#B3').innerText.split(', ').map(Number);
    let bestTile = '';
    let maxPoints = 0;

    // Verificar dobles con al menos dos números más del mismo doble
    myDoubles.forEach(double => {
        const count = myTiles.filter(tile => tile === double).length;
        if (count >= 2) {
            const points = double * 2 + count;
            if (points > maxPoints) {
                maxPoints = points;
                bestTile = `${double}, ${double}`;
            }
        }
    });

    // Verificar fichas con tres números del mismo
    if (!bestTile) {
        const tileCounts = {};
        myTiles.forEach(tile => {
            tileCounts[tile] = (tileCounts[tile] || 0) + 1;
        });
        Object.keys(tileCounts).forEach(tile => {
            if (tileCounts[tile] >= 3) {
                const points = tile * 3;
                if (points > maxPoints) {
                    maxPoints = points;
                    bestTile = `${tile}, ${tile}`;
                }
            }
        });
    }

    // Verificar la ficha más alta
    if (!bestTile) {
        const highestTile = Math.max(...myTiles);
        bestTile = `${highestTile}, ${highestTile}`;
    }

    document.querySelector('#B7').innerText = bestTile;
}

// Actualizar la mejor ficha para salir en tiempo real
document.querySelectorAll('#B2, #B3').forEach(cell => {
    cell.addEventListener('input', updateBestTile);
});

function saveState() {
    const state = {
        B2: document.querySelector('#B2').innerText,
        B3: document.querySelector('#B3').innerText,
        B7: document.querySelector('#B7').innerText,
        B4: document.querySelector('#B4').innerText,
        B5: document.querySelector('#B5').innerText,
        B6: document.querySelector('#B6').innerText
    };
    undoStack.push({
        undo: () => {
            document.querySelector('#B2').innerText = state.B2;
            document.querySelector('#B3').innerText = state.B3;
            document.querySelector('#B7').innerText = state.B7;
            document.querySelector('#B4').innerText = state.B4;
            document.querySelector('#B5').innerText = state.B5;
            document.querySelector('#B6').innerText = state.B6;
        },
        redo: () => {
            document.querySelector('#B2').innerText = state.B2;
            document.querySelector('#B3').innerText = state.B3;
            document.querySelector('#B7').innerText = state.B7;
            document.querySelector('#B4').innerText = state.B4;
            document.querySelector('#B5').innerText = state.B5;
            document.querySelector('#B6').innerText = state.B6;
        }
    });
    redoStack = [];
}
