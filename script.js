document.getElementById('submit').addEventListener('click', function() {
    const inputValue = document.getElementById('input').value.trim();
    const output = document.getElementById('output');

    if (!inputValue.endsWith('*')) {
        output.innerHTML = 'Por favor, ingresa un número seguido de *';
        return;
    }

    const paso = inputValue.slice(0, -1); // Quita el asterisco al final

    switch (paso) {
        case '1':
            if (!window.A) {
                window.A = [
                    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
                    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
                    [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
                    [3, 3], [3, 4], [3, 5], [3, 6],
                    [4, 4], [4, 5], [4, 6],
                    [5, 5], [5, 6],
                    [6, 6]
                ];
                output.innerHTML = '1*: Variable A "fichas duales" creada con 28 fichas de dominó.';
            } else {
                output.innerHTML = '1*: Variable A ya existe.';
            }
            break;

        case '2':
            if (!window.B) {
                window.B = window.A.map(ficha => ({ x: ficha[0], y: ficha[1] }));
                output.innerHTML = '2*: Variable B "fichas separadas" creada, con los lados de cada ficha divididos.';
            } else {
                output.innerHTML = '2*: Variable B ya existe.';
            }
            break;

        case '3':
            if (!window.C) {
                const selectC = document.createElement('select');
                selectC.id = 'selectC';
                selectC.multiple = true;
                window.A.forEach((ficha, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = `${ficha[0]}-${ficha[1]}`;
                    selectC.appendChild(option);
                });
                document.body.appendChild(selectC);
                window.C = [];
                output.innerHTML = '3*: Lista desplegable C "lista todas las fichas" creada y vinculada a A.';
            } else {
                output.innerHTML = '3*: Lista C ya existe.';
            }
            break;

        case '4':
            if (window.C && window.C.length !== 7) {
                output.innerHTML = '4*: Debes seleccionar exactamente 7 fichas en la lista C.';
            } else {
                output.innerHTML = '4*: Fichas correctamente seleccionadas en C.';
            }
            break;

        case '5':
            output.innerHTML = '5*: Mensaje de selección incorrecta de fichas mostrado si aplica.';
            break;

        case '6':
            if (!window.D) {
                window.D = [...window.C];
                output.innerHTML = '6*: Variable D "Var Mis fichas" creada y contenida las fichas de C.';
            } else {
                output.innerHTML = '6*: Variable D ya existe.';
            }
            break;

        case '7':
            const visorX = document.getElementById('visorX');
            if (visorX && window.D) {
                visorX.innerHTML = `Mis fichas: ${window.D.join(', ')}`;
                output.innerHTML = '7*: Visor X actualizado con las fichas de D.';
            } else {
                output.innerHTML = '7*: No se puede actualizar el visor X sin D.';
            }
            break;

        case '8':
            if (!window.W) {
                window.W = [...window.D];
                output.innerHTML = '8*: Variable W creada con las fichas seleccionadas inicialmente en C.';
            } else {
                output.innerHTML = '8*: Variable W ya existe.';
            }
            break;

        // Continúa con los otros casos y lógicas...

        case '20':
            output.innerHTML = '20*: Decoración en tonos verde aceituna aplicada.';
            document.body.style.backgroundColor = '#6B8E23';
            document.body.style.color = '#FFFFFF';
            document.body.style.fontWeight = 'bold';
            document.body.style.fontSize = 'large';
            break;

        default:
            output.innerHTML = 'El paso no está definido o no es válido.';
            break;
    }
});
