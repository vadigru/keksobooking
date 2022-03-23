'use strict';
(function () {
  var fieldsetMapFeatures = document.querySelector('.map__features');
  var lastTimeout;

  var getRandomValue = function (min, arr) {
    var max = arr;
    return Array.isArray(arr) ?
      arr[Math.floor(Math.random() * max.length)] :
      Math.floor(min + Math.random() * (max + 1 - min));
  };

  var shuffleArray = function (arr) {
    var j;
    var k;
    for (var i = arr.length - 1; i > 0; i--) {
      j = getRandomValue(1, i);
      k = arr[i];
      arr[i] = arr[j];
      arr[j] = k;
    }
    return arr;
  };

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
    debounce: debounce,
    shuffleArray: shuffleArray,
  };
})();
