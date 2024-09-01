// Variables globales
let fichasDual = [];
let fichasSeparadas = [];
let listaFichas = [];
let misFichas = [];
let visorMisFichas = [];
let candidatosPaseJ1 = [];
let candidatosPaseJ2 = [];
let candidatosPaseJ3 = [];
let candidatosPaseJ4 = [];
let candidatosJugadaJ1 = [];
let candidatosJugadaJ2 = [];
let candidatosJugadaJ3 = [];
let candidatosJugadaJ4 = [];
let mejorFichaJugar = '';
let extremos = { izquierdo: null, derecho: null };
let equipo1 = [];
let equipo2 = [];

// Función para crear fichas duales
function crearFichasDual() {
    fichasDual = Array.from({ length: 28 }, (_, i) => [Math.floor(i / 7), i % 7]);
}

// Función para crear fichas separadas
function crearFichasSeparadas() {
    fichasSeparadas = fichasDual.flatMap(([x, y]) => [[x, y], [y, x]]);
}

// Función para llenar lista de fichas
function llenarListaFichas() {
    const lista = document.getElementById('lista-fichas');
    lista.innerHTML = '';
    fichasDual.forEach(ficha => {
        const option = document.createElement('option');
        option.value = ficha.join(',');
        option.textContent = ficha.join(',');
        lista.appendChild(option);
    });
    lista.classList.remove('hidden');
}

// Función para crear mis fichas
function crearMisFichas() {
    misFichas = Array.from({ length: 7 }, () => fichasDual[Math.floor(Math.random() * fichasDual.length)]);
    actualizarVisorMisFichas();
}

// Función para actualizar visor de mis fichas
function actualizarVisorMisFichas() {
    const visor = document.getElementById('visor-mis-fichas');
    visor.innerHTML = misFichas.map(ficha => ficha.join(',')).join('<br>');
    visor.classList.remove('hidden');
}

// Función para crear candidatos a pase
function crearCandidatosPase() {
    candidatosPaseJ1 = misFichas.slice(); // Copia de mis fichas
    // Ejemplo simplificado para otros jugadores, aquí deberías implementar la lógica específica
    candidatosPaseJ2 = fichasDual.filter(ficha => !misFichas.includes(ficha));
    candidatosPaseJ3 = fichasDual.filter(ficha => !misFichas.includes(ficha));
    candidatosPaseJ4 = fichasDual.filter(ficha => !misFichas.includes(ficha));
    actualizarCandidatosPase();
}

// Función para actualizar candidatos a pase
function actualizarCandidatosPase() {
    updateDropdown('candidatos-pase-j1', candidatosPaseJ1);
    updateDropdown('candidatos-pase-j2', candidatosPaseJ2);
    updateDropdown('candidatos-pase-j3', candidatosPaseJ3);
    updateDropdown('candidatos-pase-j4', candidatosPaseJ4);
}

// Función para crear candidatos a jugada
function crearCandidatosJugada() {
    candidatosJugadaJ1 = misFichas.slice(); // Copia de mis fichas
    // Ejemplo simplificado para otros jugadores, aquí deberías implementar la lógica específica
    candidatosJugadaJ2 = fichasDual.filter(ficha => !misFichas.includes(ficha));
    candidatosJugadaJ3 = fichasDual.filter(ficha => !misFichas.includes(ficha));
    candidatosJugadaJ4 = fichasDual.filter(ficha => !misFichas.includes(ficha));
    actualizarCandidatosJugada();
}

// Función para actualizar candidatos a jugada
function actualizarCandidatosJugada() {
    updateDropdown('candidatos-jugada-j1', candidatosJugadaJ1);
    updateDropdown('candidatos-jugada-j2', candidatosJugadaJ2);
    updateDropdown('candidatos-jugada-j3', candidatosJugadaJ3);
    updateDropdown('candidatos-jugada-j4', candidatosJugadaJ4);
}

// Función para crear mejor ficha para jugar
function crearMejorFichaJugar() {
    // Implementa la lógica aquí para definir la mejor ficha para jugar
    // Ejemplo simplificado
    mejorFichaJugar = misFichas[0];
    const visor = document.getElementById('mejor-ficha-jugar');
    visor.textContent = `Mejor ficha para jugar: ${mejorFichaJugar.join(',')}`;
    visor.classList.remove('hidden');
}

// Función para crear extremos
function crearExtremos() {
    extremos = { izquierdo: [0, 0], derecho: [6, 6] };
    const visor = document.getElementById('extremos');
    visor.textContent = `Extremos actuales: Izquierdo ${extremos.izquierdo.join(',')} - Derecho ${extremos.derecho.join(',')}`;
    visor.classList.remove('hidden');
}

// Función para crear variables de equipo
function crearVariablesEquipo() {
    equipo1 = fichasDual.filter(ficha => ficha[0] === 1);
    equipo2 = fichasDual.filter(ficha => ficha[0] === 2);
    const visor1 = document.getElementById('equipo1');
    const visor2 = document.getElementById('equipo2');
    visor1.textContent = `Equipo 1: ${equipo1.map(ficha => ficha.join(',')).join(', ')}`;
    visor2.textContent = `Equipo 2: ${equipo2.map(ficha => ficha.join(',')).join(', ')}`;
    visor1.classList.remove('hidden');
    visor2.classList.remove('hidden');
}

// Función auxiliar para actualizar dropdowns
function updateDropdown(id, items) {
    const dropdown = document.getElementById(id);
    dropdown.innerHTML = '';
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.join(',');
        option.textContent = item.join(',');
        dropdown.appendChild(option);
    });
    dropdown.classList.remove('hidden');
}

// Función para ejecutar pasos según entrada
function executeStep() {
    const step = document.getElementById('step-input').value.trim();
    switch (step) {
        case '1*':
            crearFichasDual();
            break;
        case '2*':
            crearFichasSeparadas();
            break;
        case '3*':
            llenarListaFichas();
            break;
        case '4*':
            if (misFichas.length !== 7) alert('Debe seleccionar exactamente 7 fichas.');
            break;
        case '6*':
            crearMisFichas();
            break;
        case '9*':
            actualizarVisorMisFichas();
            break;
        case '10*':
            crearCandidatosPase();
            break;
        case '11*':
            crearCandidatosJugada();
            break;
        case '13*':
            crearMejorFichaJugar();
            break;
        case '16*':
            crearExtremos();
            break;
        case '17*':
            crearVariablesEquipo();
            break;
        case '18*':
            // Implementar la conversión de fichas duales a fichas separadas aquí.
            break;
        case '19*':
            // Mostrar descripción de grupos
            const output = document.getElementById('output');
            output.innerHTML = `
                <h2>Grupos:</h2>
                <p><strong>Grupo A:</strong> Ficha doble.</p>
                <p><strong>Grupo B:</strong> Suma de los extremos mayor a 6.</p>
                <p><strong>Grupo C:</strong> Tienes 4 o más fichas con el mismo número.</p>
                <p><strong>Grupo D:</strong> Aliado jugó una ficha con alguno de los extremos.</p>
                <p><strong>Grupo E:</strong> Oponente pasó por alguno de los extremos.</p>
                <p><strong>Grupo F:</strong> Aliado no pasó por los extremos.</p>
            `;
            break;
        case '20*':
            document.body.style.backgroundColor = '#D0E3B1'; // Color verde aceituna
            document.querySelectorAll('h1, p').forEach(el => {
                el.style.fontWeight = 'bold';
                el.style.fontSize = 'large';
            });
            break;
        default:
            alert('Paso no reconocido.');
            break;
    }
}
