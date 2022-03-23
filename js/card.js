'use strict';
(function () {
  // popup rendering ----------------------------------------------------------
  var map = document.querySelector('.map');
  var mapContainer = map.querySelector('.map__filter-container');
  var similarPopupElement = document.querySelector('template').content.querySelector('article.map__card');
  var popupElement = similarPopupElement.cloneNode(true);

  var typeToText = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (item) {
      var pixElement = document.querySelector('template').content.querySelector('.popup__photos').cloneNode(true);
      pixElement.querySelector('img').src = item;
      fragment.appendChild(pixElement);
    });
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

  var renderPopup = function (popupData) {
    popupElement.querySelector('.popup__title').textContent = popupData.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = popupData.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = popupData.offer.price + ' ₽/ночь';
    popupElement.querySelector('.popup__type').textContent = typeToText[popupData.offer.type];
    popupElement.querySelector('.popup__text--capacity').textContent = popupData.offer.rooms + ' комнаты для ' + popupData.offer.guests + ' гостей';
    popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + popupData.offer.checkin + ', ' + 'выезд до ' + popupData.offer.checkout;
    popupElement.querySelector('.popup__photos').textContent = '';
    if (popupData.offer.photos && popupData.offer.photos.length > 0) {
      popupElement.querySelector('.popup__photos').appendChild(renderPhotos(popupData.offer.photos));
    }
    popupElement.querySelector('.popup__features').textContent = '';
    if (popupData.offer.features && popupData.offer.features.length > 0) {
      popupElement.querySelector('.popup__features').appendChild(renderFeatures(popupData.offer.features));
    }
    popupElement.querySelector('.popup__description').textContent = popupData.offer.descriprion;
    popupElement.querySelector('img').src = popupData.author.avatar;
    document.addEventListener('keydown', window.map.onEscClose);
    return popupElement;
  };

  map.insertBefore(popupElement, mapContainer);

  window.card = {
    renderPopup: renderPopup
  };
})();
