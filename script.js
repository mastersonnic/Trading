document.addEventListener("DOMContentLoaded", function() {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach(iframe => {
        iframe.src = iframe.src; // Recargar cada iframe
    });
});
