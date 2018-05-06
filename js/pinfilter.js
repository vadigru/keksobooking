'use strict';
(function () {
  // pins filtering -----------------------------------------------------------
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFilters = map.querySelector('.map__filters');

  var Value = {
    any: 'any',
    low: 'low',
    middle: 'middle',
    high: 'high'
  };

  var updatePins = function (arr) {
    window.map.removePins();
    window.map.popupHide();
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
    var minPrice = price > window.constant.MIN_PRICE;
    var rangePrice = price < window.constant.MIN_PRICE || price > window.constant.MAX_PRICE;
    var maxPrice = price < window.constant.MAX_PRICE;
    var res = true;

    if (filterType !== Value.any && it.offer.type !== filterType) {
      res = false;
    }
    if (filterPrice !== Value.any && (filterPrice === Value.low && minPrice) ||
    (filterPrice === Value.middle && rangePrice) ||
    (filterPrice === Value.high && maxPrice)) {
      res = false;
    }
    if (filterRooms !== Value.any && it.offer.rooms !== parseInt(filterRooms, 10)) {
      res = false;
    }
    if (filterGuests !== Value.any && it.offer.guests !== parseInt(filterGuests, 10)) {
      res = false;
    }

    window.constant.FEATURES.forEach(function (item, n) {
      var feature = window.constant.FEATURES[n];
      var element = mapFilters.querySelector('#filter-' + feature);
      if (element.checked && !it.offer.features.includes(element.value)) {
        res = false;
      }
    });

    return res;
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
