var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var fs = require('fs');
var path = require('path');

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  registerProtocol();
  openWindow();
});

function registerProtocol() {
  var protocol = electron.protocol;
  protocol.registerBufferProtocol('audio-test-001', function (request, callback) {
    console.log('[protocol request]', request);
    var filePath = path.join(__dirname, 'sample.mp3');
    fs.readFile(filePath, function (err, data) {
      if (err) return console.log('can not get audio', filePath, err);
      callback(data);
    });
  }, function (error) {
    if (error) console.log(error);
  });
}

function openWindow() {
  var mainWindow = new BrowserWindow({width: 1200, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');
  mainWindow.openDevTools();
}
