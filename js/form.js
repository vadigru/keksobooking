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
  var linkTypeSelected = function () {
    var formTypeSel = formType.value;
    if (formType.value === formTypeSel) {
      formPrice.min = window.constant.MIN_PRICE_FOR[formTypeSel];
      formPrice.placeholder = 'от ' + window.constant.MIN_PRICE_FOR[formTypeSel] + ' руб';
      formPrice.value = '';
    }
  };

  var linkTimeSelected = function () {
    for (var i = 0; i < formTimein.length; i++) {
      if (formTimein[i].selected) {
        formTimeout[i].selected = true;
      }
    }
  };

  var linkTimeSelectedReverse = function () {
    for (var i = 0; i < formTimeout.length; i++) {
      if (formTimeout[i].selected) {
        formTimein[i].selected = true;
      }
    }
  };

  for (var j = 0; j < capacity.length; j++) {
    if (capacity[j].value === '1') {
      capacity[j].disabled = false;
      capacity[j].selected = true;
    } else {
      capacity[j].disabled = true;
    }
  }

  var linkRoomsSelected = function () {
    var roomNumberSel = roomNumber.value;
    for (var i = 0; i < roomNumber.length; i++) {
      var value = capacity[i].value;
      var equal = (value === capacityMin && roomNumberSel === roomNumberMax);
      var notEqual = (value !== capacityMin && roomNumberSel !== roomNumberMax);
      if (value <= roomNumberSel && notEqual || equal) {
        capacity[i].disabled = false;
      } else {
        capacity[i].disabled = true;
      }
    }
  };

  var linkRoomsSelectedOrder = function () {
    var roomNumberSel = roomNumber.value;
    for (var i = 0; i < capacity.length; i++) {
      if (roomNumber[i].value === roomNumberSel) {
        capacity[i].selected = true;
      }
      capacity[i].selected = false;
    }
  };

  formType.addEventListener('change', linkTypeSelected);
  formTimein.addEventListener('change', linkTimeSelected);
  formTimeout.addEventListener('change', linkTimeSelectedReverse);
  roomNumber.addEventListener('change', linkRoomsSelected);
  roomNumber.addEventListener('change', linkRoomsSelectedOrder);

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
    window.map.onDeactivateHandle();
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
    var map = document.querySelector('.map');
    var target = evt.target;
    var div = map.querySelector('.closeErrorDialog');
    var divNested = map.querySelector('.errorDialog');
    if (target.className === 'errorDialog' || target.className === 'closeErrorDialog') {
      map.removeChild(div);
      map.removeChild(divNested);
    }
  });
})();
