document.addEventListener('DOMContentLoaded', function() {
    const workspace = document.getElementById('workspace');
    const componentViewer = document.getElementById('component-viewer');
    const codeInput = document.getElementById('code-input');
    const executeCodeButton = document.getElementById('execute-code');
    const saveConfigButton = document.getElementById('save-config');
    const loadConfigButton = document.getElementById('load-config');
    const deleteConfigButton = document.getElementById('delete-config');
    const configList = document.getElementById('config-list');
    const undoButton = document.getElementById('undo');
    const redoButton = document.getElementById('redo');

    let userVariables = {};
    let history = [];
    let future = [];

    // Manejar arrastrar y soltar de componentes
    document.querySelectorAll('.component').forEach(component => {
        component.addEventListener('dragstart', function(event) {
            event.dataTransfer.setData('text/plain', event.target.dataset.type);
        });
    });

    workspace.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    workspace.addEventListener('drop', function(event) {
        event.preventDefault();
        const componentType = event.dataTransfer.getData('text/plain');
        saveState();
        createComponent(componentType, workspace);
        updateComponentViewer();
    });

    function createComponent(type, parent, content = '', id = null) {
        let element;
        let elementId = id || `component-${Date.now()}`;

        switch (type) {
            case 'dropdown':
                element = document.createElement('select');
                element.innerHTML = `
                    <option value="1-1">1-1</option>
                    <option value="1-2">1-2</option>
                    <option value="2-2">2-2</option>
                `;
                if (content) element.innerHTML = content;
                break;
            case 'button':
                element = document.createElement('button');
                element.textContent = content || 'Click Me';
                element.addEventListener('click', function() {
                    alert('Button clicked!');
                });
                break;
            case 'text-view':
                element = document.createElement('p');
                element.textContent = content || 'Text View';
                element.contentEditable = true;
                break;
        }
        if (element) {
            element.classList.add('component');
            element.id = elementId;
            parent.appendChild(element);
            updateComponentViewer();
        }
    }

    function updateComponentViewer() {
        componentViewer.innerHTML = '<h2>Component Viewer</h2>';
        const components = workspace.querySelectorAll('.component');
        components.forEach(component => {
            const div = document.createElement('div');
            div.textContent = `${component.tagName.toLowerCase()} - ID: ${component.id}`;
            div.classList.add('component-info');
            componentViewer.appendChild(div);
        });
    }

    executeCodeButton.addEventListener('click', function() {
        const code = codeInput.value;
        try {
            eval(code);
            updateComponentViewer();
        } catch (error) {
            alert('Error in code execution: ' + error.message);
        }
    });

    // Guardar la configuración actual
    saveConfigButton.addEventListener('click', function() {
        const configName = prompt("Enter a name for the configuration:");
        if (!configName) return;

        const components = workspace.querySelectorAll('.component');
        const config = [];

        components.forEach(component => {
            config.push({
                type: component.tagName.toLowerCase(),
                content: component.outerHTML,
                id: component.id
            });
        });

        localStorage.setItem(configName, JSON.stringify(config));
        updateConfigList();
        alert('Configuration saved!');
    });

    // Cargar la configuración seleccionada
    loadConfigButton.addEventListener('click', function() {
        const selectedConfig = configList.value;
        if (!selectedConfig) {
            alert('No configuration selected.');
            return;
        }

        const config = JSON.parse(localStorage.getItem(selectedConfig));
        if (config && Array.isArray(config)) {
            saveState();
            workspace.innerHTML = '';
            config.forEach(item => {
                createComponent(item.type, workspace, item.content, item.id);
            });
            updateComponentViewer();
            alert('Configuration loaded!');
        } else {
            alert('Configuration is invalid.');
        }
    });

    // Eliminar la configuración seleccionada
    deleteConfigButton.addEventListener('click', function() {
        const selectedConfig = configList.value;
        if (!selectedConfig) {
            alert('No configuration selected.');
            return;
        }

        localStorage.removeItem(selectedConfig);
        updateConfigList();
        alert('Configuration deleted!');
    });

    // Actualizar la lista de configuraciones guardadas
    function updateConfigList() {
        const keys = Object.keys(localStorage);
        configList.innerHTML = '<option value="">Select a configuration</option>';
        keys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            configList.appendChild(option);
        });
    }

    // Guardar el estado actual para deshacer/rehacer
    function saveState() {
        const components = workspace.innerHTML;
        history.push(components);
        future = [];
    }

    // Deshacer última acción
    undoButton.addEventListener('click', function() {
        if (history.length > 0) {
            future.push(workspace.innerHTML);
            workspace.innerHTML = history.pop();
            updateComponentViewer();
        }
    });

    // Rehacer última acción
    redoButton.addEventListener('click', function() {
        if (future.length > 0) {
            history.push(workspace.innerHTML);
            workspace.innerHTML = future.pop();
            updateComponentViewer();
        }
    });

    // Inicializar la lista de configuraciones al cargar la página
    updateConfigList();
});
