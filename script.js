// 1* A: Fichas duales
let A = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 3], [3, 4], [3, 5], [3, 6],
    [4, 4], [4, 5], [4, 6],
    [5, 5], [5, 6],
    [6, 6]
];

// 2* B: Fichas separadas
let B = [];
let auxiliarB = [];

A.forEach(ficha => {
    B.push({x: ficha[0], y: ficha[1]});
    auxiliarB.push({x: ficha[0], y: ficha[1]});
    auxiliarB.push({x: ficha[1], y: ficha[0]});
});

// 3* C: Lista desplegable para seleccionar fichas
let listaFichas = document.getElementById("fichas-lista");
A.forEach((ficha, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = `${ficha[0]}, ${ficha[1]}`;
    listaFichas.appendChild(option);
});

// 4* y 5* Verificación de selección de 7 fichas
listaFichas.addEventListener("change", function () {
    let selectedOptions = Array.from(listaFichas.selectedOptions);
    if (selectedOptions.length !== 7) {
        document.getElementById("error-msg").textContent = "Debes seleccionar exactamente 7 fichas.";
    } else {
        document.getElementById("error-msg").textContent = "";
        D = selectedOptions.map(option => A[option.value]);
        actualizarVisorMisFichas();
    }
});

// 6* y 7* D: "Mis fichas" y visor X
let D = [];
let W = [];

function actualizarVisorMisFichas() {
    W = [...D];
    let visor = document.getElementById("visor-mis-fichas");
    visor.textContent = `Mis fichas: ${D.map(ficha => `${ficha[0]}, ${ficha[1]}`).join(" | ")}`;
}

// 9* E: Visor de "Mis fichas"
function mostrarVisorE() {
    let visorE = document.getElementById("mejor-ficha");
    visorE.textContent = `Mis fichas: ${D.map(ficha => `${ficha[0]}, ${ficha[1]}`).join(" | ")}`;
}

// 10* Listas desplegables F, G, H, I para candidatas a pase
let F = [], G = [], H = [], I = [];

function inicializarListasPase() {
    F = D;
    G = H = I = A.filter(ficha => !D.includes(ficha) && !N.includes(ficha));
}

function crearListaDesplegable(id, opciones) {
    let select = document.getElementById(id);
    opciones.forEach((ficha, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${ficha[0]}, ${ficha[1]}`;
        select.appendChild(option);
    });
}

crearListaDesplegable("jugada-j1", F);
crearListaDesplegable("jugada-j2", G);
crearListaDesplegable("jugada-j3", H);
crearListaDesplegable("jugada-j4", I);

// 12* Listas O, P, Q, R para jugadas
let O = [], P = [], Q = [], R = [];

function inicializarListasJugadas() {
    O = D;
    P = Q = R = A.filter(ficha => !D.includes(ficha) && !W.includes(ficha) && !N.includes(ficha));
}

function crearListaJugadas(id, opciones) {
    let select = document.getElementById(id);
    opciones.forEach((ficha, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${ficha[0]}, ${ficha[1]}`;
        select.appendChild(option);
    });
}

crearListaJugadas("jugada-j1", O);
crearListaJugadas("jugada-j2", P);
crearListaJugadas("jugada-j3", Q);
crearListaJugadas("jugada-j4", R);

// 14* Y: Mejor ficha para jugar y 15* Z: Visor
let Y = null;

function calcularMejorFicha() {
    let dobles = D.filter(ficha => ficha[0] === ficha[1]);
    let mayor6 = D.filter(ficha => ficha[0] + ficha[1] > 6);
    let repetidos = D.filter(ficha => D.filter(f => f[0] === ficha[0] || f[1] === ficha[0]).length >= 3);
    // Aquí se podría implementar la lógica para calcular Y basada en:
// 1. Si tiene dobles (priorizar dobles)
// 2. Si la suma de los números de la ficha es mayor que 6
// 3. Si la ficha tiene repetición de números en las demás fichas en mano

function calcularMejorFicha() {
    // Buscar dobles
    let dobles = D.filter(ficha => ficha[0] === ficha[1]);
    
    // Buscar fichas cuya suma sea mayor a 6
    let mayor6 = D.filter(ficha => ficha[0] + ficha[1] > 6);
    
    // Buscar fichas que tienen repetición de números en la mano
    let repetidos = D.filter(ficha => {
        return D.filter(f => f[0] === ficha[0] || f[1] === ficha[0]).length >= 3;
    });

    // Priorizar los dobles
    if (dobles.length > 0) {
        Y = dobles[0];
    } 
    // Priorizar las fichas con suma mayor a 6
    else if (mayor6.length > 0) {
        Y = mayor6[0];
    }
    // Priorizar las fichas con números repetidos
    else if (repetidos.length > 0) {
        Y = repetidos[0];
    } 
    // Si ninguna de las anteriores, elegir la primera ficha disponible
    else {
        Y = D[0];
    }

    mostrarMejorFicha();
}

function mostrarMejorFicha() {
    let visor = document.getElementById("mejor-ficha");
    if (Y) {
        visor.textContent = `Mejor ficha para jugar: ${Y[0]}, ${Y[1]} (Por qué: ${explicarMejorFicha()})`;
    } else {
        visor.textContent = "No hay fichas disponibles para sugerir.";
    }
}

function explicarMejorFicha() {
    if (Y[0] === Y[1]) {
        return "Es un doble, que generalmente es más fuerte.";
    } else if (Y[0] + Y[1] > 6) {
        return "Tiene una suma de puntos alta.";
    } else {
        return "Tiene un número repetido en tu mano.";
    }
}

// 16* Extremos de la mesa (L y M)
let L = [], M = [];

function actualizarExtremosMesa(ficha) {
    if (L.length === 0) {
        // Primer movimiento, ambos extremos son la ficha jugada
        L = [ficha[0], ficha[1]];
    } else {
        // Actualizar extremos con la nueva ficha jugada
        if (L[0] === ficha[0]) {
            L[0] = ficha[1];
        } else if (L[0] === ficha[1]) {
            L[0] = ficha[0];
        } else if (L[1] === ficha[0]) {
            L[1] = ficha[1];
        } else if (L[1] === ficha[1]) {
            L[1] = ficha[0];
        }
    }
    mostrarExtremosMesa();
}

function mostrarExtremosMesa() {
    let visor = document.getElementById("extremos-mesa");
    visor.textContent = `Extremos de la mesa: ${L[0]}, ${L[1]}`;
}

// 18* K1, L1, M1, N1, O1, P1 para fichas pasadas
let K1 = [], L1 = [], M1 = [], N1 = [], O1 = [], P1 = [];

function actualizarFichasPasadas(jugador, ficha) {
    switch (jugador) {
        case 1: K1.push(ficha); break;
        case 2: L1.push(ficha); break;
        case 3: M1.push(ficha); break;
        case 4: N1.push(ficha); break;
        case 5: O1.push(ficha); break;
        case 6: P1.push(ficha); break;
    }
    mostrarFichasPasadas();
}

function mostrarFichasPasadas() {
    document.getElementById("visor-equipo1-pasa").textContent = `Equipo 1 pasó fichas: ${K1.map(f => `${f[0]}, ${f[1]}`).join(" | ")}`;
    document.getElementById("visor-equipo2-pasa").textContent = `Equipo 2 pasó fichas: ${L1.map(f => `${f[0]}, ${f[1]}`).join(" | ")}`;
}

// Ejemplo de uso y flujo de funciones
document.getElementById("jugada-j1").addEventListener("change", function () {
    let selectedIndex = this.selectedIndex;
    let fichaSeleccionada = O[selectedIndex];
    actualizarExtremosMesa(fichaSeleccionada);
    actualizarFichasPasadas(1, fichaSeleccionada);
    calcularMejorFicha();
});

document.getElementById("jugada-j2").addEventListener("change", function () {
    let selectedIndex = this.selectedIndex;
    let fichaSeleccionada = P[selectedIndex];
    actualizarExtremosMesa(fichaSeleccionada);
    actualizarFichasPasadas(2, fichaSeleccionada);
    calcularMejorFicha();
});

document.getElementById("jugada-j3").addEventListener("change", function () {
    let selectedIndex = this.selectedIndex;
    let fichaSeleccionada = Q[selectedIndex];
    actualizarExtremosMesa(fichaSeleccionada);
    actualizarFichasPasadas(3, fichaSeleccionada);
    calcularMejorFicha();
});

document.getElementById("jugada-j4").addEventListener("change", function () {
    let selectedIndex = this.selectedIndex;
    let fichaSeleccionada = R[selectedIndex];
    actualizarExtremosMesa(fichaSeleccionada);
    actualizarFichasPasadas(4, fichaSeleccionada);
    calcularMejorFicha();
});

// Inicialización
inicializarListasPase();
inicializarListasJugadas();
calcularMejorFicha();
mostrarMejorFicha();
