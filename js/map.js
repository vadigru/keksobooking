'use strict';

// active/inactive map mode ---------------------------------------------------

window.popupCard = document.querySelector('.popup:last-child');
var mapPinMain = document.querySelector('.map__pin--main');
var fieldset = document.querySelectorAll('.notice fieldset');
var form = document.querySelector('.notice form');
var resetButton = document.querySelector('.ad-form__reset');
var buttons;
var buttonsImg;

window.util.popupHide();

var setInputDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fieldset[i].disabled = true;
  }
};
setInputDisabled(fieldset);


var removeInputDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fieldset[i].disabled = false;
  }
};

window.map = {
  removePins: function () {
    buttons = document.querySelectorAll('.map__pins button[type="button"]');
    buttonsImg = document.querySelectorAll('.map__pins button[type="button"]>img');
    for (var i = 0; i < buttons.length; i++) {
      window.constant.mapPins.removeChild(buttons[i]);
    }
  },
  renderNewPopup: function (arr) {
    window.card.renderPopup(arr);
    window.util.popupShow();
  },
  deactivateMap: function () {
    window.constant.map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    mapPinMain.addEventListener('mouseup', activateMap);
    setInputDisabled(fieldset);
    form.reset();
    window.constant.mapFilters.reset();
    window.map.removePins();

    if (window.popupCard) {
      window.util.popupHide();
    }

    mapPinMain.style.left = pinMainPosX + 'px';
    mapPinMain.style.top = pinMainPosY + 'px';

    window.constant.formAddress.value = pinMainAddressInitialPositionX + ', ' + pinMainAddressInitialPositionY;
  }
};

var activateMap = function (evt) {
  window.constant.map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  mapPinMain.removeEventListener('mouseup', activateMap);
  window.pin.renderPins(window.constant.adCards.slice(window.constant.MIN_RENDER_PINS_NUM, window.constant.MAX_RENDER_PINS_NUM));
  removeInputDisabled(fieldset);
  buttons = document.querySelectorAll('.map__pins button[type="button"]');
  buttonsImg = document.querySelectorAll('.map__pins button[type="button"]>img');
  if (evt.keyCode === window.constant.ENTER_KEYCODE) {
    window.util.popupHide();
  }
};

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.constant.ESC_KEYCODE) {
    window.util.popupHide();
  }
});

window.constant.map.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.className === 'popup__close') {
    window.util.popupHide();
  }
});

window.constant.map.addEventListener('click', function (evt) {
  var target = evt.target;
  for (var i = 0; i < buttons.length; i++) {
    if (target === buttons[i] || target === buttonsImg[i]) {
      window.map.renderNewPopup(window.constant.adCards[i]);
    }
  }
});

resetButton.addEventListener('click', window.map.deactivateMap);
mapPinMain.addEventListener('mouseup', activateMap);
mapPinMain.addEventListener('keydown', activateMap);

// dragging the pinmain on the map --------------------------------------------

var mapWidth = window.constant.map.offsetWidth;
var pinMainPosX = mapPinMain.offsetLeft;
var pinMainPosY = mapPinMain.offsetTop;
var pinMainWidth = mapPinMain.offsetWidth;
var pinMainHeight = mapPinMain.offsetHeight;
var pinMainAddressInitialPositionX = Math.round(pinMainPosX + pinMainWidth / 2);
var pinMainAddressInitialPositionY = Math.round(pinMainPosY + pinMainHeight / 2);
var pinMainWidthHalf = Math.round(pinMainWidth / 2);

mapPinMain.draggable = 'true';
window.constant.formAddress.value = pinMainAddressInitialPositionX + ', ' + pinMainAddressInitialPositionY;

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if ((mapPinMain.offsetTop - shift.y) < window.constant.POS_MIN_Y - pinMainHeight) {
      mapPinMain.style.top = window.constant.POS_MIN_Y - pinMainHeight + 'px';
    } else if (((mapPinMain.offsetTop - shift.y) > window.constant.POS_MAX_Y)) {
      mapPinMain.style.top = window.constant.POS_MAX_Y + 'px';
    } else {
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    }

    if ((mapPinMain.offsetLeft - shift.x) < (mapWidth - mapWidth)) {
      mapPinMain.style.left = mapWidth - mapWidth + 'px';
    } else if ((mapPinMain.offsetLeft - shift.x) > mapWidth - pinMainWidth) {
      mapPinMain.style.left = mapWidth - pinMainWidth + 'px';
    } else {
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    }
    window.constant.formAddress.value = ((mapPinMain.offsetLeft + pinMainWidthHalf) - shift.x) + ', ' + ((mapPinMain.offsetTop + pinMainHeight) - shift.y);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

