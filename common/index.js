(function () {

  var $ = function (selector) {
    return document.querySelector(selector);
  };

  $('#location').textContent = location.href;

})();
