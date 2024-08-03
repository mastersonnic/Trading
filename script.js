document.addEventListener('DOMContentLoaded', () => {
    const operationsDiv = document.getElementById('operations');
    const loadDataButton = document.getElementById('loadData');

    loadDataButton.addEventListener('click', () => {
        fetch('https://app.libertex.org/m#investments/active')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const operations = doc.querySelectorAll('.operation'); // Ajusta el selector según la estructura de la página

                operations.forEach(operation => {
                    const profitLoss = parseFloat(operation.querySelector('.profit-loss').textContent);
                    let multiplier = parseInt(operation.querySelector('.multiplier').textContent);

                    if (profitLoss <= -0.01) {
                        multiplier = Math.max(1, multiplier - 1);
                    } else if (profitLoss >= 0.01) {
                        multiplier += 1;
                    }

                    operation.querySelector('.multiplier').textContent = multiplier;
                });

                operationsDiv.innerHTML = doc.body.innerHTML;
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    });
});
