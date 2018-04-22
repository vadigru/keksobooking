'use strict';

(function () {

  // form validation  ---------------------------------------------------------

  var submitForm = document.querySelector('.ad-form');
  var formType = document.querySelector('#type');
  var formPrice = document.querySelector('#price');
  var formTimein = document.querySelector('#timein');
  var formTimeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  submitForm.action = 'https://js.dump.academy/keksobooking';

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

  var linkingRoomnumberAndCapacityReverse = function () {
    var capacitySel = capacity.options[capacity.selectedIndex].value;
    if (capacitySel === '3') {
      roomNumber.options[0].disabled = true;
      roomNumber.options[1].disabled = true;
      roomNumber.options[2].selected = true;
      roomNumber.options[2].disabled = false;
      roomNumber.options[3].disabled = true;
    } else if (capacitySel === '2') {
      roomNumber.options[0].disabled = true;
      roomNumber.options[1].disabled = false;
      roomNumber.options[2].selected = true;
      roomNumber.options[2].disabled = false;
      roomNumber.options[3].disabled = true;
    } else if (capacitySel === '1') {
      roomNumber.options[0].disabled = false;
      roomNumber.options[1].selected = true;
      roomNumber.options[1].disabled = false;
      roomNumber.options[2].disabled = true;
      roomNumber.options[3].disabled = true;
    } else if (capacitySel === '0') {
      roomNumber.options[0].disabled = true;
      roomNumber.options[1].disabled = true;
      roomNumber.options[2].disabled = true;
      roomNumber.options[3].selected = true;
      roomNumber.options[3].disabled = false;
    }
  };

  formType.addEventListener('change', linkingTypeAndPrice);
  formTimein.addEventListener('change', linkingTimeinAndTimeout);
  formTimeout.addEventListener('change', linkingTimeinAndTimeoutReverse);
  roomNumber.addEventListener('change', linkingRoomnumberAndCapacity);
  capacity.addEventListener('change', linkingRoomnumberAndCapacityReverse);
})();
