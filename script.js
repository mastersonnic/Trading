// Variables para almacenar las selecciones de las listas desplegables
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

// Variables para almacenar las 15 variables (A, B, C, ...)
let variables = {
    A: [],
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

// Fichas de dominó
const dominoFichas = [
    "0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6", "1-1", "1-2", "1-3", "1-4", 
    "1-5", "1-6", "2-2", "2-3", "2-4", "2-5", "2-6", "3-3", "3-4", "3-5", "3-6", 
    "4-4", "4-5", "4-6", "5-5", "5-6", "6-6"
];

// Inicializar todas las variables con todas las fichas
variables.A = [...dominoFichas];

// Actualiza el visor correspondiente cuando se realiza una acción
function actualizarVisor(visorId, valor) {
    document.getElementById(visorId).textContent = JSON.stringify(valor);
}

// Actualiza todos los visores
function actualizarTodosLosVisores() {
    for (const key in variables) {
        actualizarVisor(`visor${key}`, variables[key]);
    }
    for (const key in dropdownValues) {
        actualizarVisor(`visor${key}`, dropdownValues[key]);
    }
}

// Maneja la selección en los dropdowns
function manejarSeleccionDropdown(dropdownId, value) {
    if (!dropdownValues[dropdownId].includes(value)) {
        dropdownValues[dropdownId].push(value);
    } else {
        dropdownValues[dropdownId] = dropdownValues[dropdownId].filter(item => item !== value);
    }
    actualizarVisor(`visor${dropdownId}`, dropdownValues[dropdownId]);
}

// Función para sumar elementos de una lista a una variable
function sumarElementos(variableDestino, variableFuente) {
    variables[variableDestino] = [...new Set([...variables[variableDestino], ...variables[variableFuente]])];
    actualizarVisor(`visor${variableDestino}`, variables[variableDestino]);
}

// Función para restar elementos de una lista de una variable
function restarElementos(variableDestino, variableFuente) {
    variables[variableDestino] = variables[variableDestino].filter(item => !variables[variableFuente].includes(item));
    actualizarVisor(`visor${variableDestino}`, variables[variableDestino]);
}

// Ejemplo de una función que se ejecuta al hacer clic en un botón
function ejecutarOperacion() {
    // Aquí puedes agregar la lógica para manejar la selección, suma, resta y actualización de visores y variables
    // Un ejemplo simple:
    sumarElementos('B', 'dropdown1'); // Esto sumará las selecciones del dropdown1 a la variable B
    restarElementos('C', 'B'); // Esto restará los elementos de B en la variable C

    actualizarTodosLosVisores();
}

// Eventos de los dropdowns para manejar la selección y deselección
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', function () {
        manejarSeleccionDropdown(this.id, this.value);
    });
});

// Ejemplo de evento para el botón de acción
document.getElementById('actionButton').addEventListener('click', ejecutarOperacion);

// Inicializar los visores al cargar la página
window.onload = actualizarTodosLosVisores;
