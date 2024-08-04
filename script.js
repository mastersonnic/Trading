document.addEventListener('DOMContentLoaded', () => {
    // Inicialización de listas desplegables y visores
    inicializarJuego();
});

function inicializarJuego() {
    // Inicializar listas desplegables y visores
    const jugadores = ['yo', 'derecha', 'frente', 'izquierda'];
    jugadores.forEach(jugador => {
        const jugadasSelect = document.getElementById(`jugadas-${jugador}`);
        const jugandoSelect = document.getElementById(`jugando-${jugador}`);
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                const ficha = `${i}-${j}`;
                const option = document.createElement('option');
                option.value = ficha;
                option.text = ficha;
                jugadasSelect.appendChild(option.cloneNode(true));
                jugandoSelect.appendChild(option.cloneNode(true));
            }
        }
    });
}

function guardarMano() {
    // Lógica para guardar la mano actual
    console.log('Mano guardada');
}

function devolverUltimaJugada() {
    // Lógica para devolver la última jugada
    console.log('Última jugada devuelta');
}

function terminarMano() {
    // Lógica para terminar la mano actual
    console.log('Mano terminada');
}

function comenzarNuevaMano() {
    // Lógica para comenzar una nueva mano
    console.log('Nueva mano comenzada');
}

// Lógica para seleccionar ficha y colocarla en la mesa
function seleccionarFicha(jugador, ficha, extremo) {
    const fichasMesa = document.getElementById('fichas-mesa');
    const fichaElemento = document.createElement('div');
    fichaElemento.className = 'ficha';
    fichaElemento.innerText = ficha;
    fichaElemento.style.backgroundColor = obtenerColorJugador(jugador);
    fichasMesa.appendChild(fichaElemento);
    console.log(`Jugador ${jugador} coloca ${ficha} en el extremo ${extremo}`);
}

function obtenerColorJugador(jugador) {
    switch (jugador) {
        case 'yo': return 'blue';
        case 'derecha': return 'red';
        case 'frente': return 'green';
        case 'izquierda': return 'yellow';
        default: return 'black';
    }
}

// Lógica para determinar la mejor ficha para jugar
function determinarMejorFichaParaJugar(fichas, jugador, salida, jugadasPrevias) {
    let mejorFicha = null;
    let maxPuntaje = -Infinity;

    fichas.forEach(ficha => {
        let puntaje = 0;
        const [num1, num2] = ficha.split('-').map(Number);

        // No jugar la salida de mi izquierda o mi derecha
        if (jugador === 'izquierda' || jugador === 'derecha') {
            if (salida.includes(ficha)) return;
        }

        // No jugar la ficha que han jugado más de dos veces
        if (jugadasPrevias.filter(j => j === ficha).length > 2) return;

        // Jugar de las que tengo más fichas o números
        puntaje += contarNumeros(fichas, num1) + contarNumeros(fichas, num2);

        if (puntaje > maxPuntaje) {
            maxPuntaje = puntaje;
            mejorFicha = ficha;
        }
    });

    return mejorFicha;
}

// Lógica para determinar la mejor ficha para salir
function determinarMejorFichaParaSalir(fichas) {
    let mejorFicha = null;
    // Prioridad 1: Doble con al menos dos números del doble
    for (let ficha of fichas) {
        const [num1, num2] = ficha.split('-').map(Number);
        if (num1 === num2 && contarNumeros(fichas, num1) >= 2) {
            mejorFicha = ficha;
            break;
        }
    }
    // Prioridad 2: Tres números del mismo en 3 fichas
    if (!mejorFicha) {
        for (let i = 0; i <= 6; i++) {
            if (contarNumeros(fichas, i) >= 3) {
                mejorFicha = fichas.find(ficha => ficha.includes(i.toString()));
                break;
            }
        }
    }
    // Prioridad 3: Ficha más alta
    if (!mejorFicha) {
        mejorFicha = fichas.reduce((max, ficha) => {
            const [num1, num2] = ficha.split('-').map(Number);
            return (num1 + num2) > (max[0] + max[1]) ? ficha : max;
        }, fichas[0]);
    }
    return mejorFicha;
}

function contarNumeros(fichas, numero) {
    return fichas.reduce((count, ficha) => {
        const [num1, num2] = ficha.split('-').map(Number);
        return count + (num1 === numero) + (num2 === numero);
    }, 0);
}
