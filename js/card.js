'use strict';
(function () {

  // generating and creating of card popup ------------------------------------

  var createCards = function () {
    var adCards = [];
    var adCard = {};
    var locationX;
    var locationY;
    for (var i = 0; i < window.const.MAX_USER; i++) {
      locationX = window.getData.getRandomNumberInRange(window.const.MIN_X, window.const.MAX_X);
      locationY = window.getData.getRandomNumberInRange(window.const.MIN_Y, window.const.MAX_Y);
      adCard = {
        'author': {
          'avatar': window.getData.getAvatar(i)
        },
        'offer': {
          'title': window.getData.getTitle(i),
          'address': locationX + ',' + locationY,
          'price': window.getData.getRandomNumberInRange(window.const.MIN_PRICE, window.const.MAX_PRICE),
          'type': window.getData.getRandomFromArray(window.const.TYPE),
          'rooms': window.getData.getRandomNumberInRange(window.const.MIN_ROOMS, window.const. MAX_ROOMS),
          'guests': window.getData.getRandomNumberInRange(window.const.MIN_GUESTS, window.const.MAX_GUESTS),
          'checkin': window.getData.getRandomFromArray(window.const.CHECKIN),
          'checkout': window.getData.getRandomFromArray(window.const.CHECKOUT),
          'features': window.getData.getRandomFeature(window.const.FEATURES),
          'descriprion': '',
          'photos': window.getData.getShufflePhotos(window.const.PHOTOS)
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

  window.adCards = createCards(window.const.MAX_USER);

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

  var mapContainer = document.querySelector('.map__filter-container');
  var similarPopupElement = document.querySelector('template').content.querySelector('article.map__card');
  var popupElement = similarPopupElement.cloneNode(true);

  window.renderPopup = function (popupData) {
    popupElement.querySelector('.popup__title').textContent = popupData.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = popupData.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = popupData.offer.price + ' ₽/ночь';
    popupElement.querySelector('.popup__type').textContent = window.getData.getType(popupData.offer.type);
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

  window.const.map.insertBefore(popupElement, mapContainer);

})();
