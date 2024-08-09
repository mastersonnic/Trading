// script.js
let fichaSeleccionada = null;

document.querySelectorAll('.domino-tile').forEach((ficha) => {
    ficha.addEventListener('click', () => {
        fichaSeleccionada = ficha.textContent;
        document.getElementById("ficha-seleccionada").textContent = `Ficha seleccionada: ${fichaSeleccionada}`;
    });
});
