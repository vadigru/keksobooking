'use strict';
(function () {
  // pin creating -------------------------------------------------------------
  window.pin = {
    renderPins: function (adCardsData) {
      var fragment = document.createDocumentFragment();
      var mapPins = document.querySelector('.map__pins');
      var similarPinElement = document.querySelector('template').content.querySelector('.map__pin');
      adCardsData.forEach(function (item) {
        var pinElement = similarPinElement.cloneNode(true);
        var longitude = parseInt(Array.from(item.location.lng.toString()).slice(6, 9).join(''), 10);
        var latitude = parseInt(Array.from(item.location.lat.toString()).slice(6, 9).join(''), 10);

        if (latitude > 650) {
          latitude = 650;
        } else if (latitude < 200) {
          latitude = 230;
        }

        pinElement.querySelector('img').src = item.author.avatar;
        pinElement.style = 'left: ' + (longitude - 25) + 'px; ' + 'top:' + (latitude - 70) + 'px';
        fragment.appendChild(pinElement);
      });
      mapPins.appendChild(fragment);
    }
  };
})();
