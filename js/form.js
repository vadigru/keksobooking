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
    [].forEach.call(formTimein, function (item, i) {
      if (formTimein[i].selected) {
        formTimeout[i].selected = true;
      }
    });
  };

  var linkTimeSelectedReverse = function () {
    [].forEach.call(formTimein, function (item, i) {
      if (formTimeout[i].selected) {
        formTimein[i].selected = true;
      }
    });
  };

  [].forEach.call(capacity, function (item, i) {
    if (capacity[i].value === '1') {
      capacity[i].disabled = false;
      capacity[i].selected = true;
    } else {
      capacity[i].disabled = true;
    }
  });

  var linkRoomsSelected = function () {
    var roomNumberSel = roomNumber.value;
    [].forEach.call(roomNumber, function (item, i) {
      var value = capacity[i].value;
      var equal = (value === capacityMin && roomNumberSel === roomNumberMax);
      var notEqual = (value !== capacityMin && roomNumberSel !== roomNumberMax);
      if (value <= roomNumberSel && notEqual || equal) {
        capacity[i].disabled = false;
        capacity[i].selected = true;
      } else {
        capacity[i].disabled = true;
      }
    });
  };

  formType.addEventListener('change', linkTypeSelected);
  formTimein.addEventListener('change', linkTimeSelected);
  formTimeout.addEventListener('change', linkTimeSelectedReverse);
  roomNumber.addEventListener('change', linkRoomsSelected);

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
