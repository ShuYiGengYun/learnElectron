const {app, globalShortcut, BrowserWindow, dialog} = require('electron');
let mainWindow = null;
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 840,
        height: 470,
        userContentSize: true,
    });
    mainWindow.loadFile(`${__dirname}/RetroSnaker/index.html`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    const pauseKey = globalShortcut.register('CommandOrControl + p', () => {
        mainWindow.webContents.send(`togglePauseState`);
    });
    if (!pauseKey) {
        dialog.showMessageBox({
            type: 'error',
            message: `不能通过键盘暂停游戏`,
        });
    }
    mainWindow.openDevTools();
});
app.on('will-quit', () => {
    globalShotcut.unregister(`togglePauseState`);
    globalShotcut.unregisterAll();
});