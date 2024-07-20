// Supongamos que tienes un array de precios llamado "precios"
const precios = [
    1.54, 1.67, 1.32, 1.78, 1.43, 1.62, 1.29, 1.71, 1.49, 1.75,
    1.37, 1.58, 1.24, 1.76, 1.41, 1.65, 1.31, 1.73, 1.47, 1.79,
    1.44, 1.61, 1.28, 1.72, 1.48, 1.77, 1.42, 1.64, 1.30, 1.74,
    1.38, 1.59, 1.25, 1.70, 1.46, 1.80, 1.45, 1.63, 1.27, 1.69,
    1.50, 1.26, 1.68, 1.40, 1.66, 1.36, 1.60, 1.33, 1.57, 1.23
];

// Calcula la frecuencia de cada intervalo (puedes ajustar los intervalos según tus necesidades)
const intervalos = 10; // Por ejemplo, 10 intervalos
const frecuencias = Array.from({ length: intervalos }, () => 0);
const rango = 1.8 - 1.2;

for (const precio of precios) {
    const intervalo = Math.floor((precio - 1.2) / (rango / intervalos));
    frecuencias[intervalo]++;
}

// Dibuja el histograma
const histogramaDiv = document.getElementById('histograma');
for (let i = 0; i < intervalos; i++) {
    const barra = document.createElement('div');
    barra.className = 'barra';
    barra.style.height = `${frecuencias[i] * 10}px`; // Ajusta la altura según tus datos
    histogramaDiv.appendChild(barra);
}
