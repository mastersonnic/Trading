// Variables globales
let A = []; // "Fichas duales"
let B = []; // "Fichas separadas"
let C = []; // "Lista todas las fichas"
let D = []; // "Var Mis fichas"
let E = []; // "Visor Mis fichas"
let W = []; // Lista auxiliar de mis fichas al inicio
let F = [], G = [], H = [], I = []; // Listas de candidatas a pases
let J = [], K = [], L = [], M = []; // Variables asociadas a F, G, H, I
let O = [], P = [], Q = [], R = []; // Listas de candidatas a jugadas
let S = [], T = [], U = [], V = []; // Variables asociadas a O, P, Q, R
let Y = null; // "Mejor ficha para jugar"
let Z = null; // Visor para la mejor ficha Y
let A1 = [], B1 = [], C1 = [], D1 = [], E1 = []; // Variables para determinar la mejor ficha
let F1 = null, G1 = null, H1 = null, J1 = null; // Variables de extremos de la mesa
let K1 = [], L1 = [], M1 = [], N1 = []; // Variables de fichas pasadas y jugadas por equipos
let O1 = null, P1 = null; // Visores para K1 y M1

// Función para manejar la entrada del paso
function procesarPaso(paso) {
    switch (paso) {
        case '1*':
            crearVariableA();
            break;
        case '2*':
            crearVariableB();
            break;
        case '3*':
            crearListaC();
            break;
        case '6*':
            crearVariableD();
            break;
        case '9*':
            crearVisorE();
            break;
        case '10*':
            crearListasFGHI();
            break;
        case '11*':
            crearListasOPQR();
            break;
        case '13*':
            calcularMejorFicha();
            break;
        case '14*':
            crearExtremosMesa();
            break;
        case '15*':
            crearVariablesSeguimiento();
            break;
        default:
            console.log("Paso no reconocido. Verifique el valor ingresado.");
            break;
    }
}

// Funciones para crear variables y listas
function crearVariableA() {
    if (A.length === 0) {
        A = generarFichas();
        console.log("Variable A creada: Fichas duales.");
    }
}

function crearVariableB() {
    if (B.length === 0) {
        crearVariableA(); // A se necesita antes de crear B
        B = A.flatMap(ficha => [{ x: ficha[0], y: ficha[1] }, { x: ficha[1], y: ficha[0] }]);
        console.log("Variable B creada: Fichas separadas.");
    }
}

function crearListaC() {
    if (C.length === 0) {
        crearVariableA(); // A se necesita antes de crear C
        C = [...A];
        console.log("Lista C creada: Lista todas las fichas.");
    }
}

function crearVariableD() {
    if (D.length === 0) {
        crearListaC(); // C se necesita antes de crear D
        D = seleccionarFichasDeC(7);
        W = [...D]; // Guardar las fichas en W al inicio
        console.log("Variable D creada: Var Mis fichas.");
    }
}

function crearVisorE() {
    if (E.length === 0) {
        crearVariableD(); // D se necesita antes de crear E
        E = [...D];
        console.log("Visor E creado: Visor Mis fichas.");
    }
}

function crearListasFGHI() {
    if (F.length === 0 || G.length === 0 || H.length === 0 || I.length === 0) {
        crearVariableD(); // D se necesita antes de crear F, G, H, I
        F = [...D];
        G = H = I = A.filter(ficha => !D.includes(ficha));
        console.log("Listas F, G, H, I creadas para candidatas a pases.");
    }
}

function crearListasOPQR() {
    if (O.length === 0 || P.length === 0 || Q.length === 0 || R.length === 0) {
        crearVariableD(); // D se necesita antes de crear O, P, Q, R
        O = [...D];
        P = Q = R = A.filter(ficha => !D.includes(ficha) && !W.includes(ficha));
        console.log("Listas O, P, Q, R creadas para candidatas a jugadas.");
    }
}

function calcularMejorFicha() {
    if (Y === null) {
        crearVariablesA1toE1(); // Crear A1, B1, C1, D1, E1
        Y = determinarMejorFicha([A1, B1, C1, D1, E1]);
        Z = Y;
        console.log("Mejor ficha para jugar calculada: ", Y);
    }
}

function crearExtremosMesa() {
    if (F1 === null || G1 === null) {
        F1 = obtenerExtremoIzquierdo();
        G1 = obtenerExtremoDerecho();
        H1 = [F1, G1];
        J1 = H1;
        console.log("Variables F1, G1, H1, J1 creadas para los extremos de la mesa.");
    }
}

function crearVariablesSeguimiento() {
    if (K1.length === 0 || L1.length === 0 || M1.length === 0 || N1.length === 0) {
        K1 = obtenerFichasPasadasEquipo2();
        L1 = obtenerFichasPasadasEquipo2();
        M1 = obtenerFichasPasadasEquipo1();
        N1 = obtenerFichasPasadasEquipo1();
        O1 = K1;
        P1 = M1;
        console.log("Variables K1, L1, M1, N1, O1, P1 creadas para seguimiento de extremos y jugadas.");
    }
}

// Funciones auxiliares
function generarFichas() {
    const fichas = [];
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            fichas.push([i, j]);
        }
    }
    return fichas;
}

function seleccionarFichasDeC(cantidad) {
    // Implementar lógica para seleccionar fichas
    return C.slice(0, cantidad); // Por ahora, devuelve las primeras fichas de C
}

function crearVariablesA1toE1() {
    A1 = D.filter(ficha => ficha[0] === ficha[1]); // Dobles
    B1 = D.filter(ficha => ficha[0] + ficha[1] > 6); // Suma mayor a 6
    C1 = determinarFrecuencias(D); // Número que se repite en al menos 3 fichas
    D1 = determinarFichasAliado(); // Fichas donde aliado jugó el número como extremo
    E1 = determinarFichasOponenteNoPaso(); // Fichas donde oponente no pasó en el extremo
    console.log("Variables A1, B1, C1, D1, E1 creadas para calcular la mejor ficha.");
}

function determinarFrecuencias(fichas) {
    // Implementar lógica para determinar números que se repiten en al menos 3 fichas
    return fichas;
}

function determinarFichasAliado() {
    // Implementar lógica para determinar fichas donde aliado jugó el número como extremo
    return [];
}

function determinarFichasOponenteNoPaso() {
    // Implementar lógica para determinar fichas donde oponente no pasó en el extremo
    return [];
}

function determinarMejorFicha(grupos) {
    // Implementar lógica para determinar la mejor ficha en base a los grupos A1, B1, C1, D1, E1
    return grupos[0][0]; // Por ahora, devolver la primera ficha de A1
}

function obtenerExtremoIzquierdo() {
    // Implementar lógica para obtener el extremo izquierdo de la mesa
    return 0;
}

function obtenerExtremoDerecho() {
    // Implementar lógica para obtener el extremo derecho de la mesa
    return 0;
}

function obtenerFichasPasadasEquipo2() {
    // Implementar lógica para obtener fichas pasadas por el equipo 2
    return [];
}

function obtenerFichasPasadasEquipo1() {
    // Implementar lógica para obtener fichas pasadas por el equipo 1
    return [];
}

// Manejar la entrada del usuario
document.getElementById('input-paso').addEventListener('input', (event) => {
    const paso = event.target.value;
    procesarPaso(paso);
});
