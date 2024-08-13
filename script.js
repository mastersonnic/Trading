let selectedCell = null;
let autoPaste = false;

document.getElementById('auto-paste-switch').addEventListener('change', function() {
    autoPaste = this.checked;
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
            if (selectedCell.id === 'B3' && element.classList.contains('domino') && element.innerText.includes('0, 0')) {
                const targetCell = document.querySelector('#B2');
                const targetText = targetCell.innerText;
                targetCell.innerText = targetText ? targetText + ', ' + text : text;
            } else {
                selectedCell.innerText = currentText ? currentText + ', ' + text : text;
            }
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
