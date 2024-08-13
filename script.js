// Detectar si es una ficha de dominó o una celda
function isDomino(element) {
    return element.classList.contains('domino');
}

// Copiar lógica
document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (isDomino(clickedElement)) {
        // Copiar la ficha de dominó
        const dominoId = clickedElement.id;
        // Implementa la lógica para copiar el contenido de la ficha
        // (por ejemplo, obtener los números o palabras)
        console.log(`Ficha de dominó copiada: ${dominoId}`);
    } else {
        // Copiar la celda
        const cellContent = clickedElement.textContent;
        // Implementa la lógica para copiar el contenido de la celda
        console.log(`Celda copiada: ${cellContent}`);
    }
});

// Pegar lógica
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const targetElement = event.target;
    if (!isDomino(targetElement)) {
        // Pegar en la celda
        const clipboardContent = 'Contenido copiado'; // Reemplaza con el contenido real del portapapeles
        // Implementa la lógica para pegar en la celda
        targetElement.textContent = clipboardContent;
        console.log(`Contenido pegado en la celda: ${clipboardContent}`);
    }
});
