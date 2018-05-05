'use strict';
(function () {
  var success = document.querySelector('.success');
  var error = document.querySelector('.error');
  var submitForm = document.querySelector('.ad-form');
  var formType = submitForm.querySelector('#type');
  var formPrice = submitForm.querySelector('#price');
  var formTimein = submitForm.querySelector('#timein');
  var formTimeout = submitForm.querySelector('#timeout');
  var roomNumber = submitForm.querySelector('#room_number');
  var roomNumberMax = roomNumber.querySelector('option:last-of-type').value;
  var capacity = submitForm.querySelector('#capacity');
  var capacityMin = capacity.querySelector('option:last-of-type').value;

  // form validation  ---------------------------------------------------------
  var linkingTypeAndPrice = function () {
    var formTypeSel = formType.value;
    if (formType.value === formTypeSel) {
      formPrice.min = window.constant.MIN_PRICE_FOR[formTypeSel];
      formPrice.placeholder = 'от ' + window.constant.MIN_PRICE_FOR[formTypeSel] + ' руб';
      formPrice.value = '';
    }
  };

  var linkingTimeinAndTimeout = function () {
    for (var i = 0; i < formTimein.length; i++) {
      if (formTimein[i].selected) {
        formTimeout[i].selected = true;
      }
    }
  };

  var linkingTimeinAndTimeoutReverse = function () {
    for (var i = 0; i < formTimeout.length; i++) {
      if (formTimeout[i].selected) {
        formTimein[i].selected = true;
      }
    }
  };

  var linkingRoomNumberAndCapacity = function () {
    var roomNumberSel = roomNumber.value;
    for (var i = 0; i < capacity.length; i++) {
      if ((capacity[i].value <= roomNumberSel && capacity[i].value !== capacityMin && roomNumberSel !== roomNumberMax) ||
          (capacity[i].value === capacityMin && roomNumberSel === roomNumberMax)) {
        capacity[i].disabled = false;
      } else {
        capacity[i].disabled = true;
      }
    }
  };

  var linkingRoomNumberAndCapacitySelected = function () {
    for (var i = 0; i < capacity.length; i++) {
      if (roomNumber[i].value) {
        capacity[i].selected = true;
      } capacity[i].selected = false;
    }
  };

  formType.addEventListener('change', linkingTypeAndPrice);
  formTimein.addEventListener('change', linkingTimeinAndTimeout);
  formTimeout.addEventListener('change', linkingTimeinAndTimeoutReverse);
  roomNumber.addEventListener('change', linkingRoomNumberAndCapacity);
  roomNumber.addEventListener('change', linkingRoomNumberAndCapacitySelected);

  // form data upload success and error handling ------------------------------
  var showSuccess = function () {
    success.classList.remove('hidden');
  };

  var hideSuccess = function () {
    setTimeout(function () {
      success.classList.add('hidden');
    }, window.constant.TIMEOUT_INTERVAL);
  };

  var showError = function () {
    error.classList.remove('hidden');
  };

  var hideError = function () {
    setTimeout(function () {
      error.classList.add('hidden');
    }, window.constant.TIMEOUT_INTERVAL);
  };

  var onSubmitSuccessHandle = function () {
    showSuccess();
    window.map.deactivateMap();
    hideSuccess();
  };

  var onSubmitErrorHandle = function () {
    showError();
    hideError();
  };

  submitForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(submitForm), onSubmitSuccessHandle, onSubmitErrorHandle);
    evt.preventDefault();
  });

  // error small dialog close -------------------------------------------------
  document.addEventListener('click', function (evt) {
    var mapWhole = document.querySelector('.map');
    var target = evt.target;
    var div = mapWhole.querySelector('.closeErrorDialog');
    var divNested = mapWhole.querySelector('.errorDialog');
    if (target.className === 'errorDialog' || target.className === 'closeErrorDialog') {
      mapWhole.removeChild(div);
      mapWhole.removeChild(divNested);
    }
  });
})();
