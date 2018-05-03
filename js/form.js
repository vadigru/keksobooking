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
  var capacity = submitForm.querySelector('#capacity');

  // form validation  ---------------------------------------------------------

  var linkingTypeAndPrice = function () {
    if (formType.options[0].selected === true) {
      formPrice.min = 1000;
      formPrice.placeholder = 'от 1000 руб';
      formPrice.value = '';
    } else if (formType.options[1].selected === true) {
      formPrice.min = 0;
      formPrice.placeholder = 'от 0 руб';
      formPrice.value = '';
    } else if (formType.options[2].selected === true) {
      formPrice.min = 5000;
      formPrice.placeholder = 'от 5000 руб';
      formPrice.value = '';
    } else if (formType.options[3].selected === true) {
      formPrice.min = 10000;
      formPrice.placeholder = 'от 10000 руб';
      formPrice.value = '';
    }
  };

  var linkingTimeinAndTimeout = function () {
    if (formTimein.options[0].selected === true) {
      formTimeout.options[0].selected = true;
    } else if (formTimein.options[1].selected === true) {
      formTimeout.options[1].selected = true;
    } else if (formTimein.options[2].selected === true) {
      formTimeout.options[2].selected = true;
    }
  };

  var linkingTimeinAndTimeoutReverse = function () {
    if (formTimeout.options[0].selected === true) {
      formTimein.options[0].selected = true;
    } else if (formTimeout.options[1].selected === true) {
      formTimein.options[1].selected = true;
    } else if (formTimeout.options[2].selected === true) {
      formTimein.options[2].selected = true;
    }
  };

  var linkingRoomnumberAndCapacity = function () {
    var roomNumberSel = roomNumber.options[roomNumber.selectedIndex].value;
    if (roomNumberSel === '1') {
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[2].selected = true;
      capacity.options[2].disabled = false;
      capacity.options[3].disabled = true;
    } else if (roomNumberSel === '2') {
      capacity.options[0].disabled = true;
      capacity.options[1].selected = true;
      capacity.options[1].disabled = false;
      capacity.options[2].disabled = false;
      capacity.options[3].disabled = true;
    } else if (roomNumberSel === '3') {
      capacity.options[0].selected = true;
      capacity.options[0].disabled = false;
      capacity.options[1].disabled = false;
      capacity.options[2].disabled = false;
      capacity.options[3].disabled = true;
    } else if (roomNumberSel === '100') {
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[2].disabled = true;
      capacity.options[3].disabled = false;
      capacity.options[3].selected = true;
    }
  };

  formType.addEventListener('change', linkingTypeAndPrice);
  formTimein.addEventListener('change', linkingTimeinAndTimeout);
  formTimeout.addEventListener('change', linkingTimeinAndTimeoutReverse);
  roomNumber.addEventListener('change', linkingRoomnumberAndCapacity);

  // form data upload success and error handling ------------------------------

  var showSuccess = function () {
    success.classList.remove('hidden');
  };

  var hideSuccess = function () {
    setTimeout(function () {
      success.classList.add('hidden');
    }, 3000);
  };

  var showError = function () {
    error.classList.remove('hidden');
  };

  var hideError = function () {
    setTimeout(function () {
      error.classList.add('hidden');
    }, 3000);
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
