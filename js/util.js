'use strict';
(function () {
  var fieldsetMapFeatures = document.querySelector('.map__features');
  var popup = document.querySelector('.popup');
  var lastTimeout;

  var popupHide = function () {
    popup.classList.add('hidden');
  };

  var popupShow = function () {
    popup.classList.remove('hidden');
  };

  var setInputDisabled = function (arr) {
    fieldsetMapFeatures.disabled = true;
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  var removeInputDisabled = function (arr) {
    fieldsetMapFeatures.disabled = false;
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  };

  var debounce = function (f) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(f, window.constant.UPDATE_INTERVAL);
  };

  window.util = {
    popupHide: popupHide,
    popupShow: popupShow,
    setInputDisabled: setInputDisabled,
    removeInputDisabled: removeInputDisabled,
    debounce: debounce
  };
})();
