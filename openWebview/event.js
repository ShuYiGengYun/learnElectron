window.onload = function () {
    const webview = document.getElementById('webview');
    alert('HelloWorld');
    webview.addEventListener('dom-ready', () => {
        webview.openDevTools();
    })
};