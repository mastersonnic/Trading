const dominos = document.querySelectorAll('.domino');

dominos.forEach(domino => {
    domino.addEventListener('dragstart', dragStart);
    domino.addEventListener('dragend', dragEnd);
    domino.addEventListener('touchstart', touchStart);
    domino.addEventListener('touchmove', touchMove);
    domino.addEventListener('touchend', touchEnd);
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

function touchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    e.target.style.position = 'absolute';
    e.target.style.left = `${touch.clientX - e.target.offsetWidth / 2}px`;
    e.target.style.top = `${touch.clientY - e.target.offsetHeight / 2}px`;
}

function touchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const domino = e.target;
    const dropX = touch.clientX - domino.offsetWidth / 2;
    const dropY = touch.clientY - domino.offsetHeight / 2;
    const maxX = window.innerWidth - domino.offsetWidth;
    const maxY = window.innerHeight - domino.offsetHeight;
    domino.style.left = `${Math.min(Math.max(0, dropX), maxX)}px`;
    domino.style.top = `${Math.min(Math.max(0, dropY), maxY)}px`;
}

function touchEnd(e) {
    e.preventDefault();
}
