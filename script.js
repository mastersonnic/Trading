let elementosCreados = [];
let historialDeshacer = [];
let historialRehacer = [];
let configuracionesGuardadas = {};
let nombreListaActual = null;

function createElement(type) {
    const contentArea = document.getElementById('content-area');
    let nuevoElemento;

    if (type === 'lista') {
        let nombreLista = prompt('Introduce un nombre para la lista:');
        if (!nombreLista) return;

        nombreListaActual = nombreLista;
        nuevoElemento = document.createElement('div');
        nuevoElemento.className = 'elemento elemento-lista';
        nuevoElemento.innerHTML = `<h4>${nombreLista}</h4><button onclick="agregarElementoLista()">Agregar Elementos</button><div id="${nombreLista}-items"></div>`;
        nuevoElemento.setAttribute('data-nombre', nombreLista);
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
        // Aquí puedes agregar el contenido de los bloques lógicos, por ejemplo:
        nuevoElemento.innerHTML = generarBloquesLogicosHTML();
    }

    contentArea.appendChild(nuevoElemento);
    elementosCreados.push(nuevoElemento);
    guardarEnHistorial(historialDeshacer, nuevoElemento, 'crear');
    historialRehacer = []; // Limpiar rehacer después de crear un nuevo elemento
}

function agregarElementoLista() {
    let elementos = prompt('Introduce los elementos separados por punto y coma ( ; ):');
    if (elementos) {
        const lista = document.getElementById(`${nombreListaActual}-items`);
        elementos.split(';').forEach(elemento => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = elemento.trim();
            checkbox.id = `${nombreListaActual}-${elemento.trim()}`;

            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = elemento.trim();

            const div = document.createElement('div');
            div.appendChild(checkbox);
            div.appendChild(label);
            lista.appendChild(div);
        });
    }
}

function generarBloquesLogicosHTML() {
    // Generar el HTML para los bloques lógicos basados en tu descripción
    return `
        <div>
            <h4>Sector 1</h4>
            <select>
                <option value="iniciar">Al Iniciar</option>
                <option value="verdadero">Cuando sea verdadero que ()</option>
                <option value="cuando">Cuando ()</option>
                <option value="clickear">Al clickear</option>
                <option value="elementos_lista">Cuando elementos lista sea distinto de 0</option>
            </select>
        </div>
        <div>
            <h4>Sector 2</h4>
            <select>
                <option value="si">Si ()</option>
            </select>
        </div>
        <div>
            <h4>Sector 3</h4>
            <select>
                <option value="opcion1">Opción 1</option>
            </select>
        </div>
        <div>
            <h4>Sector 4</h4>
            <select>
                <option value="unir">Unir ()</option>
                <option value="insertar">Insertar en ()</option>
                <option value="eliminar">Eliminar ()</option>
                <option value="eliminar_de">Eliminar () de</option>
            </select>
        </div>
    `;
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
        const ultimaAccion = historialDeshacer.pop();
        if (ultimaAccion.accion === 'crear') {
            ultimaAccion.elemento.remove();
            historialRehacer.push(ultimaAccion);
        } else if (ultimaAccion.accion === 'eliminar') {
            document.getElementById('content-area').appendChild(ultimaAccion.elemento);
            historialRehacer.push(ultimaAccion);
        }
    }
}

function rehacer() {
    if (historialRehacer.length > 0) {
        const ultimaAccion = historialRehacer.pop();
        if (ultimaAccion.accion === 'crear') {
            document.getElementById('content-area').appendChild(ultimaAccion.elemento);
            historialDeshacer.push(ultimaAccion);
        } else if (ultimaAccion.accion === 'eliminar') {
            ultimaAccion.elemento.remove();
            historialDeshacer.push(ultimaAccion);
        }
    }
}

function guardarConfiguracion() {
    const configuracion = {
        elementos: elementosCreados.map(elemento => ({
            type: elemento.className,
            html: elemento.innerHTML,
            nombre: elemento.getAttribute('data-nombre')
        }))
    };
    localStorage.setItem('configuracionActual', JSON.stringify(configuracion));
    alert('Configuración guardada.');
}

function cargarConfiguracion() {
    const configuracion = JSON.parse(localStorage.getItem('configuracionActual'));
    if (configuracion) {
        reiniciar();
        configuracion.elementos.forEach(item => {
            const nuevoElemento = document.createElement('div');
            nuevoElemento.className = item.type;
            nuevoElemento.innerHTML = item.html;
            nuevoElemento.setAttribute('data-nombre', item.nombre);
            document.getElementById('content-area').appendChild(nuevoElemento);
            elementosCreados.push(nuevoElemento);
        });
    } else {
        alert('No se encontró ninguna configuración guardada.');
    }
}

function guardarConfiguracionComo() {
    const nombre = prompt('Introduce un nombre para esta configuración:');
    if (nombre) {
        const configuracion = {
            elementos: elementosCreados.map(elemento => ({
                type: elemento.className,
                html: elemento.innerHTML,
                nombre: elemento.getAttribute('data-nombre')
            }))
        };
        localStorage.setItem(`configuracion_${nombre}`, JSON.stringify(configuracion));
        alert(`Configuración guardada como "${nombre}".`);
    }
}

function mostrarListaConfiguraciones(tipo) {
    const configuraciones = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('configuracion_')) {
            configuraciones.push(key.replace('configuracion_', ''));
        }
    }
    if (configuraciones.length === 0) {
        alert('No hay configuraciones guardadas.');
        return;
    }

    const seleccion = prompt(`Selecciona una configuración:\n${configuraciones.join('\n')}`);
    if (seleccion && configuraciones.includes(seleccion)) {
        if (tipo === 'cargar') {
            const configuracion = JSON.parse(localStorage.getItem(`configuracion_${seleccion}`));
            reiniciar();
            configuracion.elementos.forEach(item => {
                const nuevoElemento = document.createElement('div');
                nuevoElemento.className = item.type;
                nuevoElemento.innerHTML = item.html;
                nuevoElemento.setAttribute('data-nombre', item.nombre);
                document.getElementById('content-area').appendChild(nuevoElemento);
                elementosCreados.push(nuevoElemento);
            });
        } else if (tipo === 'guardar_como') {
            guardarConfiguracionComo();
        }
    } else {
        alert('Configuración no encontrada.');
    }
}

function cargarConfiguracionSeleccionada() {
    mostrarListaConfiguraciones('cargar');
}

function guardarConfiguracionSeleccionadaComo() {
    mostrarListaConfiguraciones('guardar_como');
}

// Evento para "Guardar Configuración Actual Como"
document.querySelector('[onclick="guardarConfiguracionComo()"]').addEventListener('click', guardarConfiguracionSeleccionadaComo);
