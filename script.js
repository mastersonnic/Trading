let historialDeshacer = [];
let historialRehacer = [];
let elementosCreados = [];
let bloquesLogicos = [];

// Asociar eventos a los botones principales
document.getElementById('boton-reiniciar').addEventListener('click', reiniciar);
document.getElementById('boton-deshacer').addEventListener('click', deshacer);
document.getElementById('boton-rehacer').addEventListener('click', rehacer);
document.getElementById('boton-guardar').addEventListener('click', guardarConfiguracion);
document.getElementById('boton-cargar').addEventListener('click', cargarConfiguracionSeleccionada);
document.getElementById('boton-guardar-como').addEventListener('click', guardarConfiguracionSeleccionadaComo);
document.getElementById('boton-crear-bloque-logico').addEventListener('click', crearBloqueLogico);

// Función de reinicio del área de contenido
function reiniciar() {
    document.getElementById('content-area').innerHTML = '';
    document.getElementById('bloques-logicos-area').innerHTML = '';
    historialDeshacer = [];
    historialRehacer = [];
    elementosCreados = [];
    bloquesLogicos = [];
    alert('Se ha reiniciado la configuración.');
}

// Funciones de deshacer y rehacer
function deshacer() {
    if (historialDeshacer.length > 0) {
        const ultimaAccion = historialDeshacer.pop();
        if (ultimaAccion.accion === 'crear') {
            ultimaAccion.elemento.remove();
            historialRehacer.push(ultimaAccion);
        } else if (ultimaAccion.accion === 'eliminar') {
            document.getElementById('content-area').appendChild(ultimaAccion.elemento);
            historialRehacer.push(ultimaAccion);
        } else if (ultimaAccion.accion === 'modificar') {
            // Deshacer modificaciones si hay alguna lógica
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
        } else if (ultimaAccion.accion === 'modificar') {
            // Rehacer modificaciones si hay alguna lógica
        }
    }
}

// Función para guardar la configuración actual
function guardarConfiguracion() {
    const configuracion = {
        elementos: elementosCreados.map(elemento => ({
            type: elemento.className,
            html: elemento.innerHTML,
            nombre: elemento.getAttribute('data-nombre')
        })),
        bloquesLogicos
    };
    localStorage.setItem('configuracionActual', JSON.stringify(configuracion));
    alert('Configuración guardada.');
}

// Función para cargar una configuración guardada
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
        bloquesLogicos = configuracion.bloquesLogicos || [];
        cargarBloquesLogicos();
    } else {
        alert('No se encontró ninguna configuración guardada.');
    }
}

function cargarBloquesLogicos() {
    const areaBloques = document.getElementById('bloques-logicos-area');
    areaBloques.innerHTML = '';
    bloquesLogicos.forEach((bloque, index) => {
        const bloqueDiv = document.createElement('div');
        bloqueDiv.className = 'bloque-logico';
        bloqueDiv.innerHTML = `<strong>Bloque Lógico ${index + 1}:</strong> ${bloque.descripcion}`;
        areaBloques.appendChild(bloqueDiv);
    });
}

function guardarConfiguracionComo() {
    const nombre = prompt('Introduce un nombre para esta configuración:');
    if (nombre) {
        const configuracion = {
            elementos: elementosCreados.map(elemento => ({
                type: elemento.className,
                html: elemento.innerHTML,
                nombre: elemento.getAttribute('data-nombre')
            })),
            bloquesLogicos
        };

        // Sobrescribir si ya existe
        if (localStorage.getItem(`configuracion_${nombre}`)) {
            const reemplazar = confirm(`La configuración "${nombre}" ya existe. ¿Deseas reemplazarla?`);
            if (!reemplazar) return;
        }

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
            bloquesLogicos = configuracion.bloquesLogicos || [];
            cargarBloquesLogicos();
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

// Funciones relacionadas con bloques lógicos
function crearBloqueLogico() {
    const sector1 = prompt('Selecciona una opción para Sector 1:\n1) al iniciar\n2) cuando sea verdadero que ()\n3) cuando ()\n4) al clickear\n5) Cuando elementos lista sea distinto de 0');
    const sector2 = prompt('Selecciona una opción para Sector 2:\n1) Si()\n(Esto mostrará todos los componentes creados)');
    const sector3 = prompt('Selecciona una opción para Sector 3:\n(Incluirá todos los elementos creados, valores alfanuméricos, etc.)');
    const sector4 = prompt('Selecciona una opción para Sector 4:\n1) unir ()\n2) insertar en ()\n3) eliminar ()\n4) eliminar () de');
    
    const descripcion = `Sector 1: ${sector1}, Sector 2: ${sector2}, Sector 3: ${sector3}, Sector 4: ${sector4}`;
    bloquesLogicos.push({ descripcion });
    
    cargarBloquesLogicos();
    historialDeshacer.push({ accion: 'crear', bloque: descripcion });
}

// Funciones para manejar bloques lógicos
function unirListas(lista1Nombre, lista2Nombre) {
    const lista1 = document.querySelector(`.lista[data-nombre='${lista1Nombre}']`);
    const lista2 = document.querySelector(`.lista[data-nombre='${lista2Nombre}']`);
    
    if (lista1 && lista2) {
        Array.from(lista2.children).forEach(item => {
            lista1.appendChild(item);
        });
        historialDeshacer.push({ accion: 'modificar', tipo: 'unir', lista1Nombre, lista2Nombre });
    }
}

function eliminarDeLista(listaNombre, valor) {
    const lista = document.querySelector(`.lista[data-nombre='${listaNombre}']`);
    
    if (lista) {
        Array.from(lista.children).forEach(item => {
            if (item.textContent === valor) {
                item.remove();
            }
        });
        historialDeshacer.push({ accion: 'modificar', tipo: 'eliminar', listaNombre, valor });
    }
}

// Event listeners para acciones de bloques
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Identificar elementos y aplicar acciones basadas en clases o atributos
    if (target.classList.contains('unir-listas')) {
        const lista1Nombre = prompt('Introduce el nombre de la primera lista:');
        const lista2Nombre = prompt('Introduce el nombre de la segunda lista:');
        unirListas(lista1Nombre, lista2Nombre);
    }
    
    if (target.classList.contains('eliminar-de-lista')) {
        const listaNombre = prompt('Introduce el nombre de la lista:');
        const valor = prompt('Introduce el valor a eliminar de la lista:');
        eliminarDeLista(listaNombre, valor);
    }
});

// Función para crear una nueva lista
function crearLista(nombre) {
    const lista = document.createElement('ul');
    lista.className = 'lista';
    lista.setAttribute('data-nombre', nombre);
    lista.innerHTML = `<strong>${nombre}</strong>`;
    document.getElementById('content-area').appendChild(lista);
    elementosCreados.push(lista);
    historialDeshacer.push({ accion: 'crear', elemento: lista });
}

// Inicialización del script
function inicializar() {
    // Cargar configuraciones previas si existen
    if (localStorage.getItem('configuracionActual')) {
        cargarConfiguracion();
    }
    
    // Crear listas de ejemplo
    crearLista('Lista 1');
    crearLista('Lista 2');
}

// Llamada a la función de inicialización
inicializar();
