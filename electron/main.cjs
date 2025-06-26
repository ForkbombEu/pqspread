const { app, BrowserWindow } = require('electron')
const path = require('path');

app.on('ready', () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load your HTML file
    win.loadFile(path.join(__dirname, 'index.html'));
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
