// Inicializamos las fichas de dominó
const fichas = [
    '0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', 
    '1-1', '1-2', '1-3', '1-4', '1-5', '1-6',
    '2-2', '2-3', '2-4', '2-5', '2-6',
    '3-3', '3-4', '3-5', '3-6',
    '4-4', '4-5', '4-6',
    '5-5', '5-6',
    '6-6'
];

let misFichas = [];
let pasesEquipo1 = [];
let pasesEquipo2 = [];
let jugadasEquipo1 = [];
let jugadasEquipo2 = [];
let extremos = [null, null];
let equipo1Pasados = [];
let equipo2Pasados = [];

// Cargar fichas en los dropdowns
function cargarFichas() {
    const dropdowns = ['misFichasDropdown', 'pasesEquipo1Dropdown', 'pasesEquipo2Dropdown', 'jugadasEquipo1Dropdown', 'jugadasEquipo2Dropdown'];
    
    dropdowns.forEach(id => {
        const dropdown = document.getElementById(id);
        fichas.forEach(ficha => {
            const option = document.createElement('option');
            option.value = ficha;
            option.text = ficha;
            dropdown.add(option);
        });
    });
}

function actualizarMisFichas() {
    misFichas = Array.from(document.getElementById('misFichasDropdown').selectedOptions).map(option => option.value);
    actualizarVisor('misFichasDropdown', 'misFichasVisor');
}

function actualizarVisor(dropdownId, visorId) {
    const seleccionadas = Array.from(document.getElementById(dropdownId).selectedOptions).map(option => option.value);
    document.getElementById(visorId).innerText = seleccionadas.join(', ');
}

function calcularMejorFicha() {
    // Actualizamos los extremos
    actualizarExtremos();

    // Eliminamos fichas jugadas en cualquiera de los equipos de mis fichas
    eliminarFichasJugadas();

    // Aplicamos reglas para determinar la mejor ficha
    let mejorFicha = '';
    let razon = '';

    const fichasDisponibles = misFichas.filter(ficha => esJugable(ficha));
    if (fichasDisponibles.length > 0) {
        // Aplicando las reglas para encontrar la mejor ficha
        mejorFicha = fichasDisponibles[0];
        razon = `porque entra en los grupos ${gruposCumplidos(mejorFicha)}`;
    }

    document.getElementById('mejorFichaVisor').innerText = `La mejor ficha teórica es ${mejorFicha} ${razon}`;
}

function actualizarExtremos() {
    jugadasEquipo1.concat(jugadasEquipo2).forEach(ficha => {
        const [lado1, lado2] = ficha.split('-').map(Number);
        if (extremos.includes(lado1)) {
            extremos[extremos.indexOf(lado1)] = lado2;
        } else if (extremos.includes(lado2)) {
            extremos[extremos.indexOf(lado2)] = lado1;
        } else if (extremos[0] === null) {
            extremos[0] = lado1;
            extremos[1] = lado2;
        }
    });
}

function eliminarFichasJugadas() {
    const jugadas = jugadasEquipo1.concat(jugadasEquipo2);
    misFichas = misFichas.filter(ficha => !jugadas.includes(ficha));
    actualizarVisor('misFichasDropdown', 'misFichasVisor');
}

function esJugable(ficha) {
    const [lado1, lado2] = ficha.split('-').map(Number);
    return extremos.includes(lado1) || extremos.includes(lado2);
}

function gruposCumplidos(ficha) {
    const [lado1, lado2] = ficha.split('-').map(Number);
    let grupos = [];
    
    if (pasesEquipo1.includes(ficha)) {
        grupos.push(`Pase por equipo 1 con ${lado1}-${lado2}`);
    }
    if (pasesEquipo2.includes(ficha)) {
        grupos.push(`Pase por equipo 2 con ${lado1}-${lado2}`);
    }
    
    return grupos.join(' ');
}

// Rellenar el visor con los números de las fichas a las que ha pasado cada equipo
function calcularPasesPorEquipo() {
    equipo1Pasados = pasesEquipo1.filter(ficha => !jugadasEquipo1.includes(ficha));
    equipo2Pasados = pasesEquipo2.filter(ficha => !jugadasEquipo2.includes(ficha));

    document.getElementById('equipo1PasadosVisor').innerText = `Equipo 1 tiene ${equipo1Pasados.join(', ')}`;
    document.getElementById('equipo2PasadosVisor').innerText = `Equipo 2 tiene ${equipo2Pasados.join(', ')}`;
}

cargarFichas();
