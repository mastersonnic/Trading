const dominos = [];
const players = [[], [], [], []];
const gameArea = document.getElementById('game-area');

// Crear fichas de dominó
for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
        dominos.push({ left: i, right: j });
    }
}

// Barajar y repartir fichas
function shuffleAndDeal() {
    const shuffled = dominos.sort(() => 0.5 - Math.random());
    for (let i = 0; i < 28; i++) {
        players[Math.floor(i / 7)].push(shuffled[i]);
    }
}

// Renderizar fichas
function renderDominos() {
    gameArea.innerHTML = '';
    players.forEach((player, index) => {
        const playerDiv = document.getElementById(`player${index + 1}`);
        playerDiv.innerHTML = '';
        player.forEach(domino => {
            const dominoDiv = document.createElement('div');
            dominoDiv.className = 'domino';
            if (domino.left === domino.right) {
                dominoDiv.classList.add('double');
            }
            dominoDiv.innerHTML = `${domino.left} | ${domino.right}`;
            dominoDiv.draggable = true;
            dominoDiv.addEventListener('dragstart', dragStart);
            dominoDiv.addEventListener('dragend', dragEnd);
            playerDiv.appendChild(dominoDiv);
        });
    });
}

// Drag and drop
let draggedDomino = null;

function dragStart(e) {
    draggedDomino = e.target;
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
    draggedDomino = null;
}

gameArea.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(gameArea, e.clientY);
    if (afterElement == null) {
        gameArea.appendChild(draggedDomino);
    } else {
        gameArea.insertBefore(draggedDomino, afterElement);
    }
    checkForMatch();
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.domino:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function checkForMatch() {
    const dominos = [...gameArea.querySelectorAll('.domino')];
    dominos.forEach(domino => {
        const [left, right] = domino.innerHTML.split(' | ').map(Number);
        dominos.forEach(otherDomino => {
            if (domino !== otherDomino) {
                const [otherLeft, otherRight] = otherDomino.innerHTML.split(' | ').map(Number);
                if (left === otherRight || right === otherLeft) {
                    const rect1 = domino.getBoundingClientRect();
                    const rect2 = otherDomino.getBoundingClientRect();
                    const distance = Math.hypot(rect1.x - rect2.x, rect1.y - rect2.y);
                    if (distance < 20) {
                        const angle = Math.atan2(rect2.y - rect1.y, rect2.x - rect1.x);
                        domino.style.left = `${rect2.x - Math.cos(angle) * 20}px`;
                        domino.style.top = `${rect2.y - Math.sin(angle) * 20}px`;
                    }
                }
            }
        });
    });
}

// Inicializar juego
shuffleAndDeal();
renderDominos();
