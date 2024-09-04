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

    const fichaContainer = document.getElementById('fichas');
    
    // Cargar fichas en casillas de verificación
    fichas.forEach(ficha => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = ficha;
        checkbox.name = 'fichas';
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(ficha));
        fichaContainer.appendChild(label);
        fichaContainer.appendChild(document.createElement('br')); // Salto de línea
    });

    // Crear el switch "Con Frente-Sin Frente"
    const switchContainer = document.createElement('div');
    const switchLabel = document.createElement('label');
    switchLabel.textContent = "Con Frente-Sin Frente";
    const switchInput = document.createElement('input');
    switchInput.type = 'checkbox';
    switchInput.id = 'frente-switch';
    switchLabel.appendChild(switchInput);
    switchContainer.appendChild(switchLabel);
    fichaContainer.appendChild(switchContainer);

    // Inicializar las listas desplegables
    function initializeDropdowns(ids) {
        ids.forEach(id => {
            const select = document.getElementById(id);
            const option = document.createElement('option');
            option.textContent = 'Selecciona una opción';
            option.value = '';
            select.appendChild(option);
            fichas.forEach(ficha => {
                const option = document.createElement('option');
                option.textContent = ficha;
                option.value = ficha;
                select.appendChild(option);
            });
        });
    }

    // Llamar a la función para inicializar las listas desplegables
    initializeDropdowns([
        'jugadas-j1', 'jugadas-j2', 'jugadas-j3', 'jugadas-j4',
        'paso-j1', 'paso-j2', 'paso-j3', 'paso-j4'
    ]);

    // Función para actualizar los visores
    function updateVisor(id, text) {
        document.getElementById(id).textContent = text;
    }

    // Actualizar visores con textos de ejemplo
    updateVisor('visor-j1', 'Visor para J1');
    updateVisor('visor-j2', 'Visor para J2');
    updateVisor('visor-j3', 'Visor para J3');
    updateVisor('visor-j4', 'Visor para J4');
    updateVisor('visor-paso-j1', 'Visor para Pasó J1 a');
    updateVisor('visor-paso-j2', 'Visor para Pasó J2 a');
    updateVisor('visor-paso-j3', 'Visor para Pasó J3 a');
    updateVisor('visor-paso-j4', 'Visor para Pasó J4 a');
    updateVisor('orden-jugadas', 'Orden de Jugadas aquí');
    updateVisor('mis-fichas', 'Mis fichas aquí');
    updateVisor('j2-tiene', 'Fichas que tiene J2 aquí');
    updateVisor('j3-tiene', 'Fichas que tiene J3 aquí');
    updateVisor('j4-tiene', 'Fichas que tiene J4 aquí');
    updateVisor('mejor-ficha', 'Mejor ficha para jugar aquí');
    updateVisor('extremos', 'Extremos actuales aquí');
});

