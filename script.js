document.addEventListener('DOMContentLoaded', () => {
    let copiedElement = null;

    document.querySelectorAll('.domino, .grid div').forEach(element => {
        element.addEventListener('click', () => {
            if (element.classList.contains('domino') || element.parentElement.id === 'right-grid') {
                copiedElement = element.cloneNode(true);
            } else if (element.parentElement.id === 'left-grid' && copiedElement) {
                if (copiedElement.dataset.value === 'nada') {
                    element.textContent = '';
                    element.removeAttribute('data-value');
                } else {
                    element.textContent = copiedElement.textContent;
                    element.dataset.value = copiedElement.dataset.value;
                }
            }
        });
    });

    const leftGrid = document.getElementById('left-grid');
    const rightGrid = document.getElementById('right-grid');

    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            const leftCell = document.createElement('div');
            leftCell.textContent = '';
            leftGrid.appendChild(leftCell);

            const rightCell = document.createElement('div');
            rightCell.textContent = '';
            rightGrid.appendChild(rightCell);
        }
    }
});
