document.addEventListener('DOMContentLoaded', () => {
    // Variable de las 28 fichas disponibles
    const fichas = [
        "0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6",
        "1-1", "1-2", "1-3", "1-4", "1-5", "1-6",
        "2-2", "2-3", "2-4", "2-5", "2-6",
        "3-3", "3-4", "3-5", "3-6",
        "4-4", "4-5", "4-6",
        "5-5", "5-6",
        "6-6"
    ];

    // Fichas seleccionadas por J1
    const sietefichas = ["0-0", "1-1", "2-2", "3-3", "4-4", "5-5", "6-6"];

    // Elementos DOM para los dropdowns de cada jugador
    const dropdowns = {
        j1: document.getElementById('jugadas-j1'),
        j2: document.getElementById('jugadas-j2'),
        j3: document.getElementById('jugadas-j3'),
        j4: document.getElementById('jugadas-j4')
    };

    // Elementos DOM para los visores de jugadas de cada jugador
    const visores = {
        j1: document.getElementById('visor-j1'),
        j2: document.getElementById('visor-j2'),
        j3: document.getElementById('visor-j3'),
        j4: document.getElementById('visor-j4'),
        orden: document.getElementById('visor-orden') // Visor para el orden de jugadas
    };

    // Variable para almacenar las fichas jugadas en orden
    let Ordenjugadas = [];

    // Función para actualizar los dropdowns
    function actualizarDropdowns() {
        // Actualizar el dropdown de J1 solo con sus 7 fichas elegidas
        dropdowns.j1.innerHTML = '<option value="">Selecciona una opción</option>';
        sietefichas.forEach(ficha => {
            const option = document.createElement('option');
            option.textContent = ficha;
            option.value = ficha;
            dropdowns.j1.appendChild(option);
        });

        // Actualizar los dropdowns de J2, J3 y J4 con las fichas restantes
        const fichasRestantes = fichas.filter(ficha => !sietefichas.includes(ficha) && !Ordenjugadas.includes(ficha));

        for (const jugador of ['j2', 'j3', 'j4']) {
            dropdowns[jugador].innerHTML = '<option value="">Selecciona una opción</option>';
            fichasRestantes.forEach(ficha => {
                const option = document.createElement('option');
                option.textContent = ficha;
                option.value = ficha;
                dropdowns[jugador].appendChild(option);
            });
        }
    }

    // Función para actualizar el visor del jugador que ha jugado
    function actualizarVisor(jugador, ficha) {
        const visor = visores[jugador];
        if (visor) {
            visor.innerHTML += `${ficha}<br>`;
        }
    }

    // Función para actualizar el visor del orden de jugadas
    function actualizarVisorOrden(ficha) {
        visores.orden.innerHTML += `${ficha}<br>`;
    }

    // Función para actualizar las fichas jugadas y el orden de jugadas
    function actualizarOrdenJugadas(fichaJugada) {
        Ordenjugadas.push(fichaJugada);
    }

    // Función para manejar la jugada de cada jugador
    function agregarEventoJugada(jugador) {
        const dropdown = dropdowns[jugador];
        dropdown.addEventListener('change', (event) => {
            const fichaSeleccionada = event.target.value;

            if (fichaSeleccionada) {
                // Actualizar el visor del jugador con la ficha jugada
                actualizarVisor(jugador, fichaSeleccionada);

                // Agregar la ficha al orden de jugadas
                actualizarOrdenJugadas(fichaSeleccionada);

                // Actualizar el visor de orden de jugadas
                actualizarVisorOrden(fichaSeleccionada);

                // Actualizar los dropdowns de todos los jugadores
                actualizarDropdowns();
            }
        });
    }

    // Inicializa los dropdowns y añade eventos para cada jugador
    function inicializarJugadas() {
        actualizarDropdowns();

        // Agregar eventos de jugada para cada jugador
        agregarEventoJugada('j1');
        agregarEventoJugada('j2');
        agregarEventoJugada('j3');
        agregarEventoJugada('j4');
    }

    inicializarJugadas();
});
