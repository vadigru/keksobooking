'use strict';

(function () {
  var draggedPhoto;
  var draggedPhotoURL;
  var adForm = document.querySelector('.ad-form');
  var headerUpload = adForm.querySelector('.ad-form-header__upload');
  var avatar = headerUpload.querySelector('#avatar');
  var dropZoneHeader = headerUpload.querySelector('.ad-form-header__drop-zone');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');
  var images = photoContainer.querySelector('#images');
  var dropZoneImages = photoContainer.querySelector('.ad-form__drop-zone');

  var prevent = function (evt) {
    evt.preventDefault();
  };
  var onDragAvatarHandle = function (evt) {
    evt.preventDefault();
    avatar.files = evt.dataTransfer.files;
  };

  var onDragImageHandle = function (evt) {
    evt.preventDefault();
    images.files = evt.dataTransfer.files;
  };

  var onDragSortStartHandle = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedPhoto = evt.target;
      draggedPhotoURL = draggedPhoto.src;
    }
  };

  var onDragSortDropHandle = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img' &&
        evt.target !== draggedPhoto) {
      draggedPhoto.src = evt.target.src;
      evt.target.src = draggedPhotoURL;
    }

  };

  var disableListeners = function () {
    dropZoneHeader.removeEventListener('dragover', prevent);
    dropZoneHeader.removeEventListener('dragenter', prevent);
    dropZoneHeader.removeEventListener('drop', onDragAvatarHandle);
    dropZoneImages.removeEventListener('dragover', prevent);
    dropZoneImages.removeEventListener('dragenter', prevent);
    dropZoneImages.removeEventListener('drop', onDragImageHandle);
    photoContainer.removeEventListener('dragstart', onDragSortStartHandle);
    photoContainer.removeEventListener('dragover', prevent);
    photoContainer.removeEventListener('drop', onDragSortDropHandle);
  };

  var enableListeners = function () {
    dropZoneHeader.addEventListener('dragover', prevent);
    dropZoneHeader.addEventListener('dragenter', prevent);
    dropZoneHeader.addEventListener('drop', onDragAvatarHandle);
    dropZoneImages.addEventListener('dragover', prevent);
    dropZoneImages.addEventListener('dragenter', prevent);
    dropZoneImages.addEventListener('drop', onDragImageHandle);
    photoContainer.addEventListener('dragstart', onDragSortStartHandle);
    photoContainer.addEventListener('dragover', prevent);
    photoContainer.addEventListener('drop', onDragSortDropHandle);
  };

  window.dragndrop = {
    enableListeners: enableListeners,
    disableListeners: disableListeners
  };

})();
