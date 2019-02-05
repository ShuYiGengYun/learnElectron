const {app, remote} = require('electron');
const {BrowserWindow, Menu, MenuItem} = remote;
let win = null;

function saveClick() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    win.loadURL('https://geekori.com');
}

let customeMenu = new Menu();

function addAllOriginMenu() {
    const menu = new Menu();
    let icon = '';
    if (process.platform === 'win32') {
        icon = __dirname + '/img/open.png';
    } else {
        icon = __dirname + '/img/folder.png';
    }
//    创建菜单项对应的MenuItem对象;
    const menuItemOpen = new MenuItem({label: '打开', icon: icon});
    const menuItemSave = new MenuItem({label: ' 保存', click: saveClick});
//    创建带子菜单的菜单项;
    const menuItemFile = new MenuItem({label: '文件', submenu: [menuItemOpen, menuItemSave]});
//    创建用于定制的菜单项目;
    const menuItemCustome = new MenuItem({label: '定制菜单', submenu: customeMenu});
    const alreayCreatedMenu = Menu.getApplicationMenu();
    alreayCreatedMenu.append(menuItemFile);
    alreayCreatedMenu.append(menuItemCustome);
    Menu.setApplicationMenu(alreayCreatedMenu);
}

//  动态添加菜单;
function addMenuItem() {
    let type = 'normal';
    const radio = document.getElementById('radio');
    const checkbox = document.getElementById('checkbox');
    const menuItemEle = document.getElementById('menuItem');
    if (radio.checked) {
        type = 'radio';
    } else if (checkbox.checked) {
        type = 'checkbox';
    }
    const menuItem = new MenuItem({label: menuItemEle.value, type: type});
    customeMenu.append(menuItem);
    menuItemEle.value = '';
    radio.checked = false;
    checkbox.checked = false;
    Menu.setApplicationMenu(Menu.getApplicationMenu());
}