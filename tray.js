const {app, Menu, Tray, BrowserWindow, dialog} = require('electron');
let tray = null;
let contextMenu = null;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    win.loadFile('./tray/index.html');
    win.openDevTools();
    tray = new Tray('./tray/img/open.png');
    contextMenu = Menu.buildFromTemplate([
        {
            label: '复制',
            role: 'copy',
            click() {
                dialog.showMessageBox({
                    type: 'info',
                    title: 'HelloWorld',
                    message: '这是消息内容',
                    detail: '这是detail',
                });
            }
        },
        {
            label: '粘贴',
            role: 'paste',
        },
        {
            label: '剪切',
            role: 'cut',
        },
        {
            label: '关闭',
            role: 'close',
            click() {
                win.close();
            }
        }
    ]);
    tray.setToolTip('这是一个electron应用托盘');
    // tray.setContextMenu(contextMenu);
    tray.on('right-click', (event) => {
        tray.popUpContextMenu(contextMenu);
    });
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});