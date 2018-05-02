'use strict';

(function () {

  window.util = {

    popupHide: function () {
      window.popupCard.classList.add('hidden');
    },

    popupShow: function () {
      window.popupCard.classList.remove('hidden');
    },

    setInputDisabled: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].disabled = true;
      }
    },

    removeInputDisabled: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].disabled = false;
      }
    }

  };
})();
