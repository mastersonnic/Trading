// Inicialización de variables globales con la lista completa de fichas de dominó en A
let A = [
    "0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6",
    "1-1", "1-2", "1-3", "1-4", "1-5", "1-6",
    "2-2", "2-3", "2-4", "2-5", "2-6",
    "3-3", "3-4", "3-5", "3-6",
    "4-4", "4-5", "4-6",
    "5-5", "5-6",
    "6-6"
];
let variables = {
    A: [...A],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    X1: null,
    Y1: null,
    J1PlayedExtremes: [],
    J2PlayedExtremes: [],
    J3PlayedExtremes: [],
    J4PlayedExtremes: [],
    J1PassedExtremes: [],
    J2PassedExtremes: [],
    J3PassedExtremes: [],
    J4PassedExtremes: [],
    J1NotPassedExtremes: [],
    J2NotPassedExtremes: [],
    J3NotPassedExtremes: [],
    J4NotPassedExtremes: []
};

// Función para actualizar las listas desplegables
function updateDropdowns() {
    const dropdowns = document.querySelectorAll('.list-selector, .variable-selector');
    dropdowns.forEach(dropdown => {
        const selectedValue = dropdown.value;
        dropdown.innerHTML = '';

        // Añadir las opciones de variables globales
        for (let key in variables) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            dropdown.appendChild(option);
        }

        // Restaurar el valor seleccionado
        if (selectedValue) {
            dropdown.value = selectedValue;
        }
    });
}

// Función para actualizar los visores
function updateVisors() {
    for (let key in variables) {
        const visor = document.querySelector(`.visor[data-visor="${key}"]`);
        if (visor) {
            visor.textContent = Array.isArray(variables[key]) ? variables[key].join(', ') : variables[key];
        }
    }
}

// Función para insertar selección de una lista en una variable
function insertSelection() {
    const listSelector = document.getElementById('listSelector').value;
    const variableSelector = document.getElementById('variableSelector').value;
    const listElement = document.getElementById(`list${listSelector}`);
    const selectedOptions = Array.from(listElement.selectedOptions).map(option => option.value);

    if (selectedOptions.length > 0) {
        variables[variableSelector].push(...selectedOptions);
        variables[variableSelector] = [...new Set(variables[variableSelector])]; // Eliminar duplicados
    }

    updateVisors();
}

// Función para manejar la operación de suma entre listas o variables
function addElements() {
    const sourceSelector = document.getElementById('sourceSelector').value;
    const targetSelector = document.getElementById('targetSelector').value;

    if (sourceSelector && targetSelector) {
        variables[targetSelector].push(...variables[sourceSelector]);
        variables[targetSelector] = [...new Set(variables[targetSelector])]; // Eliminar duplicados
    }

    updateVisors();
}

// Función para manejar la operación de resta entre listas o variables
function subtractElements() {
    const sourceSelector = document.getElementById('sourceSelector').value;
    const targetSelector = document.getElementById('targetSelector').value;

    if (sourceSelector && targetSelector) {
        variables[targetSelector] = variables[targetSelector].filter(element => !variables[sourceSelector].includes(element));
    }

    updateVisors();
}

// Eventos iniciales
document.getElementById('insertButton').addEventListener('click', insertSelection);
document.getElementById('addButton').addEventListener('click', addElements);
document.getElementById('subtractButton').addEventListener('click', subtractElements);

// Inicialización de la página
updateDropdowns();
updateVisors();
