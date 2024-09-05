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

    let sieteFichas = [];
    const visorJ1 = document.getElementById('visor-j1');
    const dropdowns = {
        j2: document.getElementById('jugadas-j2'),
        j3: document.getElementById('jugadas-j3'),
        j4: document.getElementById('jugadas-j4')
    };
    const dropdownJ1 = document.getElementById('jugadas-j1');

    function inicializarDropdowns() {
        Object.values(dropdowns).forEach(dropdown => {
            dropdown.innerHTML = '';
            fichas.forEach(ficha => {
                const option = document.createElement('option');
                option.textContent = ficha;
                option.value = ficha;
                dropdown.appendChild(option);
            });
        });
    }

    function actualizarVisorJ1() {
        const fichasSeleccionadas = document.querySelectorAll('#fichas input[type="checkbox"]:checked');
        sieteFichas = Array.from(fichasSeleccionadas).map(checkbox => checkbox.value);

        visorJ1.innerHTML = sieteFichas.join('<br>');
        actualizarDropdowns();
        actualizarDropdownsRestantes();
    }

    function actualizarDropdowns() {
        dropdownJ1.innerHTML = '<option value="">Selecciona una opción</option>';
        sieteFichas.forEach(ficha => {
            const option = document.createElement('option');
            option.textContent = ficha;
            option.value = ficha;
            dropdownJ1.appendChild(option);
        });
    }

    function actualizarDropdownsRestantes() {
        const fichasRestantes = fichas.filter(ficha => !sieteFichas.includes(ficha));
        
        for (const [jugador, dropdown] of Object.entries(dropdowns)) {
            dropdown.innerHTML = '';
            fichasRestantes.forEach(ficha => {
                const option = document.createElement('option');
                option.textContent = ficha;
                option.value = ficha;
                dropdown.appendChild(option);
            });
        }
    }

    document.querySelectorAll('#fichas input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', actualizarVisorJ1);
    });

    document.getElementById('jugador-j1').addEventListener('change', (event) => {
        if (event.target.value === 'J1') {
            actualizarVisorJ1();  // Actualiza las fichas de J1 y otros jugadores en tiempo real
        } else {
            inicializarDropdowns(); // Muestra todas las fichas menos las 7 de J1
        }
    });

    // Inicializa los dropdowns al cargar la página
    inicializarDropdowns();
});
