document.addEventListener('DOMContentLoaded', function() {
    const workspace = document.getElementById('workspace');
    const codeInput = document.getElementById('code-input');
    const executeCodeButton = document.getElementById('execute-code');
    const saveConfigButton = document.getElementById('save-config');
    const loadConfigButton = document.getElementById('load-config');

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
        createComponent(componentType, workspace);
    });

    // Crear componente dinámicamente en el workspace
    function createComponent(type, parent, content = '') {
        let element;
        switch (type) {
            case 'dropdown':
                element = document.createElement('select');
                element.innerHTML = `
                    <option value="1-1">1-1</option>
                    <option value="1-2">1-2</option>
                    <option value="2-2">2-2</option>
                    <!-- Puedes agregar más opciones aquí -->
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
            parent.appendChild(element);
        }
    }

    // Ejecutar código insertado por el usuario
    executeCodeButton.addEventListener('click', function() {
        const code = codeInput.value;
        try {
            eval(code);
        } catch (error) {
            alert('Error in code execution: ' + error.message);
        }
    });

    // Guardar la configuración actual en localStorage
    saveConfigButton.addEventListener('click', function() {
        const components = workspace.querySelectorAll('.component');
        const config = [];

        components.forEach(component => {
            config.push({
                type: component.tagName.toLowerCase(),
                content: component.outerHTML
            });
        });

        localStorage.setItem('dominoConfig', JSON.stringify(config));
        alert('Configuration saved!');
    });

    // Cargar la configuración desde localStorage
    loadConfigButton.addEventListener('click', function() {
        const config = JSON.parse(localStorage.getItem('dominoConfig'));

        if (config && Array.isArray(config)) {
            workspace.innerHTML = ''; // Clear the workspace
            config.forEach(item => {
                createComponent(item.type, workspace, item.content);
            });
            alert('Configuration loaded!');
        } else {
            alert('No saved configuration found.');
        }
    });

    // Ejemplo de lógica condicional: puedes escribir esto en el textarea de código para probar
    // if (workspace.querySelectorAll('select').length > 0) {
    //     alert('There are dropdowns in the workspace!');
    // }
});
