let win = null;

function openChildWin() {
    const childWinPath = 'child.html';
    // const childWinPath = 'https://geekori.com';
    win = window.open(childWinPath, '新的窗口', 'width=300', 'height=200');
}

function winFocus() {
    if (win) {
        win.focus();
    }
}

function winBlur() {
    if (win) {
        win.blur();
    }
}

function winClose() {
    if (win) {
        if (win.closed) {
            alert('子窗口已经关闭,不需要关闭');
            return;
        }
        win.close();
    }
}

function winPrint() {
    if (win) {
        win.print();
    }
}

