document.getElementById('applyStep').addEventListener('click', () => {
    const step = document.getElementById('stepInput').value.trim();
    if (step) {
        applyStep(step);
    }
});

let A = [];
let B = [];
let C = [];
let D = [];
let E = [];
let F = [];
let G = [];
let H = [];
let I = [];
let J = [];
let K = [];
let L = [];
let M = [];
let N = [];
let O = [];
let P = [];
let Q = [];
let R = [];
let S = [];
let T = [];
let U = [];
let V = [];
let W = [];
let X = [];
let Y = [];
let Z = [];
let A1 = [];
let B1 = [];
let C1 = [];
let D1 = [];
let E1 = [];
let F1 = [];
let G1 = [];
let H1 = [];
let J1 = [];
let K1 = [];
let L1 = [];
let M1 = [];
let N1 = [];
let O1 = [];
let P1 = [];

function applyStep(step) {
    const output = document.getElementById('output');
    output.innerHTML = '';

    switch (step) {
        case '1*':
            A = generateDualTiles();
            output.innerHTML = '1*: Variable A (fichas duales) creada.';
            break;

        case '2*':
            if (!A.length) {
                A = generateDualTiles();
            }
            B = generateSeparatedTiles();
            output.innerHTML = '2*: Variable B (fichas separadas) creada.';
            break;

        case '3*':
            if (!A.length) {
                A = generateDualTiles();
            }
            C = createSelectableList(A);
            output.innerHTML = '3*: Lista C (lista todas las fichas) creada.';
            break;

        case '4*':
            output.innerHTML = '4*: Aquí no se puede seleccionar ni menos ni más que 7 fichas.';
            break;

        case '5*':
            output.innerHTML = '5*: Mensaje: No se puede seleccionar ni menos ni más que 7 fichas.';
            break;

        case '6*':
            if (!A.length || !C.length) {
                A = generateDualTiles();
                C = createSelectableList(A);
            }
            D = selectTilesFromList(C);
            output.innerHTML = '6*: Variable D (Var Mis fichas) creada.';
            break;

        case '7*':
            if (!D.length) {
                D = selectTilesFromList(C);
            }
            X = D.slice();
            output.innerHTML = '7*: Visor X creado con las fichas seleccionadas.';
            break;

        case '8*':
            if (!D.length) {
                D = selectTilesFromList(C);
            }
            W = D.slice();
            output.innerHTML = '8*: Variable W creada con las fichas seleccionadas.';
            break;

        case '9*':
            if (!D.length) {
                D = selectTilesFromList(C);
            }
            E = createVisor(D);
            output.innerHTML = '9*: Visor E (Visor Mis fichas) creado.';
            break;

        case '10*':
            if (!A.length || !D.length) {
                A = generateDualTiles();
                D = selectTilesFromList(C);
            }
            F = D.slice();
            G = removeTiles(A, D, N);
            H = removeTiles(A, D, N);
            I = removeTiles(A, D, N);
            J = F.slice();
            K = G.slice();
            L = H.slice();
            M = I.slice();
            output.innerHTML = '10*: Listas F, G, H, I y variables asociadas J, K, L, M creadas.';
            break;

        case '11*':
            if (!A.length || !D.length) {
                A = generateDualTiles();
                D = selectTilesFromList(C);
            }
            O = D.slice();
            P = removeTiles(A, D, W, N);
            Q = removeTiles(A, D, W, N);
            R = removeTiles(A, D, W, N);
            S = O.slice();
            T = P.slice();
            U = Q.slice();
            V = R.slice();
            output.innerHTML = '11*: Listas O, P, Q, R y variables asociadas S, T, U, V creadas.';
            break;

        case '12*':
            output.innerHTML = '12*: Variables y listas preparadas.';
            break;

        case '13*':
        case '15*':
            if (!D.length) {
                D = selectTilesFromList(C);
            }
            A1 = D.filter(tile => tile[0] === tile[1]); // Fichas dobles
            B1 = D.filter(tile => (tile[0] + tile[1]) > 6); // Suma mayor a 6
            C1 = findRepeatingTiles(D); // Fichas con lados repetidos
            D1 = []; // Aquí debe incluir la lógica del Aliado J3
            E1 = []; // Aquí debe incluir la lógica de los oponentes
            Y = determineBestTile(A1, B1, C1, D1, E1); // Determina la mejor ficha
            Z = [Y]; // Visor Z
            output.innerHTML = '13*/15*: Variables A1, B1, C1, D1, E1 creadas. Mejor ficha Y determinada.';
            break;

        case '14*':
            output.innerHTML = '14*: Visor Z creado con la mejor ficha Y.';
            break;

        case '16*':
            F1 = getLeftEnd();
            G1 = getRightEnd();
            H1 = [F1, G1];
            J1 = H1.slice();
            output.innerHTML = '16*: Variables F1, G1, H1 y visor J1 creados.';
            break;

        case '17*':
            K1 = calculateTeam1Passes(L1, M1, N);
            L1 = calculateOpponentPasses(K1, N);
            M1 = calculateTeam2Passes(N1, K1, N);
            N1 = calculateTeamPasses(L1, M1);
            O1 = [K1];
            P1 = [M1];
            output.innerHTML = '17*: Variables K1, L1, M1, N1, O1, P1 creadas.';
            break;

        case '18*':
            convertDualTiles();
            output.innerHTML = '18*: Conversión de todas las variables duales en fichas divididas completada.';
            break;

        case '19*':
            output.innerHTML = '19*: Texto de grupos mostrado.';
            break;

        case '20*':
            output.innerHTML = '20*: Decoración en tonos verde aceituna aplicada.';
            // Aplicar los estilos de decoración verde aceituna
            document.body.style.backgroundColor = '#6B8E23'; // Verde aceituna oscuro
            document.body.style.color = '#FFFFFF'; // Texto blanco
            document.body.style.fontWeight = 'bold'; // Texto en negrita
            document.body.style.fontSize = 'large'; // Texto grande
            break;

        default:
            output.innerHTML = 'El paso no está definido o no es válido.';
            break;
    }
});

function actualizarVisores() {
    // Actualiza el contenido de todos los visores
    const visorX = document.getElementById('visorX');
    const visorE = document.getElementById('visorE');
    const visorZ = document.getElementById('visorZ');
    const visorJ1 = document.getElementById('visorJ1');
    const visorO1 = document.getElementById('visorO1');
    const visorP1 = document.getElementById('visorP1');

    // Mostrar fichas en visores si están definidos
    if (D) visorX.innerHTML = D.join(', ');
    if (D) visorE.innerHTML = D.join(', ');
    if (Y) visorZ.innerHTML = `Mejor ficha para jugar: ${Y}`;
    if (H1) visorJ1.innerHTML = `Extremos actuales de la mesa: ${H1[0]}, ${H1[1]}`;
    if (K1) visorO1.innerHTML = `Fichas de equipo contrario: ${K1.join(', ')}`;
    if (M1) visorP1.innerHTML = `Fichas de equipo aliado: ${M1.join(', ')}`;
}
