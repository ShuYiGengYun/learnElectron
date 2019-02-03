const {remote} = require('electron');
const dialog = remote.dialog;
const messageBoxImagePath = '/img/1.jpg';
const iconPath = __dirname + messageBoxImagePath;
console.log(iconPath);

function onClickMessageBox() {
    const labelEle = document.getElementById('label');
    const options = {
        title: '信息',
        message: '这是一个信息提示框',
        type: 'warning',
        buttons: ['按钮1', '按钮2', '按钮3', '按钮3'],
    };
    // labelEle.innerText = dialog.showMessageBox(options, (res) => {
    //     console.log(res);
    // });
    dialog.showErrorBox('错误', '这是一个错误');
}