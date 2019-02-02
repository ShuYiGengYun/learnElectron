const {app, BrowserWindow} = require('electron');
let win = null;

function createWindow() {
    const {Menu, dialog} = require('electron');
    win = new BrowserWindow({
        width: 800,
        height: 600,
        alwaysOnTop: false,
        frame: true,
    });
    win.loadFile('index.html');
    const n = 20;
    console.log(n);
    const menu = Menu.buildFromTemplate([{
        label: '菜单',
        submenu: [
            {
                id: 0,
                label: '打开文件',
                click() {
                    dialog.showOpenDialog({
                        title: '选择文件',
                        properties: ['openFile'],
                        filters: [
                            {
                                name: 'html',
                                extends: ['html']
                            }
                        ]
                    }, function (filePaths) {
                        win.loadURL(url.fromat({
                            pathname: filePaths[0],
                            protocol: 'file',
                            slashes: true,
                        }))
                    });
                }
            },
            {
                id: 1,
                label: '开发者工具',
                click() {
                    win.webContents.openDevTools();
                },
            },
            {
                id: 2,
                label: '退出',
                role: 'quit',
            }
        ],
    }]);
    Menu.setApplicationMenu(menu);
    win.on('closed', () => {
        win = null;
    })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('active', () => {
    if (win === null) {
        createWindow();
    }
});