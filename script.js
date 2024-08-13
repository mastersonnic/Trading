document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('.domino-tile')) {
        const dominoTile = target.cloneNode(true);
        window.globalDominoTile = dominoTile;

        // Copiar al portapapeles
        const textToCopy = dominoTile.textContent;
        copyToClipboard(textToCopy);
    } else if (target.matches('.grid-cell')) {
        if (window.globalDominoTile) {
            const cellContent = target.textContent.trim();
            if (cellContent === 'nada') {
                target.textContent = '';
            } else {
                target.appendChild(window.globalDominoTile);
            }
        }
    }
});

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Crear las fichas de dominó
const fichas = [
    '0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6',
    '1-1', '1-2', '1-3', '1-4', '1-5', '1-6',
    '2-2', '2-3', '2-4', '2-5', '2-6',
    '3-3', '3-4', '3-5', '3-6',
    '4-4', '4-5', '4-6',
    '5-5', '5-6',
    '6-6'
];

const dominoTilesContainer = document.getElementById('domino-tiles');
fichas.forEach((ficha) => {
    const tile = document.createElement('div');
    tile.classList.add('domino-tile');
    tile.textContent = ficha;
    dominoTilesContainer.appendChild(tile);
});
