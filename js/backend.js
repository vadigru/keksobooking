'use strict';

(function () {
  var uploadURL = 'https://js.dump.academy/keksobooking';
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var serverTime = 10000;
  var statusOk = 200;

  // success/error handling function ------------------------------------------

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusOk) {
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

    xhr.timeout = serverTime;

    return xhr;
  };

  // data load from server ----------------------------------------------------

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', loadURL);
    xhr.send();
  };

  // data upload to server ----------------------------------------------------

  var upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', uploadURL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
