(function () {

  var $ = function (selector) {
    return document.querySelector(selector);
  };

  [$('#webview-http'), $('#webview-https')].forEach(function (webview) {
    webview.addEventListener("dom-ready", function() {
      webview.openDevTools();
      console.dir(Object.keys(webview));
    });
  });

})();
