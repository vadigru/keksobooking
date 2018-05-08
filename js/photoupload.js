'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.ad-form');
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type="file"]');
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type="file"]');
  var previewBlock = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoTemplate = photoContainer.querySelector('.ad-form__photo');

  var createAvatar = function () {
    var file = fileChooserAvatar.files[0];
    if (!file) {
      return;
    }
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewBlock.src = reader.result;
      });
    }
    reader.readAsDataURL(file);
  };

  var createPreview = function () {
    var file = fileChooserPhoto.files[0];
    if (!file) {
      return;
    }
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var photo = photoTemplate.cloneNode(true);
        var img = document.createElement('img');
        img.style.width = '70px';
        img.style.height = '70px';
        img.style.marginRight = '10px';
        img.style.borderRadius = '5px';
        img.src = reader.result;
        photo.appendChild(img);
        photoContainer.insertBefore(photo, photoTemplate);
      });
    }
    reader.readAsDataURL(file);
  };

  form.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target === fileChooserPhoto) {
      createPreview();
    } else if (target === fileChooserAvatar) {
      createAvatar();
    }
  });
})();