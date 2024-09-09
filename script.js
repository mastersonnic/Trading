// Variable que contiene todas las fichas de dominó
const todasLasFichas = [
    "0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6",
    "1-1", "1-2", "1-3", "1-4", "1-5", "1-6",
    "2-2", "2-3", "2-4", "2-5", "2-6",
    "3-3", "3-4", "3-5", "3-6",
    "4-4", "4-5", "4-6",
    "5-5", "5-6",
    "6-6"
];

// Variable para almacenar las fichas seleccionadas
let sietefichas = [];

// Elementos del DOM
const fichasLista = document.getElementById('fichas-lista');
const formulario = document.getElementById('fichas-form');
const mensaje = document.getElementById('mensaje');

// Generar la lista de fichas con checkboxes
todasLasFichas.forEach((ficha, index) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `ficha-${index}`;
    checkbox.value = ficha;
    checkbox.addEventListener('change', handleFichaSelection);

    const label = document.createElement('label');
    label.htmlFor = `ficha-${index}`;
    label.textContent = ficha;

    const div = document.createElement('div');
    div.appendChild(checkbox);
    div.appendChild(label);

    fichasLista.appendChild(div);
});

// Manejar la selección y deselección de fichas
function handleFichaSelection(e) {
    const ficha = e.target.value;

    if (e.target.checked) {
        if (sietefichas.length < 7) {
            sietefichas.push(ficha);
        } else {
            e.target.checked = false;
            mensaje.textContent = "Solo puedes seleccionar 7 fichas.";
        }
    } else {
        sietefichas = sietefichas.filter(f => f !== ficha);
        mensaje.textContent = "";
    }
}

// Manejar la confirmación del formulario
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    if (sietefichas.length === 7) {
        mensaje.textContent = "Selección confirmada: " + sietefichas.join(", ");
        mensaje.classList.remove('error');
        actualizarListaDesplegable(); // Llamar a la función para actualizar la lista desplegable
    } else {
        mensaje.textContent = "Debes seleccionar exactamente 7 fichas.";
        mensaje.classList.add('error');
    }
});
k
