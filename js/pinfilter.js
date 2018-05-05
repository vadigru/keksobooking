'use strict';
(function () {
  // pins filtering -----------------------------------------------------------
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFilters = map.querySelector('.map__filters');

  var updatePins = function (arr) {
    window.map.removePins();
    window.util.popupHide();
    window.pin.renderPins(arr.slice(window.constant.MIN_PIN, window.constant.MAX_PIN));
    map.addEventListener('click', function (evt) {
      var target = evt.target;
      var pinButtons = mapPins.querySelectorAll('button[type="button"]');
      var pinButtonsImg = mapPins.querySelectorAll('button[type="button"]>img');
      for (var i = 0; i < arr.length; i++) {
        if (target === pinButtons[i] || target === pinButtonsImg[i]) {
          window.map.renderNewPopup(arr[i]);
        }
      }
    });
  };

  var filterPinsCheck = function (it) {
    var filterType = mapFilters.querySelector('#housing-type').value;
    var filterPrice = mapFilters.querySelector('#housing-price').value;
    var filterRooms = mapFilters.querySelector('#housing-rooms').value;
    var filterGuests = mapFilters.querySelector('#housing-guests').value;
    var price = it.offer.price;
    var moreMinPrice = price > window.constant.MIN_PRICE;
    var lessMinPrice = price < window.constant.MIN_PRICE;
    var moreMaxPrice = price > window.constant.MAX_PRICE;
    var lessMaxPrice = price < window.constant.MAX_PRICE;

    if (filterType !== 'any') {
      if (it.offer.type !== filterType) {
        return false;
      }
    }

    if (filterPrice !== 'any') {
      if ((filterPrice === 'low' && moreMinPrice) ||
      (filterPrice === 'middle' && (lessMinPrice || moreMaxPrice)) ||
      (filterPrice === 'high' && lessMaxPrice)) {
        return false;
      }
    }

    if (filterRooms !== 'any') {
      if (it.offer.rooms !== parseInt(filterRooms, 10)) {
        return false;
      }
    }

    if (filterGuests !== 'any') {
      if (it.offer.guests !== parseInt(filterGuests, 10)) {
        return false;
      }
    }

    for (var i = 0; i < window.constant.FEATURES.length; i++) {
      var feature = window.constant.FEATURES[i];
      var element = mapFilters.querySelector('#filter-' + feature);
      if (element.checked) {
        if (!it.offer.features.includes(element.value)) {
          return false;
        }
      }
    }

    return true;
  };

  var filterPins = function () {
    window.pinsArray = window.adCards.filter(function (it) {
      return filterPinsCheck(it);
    });
    updatePins(window.pinsArray);
  };

  mapFilters.addEventListener('change', function () {
    window.util.debounce(filterPins);
  });
})();
