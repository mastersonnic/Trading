document.addEventListener('DOMContentLoaded', () => {
    const jugadasSelects = {
        yo: document.getElementById('jugadas-yo'),
        izquierda: document.getElementById('jugadas-izquierda'),
        derecha: document.getElementById('jugadas-derecha'),
        frente: document.getElementById('jugadas-frente')
    };

    const paseSelects = {
        yo: document.getElementById('pase-yo'),
        izquierda: document.getElementById('pase-izquierda'),
        derecha: document.getElementById('pase-derecha'),
        frente: document.getElementById('pase-frente')
    };

    const salioSelects = {
        yo: document.getElementById('sali-yo'),
        izquierda: document.getElementById('salio-izquierda'),
        derecha: document.getElementById('salio-derecha'),
        frente: document.getElementById('salio-frente')
    };

    const switchFrente = document.getElementById('switch-frente');
    const acabarManoButton = document.getElementById('acabar-mano');
    const grupoFichas = document.getElementById('grupo-fichas');
    let activeJugadas = 'yo';

    const fichas = ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '2-2', '2-3', '2-4', '2-5', '2-6', '3-3', '3-4', '3-5', '3-6', '4-4', '4-5', '4-6', '5-5', '5-6', '6-6'];

    fichas.forEach(ficha => {
        const fichaDiv = document.createElement('div');
        fichaDiv.className = 'ficha';
        fichaDiv.textContent = ficha;
        fichaDiv.addEventListener('click', () => {
            const jugadasDiv = jugadasSelects[activeJugadas];
            const fichaElement = document.createElement('div');
            fichaElement.textContent = ficha;
            jugadasDiv.appendChild(fichaElement);
        });
        grupoFichas.appendChild(fichaDiv);
    });

    document.querySelectorAll('input[name="jugadas-switch"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            activeJugadas = event.target.value;
        });
    });

    switchFrente.addEventListener('change', () => {
        if (switchFrente.checked) {
            jugadasSelects.frente.parentElement.style.display = 'block';
        } else {
            jugadasSelects.frente.parentElement.style.display = 'none';
        }
    });

    if (!switchFrente.checked) {
        jugadasSelects.frente.parentElement.style.display = 'none';
    }

        acabarManoButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres acabar la mano?')) {
            Object.values(jugadasSelects).forEach(select => {
                select.innerHTML = '';
            });
            Object.values(paseSelects).forEach(select => {
                select.innerHTML = '';
            });
            Object.values(salioSelects).forEach(select => {
                select.innerHTML = '';
            });
        }
    });

    // Funcionalidad para asignar fichas a los visores de "Pasé" y "Salí"
    fichas.forEach(ficha => {
        const fichaDiv = document.createElement('div');
        fichaDiv.className = 'ficha';
        fichaDiv.textContent = ficha;
        fichaDiv.addEventListener('click', () => {
            const jugadasDiv = jugadasSelects[activeJugadas];
            const paseDiv = paseSelects[activeJugadas];
            const salioDiv = salioSelects[activeJugadas];

            const fichaElement = document.createElement('div');
            fichaElement.textContent = ficha;

            if (activeJugadas === 'yo') {
                jugadasDiv.appendChild(fichaElement);
            } else if (activeJugadas === 'izquierda') {
                paseDiv.appendChild(fichaElement);
            } else if (activeJugadas === 'derecha') {
                salioDiv.appendChild(fichaElement);
            } else if (activeJugadas === 'frente') {
                jugadasDiv.appendChild(fichaElement);
            }
        });
        grupoFichas.appendChild(fichaDiv);
    });
});
