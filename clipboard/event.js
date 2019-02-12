const {remote} = require('electron');
const {clipboard, Tray, nativeImage} = remote;

function init() {
    text.innerText = `<h1>Hello World</h1>`;
}

// 向剪贴板写入内容;
function onClick_WriteText() {
    clipboard.writeText(text.innerText);
    alert('已经成功将文本复制到剪贴板！')
}

//从剪贴板读取文本
function onClick_ReadText() {
    text.innerHTML = clipboard.readText();
}

//向剪贴板写入 RTF 代码
function onClick_WriteRTF() {
    clipboard.writeRTF(text.innerHTML);
    alert('已经成功将RTF复制到剪贴板！')
}

//从剪贴板读取 RTF 代码
function onClick_ReadRTF() {
    text.innerText = clipboard.readRTF();
    alert(clipboard.readRTF())
}

//将本地图像文件保存在剪贴板
function onClick_WriteImage() {
    const image = nativeImage.createFromPath(__dirname + '/img/open.png');
    clipboard.writeImage(image);
    alert('已经成功将Image复制到剪贴板！')
}

//从剪贴板读取图像
function onClick_ReadImage() {
    const image = clipboard.readImage();
    const appIcon = new Tray(image);
}