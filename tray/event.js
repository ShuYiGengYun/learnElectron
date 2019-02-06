const {remote} = require('electron');
const {Menu, Tray} = remote;
let tray;
let contextMenu;

// 添加托盘图标;
function addTrayIcon() {
    if (tray) {
        return false;
    }
    tray = new Tray(__dirname + '/img/tray.png');
    const win = remote.getCurrentWindow();
    contextMenu = Menu.buildFromTemplate([
        {
            label: '复制', role: 'copy',
        },
        {
            label: '粘贴', role: 'paste',
        },
        {
            label: '剪切', role: 'cut',
        },
        {
            label: '关闭', role: 'close', click() {
                win.close();
            }
        }
    ]);
    tray.setToolTip('托盘事件');
    tray.setContextMenu(contextMenu);
    //  添加托盘气泡;
    tray.on('balloon-show', () => {
        log.value += 'balloon-show\n\r';
    });
    // 添加气泡单击事件;
    tray.on('balloon-click', () => {
        log.value += 'balloon-click\r\n';
    });
    tray.on('balloon-closed', () => {
        log.value += 'balloon-closed\r\n';
    });
}

// 设置托盘图标;
function setTrayIcon() {
    if (tray) {
        tray.setImage(__dirname + '/img/folder.png');
    }
}

//  设置托盘提示文本;
function setToolTip() {
    if (tray) {
        tray.setToolTip('This is a ToolTip');
    }
}

// 移除托盘;
function removeTray() {
    if (tray) {
        tray.destroy();
        tray = null;
    }
}

function onClick_DisplayBalloon() {
    if (tray) {
        tray.displayBalloon({
            title: 'HelloWorld',
            content: '这是BalloonContent',
        });
    }
}