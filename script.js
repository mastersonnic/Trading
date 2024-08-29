document.addEventListener("DOMContentLoaded", () => {
    const componentList = document.getElementById("component-list");
    const componentsDiv = document.getElementById("components");
    const undoStack = [];
    const redoStack = [];

    let components = [];

    function updateComponentList() {
        componentList.innerHTML = '';
        components.forEach(c => {
            const li = document.createElement("li");
            li.textContent = `${c.type.charAt(0).toUpperCase() + c.type.slice(1)} - ${c.id}`;
            li.dataset.id = c.id;
            componentList.appendChild(li);
        });
    }

    // Función para crear un nuevo componente
    function createComponent(type) {
        const id = `component-${components.length + 1}`;
        const component = document.createElement("div");
        component.classList.add("component");
        component.dataset.id = id;

        let content = '';

        switch (type) {
            case "list":
                content = `<label for="${id}-list">Lista Desplegable</label><select id="${id}-list" multiple></select>`;
                break;
            case "text":
                content = `<label for="${id}-text">Texto</label><input type="text" id="${id}-text">`;
                break;
            case "button":
                content = `<button id="${id}-button">Botón</button>`;
                break;
            case "viewer":
                content = `<div id="${id}-viewer" class="viewer"></div>`;
                break;
            case "variable":
                content = `<label for="${id}-variable">Variable</label><input type="text" id="${id}-variable" placeholder="Valor de la variable">`;
                break;
        }

        component.innerHTML = content;

        components.push({ id, type, element: component });
        componentsDiv.appendChild(component);
        updateComponentList();

        // Registrar acción en el stack de undo
        undoStack.push({ action: 'create', component: { id, type, element: component } });
    }

    // Event Listener para los botones de agregar componentes
    document.querySelectorAll(".add-component").forEach(button => {
        button.addEventListener("click", (e) => {
            const type = e.target.dataset.type;
            createComponent(type);
        });
    });

    // Ejecutar código desde el input
    document.getElementById("run-code").addEventListener("click", () => {
        const code = document.getElementById("code").value;
        try {
            eval(code);
        } catch (error) {
            alert("Error en el código: " + error.message);
        }
    });

    // Deshacer y rehacer acciones
    document.getElementById("undo").addEventListener("click", () => {
        if (undoStack.length > 0) {
            const lastAction = undoStack.pop();
            redoStack.push(lastAction);

            if (lastAction.action === 'create') {
                const componentToRemove = lastAction.component.element;
                componentsDiv.removeChild(componentToRemove);
                components = components.filter(c => c.id !== lastAction.component.id);
                updateComponentList();
            }
            // Se pueden añadir más casos aquí para otras acciones
        }
    });

    document.getElementById("redo").addEventListener("click", () => {
    if (redoStack.length > 0) {
        const lastAction = redoStack.pop();
        undoStack.push(lastAction);

        if (lastAction.action === 'create') {
            const { id, type, element } = lastAction.component;
            components.push({ id, type, element });
            componentsDiv.appendChild(element);
            updateComponentList();
        }
        // Se pueden añadir más casos aquí para otras acciones como 'delete', 'update', etc.
    }
});

// Guardar sesión
document.getElementById("save-session").addEventListener("click", () => {
    const sessionData = components.map(c => ({
        id: c.id,
        type: c.type,
        html: c.element.innerHTML
    }));
    localStorage.setItem("dominoSession", JSON.stringify(sessionData));
    alert("Sesión guardada exitosamente.");
});

// Cargar sesión
document.getElementById("load-session").addEventListener("click", () => {
    const sessionData = JSON.parse(localStorage.getItem("dominoSession"));
    if (sessionData) {
        componentsDiv.innerHTML = '';
        components = sessionData.map(data => {
            const component = document.createElement("div");
            component.classList.add("component");
            component.dataset.id = data.id;
            component.innerHTML = data.html;
            componentsDiv.appendChild(component);
            return { id: data.id, type: data.type, element: component };
        });
        updateComponentList();
        alert("Sesión cargada exitosamente.");
    } else {
        alert("No hay sesiones guardadas.");
    }
});

// Ejemplo de cómo agregar una acción personalizada en un componente (para futuros desarrollos)
function addCustomAction(componentId, actionType, action) {
    const component = components.find(c => c.id === componentId);
    if (component) {
        // Agregar lógica para acciones personalizadas, como eventos de click en botones, cambios en listas, etc.
        if (actionType === 'click' && component.type === 'button') {
            const button = component.element.querySelector('button');
            button.addEventListener('click', action);
        }
        // Se pueden agregar más tipos de acciones aquí
    } else {
        alert("Componente no encontrado.");
    }
}

// Última línea del primer código: Ejecutar el código del input
document.getElementById("run-code").addEventListener("click", () => {
    const code = document.getElementById("code").value;
    try {
        eval(code);
    } catch (error) {
        alert("Error en el código: " + error.message);
    }
});
