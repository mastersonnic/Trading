// script.js

// Obtener todos los visores
const visores = document.querySelectorAll('.visor input[type="checkbox"]');

// Asignar evento al cambio de estado del switch
visores.forEach((visor) => {
    visor.addEventListener('change', () => {
        // Si se activa un switch, desactivar los demás
        if (visor.checked) {
            visores.forEach((otroVisor) => {
                if (otroVisor !== visor) {
                    otroVisor.checked = false;
                }
            });

            // Obtener la ficha seleccionada
            const fichaSeleccionada = visor.dataset.ficha;
            // Mostrar la ficha en el visor activo
            visor.nextElementSibling.textContent = `Ficha: ${fichaSeleccionada}`;
        }
    });
});
