'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.ad-form');
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type="file"]');
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type="file"]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoTemplate = photoContainer.querySelector('.ad-form__photo');

  // clear uploaded images ----------------------------------------------------
  var clearAvatar = function () {
    preview.src = window.constant.DEFAULT_AVATAR;
  };

  var clearPhotos = function () {
    var addedPhotos = document.querySelectorAll('.addedPhoto');
    [].forEach.call(addedPhotos, function (item) {
      photoContainer.removeChild(item);
    });
  };

  // create previews of uploaded images ---------------------------------------
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
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
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
        var div = document.createElement('div');
        var close;
        var addedPhoto;
        img.style.width = '70px';
        img.style.height = '70px';
        img.style.marginRight = '10px';
        img.style.borderRadius = '5px';
        img.style.position = 'relative';
        img.style.top = '-20px';
        img.src = reader.result;
        div.style.width = '20px';
        div.style.height = '20px';
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        div.style.position = 'relative';
        div.style.zIndex = '1';
        div.style.border = '1px solid black';
        div.style.left = '55px';
        div.style.top = '-5px';
        div.style.margin = '0px';
        div.style.padding = '0px';
        div.style.color = 'rgb(255, 86, 53)';
        div.textContent = 'x';
        div.style.textAlign = 'center';
        div.style.lineHeight = '15px';
        div.style.fontWeight = '800';
        div.style.borderRadius = '24px';
        div.style.cursor = 'pointer';
        photo.classList.add('addedPhoto');
        div.classList.add('addedPhotoClose');
        photo.appendChild(div);
        photo.appendChild(img);
        photoContainer.insertBefore(photo, photoTemplate);
        close = document.querySelectorAll('.addedPhotoClose');
        addedPhoto = document.querySelectorAll('.addedPhoto');
        photoContainer.addEventListener('click', function (evt) {
          var target = evt.target;
          [].forEach.call(close, function (item, i) {
            if (target === close[i]) {
              addedPhoto[i].remove(addedPhoto[i]);
            }
          });
        });
      });
      reader.readAsDataURL(file);
    }
  };

  form.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target === fileChooserPhoto) {
      createPreview();
    } else if (target === fileChooserAvatar) {
      createAvatar();
    }
  });

  window.photoupload = {
    clearAvatar: clearAvatar,
    clearPhotos: clearPhotos,
    createAvatar: createAvatar,
    createPreview: createPreview
  };
})();
