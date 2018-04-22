'use strict';

// active/inactive map mode ---------------------------------------------------

var mapPins = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var popup = document.querySelector('.popup:last-child');
var fieldsets = document.querySelectorAll('.notice fieldset');
var form = document.querySelector('.notice form');
var buttons;
var buttonsImg;
var reset = document.querySelector('.ad-form__reset');
popup.classList.add('hidden');

var setInputDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fieldsets[i].disabled = true;
  }
};
setInputDisabled(fieldsets);

var removeInputDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fieldsets[i].disabled = false;
  }
};

var renderNewPopup = function (arr) {
  window.renderPopup(arr);
  popup.classList.remove('hidden');
};

var activateMap = function (evt) {
  window.const.map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  mapPinMain.removeEventListener('mouseup', activateMap);
  window.renderPins(window.adCards);
  removeInputDisabled(fieldsets);
  buttons = document.querySelectorAll('.map__pins button[type="button"]');
  buttonsImg = document.querySelectorAll('.map__pins button[type="button"]>img');
  if (evt.keyCode === window.const.ENTER_KEYCODE) {
    popup.classList.add('hidden');
  }
};

var deactivateMap = function () {
  window.const.map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  mapPinMain.addEventListener('mouseup', activateMap);
  setInputDisabled(fieldsets);
  form.reset();
  buttons = document.querySelectorAll('.map__pins button[type="button"]');
  buttonsImg = document.querySelectorAll('.map__pins button[type="button"]>img');

  for (var i = 0; i < buttons.length; i++) {
    mapPins.removeChild(buttons[i]);
  }

  if (popup) {
    popup.classList.add('hidden');
  }

  mapPinMain.style.left = pinMainPosX + 'px';
  mapPinMain.style.top = pinMainPosY + 'px';

  window.const.formAddress.value = pinMainAddressInitialPositionX + ', ' + pinMainAddressInitialPositionY;
};

window.const.map.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.className === 'popup__close') {
    popup.classList.add('hidden');
  }
});

window.const.map.addEventListener('click', function (evt) {
  var target = evt.target;
  for (var i = 0; i < buttons.length; i++) {
    if (target === buttons[i] || target === buttonsImg[i]) {
      renderNewPopup(window.adCards[i]);
    }
  }
});

mapPinMain.addEventListener('mouseup', activateMap);
mapPinMain.addEventListener('keydown', activateMap);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.const.ESC_KEYCODE) {
    popup.classList.add('hidden');
  }
});

reset.addEventListener('click', deactivateMap);

// dragging the pinmain on the map --------------------------------------------

var mapWidth = window.const.map.offsetWidth;
var pinMainPosX = mapPinMain.offsetLeft;
var pinMainPosY = mapPinMain.offsetTop;
var pinMainWidth = mapPinMain.offsetWidth;
var pinMainHeight = mapPinMain.offsetHeight;
var pinMainAddressInitialPositionX = Math.round(pinMainPosX + pinMainWidth / 2);
var pinMainAddressInitialPositionY = Math.round(pinMainPosY + pinMainHeight / 2);
var pinMainWidthHalf = Math.round(pinMainWidth / 2);

mapPinMain.draggable = 'true';
window.const.formAddress.value = pinMainAddressInitialPositionX + ', ' + pinMainAddressInitialPositionY;

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

    if ((mapPinMain.offsetTop - shift.y) < window.const.POS_MIN_Y - pinMainHeight) {
      mapPinMain.style.top = window.const.POS_MIN_Y - pinMainHeight + 'px';
    } else if (((mapPinMain.offsetTop - shift.y) > window.const.POS_MAX_Y)) {
      mapPinMain.style.top = window.const.POS_MAX_Y + 'px';
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
    window.const.formAddress.value = ((mapPinMain.offsetLeft + pinMainWidthHalf) - shift.x) + ', ' + ((mapPinMain.offsetTop + pinMainHeight) - shift.y);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

