const todasLasFichas = [
    '0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6',
    '1,1', '1,2', '1,3', '1,4', '1,5', '1,6',
    '2,2', '2,3', '2,4', '2,5', '2,6',
    '3,3', '3,4', '3,5', '3,6',
    '4,4', '4,5', '4,6',
    '5,5', '5,6',
    '6,6'
];

document.addEventListener("DOMContentLoaded", () => {
    cargarFichas('misFichasDropdown');
    cargarFichas('pasesEquipo1Dropdown');
    cargarFichas('pasesEquipo2Dropdown');
    cargarFichas('jugadasEquipo1Dropdown');
    cargarFichas('jugadasEquipo2Dropdown');

    const extremosContainer = document.createElement("div");
    extremosContainer.id = "extremosActualesContainer";
    extremosContainer.style.marginTop = "10px";
    extremosContainer.style.fontWeight = "bold";
    extremosContainer.innerHTML = "<strong>Extremos actuales:</strong> ";
    document.body.appendChild(extremosContainer);

    const gruposContainer = document.createElement("div");
    gruposContainer.id = "gruposContainer";
    gruposContainer.style.marginTop = "10px";
    gruposContainer.style.fontWeight = "bold";
    gruposContainer.innerHTML = `
        <strong>Definición de los grupos:</strong><br>
        Grupo A: Ficha doble.<br>
        Grupo B: Suma de los extremos mayor a 6.<br>
        Grupo C: Tienes 4 o más fichas con el mismo número.<br>
        Grupo D: Aliado jugó una ficha que se convirtió en extremo en algún momento.<br>
        Grupo E: Oponente pasó por alguno de los extremos.<br>
        Grupo F: Aliado no pasó por los extremos, y la ficha se convertirá en un extremo.
    `;
    document.body.appendChild(gruposContainer);

    const equiposContainer = document.createElement("div");
    equiposContainer.id = "equiposContainer";
    equiposContainer.style.marginTop = "10px";
    equiposContainer.style.fontWeight = "bold";
    equiposContainer.innerHTML = `
        <strong>Estado de los Equipos:</strong><br>
        Equipo 1 tiene: <span id="equipo1Fichas"></span><br>
        Equipo 2 tiene: <span id="equipo2Fichas"></span>
    `;
    document.body.appendChild(equiposContainer);
});

function cargarFichas(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    todasLasFichas.forEach(ficha => {
        const option = document.createElement('option');
        option.value = ficha;
        option.textContent = ficha;
        dropdown.appendChild(option);
    });
}

function actualizarMisFichas() {
    const dropdown = document.getElementById("misFichasDropdown");
    const seleccionadas = Array.from(dropdown.selectedOptions).map(opt => opt.value);

    if (seleccionadas.length > 7) {
        alert("Solo puedes seleccionar 7 fichas.");
        return;
    }

    const jugadas = obtenerJugadasCombinadas();
    const fichasRestantes = seleccionadas.filter(ficha => !jugadas.includes(ficha));

    document.getElementById("misFichasVisor").textContent = fichasRestantes.join(", ");
    calcularMejorFicha();  // Actualizar mejor ficha al seleccionar fichas
}

function actualizarVisor(dropdownId, visorId) {
    const dropdown = document.getElementById(dropdownId);
    const seleccionadas = Array.from(dropdown.selectedOptions).map(opt => opt.value);
    document.getElementById(visorId).textContent = seleccionadas.join(", ");
}

function calcularGruposCumplidos(ficha, x, y, jugadasEquipo1, jugadasEquipo2, pasesEquipo1, pasesEquipo2, misFichas) {
    let grupos = [];

    if (x === y) {
        grupos.push('A');
    }

    if ((x + y) > 6) {
        grupos.push('B');
    }

    const countX = misFichas.filter(f => f.includes(x.toString())).length;
    const countY = misFichas.filter(f => f.includes(y.toString())).length;
    if (countX >= 4 || countY >= 4) {
        grupos.push('C');
    }

    const extremosAliado = obtenerExtremosEnAlgunaJugada(jugadasEquipo1);
    if (extremosAliado.includes(x) || extremosAliado.includes(y)) {
        grupos.push('D');
    }

    if (pasesEquipo2.some(f => f.includes(x.toString())) || pasesEquipo2.some(f => f.includes(y.toString()))) {
        grupos.push('E');
    }

    const extremosActuales = obtenerExtremosActuales(jugadasEquipo1, jugadasEquipo2);
    if ((extremosActuales.includes(x) || extremosActuales.includes(y)) &&
        !(pasesEquipo1.some(f => f.includes(x.toString())) || pasesEquipo1.some(f => f.includes(y.toString())))) {
        grupos.push('F');
    }

    return grupos;
}

function esFichaJugable(ficha, extremos) {
    const [x, y] = ficha.split(',').map(Number);
    return extremos.includes(x) || extremos.includes(y);
}

function calcularMejorFicha() {
    const misFichas = Array.from(document.getElementById("misFichasDropdown").selectedOptions).map(opt => opt.value);
    const jugadasEquipo1 = Array.from(document.getElementById("jugadasEquipo1Dropdown").selectedOptions).map(opt => opt.value);
    const jugadasEquipo2 = Array.from(document.getElementById("jugadasEquipo2Dropdown").selectedOptions).map(opt => opt.value);
    const pasesEquipo1 = Array.from(document.getElementById("pasesEquipo1Dropdown").selectedOptions).map(opt => opt.value);
    const pasesEquipo2 = Array.from(document.getElementById("pasesEquipo2Dropdown").selectedOptions).map(opt => opt.value);

    const extremosActuales = obtenerExtremosActuales(jugadasEquipo1, jugadasEquipo2);

    let mejorFichaTeorica = null;
    let maxGruposTeoricos = [];
    let mejorFichaJugable = null;
    let maxGruposJugables = [];

    const fichasRestantes = misFichas.filter(ficha => !jugadasEquipo1.includes(ficha) && !jugadasEquipo2.includes(ficha));

    fichasRestantes.forEach(ficha => {
        const [x, y] = ficha.split(',').map(Number);
        const gruposCumplidos = calcularGruposCumplidos(ficha, x, y, jugadasEquipo1, jugadasEquipo2, pasesEquipo1, pasesEquipo2, fichasRestantes);

        if (gruposCumplidos.length > maxGruposTeoricos.length) {
            maxGruposTeoricos = gruposCumplidos;
            mejorFichaTeorica = ficha;
        }

        if (esFichaJugable(ficha, extremosActuales)) {
            if (gruposCumplidos.length > maxGruposJugables.length) {
                maxGruposJugables = gruposCumplidos;
                mejorFichaJugable = ficha;
            }
        }
    });

    let mensaje = `La mejor ficha teórica es ${mejorFichaTeorica} porque entra en los grupos ${maxGruposTeoricos.join(', ')}.`;

    if (mejorFichaJugable) {
        mensaje += ` La mejor ficha jugable es ${mejorFichaJugable} porque entra en los grupos ${maxGruposJugables.join(', ')}.`;
    } else {
        mensaje += " No hay una ficha jugable disponible.";
    }

    document.getElementById("mejorFichaVisor").textContent = mensaje;

    const extremosContainer = document.getElementById("extremosActualesContainer");
    extremosContainer.innerHTML = `<strong>Extremos actuales:</strong> ${extremosActuales.join(', ')}`;

    actualizarEstadoEquipos(pasesEquipo1, pasesEquipo2);
}

function obtenerExtremosActuales(jugadasEquipo1, jugadasEquipo2) {
    const todasLasJugadas = [...jugadasEquipo1, ...jugadasEquipo2];
    if (todasLasJugadas.length === 0) {
        return [];
    }

    const primerFicha = todasLasJugadas[0].split(',').map(Number);
    let extremos = [primerFicha[0], primerFicha[1]];

    for (let i = 1; i < todasLasJugadas.length; i++) {
        const [x, y] = todasLasJugadas[i].split(',').map(Number);
        if (extremos.includes(x)) {
            extremos = extremos.map(extremo => extremo === x ? y : extremo);
        } else if (extremos.includes(y)) {
            extremos = extremos.map(extremo => extremo === y ? x : extremo);
        }
    }

    return extremos;
}

function obtenerExtremosEnAlgunaJugada(jugadasEquipo) {
    let extremos = [];
    jugadasEquipo.forEach(jugada => {
        const [x, y] = jugada.split(',').map(Number);
        extremos.push(x, y);
    });
    return extremos;
}

function actualizarEstadoEquipos(pasesEquipo1, pasesEquipo2) {
    const equipo1Fichas = document.getElementById("equipo1Fichas");
    const equipo2Fichas = document.getElementById("equipo2Fichas");

    equipo1Fichas.textContent = obtenerNumerosDePases(pasesEquipo1).join(', ');
    equipo2Fichas.textContent = obtenerNumerosDePases(pasesEquipo2).join(', ');
}

function obtenerNumerosDePases(pases) {
    const numeros = [];
    pases.forEach(pase => {
        const [x, y] = pase.split(',').map(Number);
        if (!numeros.includes(x)) {
            numeros.push(x);
        }
        if (!numeros.includes(y)) {
            numeros.push(y);
        }
    });
    return numeros;
}
