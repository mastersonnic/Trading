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

    const mejorFichaContainer = document.createElement("div");
    mejorFichaContainer.id = "mejorFichaVisor";
    mejorFichaContainer.style.marginTop = "10px";
    mejorFichaContainer.style.fontWeight = "bold";
    mejorFichaContainer.innerHTML = "<strong>Mejor ficha para jugar:</strong> ";
    document.body.appendChild(mejorFichaContainer);

    // Asociar el evento 'change' a cada dropdown para actualizar visores y calcular la mejor ficha
    document.querySelectorAll("select").forEach(dropdown => {
        dropdown.addEventListener("change", () => {
            actualizarVisores();
        });
    });

    actualizarVisores();  // Llamar una vez para inicializar todo
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

function actualizarVisores() {
    actualizarMisFichas();
    actualizarVisor('pasesEquipo1Dropdown', 'equipo1Probabilidad');
    actualizarVisor('pasesEquipo2Dropdown', 'equipo2Probabilidad');
    actualizarVisor('jugadasEquipo1Dropdown', 'jugadasEquipo1Visor');
    actualizarVisor('jugadasEquipo2Dropdown', 'jugadasEquipo2Visor');
    calcularMejorFicha();
    actualizarExtremos();
    actualizarEquipo1Y2();
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
}

function actualizarVisor(dropdownId, visorId) {
    const dropdown = document.getElementById(dropdownId);
    const seleccionadas = Array.from(dropdown.selectedOptions).map(opt => opt.value);
    document.getElementById(visorId).textContent = seleccionadas.join(", ");
}

function calcularGruposCumplidos(ficha, x, y, jugadasEquipo1, jugadasEquipo2, pasesEquipo1, pasesEquipo2, misFichas) {
    let grupos = [];

    // Grupo A
    if (x === y) {
        grupos.push('A');
    }

    // Grupo B
    const extremos = obtenerExtremosActuales(jugadasEquipo1, jugadasEquipo2);
    if (extremos.length > 0 && (extremos[0] + extremos[1]) > 6) {
        grupos.push('B');
    }

    // Grupo C
    const countX = misFichas.filter(f => f.includes(x.toString())).length;
    const countY = misFichas.filter(f => f.includes(y.toString())).length;
    if (countX >= 4 || countY >= 4) {
        grupos.push('C');
    }

    // Grupo D
    if (jugadasEquipo1.some(f => f.includes(x.toString())) || jugadasEquipo1.some(f => f.includes(y.toString()))) {
        grupos.push('D');
    }

    // Grupo E
    if (pasesEquipo2.some(f => f.includes(x.toString())) || pasesEquipo2.some(f => f.includes(y.toString()))) {
        grupos.push('E');
    }

    // Grupo F
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

    let mensaje = `La mejor ficha teórica es ${mejorFichaTeorica} porque pertenece al grupo ${maxGruposTeoricos.join(', ')}.`;

    if (mejorFichaJugable) {
            mensaje += ` La mejor ficha jugable es ${mejorFichaJugable} porque pertenece al grupo ${maxGruposJugables.join(', ')}.`;
        } else {
            mensaje += " No hay una ficha jugable disponible.";
        }

        document.getElementById("mejorFichaVisor").textContent = mensaje;
    }

    function obtenerExtremosActuales(jugadasEquipo1, jugadasEquipo2) {
        let extremos = [];

        // La primera ficha jugada por el equipo 1 determina el primer extremo
        if (jugadasEquipo1.length > 0) {
            const [x1, y1] = jugadasEquipo1[0].split(',').map(Number);
            extremos.push(x1, y1);
        }

        // La última ficha jugada por el equipo 2 determina el segundo extremo
        if (jugadasEquipo2.length > 0) {
            const [x2, y2] = jugadasEquipo2[jugadasEquipo2.length - 1].split(',').map(Number);
            extremos.push(x2, y2);
        }

        // Solo se conservan los extremos actuales y únicos
        extremos = extremos.filter((extremo, index, self) => self.indexOf(extremo) === index);

        return extremos.slice(-2);  // Aseguramos que solo queden los dos últimos extremos
    }

    function obtenerJugadasCombinadas() {
        const jugadasEquipo1 = Array.from(document.getElementById("jugadasEquipo1Dropdown").selectedOptions).map(opt => opt.value);
        const jugadasEquipo2 = Array.from(document.getElementById("jugadasEquipo2Dropdown").selectedOptions).map(opt => opt.value);
        return jugadasEquipo1.concat(jugadasEquipo2);
    }

    function actualizarVisorEquipos() {
        const jugadasCombinadas = obtenerJugadasCombinadas();
        const misFichas = Array.from(document.getElementById("misFichasDropdown").selectedOptions).map(opt => opt.value);

        const numerosRestantes = [0, 1, 2, 3, 4, 5, 6].filter(numero => {
            const cantidadJugadas = jugadasCombinadas.filter(ficha => ficha.includes(numero.toString())).length;
            const cantidadEnMisFichas = misFichas.filter(ficha => ficha.includes(numero.toString())).length;

            // Si hay exactamente 7 fichas de un número, excluimos ese número
            return (cantidadJugadas + cantidadEnMisFichas) < 7;
        });

        const equipo1Fichas = [];
        const equipo2Fichas = [];

        numerosRestantes.forEach(numero => {
            const pasesEquipo1 = Array.from(document.getElementById("pasesEquipo1Dropdown").selectedOptions).map(opt => opt.value);
            const pasesEquipo2 = Array.from(document.getElementById("pasesEquipo2Dropdown").selectedOptions).map(opt => opt.value);

            const enEquipo1 = pasesEquipo2.filter(ficha => ficha.includes(numero.toString())).length > 0;
            const enEquipo2 = pasesEquipo1.filter(ficha => ficha.includes(numero.toString())).length > 0;

            if (enEquipo1) equipo1Fichas.push(numero);
            if (enEquipo2) equipo2Fichas.push(numero);
        });

        document.getElementById("equipo1Probabilidad").textContent = `Equipo 1 tiene: ${equipo1Fichas.join(', ')}`;
        document.getElementById("equipo2Probabilidad").textContent = `Equipo 2 tiene: ${equipo2Fichas.join(', ')}`;
    }

    // Se asegura que los visores de los equipos se actualicen correctamente
    document.querySelectorAll("select").forEach(dropdown => {
        dropdown.addEventListener("change", () => {
            actualizarVisores();
            actualizarVisorEquipos();  // Actualizamos las fichas seguras en manos de los equipos
        });
    });

    // Llamar una vez para inicializar todo
    actualizarVisores();
    actualizarVisorEquipos();
});
