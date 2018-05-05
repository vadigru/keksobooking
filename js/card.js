'use strict';
(function () {
  // popup rendering ----------------------------------------------------------
  var mapWhole = document.querySelector('.map');
  var mapContainer = mapWhole.querySelector('.map__filter-container');
  var similarPopupElement = document.querySelector('template').content.querySelector('article.map__card');
  var popupElement = similarPopupElement.cloneNode(true);

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

  mapWhole.insertBefore(popupElement, mapContainer);

  window.card = {
    renderPopup: renderPopup
  };
})();
