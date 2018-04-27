'use strict';
(function () {
  window.const = {
    MIN_X: 300,
    MAX_X: 900,
    MIN_Y: 150,
    MAX_Y: 500,
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
    MIN_ROOMS: 1,
    MAX_ROOMS: 5,
    MIN_GUESTS: 1,
    MAX_GUESTS: 10,
    MAX_USER: 8,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    POS_MIN_Y: 150,
    POS_MAX_Y: 500,
    formAddress: document.querySelector('#address'),
    mapPinMain: document.querySelector('.map__pin--main'),
    map: document.querySelector('.map'),
    adCards: []
  };
})();
