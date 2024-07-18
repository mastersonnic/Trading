document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container");
    let sumatoria = 0;
    const valoresCeldas = new Map(); // Almacena los valores de las celdas

    // Crea las celdas y agrega los eventos de clic
    for (let i = 0; i < 20; i++) {
        const celda = document.createElement("div");
        celda.classList.add("celda");
        gridContainer.appendChild(celda);

        celda.addEventListener("click", () => {
            const valor = prompt("Ingresa un valor numérico (positivo o negativo):");
            if (valor !== null && !isNaN(valor)) {
                const valorAnterior = parseFloat(celda.textContent);
                sumatoria -= valorAnterior; // Resta el valor anterior
                celda.textContent = valor;
                sumatoria += parseFloat(valor);
                document.getElementById("sumatoria").textContent = `Sumatoria: ${sumatoria}`;
                valoresCeldas.set(celda, parseFloat(valor)); // Almacena el nuevo valor
            }
        });
    }

    // Función para volver a blanco con valor 0
    function volverABlanco(celda) {
        const valorAnterior = valoresCeldas.get(celda);
        sumatoria -= valorAnterior; // Resta el valor anterior
        celda.textContent = "0"; // Vuelve a blanco con valor 0
        celda.classList.remove("verde", "rojo"); // Elimina ambas clases
        valoresCeldas.delete(celda); // Elimina el valor almacenado
        document.getElementById("sumatoria").textContent = `Sumatoria: ${sumatoria}`;
    }

    // Agrega evento de doble clic para volver a blanco
    gridContainer.addEventListener("dblclick", (event) => {
        const celda = event.target;
        if (celda.classList.contains("celda")) {
            const opcion = prompt("¿Qué deseas hacer? (v, r o b):");
            if (opcion === "v") {
                celda.classList.remove("rojo"); // Elimina la clase rojo si está presente
                celda.classList.add("verde");
            } else if (opcion === "r") {
                celda.classList.remove("verde"); // Elimina la clase verde si está presente
                celda.classList.add("rojo");
            } else if (opcion === "b") {
                volverABlanco(celda);
            }
        }
    });
});
