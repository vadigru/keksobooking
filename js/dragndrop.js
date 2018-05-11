'use strict';

(function () {
  var draggedPhoto;
  var draggedPhotoURL;
  var adForm = document.querySelector('.ad-form');
  var avatar = adForm.querySelector('#avatar');
  var image = adForm.querySelector('#images');
  var avatarZone = adForm.querySelector('.ad-form-header__drop-zone');
  var imageZone = adForm.querySelector('.ad-form__photo-container');

  var onDragOverHandler = function (evt) {
    evt.preventDefault();
  };

  var onDropAvatarHandler = function (evt) {
    evt.preventDefault();
    avatar.files = evt.dataTransfer.files;
  };

  var onDropImageHandler = function (evt) {
    evt.preventDefault();
    image.files = evt.dataTransfer.files;
  };

  var onStartSortHandler = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedPhoto = evt.target;
      draggedPhotoURL = draggedPhoto.src;
    }
  };

  var onDropSortHandler = function (evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() === 'img' &&
        evt.target !== draggedPhoto) {
      draggedPhoto.src = evt.target.src;
      evt.target.src = draggedPhotoURL;
    }
  };

  var disableListeners = function () {
    avatarZone.removeEventListener('dragover', onDragOverHandler);
    avatarZone.removeEventListener('drop', onDropAvatarHandler);
    imageZone.removeEventListener('dragstart', onStartSortHandler);
    imageZone.removeEventListener('dragover', onDragOverHandler);
    imageZone.removeEventListener('drop', onDropSortHandler);
    imageZone.removeEventListener('drop', onDropImageHandler);
  };

  var enableListeners = function () {
    avatarZone.addEventListener('dragover', onDragOverHandler);
    avatarZone.addEventListener('drop', onDropAvatarHandler);
    imageZone.addEventListener('dragstart', onStartSortHandler);
    imageZone.addEventListener('dragover', onDragOverHandler);
    imageZone.addEventListener('drop', onDropSortHandler);
    imageZone.addEventListener('drop', onDropImageHandler);
  };

  window.dragndrop = {
    enableListeners: enableListeners,
    disableListeners: disableListeners
  };

})();
