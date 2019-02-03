let win = null;
const {remote} = require('electron');
const ipcMain = remote.ipcMain;

function openChildWin() {
    win = window.open(__dirname + '/child.html');
}

function postMessage() {
    win.postMessage('my data', ['*']);
}

ipcMain.on('close', function (event, args) {
    const label = document.getElementById('label');
    alert(args);
});
