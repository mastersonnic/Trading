// Obtener el elemento del switch
const switchFrente = document.getElementById('switchfrente');

// Función para verificar el estado del switch
function obtenerEstadoFrente() {
    return switchFrente.checked; // true si está activado (Con frente), false si no (Sin frente)
}

// Evento para verificar cuando se cambia el estado del switch
switchFrente.addEventListener('change', function() {
    if (obtenerEstadoFrente()) {
        console.log('El switch está activado: Con frente');
    } else {
        console.log('El switch está desactivado: Sin frente');
    }
});
