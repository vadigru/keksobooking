'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters');
  var fieldsetMapFilter = mapFilters.querySelectorAll('select');
  var form = document.querySelector('.notice form');
  var resetButton = form.querySelector('.ad-form__reset');
  var formAddress = form.querySelector('#address');
  var fieldsetAdForm = form.querySelectorAll('fieldset');
  var popup = document.querySelector('.popup');
  var pinMainPosX = mapPinMain.offsetLeft;
  var pinMainPosY = mapPinMain.offsetTop;
  var buttons;
  var buttonsImg;

  window.adCards = [];
  window.pinsArray = [];

  // data load success and error handling -------------------------------------
  var onLoadSuccessHandle = function (data) {
    window.adCards = data;
    data.forEach(function (item, index) {
      item.id = index;
      window.pinsArray.push(item);
    });
  };

  var onLoadErrorHandle = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; background-color: rgba(255, 255, 255, 0.8); color: red; line-height: 50px; padding: 0 25px; border-radius: 10px; border: 1px solid black; cursor: pointer;';
    node.style.position = 'absolute';
    node.style.right = '5px';
    node.style.top = '5px';
    node.style.fontSize = '16px';
    node.classList.add('errorDialog');
    node.textContent = errorMessage;
    map.insertAdjacentElement('afterbegin', node);

    var nodeIn = document.createElement('div');
    nodeIn.style = 'z-index: 101; color: black; cursor: pointer;';
    nodeIn.style.position = 'absolute';
    nodeIn.style.right = '10px';
    nodeIn.style.top = '10px';
    nodeIn.style.fontSize = '12px';
    nodeIn.classList.add('closeErrorDialog');
    nodeIn.textContent = 'x';
    map.insertAdjacentElement('afterbegin', nodeIn);
  };

  window.backend.load(onLoadSuccessHandle, onLoadErrorHandle);

  // active/inactive map mode ---------------------------------------------------
  var popupHide = function () {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onEscClose);
  };

  var popupShow = function () {
    popup.classList.remove('hidden');
  };

  popupHide();
  window.util.setInputDisabled(fieldsetAdForm);
  window.util.setInputDisabled(fieldsetMapFilter);

  var removePins = function () {
    buttons = mapPins.querySelectorAll('button[type="button"]');
    [].forEach.call(buttons, function (item) {
      mapPins.removeChild(item);
    });
  };

  var renderNewPopup = function (arr) {
    window.card.renderPopup(arr);
    popupShow();
  };

  var onActivateHandle = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.pin.renderPins(window.adCards.slice(window.constant.MIN_PIN, window.constant.MAX_PIN));
    window.util.removeInputDisabled(fieldsetAdForm);
    window.util.removeInputDisabled(fieldsetMapFilter);
    resetButton.addEventListener('click', onDeactivateHandle);
    mapPinMain.removeEventListener('mouseup', onActivateHandle);
    mapPinMain.removeEventListener('keydown', onEnterOpen);
  };

  var onDeactivateHandle = function () {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.util.setInputDisabled(fieldsetAdForm);
    window.util.setInputDisabled(fieldsetMapFilter);
    form.reset();
    mapFilters.reset();
    removePins();
    window.photoupload.clearAvatar();
    window.photoupload.clearPhotos();

    if (popup) {
      popupHide();
    }

    setInitAddress();

    resetButton.removeEventListener('click', onDeactivateHandle);
    mapPinMain.addEventListener('mouseup', onActivateHandle);
    mapPinMain.addEventListener('keydown', onEnterOpen);
  };

  map.addEventListener('click', function (evt) {
    var target = evt.target;
    buttons = mapPins.querySelectorAll('button[type="button"]');
    buttonsImg = mapPins.querySelectorAll('button[type="button"]>img');
    window.adCards.forEach(function (item, i) {
      if (target === buttons[i] || target === buttonsImg[i]) {
        renderNewPopup(item);
      }
    });
  });

  var onEnterOpen = function (evt) {
    window.util.isEnterEvent(evt, onActivateHandle);
  };

  var onEscClose = function (evt) {
    window.util.isEscEvent(evt, popupHide);
  };

  map.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('popup__close')) {
      popupHide();
    }
  });

  mapPinMain.addEventListener('mouseup', onActivateHandle);
  mapPinMain.addEventListener('keydown', onEnterOpen);

  // dragging the pinmain on the map --------------------------------------------
  var mapWidth = map.offsetWidth;
  var pinMainWidthHalf = Math.round(window.constant.PIN_WIDTH / 2);
  var pinMainHeightHalf = Math.round(window.constant.PIN_HEIGHT / 2);
  var initCoordX = Math.round(mapPinMain.offsetLeft + pinMainWidthHalf);
  var initCoordY = Math.round(mapPinMain.offsetTop + pinMainHeightHalf);

  var setInitAddress = function () {
    mapPinMain.style.left = pinMainPosX + 'px';
    mapPinMain.style.top = pinMainPosY + 'px';
    formAddress.value = initCoordX + ', ' + initCoordY;
  };

  mapPinMain.draggable = 'true';

  setInitAddress();

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

      var newTop = mapPinMain.offsetTop - shift.y;
      var borderTop = window.constant.POS_MIN_Y - window.constant.PIN_HEIGHT;
      var borderBottom = window.constant.POS_MAX_Y;
      var newLeft = mapPinMain.offsetLeft - shift.x;
      var borderLeft = mapWidth - mapWidth;
      var borderRight = mapWidth - window.constant.PIN_WIDTH;
      var finalCoordX = (mapPinMain.offsetLeft + pinMainWidthHalf) - shift.x;
      var finalCoordY = (mapPinMain.offsetTop + window.constant.PIN_HEIGHT) - shift.y;

      if (newTop < borderTop) {
        mapPinMain.style.top = borderTop + 'px';
      } else if (newTop > borderBottom) {
        mapPinMain.style.top = borderBottom + 'px';
      } else {
        mapPinMain.style.top = newTop + 'px';
      }

      if (newLeft < borderLeft) {
        mapPinMain.style.left = borderLeft + 'px';
      } else if (newLeft > borderRight) {
        mapPinMain.style.left = borderRight + 'px';
      } else {
        mapPinMain.style.left = newLeft + 'px';
      }

      formAddress.value = finalCoordX + ', ' + finalCoordY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    popupHide: popupHide,
    removePins: removePins,
    onEscClose: onEscClose,
    renderNewPopup: renderNewPopup,
    onDeactivateHandle: onDeactivateHandle
  };

})();
