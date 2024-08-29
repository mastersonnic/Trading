let elementCounter = 0;

function createElement(type, listNumber) {
    elementCounter++;
    const contentDiv = document.getElementById('content');
    
    // Crear contenedor para el nuevo elemento
    const newElement = document.createElement('div');
    newElement.className = 'dynamic-element';
    newElement.setAttribute('id', `element-${elementCounter}`);

    // Crear el elemento dependiendo del tipo seleccionado
    if (type === 'list') {
        const ul = document.createElement('ul');
        ul.setAttribute('contenteditable', true);
        ul.innerHTML = '<li>Nuevo Elemento</li>';
        newElement.appendChild(ul);

        // Añadir botón para editar la lista
        const editButton = document.createElement('button');
        editButton.innerText = 'Editar Lista';
        editButton.onclick = () => editList(ul);
        newElement.appendChild(editButton);
    } 
    else if (type === 'visor') {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Visor';
        newElement.appendChild(input);
    } 
    else if (type === 'button') {
        const button = document.createElement('button');
        button.innerText = 'Botón';
        button.onclick = () => alert('Botón presionado');
        newElement.appendChild(button);
    }

    // Añadir funcionalidad para cambiar el nombre del elemento
    newElement.addEventListener('dblclick', () => renameElement(newElement));

    // Añadir el nuevo elemento al contenido
    contentDiv.appendChild(newElement);
}

function renameElement(element) {
    const newName = prompt('Nuevo nombre:');
    if (newName) {
        element.querySelector('button, input, ul').setAttribute('name', newName);
    }
}

function editList(ul) {
    const items = prompt('Ingresa los elementos de la lista separados por comas:');
    if (items) {
        ul.innerHTML = '';
        items.split(',').forEach(item => {
            const li = document.createElement('li');
            li.innerText = item.trim();
            ul.appendChild(li);
        });
    }
}
