'use strict';

(function () {

  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SERVER_TIME = 10000;
  var STATUS_OK = 200;
  var submitForm = document.querySelector('.ad-form');
  var success = document.querySelector('.success');
  var error = document.querySelector('.error');

  // success/error handling function ------------------------------------------

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIME;

    return xhr;
  };

  // data load from server ----------------------------------------------------

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  // data upload to server ----------------------------------------------------

  var upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

  // data load success and error handling -------------------------------------

  var onLoadSuccessHandle = function (data) {
    window.constant.adCards = data;
    data.forEach(function (item, index) {
      item.id = index;
      window.constant.pinsArray.push(item);
    });
  };

  var onLoadErrorHandle = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; background-color: rgba(255, 255, 255, 0.8); color: red; line-height: 50px; padding: 0 25px; border-radius: 10px; border: 1px solid black; cursor: pointer;';
    node.style.position = 'absolute';
    node.style.right = '5px';
    node.style.top = '5px';
    node.style.fontSize = '16px';
    node.classList.add('errorDialog');
    node.textContent = errorMessage;
    window.constant.map.insertAdjacentElement('afterbegin', node);

    var nodeIn = document.createElement('div');
    nodeIn.style = 'z-index: 101; color: black; cursor: pointer;';
    nodeIn.style.position = 'absolute';
    nodeIn.style.right = '10px';
    nodeIn.style.top = '10px';
    nodeIn.style.fontSize = '12px';
    nodeIn.classList.add('closeErrorDialog');
    nodeIn.textContent = 'x';
    window.constant.map.insertAdjacentElement('afterbegin', nodeIn);
  };

  window.backend.load(onLoadSuccessHandle, onLoadErrorHandle);

  // form data upload success and error handling ------------------------------

  var showSuccess = function () {
    success.classList.remove('hidden');
  };

  var hideSuccess = function () {
    setTimeout(function () {
      success.classList.add('hidden');
    }, 3000);
  };

  var showError = function () {
    error.classList.remove('hidden');
  };

  var hideError = function () {
    setTimeout(function () {
      error.classList.add('hidden');
    }, 3000);
  };

  var onSubmitSuccessHandle = function () {
    showSuccess();
    window.map.deactivateMap();
    hideSuccess();
  };

  var onSubmitErrorHandle = function () {
    showError();
    hideError();
  };

  submitForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(submitForm), onSubmitSuccessHandle, onSubmitErrorHandle);
    evt.preventDefault();
  });

  // error small dialog close -------------------------------------------------

  document.addEventListener('click', function (evt) {
    var target = evt.target;
    var div = document.querySelector('.closeErrorDialog');
    var divNested = document.querySelector('.errorDialog');
    if (target.className === 'errorDialog' || target.className === 'closeErrorDialog') {
      window.constant.map.removeChild(div);
      window.constant.map.removeChild(divNested);
    }
  });

})();


