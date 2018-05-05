'use strict';
(function () {
  window.constant = {
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    POS_MIN_Y: 150,
    POS_MAX_Y: 620,
    MIN_PIN: 0,
    MAX_PIN: 5,
    MIN_PRICE: 10000,
    MAX_PRICE: 50000,
    PIN_WIDTH: 60,
    PIN_HEIGHT: 80,
    UPDATE_INTERVAL: 500,
    TIMEOUT_INTERVAL: 3000,
    MIN_PRICE_FOR: {bungalo: 0, flat: 1000, house: 5000, palace: 10000}
  };
})();
