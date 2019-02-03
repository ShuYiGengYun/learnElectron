const {remote} = require('electron');
const dialog = remote.dialog;

function onClickSave() {
    const labelEle = document.getElementById('label');
    const options = {
        title: '保存文件',
        defaultPath: '',
        buttonLabel: '保存文件',
        filters: [
            {name: '图像文件', extensions: ['jpg', 'png', 'gif']},
            {name: '视频文件', extensions: ['mkv', 'avi', 'mp4']},
            {name: '音频文件', extensions: ['mp3', 'wav']},
            {name: '文本文件', extensions: ['txt']},
            {name: '所有文件', extensions: ['*']}
        ]
    };
    dialog.showSaveDialog(options, function (filename) {
        labelEle.innerText = filename;
    });
}
