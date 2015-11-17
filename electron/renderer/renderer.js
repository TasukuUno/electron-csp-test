(function () {

  var $ = function (selector) {
    return document.querySelector(selector);
  };


  setTimeout(function () {
    $('#webview-http').openDevTools();
    $('#webview-https').openDevTools();
  }, 1000 * 3);

})();
