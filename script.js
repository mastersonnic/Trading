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
    const fichasDisponiblesUl = document.getElementById('fichas-disponibles');
    const misFichasUl = document.getElementById('mis-fichas');
    const mejorFichaJugarUl = document.getElementById('mejor-ficha-jugar');
    const confirmarSeleccionBtn = document.getElementById('confirmar-seleccion');
    const errorMessageP = document.getElementById('error-message');

    // Inicialización de las fichas disponibles
    function inicializarFichas() {
        fichasDisponibles.forEach((ficha, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" id="ficha-${index}" data-index="${index}">
                Ficha ${ficha[0]} | ${ficha[1]}
            `;
            fichasDisponiblesUl.appendChild(li);

            // Evento al seleccionar una ficha
            li.querySelector('input').addEventListener('change', function () {
                manejarSeleccionFicha(this);
            });
        });
    }

    // Manejar la selección de fichas
    function manejarSeleccionFicha(checkbox) {
        const fichaIndex = parseInt(checkbox.dataset.index);
        const ficha = fichasDisponibles[fichaIndex];

        if (checkbox.checked) {
            if (misFichas.length < 7) {
                misFichas.push(ficha);
                agregarFichaAMisFichas(ficha);
            } else {
                checkbox.checked = false;
                mostrarError('Ya has seleccionado 7 fichas.');
            }
        } else {
            misFichas = misFichas.filter(f => !(f[0] === ficha[0] && f[1] === ficha[1]));
            removerFichaDeMisFichas(ficha);
        }

        // Habilitar/deshabilitar botón de confirmar
        confirmarSeleccionBtn.disabled = misFichas.length !== 7;

        // Limpiar mensaje de error si la selección es correcta
        if (misFichas.length <= 7) {
            limpiarError();
        }

        // Actualizar la mejor ficha para jugar
        actualizarMejorFichaParaJugar();
    }

    // Agregar ficha seleccionada a "Mis Fichas"
    function agregarFichaAMisFichas(ficha) {
        const li = document.createElement('li');
        li.textContent = `Ficha ${ficha[0]} | ${ficha[1]}`;
        misFichasUl.appendChild(li);
    }

    // Remover ficha deseleccionada de "Mis Fichas"
    function removerFichaDeMisFichas(ficha) {
        const items = misFichasUl.querySelectorAll('li');
        items.forEach(item => {
            if (item.textContent === `Ficha ${ficha[0]} | ${ficha[1]}`) {
                misFichasUl.removeChild(item);
            }
        });
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
        mejorFichaJugarUl.innerHTML = '';

        const mejoresFichas = misFichas.filter(ficha => {
            return esDoble(ficha) ||
                sumaMayorQueSeis(ficha) ||
                tengoTresOMasDelNumero(ficha);
        });

        if (mejoresFichas.length > 0) {
            mejoresFichas.forEach(ficha => {
                const li = document.createElement('li');
                li.textContent = `Ficha ${ficha[0]} | ${ficha[1]}`;
                mejorFichaJugarUl.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No hay una ficha clara para jugar.';
            mejorFichaJugarUl.appendChild(li);
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

    // Inicializar fichas al cargar la página
    inicializarFichas();
});
