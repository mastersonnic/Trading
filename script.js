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
}

function actualizarVisor(dropdownId, visorId) {
    const dropdown = document.getElementById(dropdownId);
    const seleccionadas = Array.from(dropdown.selectedOptions).map(opt => opt.value);
    document.getElementById(visorId).textContent = seleccionadas.join(", ");
}

function esFichaJugable(ficha, extremos) {
    const [x, y] = ficha.split(',').map(Number);
    return extremos.includes(x) || extremos.includes(y);
}

function calcularMejorFicha() {
    const misFichasDropdown = document.getElementById("misFichasDropdown");
    const misFichas = Array.from(misFichasDropdown.selectedOptions).map(opt => opt.value);
    const jugadasEquipo1 = Array.from(document.getElementById("jugadasEquipo1Dropdown").selectedOptions).map(opt => opt.value);
    const jugadasEquipo2 = Array.from(document.getElementById("jugadasEquipo2Dropdown").selectedOptions).map(opt => opt.value);

    const extremosActuales = obtenerExtremosActuales(jugadasEquipo1, jugadasEquipo2);
    let mejorFichaJugable = null;

    misFichas.forEach(ficha => {
        if (esFichaJugable(ficha, extremosActuales)) {
            mejorFichaJugable = ficha;
        }
    });

    if (mejorFichaJugable) {
        const [x, y] = mejorFichaJugable.split(',').map(Number);
        const opcionesJugables = extremosActuales.filter(extremo => extremo === x || extremo === y);

        if (opcionesJugables.length > 1) {
            const extremoSeleccionado = prompt(`Tienes dos opciones para jugar la ficha ${mejorFichaJugable}: ${opcionesJugables.join(', ')}. ¿Por cuál extremo deseas jugar?`);
            if (opcionesJugables.includes(parseInt(extremoSeleccionado))) {
                alert(`Se jugará la ficha ${mejorFichaJugable} por el extremo ${extremoSeleccionado}.`);
            } else {
                alert("Opción no válida. Se jugará automáticamente por el primer extremo disponible.");
            }
        }
    } else {
        alert("No hay fichas jugables disponibles.");
    }

    actualizarMisFichasVisor(misFichasDropdown, mejorFichaJugable);

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

function actualizarMisFichasVisor(dropdown, fichaJugable) {
    if (fichaJugable) {
        const index = Array.from(dropdown.options).findIndex(opt => opt.value === fichaJugable);
        if (index > -1) {
            dropdown.remove(index);
        }
    }

    const seleccionadas = Array.from(dropdown.selectedOptions).map(opt => opt.value);
    document.getElementById("misFichasVisor").textContent = seleccionadas.join(", ");
}

document.querySelectorAll("select").forEach(dropdown => {
    dropdown.addEventListener("change", calcularMejorFicha);
});
