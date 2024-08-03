document.getElementById('goButton').addEventListener('click', function() {
    const url = document.getElementById('urlInput').value;
    document.getElementById('webView').src = url;
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('webView').contentWindow.history.back();
});

document.getElementById('forwardButton').addEventListener('click', function() {
    document.getElementById('webView').contentWindow.history.forward();
});
