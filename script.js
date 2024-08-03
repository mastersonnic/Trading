const dominos = document.querySelectorAll('.domino');

dominos.forEach(domino => {
    domino.addEventListener('dragstart', dragStart);
    domino.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('hide');
}

document.body.addEventListener('dragover', e => {
    e.preventDefault();
});

document.body.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const domino = document.getElementById(id);
    const dropX = e.clientX - domino.offsetWidth / 2;
    const dropY = e.clientY - domino.offsetHeight / 2;
    domino.style.position = 'absolute';
    domino.style.left = `${dropX}px`;
    domino.style.top = `${dropY}px`;
});
