const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800, height: 600,
        minWidth: 500, minHeight: 500,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.cjs'), // Adjust this path as needed
        },
    });

    // win.setMenu(null);

    win.loadURL('http://localhost:5173'); // index.html
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {

        window.electronData = {
            port: "nik was here",
        };

        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

