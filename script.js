document.addEventListener('DOMContentLoaded', () => {
    const fichas = ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '2-2', '2-3', '2-4', '2-5', '2-6', '3-3', '3-4', '3-5', '3-6', '4-4', '4-5', '4-6', '5-5', '5-6', '6-6'];

    const fichaToc = document.getElementById('ficha-toc');
    const switchFrente = document.getElementById('switch-frente');

    fichas.forEach(ficha => {
        const fichaDiv = document.createElement('div');
        fichaDiv.className = 'ficha';
        fichaDiv.textContent = ficha;
        fichaDiv.addEventListener('click', () => {
            if (switchFrente.checked) {
                fichaToc.textContent = ficha;
            }
        });
        document.getElementById('grupo-fichas').appendChild(fichaDiv);
    });

    const acabarManoButton = document.getElementById('acabar-mano');
    acabarManoButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres acabar la mano?')) {
            // Lógica para reiniciar la mano (si es necesario)
            Object.values(jugadasSelects).forEach(select => {
                select.innerHTML = '';
            });
        }
    });
});
        }
    });
});
