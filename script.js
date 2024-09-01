// script.js

// Variable A: "fichas duales"
let A = [
    {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 0, y: 5}, {x: 0, y: 6},
    {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}, {x: 1, y: 5}, {x: 1, y: 6},
    {x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4}, {x: 2, y: 5}, {x: 2, y: 6},
    {x: 3, y: 3}, {x: 3, y: 4}, {x: 3, y: 5}, {x: 3, y: 6},
    {x: 4, y: 4}, {x: 4, y: 5}, {x: 4, y: 6},
    {x: 5, y: 5}, {x: 5, y: 6},
    {x: 6, y: 6}
];

// Variable B: "fichas separadas"
let B = [];
A.forEach(ficha => {
    B.push({x: ficha.x, y: ficha.y});
    B.push({x: ficha.y, y: ficha.x});
});

// Lista desplegable C: "lista todas las fichas"
let C = []; // Esta se llenará con la selección del usuario desde A

// Variable D: "Var Mis fichas"
let D = []; // Se llenará con la selección de C

// Visor X: Muestra las fichas seleccionadas en D
let X = [];

// Variable W: "Todas las fichas iniciales seleccionadas"
let W = []; // Se llenará con D y se mantendrá constante

// Visor E: Muestra las fichas duales en D
let E = D;

// Variables y listas F, G, H, I, J, K, L, M, N
let F = D; // Lista desplegable para candidatas a pases de J1
let G = A.filter(ficha => !D.includes(ficha)); // Candidatas de J2
let H = A.filter(ficha => !D.includes(ficha)); // Candidatas de J3
let I = A.filter(ficha => !D.includes(ficha)); // Candidatas de J4
let J = []; // Fichas seleccionadas por J1 al pasar
let K = []; // Fichas seleccionadas por J2 al pasar
let L = []; // Fichas seleccionadas por J3 al pasar
let M = []; // Fichas seleccionadas por J4 al pasar
let N = []; // Fichas jugadas por cualquier jugador

// Variables S, T, U, V y listas O, P, Q, R
let O = D; // Lista desplegable para candidatas a jugada de J1
let P = A.filter(ficha => !D.includes(ficha) && !N.includes(ficha)); // Candidatas de J2 para jugar
let Q = A.filter(ficha => !D.includes(ficha) && !N.includes(ficha)); // Candidatas de J3 para jugar
let R = A.filter(ficha => !D.includes(ficha) && !N.includes(ficha)); // Candidatas de J4 para jugar
let S = []; // Fichas seleccionadas por J1 al jugar
let T = []; // Fichas seleccionadas por J2 al jugar
let U = []; // Fichas seleccionadas por J3 al jugar
let V = []; // Fichas seleccionadas por J4 al jugar

// Variables y Visor para extremos de la mesa
let F1 = null; // Extremo izquierdo de la mesa
let G1 = null; // Extremo derecho de la mesa
let H1 = {left: F1, right: G1}; // Par de extremos actuales de la mesa
let J1 = H1; // Visor para mostrar H1

// Variable Y: "Mejor ficha para jugar" y Visor Z
let Y = null;
let Z = null;

// Variables A1, B1, C1, D1, E1 para determinar la mejor ficha para jugar
function calcularMejorFicha() {
    let A1 = D.filter(ficha => ficha.x === ficha.y); // Fichas dobles
    let B1 = D.filter(ficha => ficha.x + ficha.y > 6); // Fichas que suman más de 6
    let C1 = []; // Número que se repite en al menos 3 fichas
    let numeroRepetido = {};
    D.forEach(ficha => {
        numeroRepetido[ficha.x] = (numeroRepetido[ficha.x] || 0) + 1;
        numeroRepetido[ficha.y] = (numeroRepetido[ficha.y] || 0) + 1;
    });
    for (let num in numeroRepetido) {
        if (numeroRepetido[num] >= 3) {
            C1.push(num);
        }
    }

    let D1 = D.filter(ficha => ficha.x === F1 || ficha.y === F1); // Ficha que J3 jugó con un extremo en la mesa
    let E1 = D.filter(ficha => ficha.x === G1 || ficha.y === G1); // Ficha que J3 no pasó a jugar con ese extremo

    // Determinar la mejor ficha (Y) basada en la cantidad de grupos en los que encaja
    let mejorFicha = null;
    let maxGrupos = 0;

    D.forEach(ficha => {
        let grupos = 0;
        if (A1.includes(ficha)) grupos++;
        if (B1.includes(ficha)) grupos++;
        if (C1.includes(ficha.x) || C1.includes(ficha.y)) grupos++;
        if (D1.includes(ficha)) grupos++;
        if (!E1.includes(ficha)) grupos++;

        if (grupos > maxGrupos) {
            maxGrupos = grupos;
            mejorFicha = ficha;
        }
    });

    Y = mejorFicha; // Asignar la mejor ficha para jugar
    Z = `Mejor ficha para jugar: ${Y ? `(${Y.x}, ${Y.y})` : "No hay una mejor ficha"}`; // Mostrar el resultado
}

// Variables adicionales para seguimiento de extremos y jugadas
let K1 = []; // Fichas a las que pasaron J2 y J4 pero aún no están en N
let L1 = []; // Fichas a las que pasaron J2 y J4
let M1 = []; // Fichas a las que pasaron J1 y J3 pero aún no están en N
let N1 = []; // Fichas a las que pasaron J1 y J3
let O1 = K1; // Visor para mostrar K1
let P1 = M1; // Visor para mostrar M1

// Texto final que muestra los grupos
let textoFinal = "Grupos:\n" +
                 "Grupo A: Ficha doble.\n" +
                 "Grupo B: Suma de los extremos mayor a 6.\n" +
                 "Grupo C: Tienes 4 o más fichas con el mismo número.\n" +
                 "Grupo D: Aliado jugó una ficha con alguno de los extremos.\n" +
                 "Grupo E: Oponente pasó por alguno de los extremos.\n" +
                 "Grupo F: Aliado no pasó por los extremos.";

console.log(textoFinal);

// Lógica de creación dinámica en base a los pasos ingresados
function procesarPaso(paso) {
    switch (paso) {
        case '1*':
            console.log("Variable A creada: 'fichas duales'.");
            break;
        case '2*':
            console.log("Variable B creada: 'fichas separadas'.");
            break;
        case '3*':
            console.log("Lista desplegable C creada: 'lista todas las fichas'.");
            break;
        case '6*':
            console.log("Variable D creada: 'Var Mis fichas'. Visor X creado.");
            break;
        case '9*':
            console.log("Visor E creado: 'Visor Mis fichas'.");
            break;
        case '10*':
            console.log("Listas desplegables F, G, H, I creadas. Variables J, K, L, M creadas.");
            break;
        case '11*':
            console.log("Listas desplegables O, P, Q, R creadas. Variables S, T, U, V creadas.");
            break;
        case '13*':
    calcularMejorFicha();
    console.log(`Variable Y creada: 'Mejor ficha para jugar'.`);
    console.log(`Visor Z creado: ${Z}`);
    break;
case '14*':
    console.log("Variables F1, G1, H1, J1 creadas para los extremos de la mesa.");
    break;
case '15*':
    console.log("Variables K1, L1, M1, N1, O1, P1 creadas para seguimiento de extremos y jugadas.");
    break;
default:
    console.log("Paso no reconocido. Verifique el valor ingresado.");
    break;
}

// Función para inicializar el juego
function iniciarJuego() {
    console.log("Iniciando el juego de dominó...");
    // Aquí se inicializan las variables y se configuran las listas
    // Esta parte del código permite que el usuario seleccione sus fichas, se configure el tablero, y se procesen las jugadas
}

// Ejemplo de uso del código
let pasos = ['1*', '2*', '3*', '6*', '9*', '10*', '11*', '13*', '14*', '15*'];
pasos.forEach(paso => procesarPaso(paso));

console.log("Juego de dominó configurado exitosamente.");
