document.addEventListener('DOMContentLoaded', function () {
    let jugadas = [];  // Array que almacena las jugadas en orden
    let extremos = { izquierda: null, derecha: null };  // Mantendrá los extremos actuales

    // Función para actualizar los extremos en el visor
    function actualizarExtremos() {
        let visorExtremos = document.getElementById('extremos');
        visorExtremos.textContent = `Extremos actuales: ${extremos.izquierda}-${extremos.derecha}`;
    }

    // Función para actualizar el orden de jugadas
    function actualizarOrdenJugadas() {
        let visorOrdenJugadas = document.getElementById('orden-jugadas');
        visorOrdenJugadas.textContent = `Orden de Jugadas: ${jugadas.join(', ')}`;
    }

    // Función para validar y jugar una ficha
    function jugarFicha(jugador, ficha) {
        let fichaPartes = ficha.split('-').map(Number);  // Convierte "0-5" a [0, 5]

        // Validar si la ficha coincide con los extremos actuales
        if (jugadas.length === 0) {
            // Primera jugada: siempre válida
            jugadas.push(ficha);
            extremos.izquierda = fichaPartes[0];
            extremos.derecha = fichaPartes[1];
        } else {
            let validaPorIzquierda = (fichaPartes[0] === extremos.izquierda || fichaPartes[1] === extremos.izquierda);
            let validaPorDerecha = (fichaPartes[0] === extremos.derecha || fichaPartes[1] === extremos.derecha);

            if (validaPorIzquierda && validaPorDerecha) {
                // Si la ficha puede jugarse en ambos extremos, preguntar al usuario
                let seleccion = confirm("¿Quieres jugar la ficha por la izquierda? Cancelar para jugar por la derecha.");
                if (seleccion) {
                    jugarPorIzquierda(fichaPartes);
                } else {
                    jugarPorDerecha(fichaPartes);
                }
            } else if (validaPorIzquierda) {
                jugarPorIzquierda(fichaPartes);
            } else if (validaPorDerecha) {
                jugarPorDerecha(fichaPartes);
            } else {
                alert("La ficha no coincide con los extremos actuales.");
                return;  // No actualizar la jugada ni los extremos
            }
        }

        actualizarExtremos();
        actualizarOrdenJugadas();
        actualizarVisorJugador(jugador, ficha);
    }

    // Función para jugar por la izquierda
    function jugarPorIzquierda(fichaPartes) {
        jugadas.unshift(`${fichaPartes[0]}-${fichaPartes[1]}`);  // Añadir la jugada al principio
        extremos.izquierda = (fichaPartes[0] === extremos.izquierda) ? fichaPartes[1] : fichaPartes[0];
    }

    // Función para jugar por la derecha
    function jugarPorDerecha(fichaPartes) {
        jugadas.push(`${fichaPartes[0]}-${fichaPartes[1]}`);  // Añadir la jugada al final
        extremos.derecha = (fichaPartes[0] === extremos.derecha) ? fichaPartes[1] : fichaPartes[0];
    }

    // Función para actualizar el visor de jugadas de cada jugador
    function actualizarVisorJugador(jugador, ficha) {
        let visorJugador = document.getElementById(`visor-${jugador}`);
        visorJugador.textContent = `Jugador ${jugador} Jugó: ${ficha}`;
    }

    // Escuchadores de eventos para las jugadas de cada jugador (con listas desplegables)
    document.getElementById('jugadas-j1').addEventListener('change', function () {
        let ficha = this.value;
        if (ficha) {
            jugarFicha('j1', ficha);
            this.value = '';  // Resetear el selector
        }
    });

    document.getElementById('jugadas-j2').addEventListener('change', function () {
        let ficha = this.value;
        if (ficha) {
            jugarFicha('j2', ficha);
            this.value = '';  // Resetear el selector
        }
    });

    document.getElementById('jugadas-j3').addEventListener('change', function () {
        let ficha = this.value;
        if (ficha) {
            jugarFicha('j3', ficha);
            this.value = '';  // Resetear el selector
        }
    });

    document.getElementById('jugadas-j4').addEventListener('change', function () {
        let ficha = this.value;
        if (ficha) {
            jugarFicha('j4', ficha);
            this.value = '';  // Resetear el selector
        }
    });
});
