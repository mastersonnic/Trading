document.addEventListener('DOMContentLoaded', () => {
    const fichas = Array.from({ length: 28 }, (_, i) => `${Math.floor(i / 7)}-${i % 7}`);
    const fichasList = document.getElementById('fichas-mis');
    const fichasDisponibles = document.getElementById('fichas-disponibles');
    const visorMisFichas = document.getElementById('visor-mis-fichas');
    const visorFichasAgregadas = document.getElementById('visor-fichas-agregadas');
    const visorPasesEquipo1 = document.getElementById('visor-pases-equipo1');
    const visorPasesEquipo2 = document.getElementById('visor-pases-equipo2');
    const visorJugadasEquipo1 = document.getElementById('visor-jugadas-equipo1');
    const visorJugadasEquipo2 = document.getElementById('visor-jugadas-equipo-2');
    const visorMejorFicha = document.getElementById('visor-mejor-ficha');

    const fichasSeleccionadas = new Set();
    const fichasAgregadas = new Set();
    const pasesEquipo1 = new Set();
    const pasesEquipo2 = new Set();
    const jugadasEquipo1 = new Set();
    const jugadasEquipo2 = new Set();
    
    // Rellenar listas desplegables con opciones de fichas
    fichas.forEach(ficha => {
        const option = document.createElement('option');
        option.value = ficha;
        option.textContent = ficha;
        fichasList.appendChild(option.cloneNode(true));
        fichasDisponibles.appendChild(option);
    });

    // Función para actualizar visores
    function actualizarVisor(id, elementos) {
        const visor = document.getElementById(id);
        visor.innerHTML = '';
        elementos.forEach(ficha => {
            const li = document.createElement('li');
            li.textContent = ficha;
            const btn = document.createElement('button');
            btn.textContent = 'Eliminar';
            btn.addEventListener('click', () => {
                eliminarFicha(id, ficha);
            });
            li.appendChild(btn);
            visor.appendChild(li);
        });
    }

    // Confirmar fichas iniciales
    document.getElementById('confirmar-fichas').addEventListener('click', () => {
        const opciones = Array.from(fichasList.selectedOptions).map(opt => opt.value);
        if (opciones.length !== 7) {
            alert('Debes seleccionar exactamente 7 fichas.');
            return;
        }
        fichasSeleccionadas.clear();
        opciones.forEach(ficha => fichasSeleccionadas.add(ficha));
        actualizarVisor('visor-mis-fichas', fichasSeleccionadas);
    });

    // Agregar fichas desde la lista de disponibles
    document.getElementById('agregar-fichas').addEventListener('click', () => {
        const opciones = Array.from(fichasDisponibles.selectedOptions).map(opt => opt.value);
        opciones.forEach(ficha => fichasAgregadas.add(ficha));
        actualizarVisor('visor-fichas-agregadas', fichasAgregadas);
    });

    // Función para eliminar ficha de un visor
    function eliminarFicha(id, ficha) {
        const visorSet = id === 'visor-mis-fichas' ? fichasSeleccionadas :
                         id === 'visor-fichas-agregadas' ? fichasAgregadas :
                         id === 'visor-pases-equipo1' ? pasesEquipo1 :
                         id === 'visor-pases-equipo2' ? pasesEquipo2 :
                         id === 'visor-jugadas-equipo1' ? jugadasEquipo1 :
                         id === 'visor-jugadas-equipo2' ? jugadasEquipo2 : null;

        if (visorSet) {
            visorSet.delete(ficha);
            actualizarVisor(id, visorSet);
            // Rehabilitar opción en lista desplegable si corresponde
            if (id === 'visor-fichas-agregadas') {
                const option = Array.from(fichasDisponibles.querySelectorAll('option'))
                                    .find(opt => opt.value === ficha);
                if (option) {
                    option.selected = false;
                }
            }
        }
    }

    // Actualizar visores de pases y jugadas
    function agregarElementoLista(id, ficha, lista) {
        lista.add(ficha);
        actualizarVisor(id, lista);
    }

    // Agregar pases al visor correspondiente
    document.getElementById('pases-equipo1').addEventListener('change', (event) => {
        Array.from(event.target.selectedOptions).forEach(opt => {
            agregarElementoLista('visor-pases-equipo1', opt.value, pasesEquipo1);
        });
    });

    document.getElementById('pases-equipo2').addEventListener('change', (event) => {
        Array.from(event.target.selectedOptions).forEach(opt => {
            agregarElementoLista('visor-pases-equipo2', opt.value, pasesEquipo2);
        });
    });

    // Agregar jugadas al visor correspondiente
    document.getElementById('jugadas-equipo1').addEventListener('change', (event) => {
        Array.from(event.target.selectedOptions).forEach(opt => {
            agregarElementoLista('visor-jugadas-equipo1', opt.value, jugadasEquipo1);
        });
    });

    document.getElementById('jugadas-equipo2').addEventListener('change', (event) => {
        Array.from(event.target.selectedOptions).forEach(opt => {
            agregarElementoLista('visor-jugadas-equipo2', opt.value, jugadasEquipo2);
        });
    });

    // Función para calcular la mejor ficha para jugar
    function calcularMejorFicha() {
        const fichasSeleccionadasArray = Array.from(fichasSeleccionadas);
        const fichasAgregadasArray = Array.from(fichasAgregadas);

        const extremosEquipo1 = Array.from(pasesEquipo1);
        const numerosPasadosEquipo2 = Array.from(pasesEquipo2);
        const numerosPasadosEquipo1 = Array.from(jugadasEquipo1);

        const mejorFicha = fichasSeleccionadasArray.filter(ficha => {
            const [lado1, lado2] = ficha.split('-').map(Number);
            const esDoble = lado1 === lado2;
            const puntos = lado1 + lado2;
            const numFichasConLado1 = fichasSeleccionadasArray.filter(f => f.includes(lado1)).length;
            const numFichasConLado2 = fichasSeleccionadasArray.filter(f => f.includes(lado2)).length;
            const esFichaValida = (
                esDoble || puntos > 6 || numFichasConLado1 > 3 || numFichasConLado2 > 3
            );
            return esFichaValida && (
                extremosEquipo1.some(ext => ext.includes(lado1) || ext.includes(lado2)) ||
                numerosPasadosEquipo2.includes(lado1) || numerosPasadosEquipo2.includes(lado2) ||
                numerosPasadosEquipo1.includes(lado1) || numerosPasadosEquipo1.includes(lado2)
            );
        });

        actualizarVisor('visor-mejor-ficha', mejorFicha);
    }

    // Calcula la mejor ficha para jugar cada vez que se actualiza alguna lista relevante
    function actualizarMejorFicha() {
        calcularMejorFicha();
    }

    // Event listeners para actualizar la mejor ficha
    document.getElementById('confirmar-fichas').addEventListener('click', actualizarMejorFicha);
    document.getElementById('agregar-fichas').addEventListener('click', actualizarMejorFicha);
    document.getElementById('pases-equipo1').addEventListener('change', actualizarMejorFicha);
    document.getElementById('pases-equipo2').addEventListener('change', actualizarMejorFicha);
    document.getElementById('jugadas-equipo1').addEventListener('change', actualizarMejorFicha);
    document.getElementById('jugadas-equipo2').addEventListener('change', actualizarMejorFicha);
});
