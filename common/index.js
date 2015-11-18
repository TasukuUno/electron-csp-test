(function () {

  var $ = function (selector) {
    return document.querySelector(selector);
  };

  $('#location').textContent = location.href;

  $('#play').addEventListener('click', function () {
    get('audio-test-001://', function (buffer) {
      if (buffer) {
        var audio = new Audio();
        var blob = new Blob([buffer], {type: 'audio/mpeg'});
        audio.src = URL.createObjectURL(blob);
        audio.play();
      }
    });
  }, false);

  var electron = window && window.require('electron');
  if (electron) {
    electronAction(electron);
  }

  function electronAction(electron) {
    var webFrame = electron.webFrame;
    webFrame.registerURLSchemeAsBypassingCSP('audio-test-001');
    webFrame.registerURLSchemeAsSecure('audio-test-001');
  }

  function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onreadystatechange = function () {
      var state = xhr.readyState;
      if (state === 4) {
        if (xhr.status === 200) {
          var buffer = new Uint8Array(xhr.response);
          callback(buffer, xhr);
        } else {
          callback();
        }
      }
    };
    xhr.send(null);
  }
})();
