'use strict';

(function () {

  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SERVER_TIME = 10000;

  var Code = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  };

  // success/error handling function ------------------------------------------

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.OK) {
        onLoad(xhr.response);
      } else if (xhr.status === Code.BAD_REQUEST) {
        onError('Неправильный запрос: ' + xhr.status);
        window.util.setInputDisabled(window.constant.fieldsetMapFilter);
      } else if (xhr.status === Code.NOT_FOUND) {
        onError('Ничего не найдено: ' + xhr.status);
        window.util.setInputDisabled(window.constant.fieldsetMapFilter);
      } else if (xhr.status === Code.INTERNAL_SERVER_ERROR) {
        onError('Внутренняя ошибка сервера: ' + xhr.status);
        window.util.setInputDisabled(window.constant.fieldsetMapFilter);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
      window.util.setInputDisabled(window.constant.fieldsetMapFilter);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      window.util.setInputDisabled(window.constant.fieldsetMapFilter);
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

})();


