function createDots(number) {
    const dots = [];
    for (let i = 0; i < number; i++) {
        dots.push('<div class="dot"></div>');
    }
    return dots.join('');
}

const dominoes = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 3], [3, 4], [3, 5], [3, 6],
    [4, 4], [4, 5], [4, 6],
    [5, 5], [5, 6],
    [6, 6]
];

dominoes.forEach(([top, bottom], index) => {
    const domino = document.getElementById(`domino-${top}-${bottom}`);
    domino.innerHTML = `
        <div class="half">${createDots(top)}</div>
        <div class="half">${createDots(bottom)}</div>
    `;
});
