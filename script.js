// Variables para guardar los valores de los componentes del grupo A
let components = {
    dropdown1: [],
    dropdown2: [],
    dropdown3: [],
    dropdown4: [],
    dropdown5: [],
    dropdown6: [],
    dropdown7: [],
    dropdown8: [],
    dropdown9: [],
    viewer1: [],
    viewer2: [],
    viewer3: [],
    viewer4: [],
    viewer5: [],
    viewer6: [],
    viewer7: [],
    viewer8: []
};

// Variable para controlar exclusiones e inclusiones
let exclusions = {};

window.onload = function() {
    populateGroupSelector();
}

// Población del selector de componentes
function populateGroupSelector() {
    let groupSelector = document.getElementById("groupSelector");
    for (let key in components) {
        let option = document.createElement("option");
        option.value = key;
        option.text = key;
        groupSelector.appendChild(option);
    }
}

// Agrega valores a un componente seleccionado
function addValues() {
    let component = document.getElementById("groupSelector").value;
    let values = document.getElementById("inputField").value.split(';').map(v => v.trim()).filter(v => v !== "");
    
    if (values.length > 0) {
        components[component].push(...values);
        components[component] = Array.from(new Set(components[component])); // Eliminar duplicados
        updateComponents();
    }
}

// Excluir componente seleccionado de otros componentes
function excludeComponent() {
    let component = document.getElementById("groupSelector").value;
    exclusions[component] = true;
    updateComponents();
}

// Incluir componente seleccionado en otros componentes
function includeComponent() {
    let component = document.getElementById("groupSelector").value;
    delete exclusions[component];
    updateComponents();
}

// Actualizar los valores en los dropdowns y viewers
function updateComponents() {
    for (let key in components) {
        let element = document.getElementById(key);
        let allValues = Object.keys(components).reduce((acc, cur) => {
            if (!exclusions[cur]) acc.push(...components[cur]);
            return acc;
        }, []);
        
        if (key.startsWith('dropdown')) {
            element.innerHTML = ''; // Limpiar dropdown
            allValues.forEach(value => {
                let option = document.createElement("option");
                option.value = value;
                option.textContent = value;
                element.appendChild(option);
            });
        } else if (key.startsWith('viewer')) {
            element.textContent = allValues.join(', ');
        }
    }
}
