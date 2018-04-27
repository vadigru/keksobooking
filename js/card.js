'use strict';
(function () {

  // data load success and error handling -------------------------------------

  var successHandler = function (receivedArr) {
    window.const.adCards = receivedArr;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; background-color: rgba(255, 255, 255, 0.8); color: red; line-height: 50px; padding: 0 25px; border-radius: 10px; border: 1px solid black; cursor: pointer;';
    node.style.position = 'absolute';
    node.style.right = '5px';
    node.style.top = '5px';
    node.style.fontSize = '16px';
    node.classList.add('errorDialog');
    node.textContent = errorMessage;
    window.const.map.insertAdjacentElement('afterbegin', node);

    var nodeIn = document.createElement('div');
    nodeIn.style = 'z-index: 101; color: black; cursor: pointer;';
    nodeIn.style.position = 'absolute';
    nodeIn.style.right = '10px';
    nodeIn.style.top = '10px';
    nodeIn.style.fontSize = '12px';
    nodeIn.classList.add('closeErrorDialog');
    nodeIn.textContent = 'x';
    window.const.map.insertAdjacentElement('afterbegin', nodeIn);
  };

  window.backend.load(successHandler, errorHandler);

  // error small dialog close -------------------------------------------------

  document.addEventListener('click', function (evt) {
    var target = evt.target;
    var div = document.querySelector('.closeErrorDialog');
    var divNested = document.querySelector('.errorDialog');
    if (target.className === 'errorDialog' || target.className === 'closeErrorDialog') {
      window.const.map.removeChild(div);
      window.const.map.removeChild(divNested);
    }
  });

  // popup rendering ----------------------------------------------------------

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

  var mapContainer = document.querySelector('.map__filter-container');
  var similarPopupElement = document.querySelector('template').content.querySelector('article.map__card');
  var popupElement = similarPopupElement.cloneNode(true);

  window.renderPopup = function (popupData) {
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

  window.const.map.insertBefore(popupElement, mapContainer);

})();
