// Inicialización de variables
let misfichasjugadas = [];
let Actuales = [];

// Función para actualizar la lista desplegable
function actualizarListaDesplegable() {
    const lista = document.getElementById('misfichasactualeslista');
    lista.innerHTML = ''; // Limpiar la lista

    sietefichas.forEach((ficha, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = ficha;
        lista.appendChild(option);
    });
}

// Evento para mover fichas seleccionadas a misfichasjugadas
document.getElementById('misfichasactualeslista').addEventListener('change', function() {
    const seleccionadas = Array.from(this.selectedOptions).map(option => option.value);
    seleccionadas.forEach(index => {
        misfichasjugadas.push(sietefichas[index]);
        sietefichas.splice(index, 1);
    });
    actualizarListaDesplegable();
    actualizarActuales();
});

// Función para actualizar la variable Actuales
function actualizarActuales() {
    Actuales = [...sietefichas];
}

// Llamar a la función para inicializar la lista desplegable
actualizarListaDesplegable();
