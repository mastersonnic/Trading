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

    document.getElementById("misFichasVisor").textContent = seleccionadas.join(", ");
    actualizarMejorFichaParaJugar();  // Actualiza la mejor ficha en tiempo real al seleccionar fichas
}

function actualizarVisor(dropdownId, visorId) {
    const dropdown = document.getElementById(dropdownId);
    const seleccionadas = Array.from(dropdown.selectedOptions).map(opt => opt.value);
    document.getElementById(visorId).textContent = seleccionadas.join(", ");
    actualizarMejorFichaParaJugar();  // Actualiza la mejor ficha en tiempo real después de cualquier acción
}

function calcularGruposCumplidos(ficha, x, y, jugadasEquipo1, jugadasEquipo2, pasesEquipo1, pasesEquipo2, misFichas) {
    const grupos = [];
    
    // Grupo A: Si la ficha es un doble
    if (x === y) grupos.push('A');
    
    // Grupo B: Si la suma de los extremos es mayor que 6
    if ((x + y) > 6) grupos.push('B');
    
    // Grupo C: Si tienes 4 o más fichas con el mismo número
    const countX = misFichas.filter(f => f.includes(x.toString())).length;
    const countY = misFichas.filter(f => f.includes(y.toString())).length;
    if (countX >= 4 || countY >= 4) grupos.push('C');
    
    // Grupo D: Si el equipo 1 (aliado) ya jugó una ficha con alguno de los extremos
    if (jugadasEquipo1.some(f => f.includes(x.toString())) || jugadasEquipo1.some(f => f.includes(y.toString()))) grupos.push('D');
    
    // Grupo E: Si el equipo 2 (oponente) pasó por alguno de los extremos
    if (pasesEquipo2.some(f => f.includes(x.toString())) || pasesEquipo2.some(f => f.includes(y.toString()))) grupos.push('E');
    
    // Grupo F: Si el equipo 1 (aliado) no ha pasado por los extremos
    if (!(pasesEquipo1.some(f => f.includes(x.toString())) || pasesEquipo1.some(f => f.includes(y.toString())))) grupos.push('F');

    return grupos;
}

function esFichaJugable(ficha, extremos) {
    const [x, y] = ficha.split(',').map(Number);
    return extremos.includes(x) || extremos.includes(y);
}

function actualizarMejorFichaParaJugar() {
    const misFichas = Array.from(document.getElementById("misFichasDropdown").selectedOptions).map(opt => opt.value);
    const jugadasEquipo1 = Array.from(document.getElementById("jugadasEquipo1Dropdown").selectedOptions).map(opt => opt.value);
    const jugadasEquipo2 = Array.from(document.getElementById("jugadasEquipo2Dropdown").selectedOptions).map(opt => opt.value);
    const pasesEquipo1 = Array.from(document.getElementById("pasesEquipo1Dropdown").selectedOptions).map(opt => opt.value);
    const pasesEquipo2 = Array.from(document.getElementById("pasesEquipo2Dropdown").selectedOptions).map(opt => opt.value);

    const extremosActuales = obtenerExtremosActuales(jugadasEquipo1, jugadasEquipo2);

    // Elimina las fichas jugadas de la lista de mis fichas
    const fichasJugadas = [...jugadasEquipo1, ...jugadasEquipo2];
    const fichasDisponibles = misFichas.filter(ficha => !fichasJugadas.includes(ficha));

    let mejorFichaTeorica = null;
    let maxGruposCumplidos = 0;
    let gruposCumplidosTeoricos = [];

    let mejorFichaJugable = null;
    let maxGruposJugables = 0;
    let gruposCumplidosJugables = [];

    fichasDisponibles.forEach(ficha => {
        const [x, y] = ficha.split(',').map(Number);
        const gruposCumplidos = calcularGruposCumplidos(ficha, x, y, jugadasEquipo1, jugadasEquipo2, pasesEquipo1, pasesEquipo2, fichasDisponibles);

        if (gruposCumplidos.length > maxGruposCumplidos) {
            maxGruposCumplidos = gruposCumplidos.length;
            mejorFichaTeorica = ficha;
            gruposCumplidosTeoricos = gruposCumplidos;
        }

        if (esFichaJugable(ficha, extremosActuales)) {
            if (gruposCumplidos.length > maxGruposJugables) {
                maxGruposJugables = gruposCumplidos.length;
                mejorFichaJugable = ficha;
                gruposCumplidosJugables = gruposCumplidos;
            }
        }
    });

    let mensaje = `La mejor ficha teórica es ${mejorFichaTeorica} porque entra en los grupos (${gruposCumplidosTeoricos.join(', ')}).`;

    if (mejorFichaJugable) {
        mensaje += ` La mejor ficha jugable es ${mejorFichaJugable} porque entra en los grupos (${gruposCumplidosJugables.join(', ')}).`;
    } else {
        mensaje += " No hay una ficha jugable disponible.";
    }

    document.getElementById("mejorFichaVisor").textContent = mensaje;

    const extremosContainer = document.getElementById("extremosActualesContainer");
    extremosContainer.innerHTML = `<strong>Extremos actuales:</strong> ${extremosActuales.join(', ')}`;
}

function obtenerExtremosActuales(jugadasEquipo1, jugadasEquipo2) {
    const todasLasJugadas = [...jugadasEquipo1, ...jugadasEquipo2];
    if (todasLasJugadas.length === 0) {
        return [];
    }

    const extremos = new Set();

    todasLasJugadas.forEach(ficha => {
        const [x, y] = ficha.split(',').map(Number);

        if (x === y && todasLasJugadas.length === 1) {
            extremos.add(x);
            extremos.add(y);
        } else {
            if (extremos.has(x)) {
                extremos.delete(x);
            } else {
                extremos.add(x);
            }

            if (extremos.has(y)) {
                extremos.delete(y);
            } else {
                extremos.add(y);
            }
        }
    });

    return Array.from(extremos);
}

document.querySelectorAll("select").forEach(dropdown => {
    dropdown.addEventListener("change", actualizarMejorFichaParaJugar);
});
