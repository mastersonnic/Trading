document.addEventListener('DOMContentLoaded', () => {
    const jugadasSelects = {
        yo: document.getElementById('jugadas-yo'),
        izquierda: document.getElementById('jugadas-izquierda'),
        derecha: document.getElementById('jugadas-derecha'),
        frente: document.getElementById('jugadas-frente'),
        paseYo: document.getElementById('pase-yo'),
        salioYo: document.getElementById('salio-yo'),
        paseIzquierda: document.getElementById('pase-izquierda'),
        salioIzquierda: document.getElementById('salio-izquierda'),
        paseDerecha: document.getElementById('pase-derecha'),
        salioDerecha: document.getElementById('salio-derecha'),
        paseFrente: document.getElementById('pase-frente'),
        salioFrente: document.getElementById('salio-frente')
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
            const paseDiv = jugadasSelects[`pase${activeJugadas.charAt(0).toUpperCase() + activeJugadas.slice(1)}`];
            const salioDiv = jugadasSelects[`salio${activeJugadas.charAt(0).toUpperCase() + activeJugadas.slice(1)}`];

            const fichaElement = document.createElement('div');
            fichaElement.textContent = ficha;

            if (activeJugadas.includes('jugadas')) {
                jugadasDiv.appendChild(fichaElement);
            } else if (activeJugadas.includes('pase')) {
                paseDiv.appendChild(fichaElement);
            } else if (activeJugadas.includes('salio')) {
                salioDiv.appendChild(fichaElement);
            }
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
        }
    });
});  
