let elementCounter = 0;

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        createElement(type);
    });
});

function createElement(type) {
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

        // Añadir menú de opciones al mantener presionado
        const menu = createMenu(newElement, ul);
        newElement.appendChild(menu);
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

    // Mostrar menú al mantener presionado (sólo para listas)
    if (type === 'list') {
        newElement.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            toggleMenu(newElement);
        });
    }

    // Añadir el nuevo elemento al contenido
    contentDiv.appendChild(newElement);
}

function renameElement(element) {
    const newName = prompt('Nuevo nombre:');
    if (newName) {
        const elementType = element.querySelector('button, input, ul');
        if (elementType.tagName.toLowerCase() === 'button') {
            elementType.innerText = newName;
        } else if (elementType.tagName.toLowerCase() === 'input') {
            elementType.placeholder = newName;
        } else if (elementType.tagName.toLowerCase() === 'ul') {
            // Cambiar el primer elemento de la lista
        const firstItem = elementType.querySelector('li');
            if (firstItem) {
                firstItem.innerText = newName;
            }
        }
    }
}

function toggleMenu(element) {
    const menu = element.querySelector('.menu');
    if (menu.style.display === 'none' || !menu.style.display) {
        closeAllMenus();
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

function closeAllMenus() {
    document.querySelectorAll('.menu').forEach(menu => {
        menu.style.display = 'none';
    });
}

function createMenu(parentElement, listElement) {
    const menu = document.createElement('div');
    menu.className = 'menu';
    menu.style.display = 'none';

    const editItemsButton = document.createElement('button');
    editItemsButton.innerText = 'Editar Elementos';
    editItemsButton.onclick = () => {
        const newItems = prompt('Ingrese los elementos, separados por comas:');
        if (newItems) {
            const itemsArray = newItems.split(',');
            listElement.innerHTML = ''; // Limpiar lista actual
            itemsArray.forEach(item => {
                const li = document.createElement('li');
                li.innerText = item.trim();
                listElement.appendChild(li);
            });
        }
        toggleMenu(parentElement);
    };
    menu.appendChild(editItemsButton);

    const sumListButton = document.createElement('button');
    sumListButton.innerText = 'Sumar Lista ()';
    sumListButton.onclick = () => {
        const otherList = prompt('Seleccione la lista a sumar:');
        if (otherList) {
            const otherListElement = document.getElementById(otherList);
            if (otherListElement) {
                otherListElement.querySelectorAll('li').forEach(li => {
                    const newItem = document.createElement('li');
                    newItem.innerText = li.innerText;
                    listElement.appendChild(newItem);
                });
            } else {
                alert('Lista no encontrada.');
            }
        }
        toggleMenu(parentElement);
    };
    menu.appendChild(sumListButton);

    const subtractListButton = document.createElement('button');
    subtractListButton.innerText = 'Restar Lista ()';
    subtractListButton.onclick = () => {
        const otherList = prompt('Seleccione la lista a restar:');
        if (otherList) {
            const otherListElement = document.getElementById(otherList);
            if (otherListElement) {
                otherListElement.querySelectorAll('li').forEach(li => {
                    const matchingItems = Array.from(listElement.querySelectorAll('li')).filter(
                        listItem => listItem.innerText === li.innerText
                    );
                    matchingItems.forEach(item => item.remove());
                });
            } else {
                alert('Lista no encontrada.');
            }
        }
        toggleMenu(parentElement);
    };
    menu.appendChild(subtractListButton);

    const duplicateListButton = document.createElement('button');
    duplicateListButton.innerText = 'Duplicar Lista';
    duplicateListButton.onclick = () => {
        const duplicateElement = parentElement.cloneNode(true);
        duplicateElement.id = `element-${++elementCounter}`;
        parentElement.after(duplicateElement);
        closeAllMenus();
    };
    menu.appendChild(duplicateListButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Eliminar Lista';
    deleteButton.onclick = () => {
        if (confirm('¿Estás seguro de que quieres eliminar esta lista?')) {
            parentElement.remove();
        }
        closeAllMenus();
    };
    menu.appendChild(deleteButton);

    return menu;
}

// Cerrar menús abiertos al hacer clic fuera de ellos
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dynamic-element')) {
        closeAllMenus();
    }
});
