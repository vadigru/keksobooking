'use strict';
(function () {
  var fieldsetMapFeatures = document.querySelector('.map__features');
  var lastTimeout;

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === window.constant.ENTER_KEYCODE) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === window.constant.ESC_KEYCODE) {
      action();
    }
  };

  var setInputDisabled = function (arr) {
    fieldsetMapFeatures.disabled = true;
    arr.forEach(function (item) {
      item.disabled = true;
    });
  };

  var removeInputDisabled = function (arr) {
    fieldsetMapFeatures.disabled = false;
    arr.forEach(function (item) {
      item.disabled = false;
    });
  };

  var debounce = function (f) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(f, window.constant.UPDATE_INTERVAL);
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    setInputDisabled: setInputDisabled,
    removeInputDisabled: removeInputDisabled,
    debounce: debounce
  };
})();
