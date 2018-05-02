'use strict';

(function () {

  window.util = {

    popupHide: function () {
      window.popupCard.classList.add('hidden');
    },

    popupShow: function () {
      window.popupCard.classList.remove('hidden');
    }

  };
})();
