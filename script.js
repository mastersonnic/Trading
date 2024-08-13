document.addEventListener('DOMContentLoaded', () => {
    let selectedElement = null;

    function handleCopy(e) {
        e.preventDefault();
        if (e.target.classList.contains('domino')) {
            selectedElement = e.target.cloneNode(true);
        } else if (e.target.tagName === 'TD') {
            selectedElement = e.target.cloneNode(true);
        }
    }

    function handlePaste(e) {
        e.preventDefault();
        if (selectedElement && e.target.tagName === 'TD') {
            const targetCell = e.target;
            targetCell.innerHTML = '';
            targetCell.appendChild(selectedElement.cloneNode(true));
            selectedElement = null;
        }
    }

    document.querySelectorAll('.domino').forEach(domino => {
        domino.addEventListener('mousedown', handleCopy);
    });

    document.querySelectorAll('#left-grid td').forEach(cell => {
        cell.addEventListener('mousedown', handlePaste);
    });

    document.querySelectorAll('#right-grid td').forEach(cell => {
        cell.addEventListener('mousedown', handlePaste);
    });
});
