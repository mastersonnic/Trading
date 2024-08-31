// 1* Variable A: fichas duales
const A = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 3], [3, 4], [3, 5], [3, 6],
    [4, 4], [4, 5], [4, 6],
    [5, 5], [5, 6],
    [6, 6]
];

// 2* Variable B: fichas separadas
const B = [];
const auxiliarB = []; // auxiliar B
A.forEach(ficha => {
    B.push({x: ficha[0], y: ficha[1]});
    auxiliarB.push({x: ficha[1], y: ficha[0]});
});

// 3*, 4*, 5* Lista desplegable C
const listaFichas = document.getElementById('listaFichas');
A.forEach((ficha, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${ficha[0]} | ${ficha[1]}`;
    listaFichas.appendChild(option);
});

listaFichas.addEventListener('change', function() {
    if (this.selectedOptions.length > 7) {
        document.getElementById('mensajeError').textContent = "No puedes seleccionar más de 7 fichas.";
    } else {
        document.getElementById('mensajeError').textContent = "";
    }
});

// 6* Variable D: Mis fichas
let D = [];
const misFichasDiv = document.getElementById('misFichas');

// 7* Visor X
listaFichas.addEventListener('change', function() {
    D = Array.from(this.selectedOptions).map(option => A[option.value]);
    misFichasDiv.textContent = D.map(ficha => `${ficha[0]} | ${ficha[1]}`).join(', ');
});

// 8* Variable W: Fichas seleccionadas (se mantiene hasta el final del juego)
const W = [...D];

// 9* Visor E: Mostrar las fichas duales tomadas de D (ya implementado en 7*)
const visorE = misFichasDiv;

// 10*, 12* Listas desplegables F, G, H, I y variables J, K, L, M
let J = [], K = [], L = [], M = [];
const listaFichasJ1 = document.getElementById('listaFichasJ1');
const listaFichasJ2 = document.getElementById('listaFichasJ2');
const listaFichasJ3 = document.getElementById('listaFichasJ3');
const listaFichasJ4 = document.getElementById('listaFichasJ4');

function actualizarListasDesplegables() {
    [listaFichasJ1, listaFichasJ2, listaFichasJ3, listaFichasJ4].forEach((select, idx) => {
        select.innerHTML = ''; // Clear previous options
        const source = idx === 0 ? D : A.filter(ficha => !D.includes(ficha));
        source.forEach((ficha, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${ficha[0]} | ${ficha[1]}`;
            select.appendChild(option);
        });
    });
}

actualizarListasDesplegables();

// 14*, 15* Variable Y y visor Z
let Y = null;
const visorZ = document.getElementById('mejorFicha');

function actualizarMejorFicha() {
    // Aplicar lógica según los criterios especificados
    Y = D.find(ficha => ficha[0] === ficha[1]) || // A1 (dobles)
        D.find(ficha => (ficha[0] + ficha[1]) > 6) || // B1 (suma > 6)
        D.find(ficha => D.filter(f => f[0] === ficha[0] || f[1] === ficha[1]).length >= 3) || // C1
        D.find(ficha => { /* D1 y E1 (lógica para determinar con base en jugadas previas) */ });

    visorZ.textContent = Y ? `${Y[0]} | ${Y[1]}` : 'No hay mejor ficha.';
}

listaFichas.addEventListener('change', actualizarMejorFicha);

// 17* F1, G1, H1, J1 para extremos de la mesa
let F1 = null, G1 = null;
let H1 = [F1, G1];
const visorExtremoIzquierdo = document.getElementById('extremoIzquierdo');
const visorExtremoDerecho = document.getElementById('extremoDerecho');
const visorExtremosActuales = document.getElementById('extremosActuales');

// 18* K1, L1, M1, N1, O1, P1 para fichas pasadas y visores asociados
let K1 = []; // Fichas a las que pasaron los miembros del equipo 2
let L1 = []; // Fichas a las que pasan los miembros del equipo 2 durante el juego
let M1 = []; // Fichas a las que pasaron los miembros del equipo 1
let N1 = []; // Fichas a las que pasan los miembros del equipo 1 durante el juego

// Visores que muestran K1 y M1
let O1 = document.createElement("div");
O1.id = "visor_equipo1_pasa";
O1.textContent = `Equipo 1 tiene (${K1.join(", ")})`;
document.body.appendChild(O1);

let P1 = document.createElement("div");
P1.id = "visor_equipo2_pasa";
P1.textContent = `Equipo 2 tiene (${M1.join(", ")})`;
document.body.appendChild(P1);

// 19* Convertir todas las variables duales en fichas divididas x e y
function convertirFichasDual(fichasDuales) {
    return fichasDuales.map(ficha => ({x: ficha[0], y: ficha[1]}));
}

// 20* Grupos con el texto solicitado, decorado en tonos de verde aceituna y letras en negrita
let grupoText = `
<div style="color: #556B2F; font-weight: bold; font-size: large;">
    Grupos:
    <ul>
        <li>Grupo A: Ficha doble.</li>
        <li>Grupo B: Suma de los extremos mayor a 6.</li>
        <li>Grupo C: Tienes 4 o más fichas con el mismo número.</li>
        <li>Grupo D: Aliado jugó una ficha con alguno de los extremos.</li>
        <li>Grupo E: Oponente pasó por alguno de los extremos.</li>
        <li>Grupo F: Aliado no pasó por los extremos.</li>
    </ul>
</div>
`;
document.body.innerHTML += grupoText;
