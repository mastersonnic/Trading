// Inicializar variables
let variables = {
    A: ["0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6", "1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "2-2", "2-3", "2-4", "2-5", "2-6", "3-3", "3-4", "3-5", "3-6", "4-4", "4-5", "4-6", "5-5", "5-6", "6-6"],
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

let dropdownValues = {
    dropdown1: [],
    dropdown2: [],
    dropdown3: [],
    dropdown4: [],
    dropdown5: [],
    dropdown6: [],
    dropdown7: [],
    dropdown8: [],
    dropdown9: []
};

// Asignar las fichas a los dropdowns
document.querySelectorAll('select').forEach((select, index) => {
    variables.A.forEach(ficha => {
        let option = document.createElement('option');
        option.value = ficha;
        option.textContent = ficha;
        select.appendChild(option);
    });
});

// Actualizar visores y variables
function actualizarVisores() {
    for (const key in dropdownValues) {
        document.getElementById(`visor${key.slice(-1)}`).textContent = dropdownValues[key].join(", ");
    }
    for (const key in variables) {
        document.getElementById(`variable${key}`).textContent = variables[key].join(", ");
    }
}

// Manejar selección en dropdowns
function manejarSeleccionDropdown(dropdownId, value) {
    if (!dropdownValues[dropdownId].includes(value)) {
        dropdownValues[dropdownId].push(value);
    } else {
        dropdownValues[dropdownId] = dropdownValues[dropdownId].filter(item => item !== value);
    }
    actualizarVisores();
}

// Operaciones de sumar y restar elementos entre variables y listas
function sumarElementos(destino, fuente) {
    variables[destino] = [...new Set([...variables[destino], ...dropdownValues[fuente]])];
    actualizarVisores();
}

function restarElementos(destino, fuente) {
    variables[destino] = variables[destino].filter(item => !dropdownValues[fuente].includes(item));
    actualizarVisores();
}

// Función de ejecución para operaciones más complejas
function ejecutarOperacion() {
    sumarElementos('B', 'dropdown1');
    restarElementos('C', 'B');
    // Aquí puedes continuar con más cadenas lógicas
}

// Eventos de selección en dropdowns
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', function () {
        manejarSeleccionDropdown(this.id, this.value);
    });
});

// Evento del botón de acción
document.getElementById('actionButton').addEventListener('click', ejecutarOperacion);

// Inicializar visores al cargar la página
window.onload = actualizarVisores;
