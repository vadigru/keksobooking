'use strict';
(function () {
  var UPDATE_INTERVAL = 500;
  var lastTimeout;

  window.debounce = function (f) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(f, UPDATE_INTERVAL);
  };
})();
