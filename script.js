// Variables iniciales
const dominoFichas = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 3], [3, 4], [3, 5], [3, 6],
    [4, 4], [4, 5], [4, 6],
    [5, 5], [5, 6],
    [6, 6]
];

// Variables
let varA = [...dominoFichas];
let varB = [];
let varC = [];
let varD = [];
let varE = [];
let varF = [];
let varG = [];
let varH = [];
let varI = [];
let varJ = [];
let varK = [];
let varL = [];
let varM = [];
let varN = [];
let varO = [];

// Función para actualizar el visor de variables
function actualizarVisor(variable, valor) {
    document.getElementById(variable).textContent = JSON.stringify(valor);
}

// Función para inicializar listas desplegables
function inicializarDropdowns() {
    const dropdowns = ['dropdown1', 'dropdown2', 'dropdown3', 'dropdown4', 'dropdown5', 'dropdown6', 'dropdown7', 'dropdown8', 'dropdown9'];
    dropdowns.forEach((dropdownId) => {
        const dropdown = document.getElementById(dropdownId);
        for (let i = 0; i < varA.length; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = `Ficha ${varA[i][0]}-${varA[i][1]}`;
            dropdown.appendChild(option);
        }
    });
}

// Función para manejar la selección de fichas desde un dropdown
function manejarSeleccion(idDropdown, visorId, variable) {
    const dropdown = document.getElementById(idDropdown);
    const seleccion = parseInt(dropdown.value);

    if (!isNaN(seleccion)) {
        const fichaSeleccionada = varA[seleccion];
        variable.push(fichaSeleccionada);
        actualizarVisor(visorId, variable);
    }
}

// Función para sumar elementos de una lista a otra lista
function sumarElementos(variableDestino, variableFuente) {
    variableFuente.forEach(ficha => {
        if (!variableDestino.some(f => f[0] === ficha[0] && f[1] === ficha[1])) {
            variableDestino.push(ficha);
        }
    });
    return variableDestino;
}

// Función para restar elementos de una lista a otra lista
function restarElementos(variableDestino, variableFuente) {
    variableFuente.forEach(ficha => {
        const index = variableDestino.findIndex(f => f[0] === ficha[0] && f[1] === ficha[1]);
        if (index > -1) {
            variableDestino.splice(index, 1);
        }
    });
    return variableDestino;
}

// Función para seleccionar fichas con lados más altos que 6 en una lista
function fichasAltas(variable) {
    return variable.filter(ficha => ficha[0] > 6 || ficha[1] > 6);
}

// Función para seleccionar fichas con lados más repetidos en una lista
function fichasRepetidas(variable) {
    let count = {};
    variable.forEach(ficha => {
        ficha.forEach(num => {
            count[num] = (count[num] || 0) + 1;
        });
    });
    const maxCount = Math.max(...Object.values(count));
    return variable.filter(ficha => ficha.some(num => count[num] === maxCount));
}

// Función para seleccionar fichas dobles en una lista
function fichasDobles(variable) {
    return variable.filter(ficha => ficha[0] === ficha[1]);
}

// Función para seleccionar fichas con menos números repetidos en una lista
function fichasMenosRepetidas(variable) {
    let count = {};
    variable.forEach(ficha => {
        ficha.forEach(num => {
            count[num] = (count[num] || 0) + 1;
        });
    });
    const minCount = Math.min(...Object.values(count));
    return variable.filter(ficha => ficha.some(num => count[num] === minCount));
}

// Función para manejar las operaciones
function manejarOperacion(operacion, visorId, variableDestino, variableFuente) {
    switch (operacion) {
        case 'sumar':
            variableDestino = sumarElementos(variableDestino, variableFuente);
            break;
        case 'restar':
            variableDestino = restarElementos(variableDestino, variableFuente);
            break;
        case 'altas':
            variableDestino = fichasAltas(variableFuente);
            break;
        case 'repetidas':
            variableDestino = fichasRepetidas(variableFuente);
            break;
        case 'dobles':
            variableDestino = fichasDobles(variableFuente);
            break;
        case 'menos_repetidas':
            variableDestino = fichasMenosRepetidas(variableFuente);
            break;
        default:
            console.error('Operación no reconocida');
    }
    actualizarVisor(visorId, variableDestino);
    return variableDestino;
}

// Asignación de eventos para dropdowns y visores
document.getElementById('dropdown1').addEventListener('change', () => manejarSeleccion('dropdown1', 'visor1', varB));
document.getElementById('dropdown2').addEventListener('change', () => manejarSeleccion('dropdown2', 'visor2', varC));
document.getElementById('dropdown3').addEventListener('change', () => manejarSeleccion('dropdown3', 'visor3', varD));
document.getElementById('dropdown4').addEventListener('change', () => manejarSeleccion('dropdown4', 'visor4', varE));
document.getElementById('dropdown5').addEventListener('change', () => manejarSeleccion('dropdown5', 'visor5', varF));
document.getElementById('dropdown6').addEventListener('change', () => manejarSeleccion('dropdown6', 'visor6', varG));
document.getElementById('dropdown7').addEventListener('change', () => manejarSeleccion('dropdown7', 'visor7', varH));
document.getElementById('dropdown8').addEventListener('change', () => manejarSeleccion('dropdown8', 'visor8', varI));
document.getElementById('dropdown9').addEventListener('change', () => manejarSeleccion('dropdown9', 'visor9', varJ));

// Función para inicializar el sistema
function inicializar() {
    inicializarDropdowns();

    // Inicializa los visores
    actualizarVisor('varA', varA);
    actualizarVisor('varB', varB);
    actualizarVisor('varC', varC);
    actualizarVisor('varD', varD);
    actualizarVisor('varE', varE);
    actualizarVisor('varF', varF);
    actualizarVisor('varG', varG);
    actualizarVisor('varH', varH);
    actualizarVisor('varI', varI);
    actualizarVisor('varJ', varJ);
    actualizarVisor('varK', varK);
    actualizarVisor('varL', varL);
    actualizarVisor('varM', varM);
    actualizarVisor('varN', varN);
    actualizarVisor('varO', varO);
}

// Inicializa la página
inicializar();

// Ejemplo de lógica para operar con variables a través de un botón
document.getElementById('actionButton').addEventListener('click', () => {
    // Aquí puedes definir la operación que quieres realizar, por ejemplo:
    varK = manejarOperacion('sumar', 'visorK', varK, varB);
    varK = manejarOperacion('sumar', 'visorK', varK, varC);
    varL = manejarOperacion('restar', 'visorL', varL, varC);
    varM = manejarOperacion('altas', 'visorM', varM, varD);
    varN = manejarOperacion('repetidas', 'visorN', varN, varE);
    varO = manejarOperacion('dobles', 'visorO', varO, varF);
});
