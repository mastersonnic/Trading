document.addEventListener('DOMContentLoaded', () => {
    const sieteFichasVisibles = document.getElementById('visor-j1');
    const mejorFichaDiv = document.getElementById('mejor-ficha');
    const conFrenteSwitch = document.getElementById('con-frente-switch');

    let sieteFichas = [];
    let misFichas = [];
    let fichaEnExtremos = [];
    let fichaPasada = [];

    function actualizarFichas() {
        const fichasSeleccionadas = document.querySelectorAll('#fichas input[type="checkbox"]:checked');
        sieteFichas = Array.from(fichasSeleccionadas).map(checkbox => checkbox.value);
        misFichas = sieteFichas.slice(); // Copia las fichas seleccionadas a "mis fichas"

        sieteFichasVisibles.innerHTML = sieteFichas.join('<br>');
        actualizarMejorFicha();
    }

    function obtenerFichaConMasCoincidencias(fichas, grupo) {
        const conteo = fichas.reduce((acc, ficha) => {
            const [x, y] = ficha.split('-').map(Number);
            const grupos = [];

            // A1: Fichas dobles
            if (grupo.includes('A1') && x === y) grupos.push('A1');
            // B1: Fichas donde X + Y > 6
            if (grupo.includes('B1') && (x + y) > 6) grupos.push('B1');
            // C1: Números que aparecen en al menos 3 fichas
            if (grupo.includes('C1') && (fichas.filter(f => f.includes(x.toString())).length >= 3)) grupos.push('C1');
            // D1: Ficha que está en el extremo de la mesa
            if (grupo.includes('D1') && fichaEnExtremos.includes(x)) grupos.push('D1');
            // E1: Ficha no pasada por el aliado
            if (grupo.includes('E1') && !fichaPasada.includes(x)) grupos.push('E1');

            if (grupos.length > 0) {
                if (!acc[ficha]) acc[ficha] = { ficha, grupos };
                else acc[ficha].grupos = Array.from(new Set([...acc[ficha].grupos, ...grupos]));
            }
            return acc;
        }, {});

        return Object.values(conteo).reduce((prev, curr) => (curr.grupos.length > prev.grupos.length ? curr : prev), { grupos: [] });
    }

    function actualizarMejorFicha() {
        const grupoTeorico = obtenerFichaConMasCoincidencias(sieteFichas, getGruposTeoricos());
        const grupoJugable = obtenerFichaConMasCoincidencias(misFichas, getGruposJugables());

        mejorFichaDiv.innerHTML = `
            <strong>Mejor ficha teórica:</strong> ${grupoTeorico.ficha || 'Ninguna'} ${grupoTeorico.ficha ? `porque pertenece a los grupos (${grupoTeorico.grupos.join(', ')})` : ''}
            <br>
            <strong>Mejor ficha jugable:</strong> ${grupoJugable.ficha || 'Ninguna'} ${grupoJugable.ficha ? `porque pertenece a los grupos (${grupoJugable.grupos.join(', ')})` : ''}
        `;
    }

    function getGruposTeoricos() {
        return ['A1', 'B1', 'C1']; // Aquí irían los grupos teóricos
    }

    function getGruposJugables() {
        return ['A1', 'B1', 'C1', 'D1', 'E1']; // Aquí irían los grupos jugables
    }

    function jugarFicha(ficha) {
        // Quita la ficha jugada de "misFichas" para que ya no sea jugable
        misFichas = misFichas.filter(f => f !== ficha);
        // Actualiza el visor y las mejores fichas
        actualizarMejorFicha();
    }

    function obtenerDatosExtremos() {
        // Implementa aquí la lógica para obtener las fichas en los extremos y las pasadas
        // Ejemplo:
        return {
            fichaEnExtremos: [], // Fichas en los extremos actuales
            fichaPasada: [] // Fichas que han sido pasadas
        };
    }

    document.querySelectorAll('#fichas input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', actualizarFichas);
    });

    conFrenteSwitch.addEventListener('change', actualizarMejorFicha);

    // Inicializa el visor al cargar la página
    actualizarFichas();

    // Simulación de jugada (ejemplo)
    document.getElementById('jugar-boton').addEventListener('click', () => {
        const fichaAJugar = misFichas[0]; // Juega la primera ficha en "misFichas"
        jugarFicha(fichaAJugar);
    });
});
