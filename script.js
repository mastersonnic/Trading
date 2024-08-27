// Generar las opciones de fichas de dominó
function generarFichas() {
    let fichas = [];
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            fichas.push(`${i},${j}`);
        }
    }
    return fichas;
}

// Agregar las fichas a las listas desplegables
function agregarFichasAListas() {
    const fichas = generarFichas();
    const listas = [
        "misFichasDropdown", 
        "pasesEquipo1Dropdown", 
        "pasesEquipo2Dropdown", 
        "jugadasEquipo1Dropdown", 
        "jugadasEquipo2Dropdown"
    ];

    listas.forEach(listaId => {
        const select = document.getElementById(listaId);
        fichas.forEach(ficha => {
            const option = document.createElement("option");
            option.value = ficha;
            option.text = ficha;
            select.add(option);
        });
    });
}

// Validar la selección de mis fichas
function validarMisFichas() {
    const misFichas = Array.from(document.getElementById("misFichasDropdown").selectedOptions).map(opt => opt.value);
    
    if (misFichas.length !== 7) {
        alert("Debes seleccionar exactamente 7 fichas.");
        return;
    }
    
    document.getElementById("misFichasVisor").textContent = "Tus fichas seleccionadas son:\n" + misFichas.join("\n");
    document.getElementById("misFichasFinalesVisor").textContent = misFichas.join(", ");
    calcularMejorFicha(misFichas);
}

// Actualizar visor de fichas según selección en lista
function actualizarVisor(dropdownId, visorId) {
    const opciones = Array.from(document.getElementById(dropdownId).selectedOptions).map(opt => opt.value);
    document.getElementById(visorId).textContent = opciones.join(", ");
}

// Calcular la mejor ficha para jugar
function calcularMejorFicha(misFichas) {
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
            mejorFicha = ficha;
            maxGruposCumplidos = gruposCumplidos;
        }
    });

    document.getElementById("mejorFichaVisor").textContent = mejorFicha
        ? `La mejor ficha para jugar es: ${mejorFicha} (cumple con ${maxGruposCumplidos} grupos)`
        : "No se encontró una ficha adecuada.";
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
