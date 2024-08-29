document.addEventListener('DOMContentLoaded', () => {
    const variablesFrame = document.getElementById('variablesFrame');
    const listsFrame = document.getElementById('listsFrame');
    const visorsFrame = document.getElementById('visorsFrame');

    const addListButton = document.getElementById('addList');
    const addVariableButton = document.getElementById('addVariable');
    const addVisorButton = document.getElementById('addVisor');

    let undoStack = [];
    let redoStack = [];

    // Manejadores para añadir listas, variables y visores
    addListButton.addEventListener('click', addList);
    addVariableButton.addEventListener('click', addVariable);
    addVisorButton.addEventListener('click', addVisor);

    // Deshacer y rehacer
    document.getElementById('undo').addEventListener('click', undoAction);
    document.getElementById('redo').addEventListener('click', redoAction);

    // Guardar y cargar sesión
    document.getElementById('saveSession').addEventListener('click', saveSession);
    document.getElementById('loadSession').addEventListener('click', loadSession);

    function addList() {
        const listId = generateId('list');
        const list = document.createElement('div');
        list.classList.add('draggable');
        list.id = listId;

        const title = document.createElement('div');
        title.classList.add('editable');
        title.setAttribute('contenteditable', true);
        title.innerText = `Lista ${listId}`;
        list.appendChild(title);

        const listContainer = document.createElement('div');
        listContainer.classList.add('list-container');
        listContainer.id = `${listId}-items`;
        list.appendChild(listContainer);

        listContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('list-item')) {
                event.target.classList.toggle('selected');
            }
        });

        const addItemButton = document.createElement('button');
        addItemButton.innerText = 'Agregar Ítem';
        addItemButton.addEventListener('click', () => addListItem(listContainer));
        list.appendChild(addItemButton);

        listsFrame.appendChild(list);
        saveState();
    }

    function addVariable() {
        const variableId = generateId('variable');
        const variable = document.createElement('div');
        variable.classList.add('draggable', 'editable');
        variable.setAttribute('contenteditable', true);
        variable.innerText = `Variable ${variableId}`;
        variable.id = variableId;

        variablesFrame.appendChild(variable);
        saveState();
    }

    function addVisor() {
        const visorId = generateId('visor');
        const visor = document.createElement('div');
        visor.classList.add('draggable', 'editable');
        visor.setAttribute('contenteditable', true);
        visor.innerText = `Visor ${visorId}`;
        visor.id = visorId;

        visorsFrame.appendChild(visor);
        saveState();
    }

    function addListItem(container) {
        const item = document.createElement('div');
        item.classList.add('list-item', 'editable');
        item.setAttribute('contenteditable', true);
        item.innerText = `Item`;
        container.appendChild(item);
        saveState();
    }

    // Ejemplo básico para arrastrar y soltar
    let draggedElement;

    document.addEventListener('dragstart', (event) => {
        draggedElement = event.target;
    });

    document.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    document.addEventListener('drop', (event) => {
        if (event.target.classList.contains('frame')) {
            event.target.appendChild(draggedElement);
            saveState();
        }
    });

    // Generar IDs únicos
    function generateId(prefix) {
        return `${prefix}-${Date.now()}`;
    }

    // Deshacer y rehacer
    function undoAction() {
        if (undoStack.length > 0) {
            redoStack.push(document.body.innerHTML);
            document.body.innerHTML = undoStack.pop();
            reattachEventListeners();
        }
    }

    function redoAction() {
        if (redoStack.length > 0) {
            undoStack.push(document.body.innerHTML);
            document.body.innerHTML = redoStack.pop();
            reattachEventListeners();
        }
    }

    function saveState() {
        undoStack.push(document.body.innerHTML);
        redoStack = []; // Limpiar el stack de rehacer cuando se guarda un nuevo estado
    }

    // Reasignar los event listeners después de deshacer o rehacer
    function reattachEventListeners() {
        document.querySelectorAll('.editable').forEach(element => {
            element.setAttribute('contenteditable', true);
        });

        document.querySelectorAll('.draggable').forEach(element => {
            element.addEventListener('dragstart', (event) => {
                draggedElement = event.target;
            });
        });

        document.querySelectorAll('.list-container').forEach(container => {
            container.addEventListener('click', (event) => {
                if (event.target.classList.contains('list-item')) {
                    event.target.classList.toggle('selected');
                }
            });
        });

        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (event) => {
                const action = event.target.innerText.toLowerCase();
                if (action.includes('agregar ítem')) {
                    addListItem(event.target.parentNode.querySelector('.list-container'));
                } else if (action.includes('añadir lista')) {
                    addList();
                } else if (action.includes('añadir variable')) {
                    addVariable();
                } else if (action.includes('añadir visor')) {
                    addVisor();
                } else if (action.includes('deshacer')) {
                    undoAction();
                } else if (action.includes('rehacer')) {
                    redoAction();
                } else if (action.includes('guardar sesión')) {
                    saveSession();
                } else if (action.includes('cargar sesión')) {
                    loadSession();
                }
            });
        });
    }

    // Guardar la sesión actual en localStorage
    function saveSession() {
        const sessionData = {
            html: document.body.innerHTML,
            undoStack: [...undoStack],
            redoStack: [...redoStack]
        };
        localStorage.setItem('dominoSession', JSON.stringify(sessionData));
        alert('Sesión guardada');
    }

    // Cargar la sesión desde localStorage
    function loadSession() {
        const sessionData = JSON.parse(localStorage.getItem('dominoSession'));
        if (sessionData) {
            document.body.innerHTML = sessionData.html;
            undoStack = sessionData.undoStack;
            redoStack = sessionData.redoStack;
            reattachEventListeners();
            alert('Sesión cargada');
        } else {
            alert('No hay sesión guardada');
        }
    }
});
