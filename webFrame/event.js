const {webFrame} = require('electron');

//  放大页面;
function ZoomIn() {
    webFrame.setZoomLevel(webFrame.getZoomLevel() + 1);
    webFrame.insertText('HelloWorld');
}