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

    const equipo1Probabilidad = document.createElement("div");
    equipo1Probabilidad.id = "equipo1Probabilidad";
    equipo1Probabilidad.style.color = "red";
    equipo1Probabilidad.style.fontWeight = "bold";
    equipo1Probabilidad.style.marginTop = "10px";
    equipo1Probabilidad.innerHTML = "Equipo 1 tiene: ()";
    document.body.appendChild(equipo1Probabilidad);

    const equipo2Probabilidad = document.createElement("div");
    equipo2Probabilidad.id = "equipo2Probabilidad";
    equipo2Probabilidad.style.color = "red";
    equipo2Probabilidad.style.fontWeight = "bold";
    equipo2Probabilidad.style.marginTop = "10px";
    equipo2Probabilidad.innerHTML = "Equipo 2 tiene: ()";
    document.body.appendChild(equipo2Probabilidad);

    const gruposContainer = document.createElement("div");
    gruposContainer.id = "gruposContainer";
    gruposContainer.style.marginTop = "10px";
    gruposContainer.style.fontWeight = "bold";
    gruposContainer.innerHTML = `
        <strong>Definición de los grupos:</strong><br>
        Grupo A: Ficha doble.<br>
        Grupo B: Suma de los extremos mayor a 6.<br>
        Grupo C: Tienes 4 o más fichas con el mismo número.<br>
        Grupo D: Aliado jugó una ficha con alguno de los extremos.<br>
        Grupo E: Oponente pasó por alguno de los extremos.<br>
        Grupo F: Aliado no pasó por los extremos.
    `;
    document.body.appendChild(gruposContainer);
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

    if (jugadasEquipo1.some(f => f.includes(x.toString())) || jugadasEquipo1.some(f => f.includes(y.toString()))) {
        grupos.push('D');
    }

    if (pasesEquipo2.some(f => f.includes(x.toString())) || pasesEquipo2.some(f => f.includes(y.toString()))) {
        grupos.push('E');
    }

    if (!(pasesEquipo1.some(f => f.includes(x.toString())) || pasesEquipo1.some(f => f.includes(y.toString())))) {
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

    misFichas.forEach(ficha => {
        const [x, y] = ficha.split(',').map(Number);
        const gruposCumplidos = calcularGruposCumplidos(ficha, x, y, jugadasEquipo1, jugadasEquipo2, pasesEquipo1, pasesEquipo2, misFichas);

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

    actualizarProbabilidadesEquipos(pasesEquipo1, pasesEquipo2, jugadasEquipo1, jugadasEquipo2, extremosActuales);
}

function actualizarProbabilidadesEquipos(pasesEquipo1, pasesEquipo2, jugadasEquipo1, jugadasEquipo2, extremosActuales) {
    const equipo1NumerosProbables = calcularNumerosProbables(pasesEquipo1, jugadasEquipo2, extremosActuales);
    const equipo2NumerosProbables = calcularNumerosProbables(pasesEquipo2, jugadasEquipo1, extremosActuales);

    document.getElementById("equipo1Probabilidad").textContent = `Equipo 1 tiene: (${equipo1NumerosProbables.join(', ')})`;
    document.getElementById("equipo2Probabilidad").textContent = `Equipo 2 tiene: (${equipo2NumerosProbables.join(', ')})`;

document.getElementById("extremosActualesContainer").innerHTML = `<strong>Extremos actuales:</strong> ${extremosActuales.join(', ')}`;
}

function calcularNumerosProbables(pasesEquipo, jugadasOponente, extremosActuales) {
    const numerosProbables = [];

    pasesEquipo.forEach(pase => {
    const [x, y] = pase.split(',').map(Number);
    if (!jugadasOponente.includes(pase) && !extremosActuales.includes(x) && !extremosActuales.includes(y)) {
        if (!numerosProbables.includes(x)) numerosProbables.push(x);
        if (!numerosProbables.includes(y)) numerosProbables.push(y);
    }
});

return numerosProbables;
}
