'use strict';

(function () {

  // pins filtering -----------------------------------------------------------

  var updatePins = function (arr) {
    window.map.removePins();
    window.util.popupHide();
    window.pin.renderPins(arr.slice(window.constant.MIN_RENDER_PINS_NUM, window.constant.MAX_RENDER_PINS_NUM));
    window.constant.map.addEventListener('click', function (evt) {
      var target = evt.target;
      var pinButtons = document.querySelectorAll('.map__pins button[type="button"]');
      var pinButtonsImg = document.querySelectorAll('.map__pins button[type="button"]>img');
      for (var i = 0; i < arr.length; i++) {
        if (target === pinButtons[i] || target === pinButtonsImg[i]) {
          window.map.renderNewPopup(arr[i]);
        }
      }
    });
  };

  var filterPinsCheck = function (it) {
    var filterType = document.querySelector('#housing-type').value;
    if (filterType !== 'any') {
      if (it.offer.type !== filterType) {
        return false;
      }
    }

    var filterPrice = document.querySelector('#housing-price').value;
    if (filterPrice !== 'any') {
      if (filterPrice === 'low' && it.offer.price > window.constant.MIN_FILTER_PRICE) {
        return false;
      } else if (filterPrice === 'middle' && (it.offer.price < window.constant.MIN_FILTER_PRICE || it.offer.price > window.constant.MAX_FILTER_PRICE)) {
        return false;
      } else if (filterPrice === 'high' && it.offer.price < window.constant.MAX_FILTER_PRICE) {
        return false;
      }
    }

    var filterRooms = document.querySelector('#housing-rooms').value;
    if (filterRooms !== 'any') {
      if (it.offer.rooms !== parseInt(filterRooms, 10)) {
        return false;
      }
    }

    var filterGuests = document.querySelector('#housing-guests').value;
    if (filterGuests !== 'any') {
      if (it.offer.guests !== parseInt(filterGuests, 10)) {
        return false;
      }
    }

    for (var i = 0; i < window.constant.FEATURES.length; i++) {
      var feature = window.constant.FEATURES[i];
      var element = document.querySelector('#filter-' + feature);
      if (element.checked) {
        if (!it.offer.features.includes(element.value)) {
          return false;
        }
      }
    }

    return true;
  };

  var filterPins = function () {
    window.constant.pinsArray = window.constant.adCards.filter(function (it) {
      return filterPinsCheck(it);
    });
    console.log(window.constant.pinsArray);
    updatePins(window.constant.pinsArray);
  };

  window.constant.mapFilters.addEventListener('change', function () {
    window.debounce(filterPins);
  });

})();
