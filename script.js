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
    const maxX = window.innerWidth - domino.offsetWidth;
    const maxY = window.innerHeight - domino.offsetHeight;
    domino.style.left = `${Math.min(Math.max(0, dropX), maxX)}px`;
    domino.style.top = `${Math.min(Math.max(0, dropY), maxY)}px`;
});
