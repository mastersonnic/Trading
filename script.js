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
    const misFichasSelect = document.getElementById('mis-fichas');
    const mejorFichaJugarSelect = document.getElementById('mejor-ficha-jugar');
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
        const option = document.createElement('option');
        option.textContent = `Ficha ${ficha[0]} | ${ficha[1]}`;
        option.value = `${ficha[0]}|${ficha[1]}`;
        misFichasSelect.appendChild(option);
    }

    // Mostrar error
    function mostrarError(mensaje) {
        errorMessageP.textContent = mensaje;
    }

    // Limpiar error
    function limpiarError() {
        errorMessageP.textContent = '';
    }

    // Determinar la mejor ficha para jugar
    function actualizarMejorFichaParaJugar() {
        mejorFichaJugarSelect.innerHTML = '';

        const mejoresFichas = misFichas.filter(ficha => {
            return esDoble(ficha) ||
                sumaMayorQueSeis(ficha) ||
                tengoTresOMasDelNumero(ficha);
        });

        if (mejoresFichas.length > 0) {
            mejoresFichas.forEach(ficha => {
                const option = document.createElement('option');
                option.textContent = `Ficha ${ficha[0]} | ${ficha[1]}`;
                mejorFichaJugarSelect.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.textContent = 'No hay una ficha clara para jugar.';
            mejorFichaJugarSelect.appendChild(option);
        }
    }

    // Reglas para determinar la mejor ficha
    function esDoble(ficha) {
        return ficha[0] === ficha[1];
    }

    function sumaMayorQueSeis(ficha) {
        return (ficha[0] + ficha[1]) > 6;
    }

    function tengoTresOMasDelNumero(ficha) {
        const numeroA = ficha[0];
        const numeroB = ficha[1];
        const cuentaA = misFichas.filter(f => f[0] === numeroA || f[1] === numeroA).length;
        const cuentaB = misFichas.filter(f => f[0] === numeroB || f[1] === numeroB).length;
        return cuentaA >= 3 || cuentaB >= 3;
    }

    // Confirmar selección de fichas
    confirmarSeleccionBtn.addEventListener('click', function () {
        if (misFichas.length === 7) {
            alert('Has confirmado tu selección de fichas.');
            // Aquí podrías iniciar la lógica del juego o continuar a la siguiente fase.
        } else {
            mostrarError('Debes seleccionar exactamente 7 fichas.');
        }
    });

    // Evento para manejar la selección
    fichasDisponiblesSelect.addEventListener('change', manejarSeleccionFicha);

    // Inicializar fichas al cargar la página
    inicializarFichas();
});
