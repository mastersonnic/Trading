function copyToClipboard(element) {
    const text = element.innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert(`Copiado al portapapeles: ${text}`);
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}
