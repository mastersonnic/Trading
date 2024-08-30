let elementosCreados = [];
let historialDeshacer = [];
let historialRehacer = [];
let configuracionesGuardadas = {};

function createElement(type) {
    const contentArea = document.getElementById('content-area');
    let nuevoElemento;

    if (type === 'lista') {
        nuevoElemento = document.createElement('div');
        nuevoElemento.className = 'elemento elemento-lista';
        nuevoElemento.textContent = 'Lista A';
        nuevoElemento.onclick = () => editarLista(nuevoElemento);
    } else if (type === 'boton') {
        nuevoElemento = document.createElement('div');
        nuevoElemento.className = 'elemento elemento-boton';
        nuevoElemento.textContent = 'Botón A';
    } else if (type === 'visor') {
        nuevoElemento = document.createElement('div');
        nuevoElemento.className = 'elemento elemento-visor';
        nuevoElemento.textContent = 'Visor A';
    } else if (type === 'bloques_logicos') {
        nuevoElemento = document.createElement('div');
        nuevoElemento.className = 'elemento elemento-bloques';
        nuevoElemento.textContent = 'Bloques Lógicos A';
    }

    contentArea.appendChild(nuevoElemento);
    elementosCreados.push(nuevoElemento);
    guardarEnHistorial(historialDeshacer, nuevoElemento, 'crear');
    historialRehacer = []; // Limpiar rehacer después de crear un nuevo elemento
}

function guardarEnHistorial(historial, elemento, accion) {
    historial.push({ accion: accion, elemento: elemento });
}

function reiniciar() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = '';
    elementosCreados = [];
    historialDeshacer = [];
    historialRehacer = [];
}

function deshacer() {
    if (historialDeshacer.length > 0) {
        const ultimoAccion = historialDeshacer.pop();
        const contentArea = document.getElementById('content-area');

        if (ultimoAccion.accion === 'crear') {
            contentArea.removeChild(ultimoAccion.elemento);
            elementosCreados.pop();
        }

        guardarEnHistorial(historialRehacer, ultimoAccion.elemento, 'deshacer');
    }
}

function rehacer() {
    if (historialRehacer.length > 0) {
        const ultimaRehacer = historialRehacer.pop();
        const contentArea = document.getElementById('content-area');

        if (ultimaRehacer.accion === 'deshacer') {
            contentArea.appendChild(ultimaRehacer.elemento);
            elementosCreados.push(ultimaRehacer.elemento);
        }

        guardarEnHistorial(historialDeshacer, ultimaRehacer.elemento, 'rehacer');
    }
}

function guardarConfiguracion() {
    const nombre = prompt('Introduce el nombre de la configuración:');
    if (nombre) {
        configuracionesGuardadas[nombre] = elementosCreados.slice();
        alert(`Configuración "${nombre}" guardada.`);
    }
}

function cargarConfiguracion() {
    const nombre = prompt('Introduce el nombre de la configuración a cargar:');
    if (nombre && configuracionesGuardadas[nombre]) {
        reiniciar(); // Limpiar la pantalla antes de cargar
        configuracionesGuardadas[nombre].forEach(elemento => {
            createElement(elemento.className.split(' ')[1].split('-')[1]);
        });
    } else {
        alert('Configuración no encontrada.');
    }
}

function guardarConfiguracionComo() {
    guardarConfiguracion();
}

function editarLista(elemento) {
    const elementos = prompt('Introduce los elementos de la lista separados por comas:');
    if (elementos) {
        elemento.textContent = elementos.split(',').join(', ');
    }
}
