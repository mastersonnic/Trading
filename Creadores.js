let undoStack = [];
let redoStack = [];
let variables = {}; // Almacena las variables creadas

document.getElementById('createElementBtn').addEventListener('click', createNewElement);
document.getElementById('createWithCodeBtn').addEventListener('click', createElementWithCode);
document.getElementById('undoBtn').addEventListener('click', undo);
document.getElementById('redoBtn').addEventListener('click', redo);
document.getElementById('runCodeBtn').addEventListener('click', runInsertedCode);

function createNewElement() {
    const elementType = document.getElementById('elementType').value;
    const elementId = document.getElementById('elementId').value;

    if (!elementId || document.getElementById(elementId)) {
        alert('Por favor, introduce un ID único.');
        return;
    }

    const container = document.getElementById('createdElements');
    const elementTitle = document.createElement('div');
    elementTitle.className = 'element-title';
    elementTitle.textContent = `Elemento ID: ${elementId}`;

    let newElement;

    switch (elementType) {
        case 'text':
            newElement = document.createElement('p');
            newElement.textContent = 'Texto de ejemplo';
            break;
        case 'dropdown':
            newElement = createDropdown(elementId);
            break;
        case 'button':
            newElement = document.createElement('button');
            newElement.textContent = 'Botón de ejemplo';
            break;
        case 'variable':
            variables[elementId] = 'Valor inicial'; // Ahora se asigna un valor inicial a la variable
            newElement = document.createElement('div');
            newElement.textContent = `Variable ${elementId}`;
            break;
        case 'switch':
            newElement = createSwitch(elementId);
            break;
    }

    newElement.id = elementId;
    
    // Crear botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => deleteElement(elementId);

    // Guardar el estado antes de agregar el nuevo elemento al DOM
    undoStack.push({
        action: 'create',
        id: elementId,
        type: elementType,
        previousContent: null // No existe contenido anterior para un nuevo elemento
    });

    redoStack = []; // Limpiar el stack de rehacer en una nueva acción

    container.appendChild(elementTitle);
    container.appendChild(newElement);
    container.appendChild(deleteButton);
    updateVariablesView(); // Actualizar el visor de variables después de cada acción
}

function createElementWithCode() {
    const elementType = document.getElementById('elementType').value;
    const elementId = document.getElementById('elementId').value;

    if (!elementId || document.getElementById(elementId)) {
        alert('Por favor, introduce un ID único.');
        return;
    }

    // Crear el elemento como normalmente se hace
    createNewElement();

    // Ejecutar el código del input para afectar el nuevo elemento
    const code = document.getElementById('inputCode').value;
    if (code) {
        try {
            const element = document.getElementById(elementId);
            if (element) {
                eval(code);
                // Guardar el estado de ejecución del código para deshacer y rehacer
                undoStack.push({
                    action: 'runCode',
                    code: code,
                    affectedElementId: elementId,
                    state: captureCurrentState()
                });
                redoStack = [];
                updateVariablesView(); // Actualizar el visor de variables después de ejecutar el código
            }
        } catch (error) {
            alert('Error en el código: ' + error.message);
        }
    }
}

function createDropdown(id) {
    const dropdown = document.createElement('select');
    dropdown.multiple = true;
    dropdown.id = id;

    for (let i = 1; i <= 3; i++) {
        const option = document.createElement('option');
        option.value = `opcion${i}`;
        option.textContent = `Opción ${i}`;
        dropdown.appendChild(option);
    }

    return dropdown;
}

function createSwitch(id) {
    const switchContainer = document.createElement('label');
    switchContainer.className = 'switch';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = id;

    const slider = document.createElement('span');
    slider.className = 'slider';

    switchContainer.appendChild(input);
    switchContainer.appendChild(slider);

    return switchContainer;
}

function deleteElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        // Guardar el estado del elemento antes de eliminarlo
        undoStack.push({
            action: 'delete',
            id: elementId,
            content: element.outerHTML
        });
        redoStack = []; // Limpiar el stack de rehacer en una nueva acción
        element.remove(); // Eliminar el elemento del DOM

        // Eliminar la variable si corresponde
        if (variables[elementId]) {
            delete variables[elementId];
        }
        updateVariablesView(); // Actualizar el visor de variables
    }
}

function undo() {
    const lastAction = undoStack.pop();
    if (lastAction) {
        redoStack.push(lastAction);

        switch (lastAction.action) {
            case 'create':
                const element = document.getElementById(lastAction.id);
                if (element) {
                    element.remove();
                }
                // Eliminar también la variable creada si corresponde
                if (lastAction.type === 'variable') {
                    delete variables[lastAction.id];
                }
                break;
            case 'runCode':
                // Revertir cambios en el DOM o las variables afectadas por el código ejecutado
                restorePreviousState(lastAction.state);
                break;
            case 'delete':
                // Restaurar el elemento eliminado
                const container = document.getElementById('createdElements');
                container.insertAdjacentHTML('beforeend', lastAction.content);
                break;
        }
        updateVariablesView(); // Actualizar el visor de variables
    }
}

function redo() {
    const lastUndo = redoStack.pop();
    if (lastUndo) {
        undoStack.push(lastUndo);

        switch (lastUndo.action) {
            case 'create':
                createNewElement(); // Rehacer la creación de un nuevo elemento
                break;
            case 'runCode':
                runInsertedCode(lastUndo.code); // Rehacer la ejecución de código
                break;
            case 'delete':
                // Restaurar el elemento eliminado
                const container = document.getElementById('createdElements');
                container.insertAdjacentHTML('beforeend', lastUndo.content);
                break;
        }
        updateVariablesView(); // Actualizar el visor de variables
    }
}

function runInsertedCode() {
    const code = document.getElementById('inputCode').value;
    if (code) {
        try {
            // Capturar el estado previo del DOM y de las variables
            const previousState = captureCurrentState();

            // Ejecutar el código e insertar la acción en el historial de deshacer
            eval(code);
            undoStack.push({
                action: 'runCode',
                code: code,
                state: previousState // Guardar el estado antes de la ejecución
            });
            redoStack = []; // Limpiar el stack de rehacer

            updateVariablesView(); // Actualizar el visor de variables después de ejecutar el código
        } catch (error) {
            alert('Error en el código: ' + error.message);
        }
    }
}

function captureCurrentState() {
    const currentState = {
        variables: { ...variables }, // Guardar las variables creadas
        domElements: {}
    };

    // Guardar el estado del DOM para cada elemento creado
    document.querySelectorAll('[id]').forEach(element => {
        currentState.domElements[element.id] = element.outerHTML;
    });

    return currentState;
}

function restorePreviousState(previousState) {
    // Restaurar las variables
    variables = { ...previousState.variables };

    // Restaurar el DOM
    Object.keys(previousState.domElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.outerHTML = previousState.domElements[id];
        }
    });

    updateVariablesView(); // Actualizar el visor de variables después de restaurar el estado
}

function updateVariablesView() {
    const variablesView = document.getElementById('variablesView');
    variablesView.innerHTML = ''; // Limpiar el visor de variables

    Object.keys(variables).forEach(variableId => {
        const variableElement = document.createElement('div');
        
        // Obtener el contenido de la variable y limitarlo a mostrar una parte si es muy grande
        let variableContent = variables[variableId];
        let displayContent = Array.isArray(variableContent) ? variableContent.slice(0, 5).join(', ') : variableContent;

        // Mostrar el contenido de la variable en el visor
        variableElement.textContent = `${variableId}: ${displayContent}`;
        variablesView.appendChild(variableElement);
    });
              }
