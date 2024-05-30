const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { app } = require('electron');
app.commandLine.appendSwitch('enable-express-mode', 'true');
require("./app")


console.log("hello world")
// Keep a global reference of the window object to prevent it from being garbage collected
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Allow the use of Node.js APIs in the renderer process
      nodeIntegration: true
    }
  });

  // Load the React app
  mainWindow.loadURL("http://localhost:1000"
  );

  // Open the DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed
  mainWindow.on('closed', function () {
    // Dereference the window object
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization and is ready to create browser windows
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS, re-create a window in the app when the dock icon is clicked and there are no other windows open
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
