// Inicialización de variables vacías
let todasLasFichas = [];   // Todas las fichas de dominó
let sietefichas = [];      // Fichas que selecciono
let misfichasjugadas = []; // Fichas jugadas
let actuales = [];         // Fichas actuales que quedan en la mano

// Función para cargar fichas en la lista desplegable
function cargarFichasEnLista() {
    const lista = document.getElementById('misfichasactualeslista');
    lista.innerHTML = ''; // Limpiar la lista antes de cargar las fichas actuales

    actuales.forEach((ficha, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = ficha;
        lista.appendChild(option);
    });
}

// Función para mover una ficha de "actuales" a "misfichasjugadas"
function jugarFichas() {
    const lista = document.getElementById('misfichasactualeslista');
    const seleccionadas = Array.from(lista.selectedOptions);

    seleccionadas.forEach(option => {
        const fichaIndex = option.value;
        const ficha = actuales[fichaIndex];

        // Mover ficha seleccionada a "misfichasjugadas"
        misfichasjugadas.push(ficha);

        // Eliminar ficha de "actuales"
        actuales.splice(fichaIndex, 1);
    });

    // Actualizar la lista desplegable después de jugar
    cargarFichasEnLista();
}

// Evento que se ejecuta al cambiar la selección en la lista
document.getElementById('misfichasactualeslista').addEventListener('change', function () {
    jugarFichas();  // Jugar la ficha seleccionada
});
