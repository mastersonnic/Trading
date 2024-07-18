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

                // Pregunta al usuario si desea cambiar el color
                const color = prompt("¿Deseas cambiar el color de esta celda? (verde o rojo):");
                if (color === "verde") {
                    celda.classList.add("verde");
                } else if (color === "rojo") {
                    celda.classList.add("rojo");
                }
            }
        });
    }
});
