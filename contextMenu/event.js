const {app, remote} = require('electron');
const {Menu, MenuItem, BrowserWindow, dialog} = remote;

function onLoad() {
    const menu = new Menu();
    let icon = '';
    if (process.platform === 'win32') {
        icon = __dirname + '/img/open.png';
    } else {
        icon = __dirname + '/img/folder.png';
    }
    const win = remote.getCurrentWindow();
    const menuItemOpen = new MenuItem({
        label: '打开',
        icon: icon,
        click() {
            const paths = dialog.showOpenDialog({
                properties: ['openFile']
            });
            if (paths) {
                win.setTitle(paths[0]);
            }
        }
    });
    const menuItemSave = new MenuItem({
        label: '保存',
        click: saveClick,
    });
    const menuItemFile = new MenuItem({
        label: '文件',
        submenu: [
            menuItemOpen,
            menuItemSave,
        ]
    });
    const menuItemInsertImage = new MenuItem({
        label: '插入图像'
    });
    const menuItemRemoveImage = new MenuItem({
        label: '删除图像',
        click: saveClick,
    });
    menu.append(menuItemFile);
    menu.append(menuItemInsertImage);
    menu.append(menuItemRemoveImage);
    const panelEle = document.getElementById('panel');
    panelEle.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const x = event.x;
        const y = event.y;
        menu.popup({x: x, y: y,});
        return false;
    })
}

function saveClick() {
    const win = new BrowserWindow({width: 300, height: 200,});
    win.loadURL('https://geekori.com');
}