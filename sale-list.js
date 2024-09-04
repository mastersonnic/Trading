document.addEventListener("DOMContentLoaded", function() {
    // Crea el contenedor para la lista "Sale"
    const container = document.createElement('div');
    container.className = 'section';

    const titleLabel = document.createElement('label');
    titleLabel.textContent = "Sale:";
    container.appendChild(titleLabel);

    const saleOptions = ['J1', 'J2', 'J3', 'J4'];
    
    // Crea casillas de verificación para cada jugador (J1, J2, J3, J4)
    saleOptions.forEach((player, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'sale-' + player;
        checkbox.name = 'sale';
        checkbox.value = player;

        const label = document.createElement('label');
        label.htmlFor = 'sale-' + player;
        label.textContent = player;

        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);

        container.appendChild(div);
    });

    // Añadir la lista al contenedor principal de la página
    const mainContainer = document.querySelector('.container');
    mainContainer.insertBefore(container, mainContainer.firstChild); // Lo añade al inicio
});
