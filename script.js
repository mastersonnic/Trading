// 1* Crear variable A "fichas duales" que contiene las 28 fichas de dominó con sus dos números.
const A = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 3], [3, 4], [3, 5], [3, 6],
    [4, 4], [4, 5], [4, 6],
    [5, 5], [5, 6],
    [6, 6]
];

// 2* Crear variable B "fichas separadas" y cualquier posible auxiliar.
const B = [];
A.forEach(tile => {
    B.push({x: tile[0], y: tile[1]});
});

// 3* Crear una lista desplegable C "lista todas las fichas".
const tileSelect = document.getElementById('all-tiles');
A.forEach(tile => {
    const option = document.createElement('option');
    option.value = tile;
    option.textContent = `Ficha ${tile[0]},${tile[1]}`;
    tileSelect.appendChild(option);
});

// 4* Aquí no se puede seleccionar ni menos ni más que 7 fichas sino 
// 5* muestra un mensaje inherente.
document.getElementById('select-tiles').addEventListener('click', () => {
    const selectedOptions = Array.from(tileSelect.selectedOptions);
    if (selectedOptions.length !== 7) {
        document.getElementById('message').textContent = "Debe seleccionar exactamente 7 fichas.";
    } else {
        document.getElementById('message').textContent = "";
        // 6* Crear una variable D "Var Mis fichas" junto a un 
        const D = selectedOptions.map(option => option.value);

        // 7* Visor X que contendría todas las fichas seleccionadas en C. 
        const selectedTilesList = document.getElementById('selected-tiles');
        selectedTilesList.innerHTML = '';
        D.forEach(tile => {
            const li = document.createElement('li');
            li.textContent = tile;
            selectedTilesList.appendChild(li);
        });

        // 8* Permanece la variable W con las 7 fichas.
        const W = [...D];
    }
});

// 9* Crear un visor E "Visor Mis fichas".
const E = document.getElementById('selected-tiles');

// 10* Crear listas desplegables F, G, H, e I cada una con una 
// 11* variable asociada J, K, L, M.
const F = document.getElementById('candidate-pass');
const G = []; // J2's tiles
const H = []; // J3's tiles
const I = []; // J4's tiles
let J = [];
let K = [];
let L = [];
let M = [];

// Populate candidate pass list for J1
const populateCandidatePass = () => {
    F.innerHTML = '';
    D.forEach(tile => {
        const option = document.createElement('option');
        option.value = tile;
        option.textContent = tile;
        F.appendChild(option);
    });
};

// 12* Crear listas desplegables O, P, Q, e R cada una con una 
// 13* variable asociada S, T, U, V.
const O = document.getElementById('candidate-play');
const P = []; // J2's play list
const Q = []; // J3's play list
const R = []; // J4's play list
let S = [];
let T = [];
let U = [];
let V = [];

// Populate candidate play list for J1
const populateCandidatePlay = () => {
    O.innerHTML = '';
    D.forEach(tile => {
        const option = document.createElement('option');
        option.value = tile;
        option.textContent = tile;
        O.appendChild(option);
    });
};

// 14* Crear una variable Y, llamada "mejor ficha para jugar" junto con 
// 15* un visor Z que cumple con el criterio mejor ficha.
const Z = document.getElementById('best-tile');

const calculateBestTile = () => {
    let Y = null;
    // Apply logic for determining the best tile...
    // This is a placeholder logic. Real logic depends on the criteria mentioned in the steps.
    Y = D.find(tile => tile.includes(6)); // Example logic, not final
    Z.textContent = `Mejor ficha para jugar: ${Y}`;
};

// 17* Crear F1, G1, H1 y J1.
let F1 = null; // extremo izquierdo
let G1 = null; // extremo derecho
let H1 = []; // par de extremos
const J1 = document.getElementById('table-extremes');

// 18* Crear a K1, L1, M1, N1, O1 y P1.
let K1 = []; // Fichas de J2 y J4 no jugadas
let L1 = []; // Fichas a las que pasa equipo contrario
let M1 = []; // Fichas de J1 y J3 no jugadas
let N1 = []; // Fichas a las que pasa equipo propio
const O1 = document.getElementById('team1-passes');
const P1 = document.getElementById('team2-passes');

// 19* Variables para convertir todas las variables duales.
const convertToSeparateTiles = (dualTiles) => {
    const separateTiles = [];
    dualTiles.forEach(tile => {
        separateTiles.push({x: tile[0], y: tile[1]});
    });
    return separateTiles;
};

// 20* Mostrar texto de grupos debajo de todo.
