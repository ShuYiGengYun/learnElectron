const {app, BrowserWindow, Menu} = require('electron');
let win = null;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});
    // win.loadFile('./menu/index.html');
    // win.loadFile('./dynamicMenu/index.html');
    // win.loadFile('./contextMenu/index.html');
    win.loadFile('./tray/index.html');
    const radioSvgPath = __dirname + '/menu/icon/radio.png';
    const menuTemplate = [
        {
            label: '编辑',
            submenu: [
                {
                    label: '撤销',
                    role: 'undo'
                },
                {
                    label: '重做',
                    role: 'redo',
                },
                {
                    label: '剪切',
                    role: 'cut',
                },
                {
                    label: '复制',
                    role: 'copy',
                },
                {
                    label: '粘贴',
                    role: 'paste',
                }
            ],
        },
        {
            label: '调试',
            submenu: [
                {
                    label: '显示调试工具',
                    role: 'toggleDevTools',
                },
            ],
        },
        {
            label: '窗口',
            submenu: [
                {
                    label: '全屏显示窗口',
                    role: 'toggleFullScreen,'
                },
                {
                    label: '窗口放大10%',
                    role: 'zoomIn',
                },
                {
                    label: '窗口缩小10%',
                    role: 'zoomOut',
                }
            ],
        },
        {
            type: 'separator',
        },
        {
            label: '我的菜单',
            submenu: [
                {
                    label: '多选1',
                    type: 'checkbox',
                },
                {
                    label: '多选2',
                    type: 'checkbox',
                },
                {
                    label: '多选3',
                    type: 'checkbox',
                },
                {
                    label: '单选1',
                    type: 'radio',
                },
                {
                    label: '单选2',
                    type: 'radio',
                },
                {
                    label: '单选3',
                    icon: radioSvgPath,
                },
                {
                    label: 'windows',
                    type: 'submenu',
                    role: 'windowMenu',
                }
            ],
        }
    ];
    if (process.platform === 'darwin') {
        menuTemplate.unshift({
            label: 'Mac',
            submenu: [
                {
                    label: '关于',
                    role: 'about',
                },
                {
                    label: '开始说话',
                    role: 'startSpeaking',
                },
                {
                    label: '停止说话',
                    role: 'stopSpeaking',
                }
            ],
        });
    }
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    win.on('closed', function () {
        console.log('closed');
        win = null;
    });
}

app.on('ready', createWindow);
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});