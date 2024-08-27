const todasLasFichas = [
    '0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6', '0,7', 
    '1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7',
    '2,2', '2,3', '2,4', '2,5', '2,6', '2,7',
    '3,3', '3,4', '3,5', '3,6', '3,7',
    '4,4', '4,5', '4,6', '4,7',
    '5,5', '5,6', '5,7',
    '6,6', '6,7',
    '7,7'
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

// Calcular la cantidad de grupos que una ficha cumple
function calcularGruposCumplidos(ficha, x, y, jugadasEquipo1, jugadasEquipo2, pasesEquipo1, pasesEquipo2, misFichas) {
    let gruposCumplidos = 0;

    // A) La ficha es un doble
    if (x === y) {
        gruposCumplidos++;
    }

    // B) La suma de los puntos de la ficha es mayor a 6
    if ((x + y) > 6) {
        gruposCumplidos++;
    }

    // C) La ficha contiene un número que aparece en al menos otras 3 fichas de mi mano
    const countX = misFichas.filter(f => f.includes(x.toString())).length;
    const countY = misFichas.filter(f => f.includes(y.toString())).length;
    if (countX >= 4 || countY >= 4) {
        gruposCumplidos++;
    }

    // D) El equipo 1 ha colocado alguno de estos números como extremo sobre la mesa
    if (jugadasEquipo1.some(f => f.includes(x.toString())) || jugadasEquipo1.some(f => f.includes(y.toString()))) {
        gruposCumplidos++;
    }

    // E) Los jugadores del equipo 2 han pasado a su número
    if (pasesEquipo2.some(f => f.includes(x.toString())) || pasesEquipo2.some(f => f.includes(y.toString()))) {
        gruposCumplidos++;
    }

    // F) Eliminar como posible extremo los números a los que ha pasado el equipo 1
    if (!(pasesEquipo1.some(f => f.includes(x.toString())) || pasesEquipo1.some(f => f.includes(y.toString())))) {
        gruposCumplidos++;
    }

    return gruposCumplidos;
}

// Calcular la mejor ficha para jugar
function calcularMejorFicha() {
    const misFichas = Array.from(document.getElementById("misFichasDropdown").selectedOptions).map(opt => opt.value);
    const jugadasEquipo1 = Array.from(document.getElementById("jugadasEquipo1Dropdown").selectedOptions).map(opt => opt.value);
    const jugadasEquipo2 = Array.from(document.getElementById("jugadasEquipo2Dropdown").selectedOptions).map(opt => opt.value);
    const pasesEquipo1 = Array.from(document.getElementById("pasesEquipo1Dropdown").selectedOptions).map(opt => opt.value);
    const pasesEquipo2 = Array.from(document.getElementById("pasesEquipo2Dropdown").selectedOptions).map(opt => opt.value);

    let mejorFicha = null;
    let maxGruposCumplidos = 0;

    misFichas.forEach(ficha => {
        const [x, y] = ficha.split(',').map(Number);
        const gruposCumplidos = calcularGruposCumplidos(ficha, x, y, jugadasEquipo1, jugadasEquipo2, pasesEquipo1, pasesEquipo2, misFichas);

        if (gruposCumplidos > maxGruposCumplidos) {
            maxGruposCumplidos = gruposCumplidos;
            mejorFicha = ficha;
        }
    });

    // Actualizar el visor con la mejor ficha para jugar
    if (mejorFicha) {
        document.getElementById("mejorFichaVisor").textContent = `La mejor ficha para jugar es ${mejorFicha} con ${maxGruposCumplidos} grupos cumplidos.`;
    } else {
        document.getElementById("mejorFichaVisor").textContent = "No hay una ficha recomendada para jugar.";
    }
}
