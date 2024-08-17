const board = document.getElementById('board');
const dominoes = [];

function createDomino(value1, value2) {
    const domino = document.createElement('div');
    domino.classList.add('domino');
    if (value1 === value2) {
        domino.classList.add('double');
    }
    domino.innerHTML = `
        <div class="half">${value1}</div>
        <div class="half">${value2}</div>
    `;
    domino.style.left = `${Math.random() * (board.clientWidth - 80)}px`;
    domino.style.top = `${Math.random() * (board.clientHeight - 160)}px`;
    domino.draggable = true;
    domino.addEventListener('dragstart', dragStart);
    domino.addEventListener('dragend', dragEnd);
    board.appendChild(domino);
    dominoes.push(domino);
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', null);
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    this.classList.add('dragging');
}

function dragEnd(e) {
    this.classList.remove('dragging');
    const x = e.clientX - board.offsetLeft - 40;
    const y = e.clientY - board.offsetTop - 80;
    this.style.left = `${x}px`;
    this.style.top = `${y}px`;
    checkAttraction(this);
}

function checkAttraction(domino) {
    const rect1 = domino.getBoundingClientRect();
    dominoes.forEach(other => {
        if (other !== domino) {
            const rect2 = other.getBoundingClientRect();
            if (rect1.left < rect2.right && rect1.right > rect2.left &&
                rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
                const value1 = domino.querySelector('.half:first-child').textContent;
                const value2 = domino.querySelector('.half:last-child').textContent;
                const otherValue1 = other.querySelector('.half:first-child').textContent;
                const otherValue2 = other.querySelector('.half:last-child').textContent;
                if (value1 === otherValue2 || value2 === otherValue1) {
                    const dx = rect2.left - rect1.left;
                    const dy = rect2.top - rect1.top;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 20) {
                        domino.style.left = `${parseFloat(domino.style.left) + dx / 2}px`;
                        domino.style.top = `${parseFloat(domino.style.top) + dy / 2}px`;
                    }
                }
            }
        }
    });
}

for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
        createDomino(i, j);
    }
}
