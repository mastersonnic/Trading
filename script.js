document.addEventListener('DOMContentLoaded', () => {
    let copiedElement = null;

    document.querySelectorAll('.domino, .grid div').forEach(element => {
        element.addEventListener('click', () => {
            if (element.classList.contains('domino') || element.parentElement.id === 'right-grid') {
                copiedElement = element.cloneNode(true);
            } else if (element.parentElement.id === 'left-grid' && copiedElement) {
                if (copiedElement.dataset.value === 'nada') {
                    element.textContent = '';
                    element.dataset.value = '';
                } else {
                    element.textContent = copiedElement.textContent;
                    element.dataset.value = copiedElement.dataset.value;
                }
                syncGrids();
            }
        });
    });

    const leftGrid = document.getElementById('left-grid');
    const rightGrid = document.getElementById('right-grid');

    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            const leftCell = document.createElement('div');
            leftCell.textContent = `${String.fromCharCode(65 + i)}${j + 1}`;
            leftGrid.appendChild(leftCell);

            const rightCell = document.createElement('div');
            rightCell.textContent = `${String.fromCharCode(65 + i)}${j + 1}`;
            rightGrid.appendChild(rightCell);
        }
    }

    function syncGrids() {
        const leftCells = leftGrid.querySelectorAll('div');
        const rightCells = rightGrid.querySelectorAll('div');

        leftCells.forEach((leftCell, index) => {
            rightCells[index].textContent = leftCell.textContent;
            rightCells[index].dataset.value = leftCell.dataset.value;
        });
    }
});
