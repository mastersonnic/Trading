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
        }
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}
