// Inicialización de variables
const todasLasFichas = Array.from({ length: 28 }, (_, i) => `Ficha ${i + 1}`);
let misFichas = [];
let pasesEquipo1 = [];
let pasesEquipo2 = [];
let jugadasEquipo1 = [];
let jugadasEquipo2 = [];

// Selección de elementos DOM
const selectMisFichas = document.getElementById('selectMisFichas');
const selectPasesEquipo1 = document.getElementById('selectPasesEquipo1');
const selectPasesEquipo2 = document.getElementById('selectPasesEquipo2');
const selectJugadasEquipo1 = document.getElementById('selectJugadasEquipo1');
const selectJugadasEquipo2 = document.getElementById('selectJugadasEquipo2');

const visorMisFichas = document.getElementById('visorMisFichas');
const visorPasesEquipo1 = document.getElementById('visorPasesEquipo1');
const visorPasesEquipo2 = document.getElementById('visorPasesEquipo2');
const visorJugadasEquipo1 = document.getElementById('visorJugadasEquipo1');
const visorJugadasEquipo2 = document.getElementById('visorJugadasEquipo2');
const visorMejorFicha = document.getElementById('visorMejorFicha');

// Función para actualizar los visores
function updateVisor(visor, lista) {
    visor.innerHTML = ''; // Limpiar visor
    lista.forEach(ficha => {
        const span = document.createElement('span');
        span.textContent = ficha;
        span.addEventListener('click', () => {
            removeFromList(lista, ficha);
            updateVisor(visor, lista);
            calculateMejorFicha();
        });
        visor.appendChild(span);
    });
}

// Función para agregar una ficha a una lista si no está ya en ella
function addToList(lista, ficha, maxFichas = null) {
    if (!lista.includes(ficha)) {
        if (maxFichas === null || lista.length < maxFichas) {
            lista.push(ficha);
        } else {
            alert('Has alcanzado el límite de fichas seleccionadas.');
        }
    } else {
        alert('Esta ficha ya ha sido seleccionada.');
    }
}

// Función para eliminar una ficha de una lista
function removeFromList(lista, ficha) {
    const index = lista.indexOf(ficha);
    if (index !== -1) {
        lista.splice(index, 1);
    }
}

// Función para calcular la "mejor ficha para jugar"
function calculateMejorFicha() {
    const mejoresFichas = misFichas.filter(ficha => {
        let puntosFicha = parseInt(ficha.replace('Ficha ', ''), 10); // Ejemplo de cómo podrías obtener los puntos
        let doble = puntosFicha % 2 === 0; // Ejemplo simplificado de doble
        let puntosAltos = puntosFicha > 6;
        let numeroComún = misFichas.filter(f => f.includes(puntosFicha)).length >= 3;

        let criterioA = doble;
        let criterioB = puntosAltos;
        let criterioC = numeroComún;
        let criterioD = jugadasEquipo1.some(j => j.includes(puntosFicha));
        let criterioE = pasesEquipo2.some(p => p.includes(puntosFicha));
        let criterioF = !pasesEquipo1.some(p => p.includes(puntosFicha));

        let gruposCumplidos = [criterioA, criterioB, criterioC, criterioD, criterioE, criterioF].filter(Boolean).length;
        return gruposCumplidos >= 4;
    });

    // Actualizar el visor con las mejores fichas calculadas
    updateVisor(visorMejorFicha, mejoresFichas);
}

// Inicializar selectores con todas las fichas disponibles
todasLasFichas.forEach(ficha => {
    const option = document.createElement('option');
    option.value = ficha;
    option.textContent = ficha;
    selectMisFichas.appendChild(option.cloneNode(true));
    selectPasesEquipo1.appendChild(option.cloneNode(true));
    selectPasesEquipo2.appendChild(option.cloneNode(true));
    selectJugadasEquipo1.appendChild(option.cloneNode(true));
    selectJugadasEquipo2.appendChild(option.cloneNode(true));
});

// Manejadores de eventos para la selección de fichas

document.getElementById('btnAgregarMisFichas').addEventListener('click', () => {
    addToList(misFichas, selectMisFichas.value, 7);
    updateVisor(visorMisFichas, misFichas);
    calculateMejorFicha();
});

document.getElementById('btnAgregarPasesEquipo1').addEventListener('click', () => {
    addToList(pasesEquipo1, selectPasesEquipo1.value);
    updateVisor(visorPasesEquipo1, pasesEquipo1);
    calculateMejorFicha();
});

document.getElementById('btnAgregarPasesEquipo2').addEventListener('click', () => {
    addToList(pasesEquipo2, selectPasesEquipo2.value);
    updateVisor(visorPasesEquipo2, pasesEquipo2);
    calculateMejorFicha();
});

document.getElementById('btnAgregarJugadasEquipo1').addEventListener('click', () => {
    addToList(jugadasEquipo1, selectJugadasEquipo1.value);
    updateVisor(visorJugadasEquipo1, jugadasEquipo1);
    calculateMejorFicha();
});

document.getElementById('btnAgregarJugadasEquipo2').addEventListener('click', () => {
    addToList(jugadasEquipo2, selectJugadasEquipo2.value);
    updateVisor(visorJugadasEquipo2, jugadasEquipo2);
    calculateMejorFicha();
});
