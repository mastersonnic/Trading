function copyToClipboard(element) {
    const text = element.innerText;
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}
