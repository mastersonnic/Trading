// script.js

document.querySelectorAll('.domino-tile').forEach((ficha) => {
    ficha.addEventListener('click', () => {
        // Desactivamos todos los visores
        document.querySelectorAll('.visor input[type="checkbox"]').forEach((visor) => {
            visor.checked = false;
        });

        // Activamos el visor correspondiente a la ficha seleccionada
        const visorActivo = document.querySelector(`#${ficha.dataset.visor}`);
        visorActivo.checked = true;

        // Mostramos la ficha seleccionada en el visor
        visorActivo.nextElementSibling.textContent = `Ficha: ${ficha.textContent}`;
    });
});
