document.addEventListener('DOMContentLoaded', () => {
    const fichas = [
        "0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6",
        "1-1", "1-2", "1-3", "1-4", "1-5", "1-6",
        "2-2", "2-3", "2-4", "2-5", "2-6",
        "3-3", "3-4", "3-5", "3-6",
        "4-4", "4-5", "4-6",
        "5-5", "5-6",
        "6-6"
    ];

    const dropdowns = {
        j1: document.getElementById('paso-j1'),
        j2: document.getElementById('paso-j2'),
        j3: document.getElementById('paso-j3'),
        j4: document.getElementById('paso-j4')
    };

    const visores = {
        j1: document.getElementById('visor-paso-j1'),
        j2: document.getElementById('visor-paso-j2'),
        j3: document.getElementById('visor-paso-j3'),
        j4: document.getElementById('visor-paso-j4')
    };

    let fichasRestantes = [...fichas];

    function actualizarDropdowns() {
        for (const [jugador, dropdown] of Object.entries(dropdowns)) {
            dropdown.innerHTML = '<option value="">Selecciona una opción</option>';
            fichasRestantes.forEach(ficha => {
                const option = document.createElement('option');
                option.textContent = ficha;
                option.value = ficha;
                dropdown.appendChild(option);
            });
        }
    }

    function actualizarVisor(jugador, ficha) {
        const visor = visores[jugador];
        if (visor) {
            visor.innerHTML += `${ficha}<br>`;
        }
    }

    function actualizarFichasRestantes(fichaPasada) {
        // Elimina la ficha de las fichas restantes
        fichasRestantes = fichasRestantes.filter(ficha => ficha !== fichaPasada);
    }

    function agregarEventoPase(jugador) {
        const dropdown = dropdowns[jugador];
        dropdown.addEventListener('change', (event) => {
            const fichaSeleccionada = event.target.value;

            if (fichaSeleccionada) {
                // Actualiza el visor con la ficha pasada
                actualizarVisor(jugador, fichaSeleccionada);

                // Elimina la ficha pasada de las listas desplegables de todos los jugadores
                actualizarFichasRestantes(fichaSeleccionada);

                // Actualiza las listas desplegables para todos los jugadores
                actualizarDropdowns();
            }
        });
    }

    // Inicializa los dropdowns y añade eventos para cada jugador
    function inicializarPases() {
        actualizarDropdowns();

        // Agregar eventos de pase para cada jugador
        agregarEventoPase('j1');
        agregarEventoPase('j2');
        agregarEventoPase('j3');
        agregarEventoPase('j4');
    }

    inicializarPases();
});
