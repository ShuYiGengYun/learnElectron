const {remote} = require('electron');

function setProgressBar() {
    const win = remote.getCurrentWindow();
    win.setProgressBar(0.3);
}