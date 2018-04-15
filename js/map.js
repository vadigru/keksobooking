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

var blockMap = document.querySelector('.map');
var blockMapContainer = document.querySelector('.map__filter-container');
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

blockMap.insertBefore(popupElement, blockMapContainer);

// -----------------------------------------------------------

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var fieldsets = document.querySelectorAll('.notice fieldset');
var form = document.querySelector('.notice form');
var address = document.querySelector('#address');
var popup = document.querySelector('.popup:last-child');
var buttons;
var buttonsImg;
popup.classList.add('hidden');

var setInputDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fieldsets[i].disabled = 'disabled';
  }
};
setInputDisabled(fieldsets);

var removeInputDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fieldsets[i].disabled = '';
  }
};

var getPosition = function (obj) {
  var posX = obj.offsetLeft;
  var posY = obj.offsetTop;
  var width = obj.offsetWidth;
  var height = obj.offsetWidth;
  address.value = Math.round(posX + width / 2) + ', ' + Math.round(posY + height / 2);
};
getPosition(mapPinMain);

var activateMap = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  mapPinMain.removeEventListener('mouseup', activateMap);
  renderPins(adCards);
  removeInputDisabled(fieldsets);
  buttons = document.querySelectorAll('.map__pins button[type="button"]');
  buttonsImg = document.querySelectorAll('.map__pins button[type="button"]>img');
};

map.addEventListener('click', function (evt) {
  var target = evt.target;
  for (var i = 0; i < buttons.length; i++) {
    if (target === buttons[i]) {
      renderPopup(adCards[i]);
      popup.classList.remove('hidden');
    } else if (target === buttonsImg[i]) {
      renderPopup(adCards[i]);
      popup.classList.remove('hidden');
    }
  }
});

map.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.className === 'popup__close') {
    popup.classList.add('hidden');
  }
});

mapPinMain.addEventListener('mouseup', activateMap);
