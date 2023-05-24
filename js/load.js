export function getData (onSuccess, onFail) {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail('При загрузке данных с сервера произошла ошибка' );
    });
}

export function sendData (onSuccess, onFail, body) {
  fetch(
    'https://27.javascript.pages.academy/kekstagram-simple',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  }).catch(() => {
    onFail();
  });
}

