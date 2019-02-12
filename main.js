const {app, BrowserWindow} = require('electron');
let win = null;
function createWindow() {
    const {Menu, dialog} = require('electron');
    win = new BrowserWindow({
        width: 800,
        height: 600,
        alwaysOnTop: false,
        frame: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    const openDialogPath = '/openDialog/index.html';
    const saveDialogPath = '/saveDialog/index.html';
    const messageBoxPath = '/messageBox/index.html';
    const openChildWinPath = '/openChildWin/index.html';
    const childWinPostMessage = '/childWinPostMessage/index.html';
    const openWebviewPath = '/openWebview/index.html';
    const progressBarPath = '/progressBar/index.html';
    const webFramePath = '/webFrame/index.html';
    const dynamicMenuPath = '/dynamicMenu/index.html';
    const trayMenuPath = '/tray/index.html';
    const trayBalloonPath = '/tray/balloon.html';
    const sqlPath = '/sql/index.html';
    const mysqlPath = '/mysql/index.html';
    const clipboardPath = '/clipboard/index.html';
    const packagePath = '/package/index.html';
    // win.loadFile(__dirname + openDialogPath);
    // win.loadFile(__dirname + saveDialogPath);
    // win.loadFile(__dirname + messageBoxPath);
    // win.loadFile(__dirname + openChildWinPath);
    // win.loadFile(__dirname + childWinPostMessage);
    // win.loadFile(__dirname + openWebviewPath);
    // win.loadFile(__dirname + progressBarPath);
    // win.loadFile(__dirname + webFramePath);
    // win.loadFile(__dirname + sqlPath);
    // win.loadFile(__dirname + mysqlPath);
    // win.loadFile(__dirname + clipboardPath);
    win.loadFile(__dirname + packagePath);
    const menu = Menu.buildFromTemplate([{
        label: '文件',
        submenu: [
            {
                label: '关于',
                role: 'about',
                click() {
                    const aboutWin = new BrowserWindow({width: 300, height: 200, parent: win, modal: true});
                    aboutWin.loadFile('./saveDialog/index.html');
                    aboutWin.openDevTools();
                }
            },
            {
                type: 'separator',
            },
            {
                label: '关闭',
                accelerator: 'Ctrl + Q',
                click() {
                    win.close();
                }
            },
        ],
    },
        {
            label: '编辑',
            submenu: [
                {
                    label: '复制',
                    click() {
                        win.webContents.insertText('复制');
                    }
                },
                {
                    label: '剪切',
                    click() {
                        win.webContents.insertText('剪切');
                    }
                }
            ],
        },
        {
            label: '调试',
            role: 'toggleDevTools'
        }
    ]);
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