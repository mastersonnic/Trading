document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container");
    let sumatoria = 0;

    // Crea las celdas y agrega los eventos de clic
    for (let i = 0; i < 20; i++) {
        const celda = document.createElement("div");
        celda.classList.add("celda");
        gridContainer.appendChild(celda);

        celda.addEventListener("click", () => {
            const valor = prompt("Ingresa un valor numérico (positivo o negativo):");
            if (valor !== null && !isNaN(valor)) {
                celda.textContent = valor;
                sumatoria += parseFloat(valor);
                document.getElementById("sumatoria").textContent = `Sumatoria: ${sumatoria}`;

                // Pregunta al usuario si desea cambiar el color o volver a blanco
                const opcion = prompt("¿Qué deseas hacer? (verde, rojo o blanco):");
                if (opcion === "verde") {
                    celda.classList.remove("rojo"); // Elimina la clase rojo si está presente
                    celda.classList.add("verde");
                } else if (opcion === "rojo") {
                    celda.classList.remove("verde"); // Elimina la clase verde si está presente
                    celda.classList.add("rojo");
                } else if (opcion === "blanco") {
                    sumatoria -= parseFloat(celda.textContent); // Resta el valor anterior
                    celda.textContent = "0"; // Vuelve a blanco con valor 0
                    celda.classList.remove("verde", "rojo"); // Elimina ambas clases
                    document.getElementById("sumatoria").textContent = `Sumatoria: ${sumatoria}`;
                }
            }
        });
    }
});
