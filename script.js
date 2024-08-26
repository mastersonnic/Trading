document.addEventListener('DOMContentLoaded', function () {
    // Lista de todas las fichas disponibles
    const fichasDisponibles = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
        [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
        [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
        [3, 3], [3, 4], [3, 5], [3, 6],
        [4, 4], [4, 5], [4, 6],
        [5, 5], [5, 6],
        [6, 6]
    ];

    // Estado inicial
    let misFichas = [];
    let pasesEquipo1 = [];
    let pasesEquipo2 = [];
    let jugadasEquipo1 = [];
    let jugadasEquipo2 = [];

    // Referencias al DOM
    const fichasDisponiblesSelect = document.getElementById('fichas-disponibles');
    const misFichasVisor = document.getElementById('mis-fichas');
    const pasesEquipo1Visor = document.getElementById('pases-equipo-1');
    const pasesEquipo2Visor = document.getElementById('pases-equipo-2');
    const jugadasEquipo1Visor = document.getElementById('jugadas-equipo-1');
    const jugadasEquipo2Visor = document.getElementById('jugadas-equipo-2');
    const mejorFichaJugarVisor = document.getElementById('mejor-ficha-jugar');
    const confirmarSeleccionBtn = document.getElementById('confirmar-seleccion');
    const errorMessageP = document.getElementById('error-message');

    // Inicialización de las fichas disponibles
    function inicializarFichas() {
        fichasDisponibles.forEach((ficha, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Ficha ${ficha[0]} | ${ficha[1]}`;
            fichasDisponiblesSelect.appendChild(option);
        });
    }

    // Manejar la selección de fichas
    function manejarSeleccionFicha() {
        const fichaIndex = parseInt(fichasDisponiblesSelect.value);
        const ficha = fichasDisponibles[fichaIndex];

        if (!ficha || misFichas.some(f => f[0] === ficha[0] && f[1] === ficha[1])) {
            mostrarError('Ficha ya seleccionada o inválida.');
            return;
        }

        if (misFichas.length < 7) {
            misFichas.push(ficha);
            agregarFichaAMisFichas(ficha);
            fichasDisponiblesSelect.querySelector(`option[value="${fichaIndex}"]`).disabled = true;
        } else {
            mostrarError('Ya has seleccionado 7 fichas.');
        }

        confirmarSeleccionBtn.disabled = misFichas.length !== 7;
        limpiarError();

        // Actualizar la mejor ficha para jugar
        actualizarMejorFichaParaJugar();
    }

    // Agregar ficha seleccionada a "Mis Fichas"
    function agregarFichaAMisFichas(ficha) {
        const fichaTexto = `Ficha ${ficha[0]} | ${ficha[1]}`;
        misFichasVisor.textContent += `${fichaTexto}\n`;
    }

    // Mostrar error
    function mostrarError(mensaje) {
        errorMessageP.textContent = mensaje;
    }

    // Limpiar error
    function limpiarError() {
        errorMessageP.textContent = '';
    }

    // Determinar la mejor
