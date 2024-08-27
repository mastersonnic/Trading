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
}

function actualizarVisor(dropdownId, visorId) {
    const dropdown = document.getElementById(dropdownId);
    const seleccionadas = Array.from(dropdown.selectedOptions).map(opt => opt.value);
    document.getElementById(visorId).textContent = seleccionadas.join(", ");
}

function calcularGruposCumplidos(ficha, x, y, jugadasEquipo1, jugadasEquipo2, pasesEquipo1, pasesEquipo2, misFichas) {
    let gruposCumplidos = 0;

    if (x === y) {
        gruposCumplidos++;
    }

    if ((x + y) > 6) {
        gruposCumplidos++;
    }

    const countX = misFichas.filter(f => f.includes(x.toString())).length;
    const countY = misFichas.filter(f => f.includes(y.toString())).length;
    if (countX >= 4 || countY >= 4) {
        gruposCumplidos++;
    }

    if (jugadasEquipo1.some(f => f.includes(x.toString())) || jugadasEquipo1.some(f => f.includes(y.toString()))) {
        gruposCumplidos++;
    }

    if (pasesEquipo2.some(f => f.includes(x.toString())) || pasesEquipo2.some(f => f.includes(y.toString()))) {
        gruposCumplidos++;
    }

    if (!(pasesEquipo1.some(f => f.includes(x.toString())) || pasesEquipo1.some(f => f.includes(y.toString())))) {
        gruposCumplidos++;
    }

    return gruposCumplidos;
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

    // Obtener los extremos actuales dinámicamente según el estado del juego.
    const extremosActuales = obtenerExtremosActuales(jugadasEquipo1, jugadasEquipo2);

    let mejorFichaTeorica = null;
    let maxGruposCumplidos = 0;

    let mejorFichaJugable = null;
    let maxGruposJugables = 0;

    misFichas.forEach(ficha => {
        const [x, y] = ficha.split(',').map(Number);
        const gruposCumplidos = calcularGruposCumplidos(ficha, x, y, jugadasEquipo1, jugadasEquipo2, pasesEquipo1, pasesEquipo2, misFichas);

        // Evaluar mejor ficha teórica
        if (gruposCumplidos > maxGruposCumplidos) {
            maxGruposCumplidos = gruposCumplidos;
            mejorFichaTeorica = ficha;
        }

        // Evaluar mejor ficha jugable
        if (esFichaJugable(ficha, extremosActuales) && gruposCumplidos > maxGruposJugables) {
            maxGruposJugables = gruposCumplidos;
            mejorFichaJugable = ficha;
        }
    });

    // Mostrar la mejor ficha para jugar
    let mensaje = `La mejor ficha teórica es ${mejorFichaTeorica} con ${maxGruposCumplidos} grupos cumplidos.`;

    if (mejorFichaJugable) {
        mensaje += ` La mejor ficha jugable es ${mejorFichaJugable}.`;
    } else {
        mensaje += " No hay una ficha jugable disponible.";
    }

    document.getElementById("mejorFichaVisor").textContent = mensaje;
}

function obtenerExtremosActuales(jugadasEquipo1, jugadasEquipo2) {
    const todasLasJugadas = [...jugadasEquipo1, ...jugadasEquipo2];
    if (todasLasJugadas.length === 0) {
        return [];
    }

    const extremos = new Set();
    todasLasJugadas.forEach(ficha => {
        const [x, y] = ficha.split(',').map(Number);
        if (!extremos.has(x)) {
            extremos.add(x);
        } else {
            extremos.delete(x);
        }
        if (!extremos.has(y)) {
            extremos.add(y);
        } else {
            extremos.delete(y);
        }
    });
    return Array.from(extremos);
}

// Actualizar en tiempo real los extremos y la mejor ficha para jugar
document.querySelectorAll("select").forEach(dropdown => {
    dropdown.addEventListener("change", calcularMejorFicha);
});
