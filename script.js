document.addEventListener("DOMContentLoaded", function () {
    // Variables globales
    const fichas = [
        "0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6",
        "1-1", "1-2", "1-3", "1-4", "1-5", "1-6",
        "2-2", "2-3", "2-4", "2-5", "2-6",
        "3-3", "3-4", "3-5", "3-6",
        "4-4", "4-5", "4-6",
        "5-5", "5-6",
        "6-6"
    ];

    const variables = {
        A: [...fichas],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        O: []
    };

    // Inicializar los desplegables con las fichas
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        fichas.forEach(ficha => {
            const option = document.createElement("option");
            option.value = ficha;
            option.textContent = ficha;
            dropdown.appendChild(option);
        });
    });

    // Función para actualizar las variables en la interfaz
    function updateVariablesUI() {
        for (const [key, value] of Object.entries(variables)) {
            document.getElementById(`var${key}`).textContent = value.join(", ");
        }
    }

    // Botón para insertar selección de A en la variable elegida
    document.getElementById("insertFromAButton").addEventListener("click", function () {
        const selectedVariable = document.getElementById("variable-select").value;
        variables[selectedVariable] = [...variables.A];
        updateVariablesUI();
    });

    // Botón para insertar la cantidad de fichas/números en un visor o lista
    document.getElementById("insertVariableCountButton").addEventListener("click", function () {
        const target = document.getElementById("target-select").value;
        const selectedVariable = document.getElementById("variable-select").value;
        const count = variables[selectedVariable].length;

        if (target.startsWith("visor")) {
            document.getElementById(target).textContent = `Cantidad: ${count}`;
        } else if (target.startsWith("dropdown")) {
            const dropdown = document.getElementById(target);
            dropdown.innerHTML = "";
            variables[selectedVariable].forEach(ficha => {
                const option = document.createElement("option");
                option.value = ficha;
                option.textContent = ficha;
                dropdown.appendChild(option);
            });
        }
    });

    // Inicializar la interfaz con las variables vacías
    updateVariablesUI();
});
