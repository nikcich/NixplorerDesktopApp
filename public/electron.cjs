const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { ChildProcessWithoutNullStreams } = require('child_process');
const { spawn } = require('child_process');
const childProcess = require('child_process');

let child;


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800, height: 600,
        minWidth: 500, minHeight: 500,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.cjs'), // Adjust this path as needed
        },
    });

    win.loadFile(path.join(__dirname, '../dist/index.html'));

    win.webContents.openDevTools();
    //win.setMenu(null);

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('request-data');
    });

    ipcMain.on('data-response', (event, data) => {
        const port = data.port;
        const jarPath = path.join(__dirname, 'explorer-0.0.1-SNAPSHOT.jar');
        const javaExecutable = 'java'; // Adjust the Java executable path as needed
        child = childProcess.spawn(javaExecutable, ['-jar', jarPath, '--port=' + port]);
    });


}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.commandLine.appendSwitch('disable-web-security');

app.on('window-all-closed', () => {
    if (child) {
        const kill = require('tree-kill');
        kill(child.pid);
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

