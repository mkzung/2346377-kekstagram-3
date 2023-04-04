// кнопки изменения масштаба
const scalePlus = document.querySelector('.scale__control--bigger');
const scaleMinus = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

// радиокнопки выбора эффекта
const radios = document.querySelector('.img-upload__effects').querySelectorAll('input[name="effect"]');
let chousedEffect = document.querySelector('.img-upload__effects').querySelectorAll('input[name="effect"]:checked');

// слайдер
const sliderElement = document.querySelector('.img-upload__effect-level').querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');


sliderElement.setAttribute('disabled', true); // скрытие слайдера
sliderValue.value = 100;

// создание слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

// проверка измениния значения слайдера
sliderElement.noUiSlider.on('update', () => {
  sliderValue.value = sliderElement.noUiSlider.get();
  currentValuetEffect(chousedEffect.value, sliderValue.value);
});

// уменьшение масштаба
scaleMinus.addEventListener('click', () => {
  const intScale = parseInt(scaleValue.value, 10);
  if (intScale > 25) {
    scaleValue.value = `${intScale - 25}%`;
    imgUploadPreview.style = `transform: scale(${parseInt(scaleValue.value, 10) / 100})`;
  }
});

// увеличение масштаба
scalePlus.addEventListener('click', () => {
  const intScale = parseInt(scaleValue.value, 10);
  if (intScale < 100) {
    scaleValue.value = `${intScale + 25}%`;
    imgUploadPreview.style = `transform: scale(${parseInt(scaleValue.value, 10) / 100})`;
  }
});

// назначение обработчиков на все радио кнопки
radios.forEach((radio) => {
  radio.addEventListener('input', setСhousedEffect);
});

let oldEffect = 'effects__preview--none';

// yстановка нового эффекта и глубины обработки
function setСhousedEffect() {
  for (const radio of radios) {
    if (radio.checked) {
      chousedEffect = radio;
      imgUploadPreview.classList.remove(oldEffect);
      imgUploadPreview.classList.add(`effects__preview--${chousedEffect.value}`);
      oldEffect = `effects__preview--${chousedEffect.value}`;
      setScaleEffect(chousedEffect.value);
    }
  }
}

function setScaleEffect(nameEffect) {
  if (nameEffect === 'none') {
    sliderElement.setAttribute('disabled', true); // При выборе эффекта «Оригинал» слайдер скрывается
  }
  if (nameEffect === 'chrome') {
    sliderElement.removeAttribute('disabled');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0.1,
        max: 1
      },
      start: 1,
      step: 0.1
    });

  }
  if (nameEffect === 'sepia') {
    sliderElement.removeAttribute('disabled');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0.1,
        max: 1
      },
      start: 1,
      step: 0.1
    });
  }
  if (nameEffect === 'marvin') {
    sliderElement.removeAttribute('disabled');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    });
  }
  if (nameEffect === 'phobos') {
    sliderElement.removeAttribute('disabled');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });

  }
  if (nameEffect === 'heat') {
    sliderElement.removeAttribute('disabled');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  }
}


function currentValuetEffect(nameEffect, valueEffect) {
  if (nameEffect === 'none') {
    sliderElement.setAttribute('disabled', true); // При выборе эффекта «Оригинал» слайдер скрывается
  }
  if (nameEffect === 'chrome') {
    imgUploadPreview.style = `filter: grayscale(${valueEffect})`;
  }
  if (nameEffect === 'sepia') {
    imgUploadPreview.style = `filter: sepia(${valueEffect})`;
  }
  if (nameEffect === 'marvin') {
    imgUploadPreview.style = `filter: invert(${valueEffect})`;
  }
  if (nameEffect === 'phobos') {
    imgUploadPreview.style = `filter: blur(${valueEffect})`;
  }
  if (nameEffect === 'heat') {
    imgUploadPreview.style = `filter: brightness(${valueEffect})`;
  }
}
