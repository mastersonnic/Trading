document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('list-container');
    const elementViewer = document.getElementById('element-viewer');
    
    // Función para agregar una nueva lista desplegable
    document.getElementById('add-list').addEventListener('click', () => {
        const newList = document.createElement('select');
        newList.multiple = true;
        listContainer.appendChild(newList);
    });

    // Función para eliminar la última lista desplegable
    document.getElementById('remove-list').addEventListener('click', () => {
        if (listContainer.lastChild) {
            listContainer.removeChild(listContainer.lastChild);
        }
    });

    // Función para mover un elemento de una lista a otra
    document.getElementById('move-element').addEventListener('click', () => {
        moveOrCopyElement(false);
    });

    // Función para copiar un elemento de una lista a otra
    document.getElementById('copy-element').addEventListener('click', () => {
        moveOrCopyElement(true);
    });

    // Función para duplicar el elemento en la misma lista
    document.getElementById('duplicate-element').addEventListener('click', () => {
        const selectedList = getSelectedList();
        if (selectedList && selectedList.selectedIndex !== -1) {
            const selectedOption = selectedList.options[selectedList.selectedIndex];
            const newOption = new Option(selectedOption.text, selectedOption.value);
            selectedList.add(newOption);
        }
    });

    // Función para mover o copiar un elemento de una lista a otra
    function moveOrCopyElement(copy) {
        const selectedList = getSelectedList();
        if (selectedList && selectedList.selectedIndex !== -1) {
            const targetList = getTargetList();
            if (targetList) {
                const selectedOption = selectedList.options[selectedList.selectedIndex];
                const newOption = new Option(selectedOption.text, selectedOption.value);
                targetList.add(newOption);
                if (!copy) {
                    selectedList.remove(selectedList.selectedIndex);
                }
            }
        }
    }

    // Obtener la lista actualmente seleccionada
    function getSelectedList() {
        const lists = listContainer.querySelectorAll('select');
        for (const list of lists) {
            if (list.selectedIndex !== -1) {
                return list;
            }
        }
        return null;
    }

    // Obtener la lista destino (la que no es la seleccionada)
    function getTargetList() {
        const lists = listContainer.querySelectorAll('select');
        for (const list of lists) {
            if (list !== getSelectedList()) {
                return list;
            }
        }
        return null;
    }

    // Función para mostrar elementos en el visor
    listContainer.addEventListener('change', () => {
        const selectedList = getSelectedList();
        if (selectedList) {
            elementViewer.value = Array.from(selectedList.options)
                .map(option => option.text)
                .join('; ');
        }
    });
});
