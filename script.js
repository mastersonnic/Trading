document.addEventListener("DOMContentLoaded", function () {
    const fichas = [
        "0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6",
        "1-1", "1-2", "1-3", "1-4", "1-5", "1-6",
        "2-2", "2-3", "2-4", "2-5", "2-6",
        "3-3", "3-4", "3-5", "3-6",
        "4-4", "4-5", "4-6",
        "5-5", "5-6",
        "6-6"
    ];

    const selectFichas = document.getElementById('fichas-lista');
    const selectFichasAdicionales = document.getElementById('fichas-adicionales');
    const selectPasesEquipo1 = document.getElementById('pases-equipo1');
    const selectPasesEquipo2 = document.getElementById('pases-equipo2');
    const selectJugadasEquipo1 = document.getElementById('jugadas-equipo1');
    const selectJugadasEquipo2 = document.getElementById('jugadas-equipo2');
    const visorMisFichas = document.getElementById('lista-mis-fichas');
    const visorFichasAgregadas = document.getElementById('lista-fichas-agregadas');
    const visorPasesEquipo1 = document.getElementById('lista-pases-equipo1');
    const visorPasesEquipo2 = document.getElementById('lista-pases-equipo2');
    const visorJugadasEquipo1 = document.getElementById('lista-jugadas-equipo1');
    const visorJugadasEquipo2 = document.getElementById('lista-jugadas-equipo2');
    const visorMejorFicha = document.getElementById('visor-mejor-ficha');

    let fichasSeleccionadas = [];
    let fichasAdicionales = [];
    let pasesEquipo1 = [];
    let pasesEquipo2 = [];
    let jugadasEquipo1 = [];
    let jugadasEquipo2 = [];
    let fichasIniciales = [];

    function populateSelectOptions(selectElement) {
        selectElement.innerHTML = fichas.map(ficha => `<option value="${ficha}">${ficha}</option>`).join('');
    }

    function updateVisor(visor, items) {
        visor.innerHTML = items.map(item => `<li>${item} <button onclick="removeItem('${item}', '${visor.id}')">Eliminar</button></li>`).join('');
    }

    function removeItem(item, visorId) {
        switch (visorId) {
            case 'lista-mis-fichas':
                fichasSeleccionadas = fichasSeleccionadas.filter(f => f !== item);
                break;
            case 'lista-fichas-agregadas':
                fichasAdicionales = fichasAdicionales.filter(f => f !== item);
                break;
            case 'lista-pases-equipo1':
                pasesEquipo1 = pasesEquipo1.filter(f => f !== item);
                break;
            case 'lista-pases-equipo2':
                pasesEquipo2 = pasesEquipo2.filter(f => f !== item);
                break;
            case 'lista-jugadas-equipo1':
                jugadasEquipo1 = jugadasEquipo1.filter(f => f !== item);
                break;
            case 'lista-jugadas-equipo2':
                jugadasEquipo2 = jugadasEquipo2.filter(f => f !== item);
                break;
        }
        updateVisor(document.getElementById(visorId), eval(visorId.replace('lista-', '')));
        calculateMejorFicha();
    }

    function addFichas() {
        const selectedOptions = Array.from(selectFichas.selectedOptions).map(option => option.value);
        if (selectedOptions.length === 7) {
            fichasIniciales = selectedOptions;
            fichasSeleccionadas = selectedOptions;
            updateVisor(visorMisFichas, fichasSeleccionadas);
            calculateMejorFicha();
        } else {
            alert("Debes seleccionar exactamente 7 fichas.");
        }
    }

    function addFichasAdicionales() {
        const selectedOptions = Array.from(selectFichasAdicionales.selectedOptions).map(option => option.value);
        fichasAdicionales = selectedOptions;
        updateVisor(visorFichasAgregadas, fichasAdicionales);
        calculateMejorFicha();
    }

    function addPasesEquipo1() {
        const selectedOptions = Array.from(selectPasesEquipo1.selectedOptions).map(option => option.value);
        pasesEquipo1 = selectedOptions;
        updateVisor(visorPasesEquipo1, pasesEquipo1);
        calculateMejorFicha();
    }

    function addPasesEquipo2() {
        const selectedOptions = Array.from(selectPasesEquipo2.selectedOptions).map(option => option.value);
        pasesEquipo2 = selectedOptions;
        updateVisor(visorPasesEquipo2, pasesEquipo2);
        calculateMejorFicha();
    }

    function addJugadasEquipo1() {
        const selectedOptions = Array.from(selectJugadasEquipo1.selectedOptions).map(option => option.value);
        jugadasEquipo1 = selectedOptions;
        updateVisor(visorJugadasEquipo1, jugadasEquipo1);
        calculateMejorFicha();
    }

    function addJugadasEquipo2() {
        const selectedOptions = Array.from(selectJugadasEquipo2.selectedOptions).map(option => option.value);
        jugadasEquipo2 = selectedOptions;
        updateVisor(visorJugadasEquipo2, jugadasEquipo2);
        calculateMejorFicha();
    }

    function calculateMejorFicha() {
        const puntos = ficha => ficha.split('-').map(Number).reduce((a, b) => a + b, 0);

        const isDoble = ficha => ficha.split('-')[0] === ficha.split('-')[1];
        const masDeSeisPuntos = ficha => puntos(ficha) > 6;
        const masDeTresEnMano = ficha => fichasIniciales.filter(f => f.includes(ficha.split('-')[0]) || f.includes(ficha.split('-')[1])).length > 3;

        const extremos = new Set([
            ...jugadasEquipo1.map(f => f.split('-')).flat(), 
            ...jugadasEquipo2.map(f => f.split('-')).flat()
        ]);

        const posiblesExtremos = [...extremos].filter(num => !pasesEquipo1.includes(num));

        const mejorFichas = fichasSeleccionadas.filter(ficha => {
            const [num1, num2] = ficha.split('-');
            const criterios = [
                isDoble(ficha),
                masDeSeisPuntos(ficha),
                masDeTresEnMano(ficha),
                pasesEquipo1.some(p => p.includes(num1) || p.includes(num2)),
                pasesEquipo2.some(p => p.includes(num1) || p.includes(num2)),
                posiblesExtremos.includes(num1) || posiblesExtremos.includes(num2)
            ];

            const conteoCriterios = criterios.filter(Boolean).length;

            if (conteoCriterios >= 5) return true;
            if (conteoCriterios === 4) return true;
            if (conteoCriterios >= 1) return true;

            return false;
        });

        visorMejorFicha.innerHTML = mejorFichas.length > 0 
            ? `<ul>${mejorFichas.map(ficha => `<li>${ficha}</li>`).join('')}</ul>` 
            : '<p>No hay fichas que cumplan los criterios.</p>';
    }

    // Inicializar listas desplegables
    populateSelectOptions(selectFichas);
    populateSelectOptions(selectFichasAdicionales);
    populateSelectOptions(selectPasesEquipo1);
    populateSelectOptions(selectPasesEquipo2);
    populateSelectOptions(selectJugadasEquipo1);
    populateSelectOptions(selectJugadasEquipo2);

    // Asignar eventos a botones
    document.getElementById('add-fichas-btn').addEventListener('click', addFichas);
    document.getElementById('add-fichas-adicionales-btn').addEventListener('click', addFichasAdicionales);
    document.getElementById('add-pases-equipo1-btn').addEventListener('click', addPasesEquipo1);
    document.getElementById('add-pases-equipo2-btn').addEventListener('click', addPasesEquipo2);
    document.getElementById('add-jugadas-equipo1-btn').addEventListener('click', addJugadasEquipo1);
    document.getElementById('add-jugadas-equipo2-btn').addEventListener('click', addJugadasEquipo2);

    // Inicialización de visores
    updateVisor(visorMisFichas, fichasSeleccionadas);
    updateVisor(visorFichasAgregadas, fichasAdicionales);
    updateVisor(visorPasesEquipo1, pasesEquipo1);
    updateVisor(visorPasesEquipo2, pasesEquipo2);
    updateVisor(visorJugadasEquipo1, jugadasEquipo1);
    updateVisor(visorJugadasEquipo2, jugadasEquipo2);
    calculateMejorFicha();

    // Función para actualizar la lista de fichas disponibles en los selects
    function updateSelectOptions(selectElement, items) {
        selectElement.innerHTML = items.map(ficha => `<option value="${ficha}">${ficha}</option>`).join('');
    }

    // Filtrar fichas ya seleccionadas para no mostrarlas en las listas desplegables
    function filterAvailableFichas() {
        const seleccionadas = [...fichasSeleccionadas, ...fichasAdicionales];
        const disponibles = fichas.filter(ficha => !seleccionadas.includes(ficha));
        
        updateSelectOptions(selectFichas, disponibles);
        updateSelectOptions(selectFichasAdicionales, disponibles);
    }

    // Recalcular las fichas disponibles en los select cada vez que se agregue o elimine una ficha
    function addFichasWithUpdate() {
        addFichas();
        filterAvailableFichas();
    }

    function addFichasAdicionalesWithUpdate() {
        addFichasAdicionales();
        filterAvailableFichas();
    }

    function removeItemWithUpdate(item, visorId) {
        removeItem(item, visorId);
        filterAvailableFichas();
    }

    // Sobrescribir los eventos de click para los botones para incluir el filtrado
    document.getElementById('add-fichas-btn').removeEventListener('click', addFichas);
    document.getElementById('add-fichas-adicionales-btn').removeEventListener('click', addFichasAdicionales);
    
    document.getElementById('add-fichas-btn').addEventListener('click', addFichasWithUpdate);
    document.getElementById('add-fichas-adicionales-btn').addEventListener('click', addFichasAdicionalesWithUpdate);

    // Sobrescribir la función removeItem para actualizar las fichas disponibles en los selects
    window.removeItem = removeItemWithUpdate;

    // Inicializar la lista de fichas disponibles al cargar la página
    filterAvailableFichas();
});
