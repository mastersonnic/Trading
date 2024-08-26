document.addEventListener('DOMContentLoaded', function() {
    const fichas = [];
    for (let i = 0; i <= 6; i++) {
        for (let j = i; j <= 6; j++) {
            fichas.push(`${i}|${j}`);
        }
    }

    const fichasSelect = document.getElementById('fichas');
    const misFichasList = document.getElementById('mis-fichas-list');
    const pasesEquipo1List = document.getElementById('pases-equipo-1-list');
    const pasesEquipo2List = document.getElementById('pases-equipo-2-list');
    const jugadasEquipo1List = document.getElementById('jugadas-equipo-1-list');
    const jugadasEquipo2List = document.getElementById('jugadas-equipo-2-list');
    const mejorFichaList = document.getElementById('mejor-ficha-list');

    let seleccionadas = new Set(); // Para registrar las fichas seleccionadas por ti

    // Poblamos el selector de fichas con las 28 fichas posibles
    fichas.forEach(ficha => {
        const option = document.createElement('option');
        option.value = ficha;
        option.textContent = ficha;
        fichasSelect.appendChild(option);
    });

    // Confirmar fichas seleccionadas
    document.getElementById('confirmar-fichas').addEventListener('click', function() {
        const selectedFichas = Array.from(fichasSelect.selectedOptions).map(option => option.value);

        if (selectedFichas.length !== 7) {
            alert('Debes seleccionar exactamente 7 fichas.');
            return;
        }

        seleccionadas.clear();
        selectedFichas.forEach(ficha => seleccionadas.add(ficha));

        updateList(misFichasList, Array.from(seleccionadas));
        updateMejorFichaList();
    });

    // Función para actualizar las listas visuales
    function updateList(element, items) {
        element.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            element.appendChild(li);
        });
    }

    // Función para calcular y mostrar la "mejor ficha para jugar"
    function updateMejorFichaList() {
        mejorFichaList.innerHTML = '';

        const mejoresFichas = Array.from(seleccionadas).filter(ficha => {
            const [lado1, lado2] = ficha.split('|').map(Number);

            // Criterios A, B, y C
            return (
                (lado1 === lado2) || // A) Es un doble
                (lado1 + lado2 > 6) || // B) Suma más de 6 puntos
                (Array.from(seleccionadas).filter(f => f.includes(lado1) || f.includes(lado2)).length > 3) // C) Tengo más de 3 fichas con este número
            );
        });

        // Aplicación de los criterios D, E, F
        const extremosEquipo1 = getExtremos(jugadasEquipo1List);
        const extremosEquipo2 = getExtremos(pasesEquipo2List);

        const mejoresFichasFinal = mejoresFichas.filter(ficha => {
            const [lado1, lado2] = ficha.split('|').map(Number);
            return (
                extremosEquipo1.has(lado1) || extremosEquipo1.has(lado2) || // D) Equipo 1 colocó alguno de su número como extremo
                extremosEquipo2.has(lado1) || extremosEquipo2.has(lado2) // E) Jugadores del equipo 2 han pasado a su número
            );
        }).filter(ficha => {
            const [lado1, lado2] = ficha.split('|').map(Number);
            return !extremosEquipo1.has(lado1) && !extremosEquipo1.has(lado2); // F) Restar posibles extremos a los que ha pasado Equipo 1
        });

        if (mejoresFichasFinal.length > 0) {
            updateList(mejorFichaList, mejoresFichasFinal);
        } else {
            mejorFichaList.innerHTML = '<li>No hay fichas recomendadas para jugar.</li>';
        }
    }

    // Función para obtener los extremos de una lista
    function getExtremos(listElement) {
        const extremos = new Set();
        Array.from(listElement.children).forEach(li => {
            const [lado1, lado2] = li.textContent.split('|').map(Number);
            extremos.add(lado1);
            extremos.add(lado2);
        });
        return extremos;
    }

    // Eventos para agregar fichas a las listas de jugadas y pases
    document.getElementById('agregar-pase-equipo-1').addEventListener('click', () => {
        agregarFicha(pasesEquipo1List);
    });

    document.getElementById('agregar-pase-equipo-2').addEventListener('click', () => {
        agregarFicha(pasesEquipo2List);
    });

    document.getElementById('agregar-jugada-equipo-1').addEventListener('click', () => {
        agregarFicha(jugadasEquipo1List);
    });

    document.getElementById('agregar-jugada-equipo-2').addEventListener('click', () => {
        agregarFicha(jugadasEquipo2List);
    });

    // Función para agregar fichas a las listas de jugadas o pases
    function agregarFicha(listElement) {
        const ficha = prompt("Ingresa la ficha que quieres agregar (formato: X|Y):");
        if (ficha && fichas.includes(ficha)) {
            const li = document.createElement('li');
            li.textContent = ficha;
            listElement.appendChild(li);
            updateMejorFichaList(); // Actualiza la mejor ficha considerando nuevas jugadas/pases
        } else {
            alert('Ficha inválida. Inténtalo de nuevo.');
        }
    }

    // Botón de reinicio para que puedas iniciar de nuevo
    document.getElementById('reiniciar').addEventListener('click', () => {
        seleccionadas.clear();
        updateList(misFichasList, []);
        updateList(pasesEquipo1List, []);
        updateList(pasesEquipo2List, []);
        updateList(jugadasEquipo1List, []);
        updateList(jugadasEquipo2List, []);
        updateList(mejorFichaList, []);
    });
});
