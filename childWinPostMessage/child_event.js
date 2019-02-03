const {remote, ipcRenderer} = require('electron');

function onLoad() {
    let label = null;
    label = document.getElementById('label');
    window.addEventListener('message', function (e) {
        label.innerText = e.data;
    })
}

function closeChildWin() {
    const win = remote.getCurrentWindow();
    ipcRenderer.send('close', '窗口已关闭');
    win.close();
}

function evalChildWin() {
    const label = document.getElementById('label');
    const win = remote.getCurrentWindow;
    window.eval('label.innerText = "HelloWorld"');
}