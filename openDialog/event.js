const {remote} = require('electron');
const dialog = remote.dialog;

function onClickOpenFile() {
    const label = document.getElementById('label');
    // const options = {
    //     title: '打开文件',
    //     message: '打开我的文件',
    //     buttonLabel: '选择',
    //     defaultPath: '',
    //     properties: ['openFile'],
    //     filters: [
    //         {
    //             name: '图像文件',
    //             extensions: ['jpg','png','gif'],
    //         },
    //         {
    //             name: '视频文件',
    //             extensions: ['mkv','avi','mp4'],
    //         },
    //         {
    //             name: '所有文件',
    //             extensions: ['*']
    //         }
    //     ],
    // };
    // 打开文件夹
    const openDirOpts = {
        properties: ['openFile', 'multiSelections']
    };
    const result = dialog.showOpenDialog(openDirOpts, (filePaths) => {
        for (var i = 0; i < filePaths.length; i++) {
            console.log(filePaths[i]);
            label.innerText += filePaths[i] + '\r\n';
        }
    });

}