'use strict';
(function () {

  // getting data for card ----------------------------------------------------

  window.getData = {
    getType: function (type) {
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
    }

    // getAvatar: function (index) {
    //   var avas = index + 1;
    //   return 'img/avatars/user0' + avas + '.png';
    // },

    // getTitle: function (index) {
    //   var titles = window.const.TITLE;
    //   return titles[index];
    // },

    // getRandomNumber: function (num) {
    //   return Math.floor(Math.random() * (num + 1));
    // },

    // getRandomNumberInRange: function (min, max) {
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // },

    // getRandomFromArray: function (array) {
    //   var randomIndex = window.getData.getRandomNumberInRange(0, array.length - 1);
    //   return array[randomIndex];
    // },

    // getRandomFeature: function (featuresArray) {
    //   var randomFeature = [];
    //   var randomCount = window.getData.getRandomNumber(featuresArray.length);
    //   for (var i = 0; i < randomCount; i++) {
    //     randomFeature.push(featuresArray[i]);
    //   }
    //   return randomFeature;
    // },

    // getShufflePhotos: function (a) {
    //   var j;
    //   var x;
    //   var i;
    //   for (i = a.length - 1; i > 0; i--) {
    //     j = window.getData.getRandomNumber(i);
    //     x = a[i];
    //     a[i] = a[j];
    //     a[j] = x;
    //   }
    //   return a;
    // }
  };
})();
