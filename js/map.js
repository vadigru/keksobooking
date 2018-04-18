'use strict';

var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 150;
var MAX_Y = 500;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MAX_USER = 8;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getAvatar = function (index) {
  var avas = index + 1;
  return 'img/avatars/user0' + avas + '.png';
};

var getTitle = function (index) {
  var titles = TITLE;
  return titles[index];
};

var getType = function (type) {
  switch (type) {
    case 'palace':
      type = 'Дворец';
      break;
    case 'flat':
      type = 'Квартира';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
  }
  return type;
};

var getRandomNumber = function (num) {
  return Math.floor(Math.random() * (num + 1));
};

var getRandomNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomFromArray = function (array) {
  var randomIndex = getRandomNumberInRange(0, array.length - 1);
  return array[randomIndex];
};

var getRandomFeature = function (featuresArray) {
  var randomFeature = [];
  var randomCount = getRandomNumber(featuresArray.length);
  for (var i = 0; i < randomCount; i++) {
    randomFeature.push(featuresArray[i]);
  }
  return randomFeature;
};

var getShufflePhotos = function (a) {
  var j;
  var x;
  var i;
  for (i = a.length - 1; i > 0; i--) {
    j = getRandomNumber(i);
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

var createCards = function () {
  var adCards = [];
  var adCard = {};
  var locationX;
  var locationY;
  for (var i = 0; i < MAX_USER; i++) {
    locationX = getRandomNumberInRange(MIN_X, MAX_X);
    locationY = getRandomNumberInRange(MIN_Y, MAX_Y);
    adCard = {
      'author': {
        'avatar': getAvatar(i)
      },
      'offer': {
        'title': getTitle(i),
        'address': locationX + ',' + locationY,
        'price': getRandomNumberInRange(MIN_PRICE, MAX_PRICE),
        'type': getRandomFromArray(TYPE),
        'rooms': getRandomNumberInRange(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomNumberInRange(MIN_GUESTS, MAX_GUESTS),
        'checkin': getRandomFromArray(CHECKIN),
        'checkout': getRandomFromArray(CHECKOUT),
        'features': getRandomFeature(FEATURES),
        'descriprion': '',
        'photos': getShufflePhotos(PHOTOS)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    adCards.push(adCard);
  }
  return adCards;
};

var adCards = createCards(MAX_USER);

var renderPins = function (adCardsData) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('.map__pins');
  var similarPinElement = document.querySelector('template').content.querySelector('.map__pin');
  adCardsData.forEach(function (item) {
    var pinElement = similarPinElement.cloneNode(true);
    pinElement.querySelector('img').src = item.author.avatar;
    pinElement.style = 'left: ' + (item.location.x - 25) + 'px; ' + 'top:' + (item.location.y - 70) + 'px';
    fragment.appendChild(pinElement);
    template.appendChild(fragment);
  });
};

var renderPhotos = function (item) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < item.length; i++) {
    var pixElement = document.querySelector('template').content.querySelector('.popup__photos').cloneNode(true);
    pixElement.querySelector('img').src = item[i];
    fragment.appendChild(pixElement);
  }
  return fragment;
};

var renderFeatures = function (feature) {
  var fragment = document.createDocumentFragment();
  feature.forEach(function (item) {
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + item;
    fragment.appendChild(li);
  });
  return fragment;
};

var map = document.querySelector('.map');
var mapContainer = document.querySelector('.map__filter-container');
var similarPopupElement = document.querySelector('template').content.querySelector('article.map__card');
var popupElement = similarPopupElement.cloneNode(true);

var renderPopup = function (popupData) {
  popupElement.querySelector('.popup__title').textContent = popupData.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = popupData.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = popupData.offer.price + ' ₽/ночь';
  popupElement.querySelector('.popup__type').textContent = getType(popupData.offer.type);
  popupElement.querySelector('.popup__text--capacity').textContent = popupData.offer.rooms + ' комнаты для ' + popupData.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + popupData.offer.checkin + ', ' + 'выезд до ' + popupData.offer.checkout;
  popupElement.querySelector('.popup__photos').textContent = '';
  popupElement.querySelector('.popup__photos').appendChild(renderPhotos(popupData.offer.photos));
  popupElement.querySelector('.popup__features').textContent = '';
  popupElement.querySelector('.popup__features').appendChild(renderFeatures(popupData.offer.features));
  popupElement.querySelector('.popup__description').textContent = popupData.offer.descriprion;
  popupElement.querySelector('img').src = popupData.author.avatar;
  return popupElement;
};

map.insertBefore(popupElement, mapContainer);

// -----------------------------------------------------------

var mapPins = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var fieldsets = document.querySelectorAll('.notice fieldset');
var form = document.querySelector('.notice form');
var popup = document.querySelector('.popup:last-child');
var buttons;
var buttonsImg;
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
  renderPopup(arr);
  popup.classList.remove('hidden');
};

map.addEventListener('click', function (evt) {
  var target = evt.target;
  for (var i = 0; i < buttons.length; i++) {
    if (target === buttons[i] || target === buttonsImg[i]) {
      renderNewPopup(adCards[i]);
    }
  }
});

map.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.className === 'popup__close') {
    popup.classList.add('hidden');
  }
});

var activateMap = function (evt) {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  mapPinMain.removeEventListener('mouseup', activateMap);
  renderPins(adCards);
  removeInputDisabled(fieldsets);
  buttons = document.querySelectorAll('.map__pins button[type="button"]');
  buttonsImg = document.querySelectorAll('.map__pins button[type="button"]>img');
  if (evt.keyCode === ENTER_KEYCODE) {
    popup.classList.add('hidden');
  }
};

mapPinMain.addEventListener('mouseup', activateMap);
mapPinMain.addEventListener('keydown', activateMap);
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    popup.classList.add('hidden');
  }
});

// -----------------------------------------------------------

var submitForm = document.querySelector('.ad-form');
// var formTitle = document.querySelector('#title');
var formType = document.querySelector('#type');
var formPrice = document.querySelector('#price');
var formAddress = document.querySelector('#address');
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

// -----------------------------------------------------------

var mapWidth = map.offsetWidth;
var pinMainPosX = mapPinMain.offsetLeft;
var pinMainPosY = mapPinMain.offsetTop;
var pinMainWidth = mapPinMain.offsetWidth;
var pinMainHeight = mapPinMain.offsetHeight;
var pinMainAddressInitialPositionX = Math.round(pinMainPosX + pinMainWidth / 2);
var pinMainAddressInitialPositionY = Math.round(pinMainPosY + pinMainHeight / 2);
var pinMainWidthHalf = Math.round(pinMainWidth / 2);
var POS_MIN_Y = 150;
var POS_MAX_Y = 500;
mapPinMain.draggable = 'true';
formAddress.value = pinMainAddressInitialPositionX + ', ' + pinMainAddressInitialPositionY;

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

    if ((mapPinMain.offsetTop - shift.y) < POS_MIN_Y - pinMainHeight) {
      mapPinMain.style.top = POS_MIN_Y - pinMainHeight + 'px';
    } else if (((mapPinMain.offsetTop - shift.y) > POS_MAX_Y)) {
      mapPinMain.style.top = POS_MAX_Y + 'px';
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
    formAddress.value = ((mapPinMain.offsetLeft + pinMainWidthHalf) - shift.x) + ', ' + ((mapPinMain.offsetTop + pinMainHeight) - shift.y);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// -----------------------------------------------------------

var reset = document.querySelector('.ad-form__reset');

var deactivateMap = function () {
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  mapPinMain.addEventListener('mouseup', activateMap);
  setInputDisabled(fieldsets);
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

  formAddress.value = pinMainAddressInitialPositionX + ', ' + pinMainAddressInitialPositionY;
};

reset.addEventListener('click', deactivateMap);
