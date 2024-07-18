// script.js
const tabla = document.getElementById('tabla');
const sumatoriaElement = document.getElementById('sumatoria');
let sumatoria = 0;

for (let i = 0; i < 20; i++) {
    const celda = document.createElement('td');
    celda.textContent = '0'; // Valor inicial en blanco

    // Asigna colores y valores según tus necesidades
    // Ejemplo:
    // celda.classList.add('verde'); // Para verde
    // celda.textContent = '5'; // Valor positivo

    // Escucha eventos de clic para modificar valores
    celda.addEventListener('click', () => {
        const nuevoValor = prompt('Ingresa un valor:');
        if (nuevoValor !== null) {
            const valorNumerico = parseFloat(nuevoValor);
            if (!isNaN(valorNumerico)) {
                celda.textContent = valorNumerico;
                sumatoria += valorNumerico;
                sumatoriaElement.textContent = `Sumatoria: ${sumatoria}`;
            }
        }
    });

    tabla.appendChild(celda);
}
