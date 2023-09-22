// main.js
const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
   const mainWindow = new BrowserWindow({
       width: 800,
       height: 600,
       webPreferences: {
           nodeIntegration: true
       }
   })

   // Загрузите вашу HTML-страницу
   mainWindow.loadFile('index.html')
})