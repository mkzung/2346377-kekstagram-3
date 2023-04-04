const INITIAL_EFFECT = 'none';

const imgUploadForm = document.querySelector('.img-upload__form');
const picture = imgUploadForm.querySelector('.img-upload__preview img');
const effectsList = imgUploadForm.querySelector('.effects__list');
const buttons = effectsList.querySelectorAll('.effects__radio');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');

const PICTURES_EFFECTS = {
  chrome: {
    filter: 'grayscale',
    range: {min: 0, max: 1.0},
    step: 0.1,
    measurementUnit: ''},
  sepia: {
    filter: 'sepia',
    range: {min: 0, max: 1.0},
    step: 0.1,
    measurementUnit: ''},
  marvin: {
    filter: 'invert',
    range: {min: 0, max: 100},
    step: 1,
    measurementUnit: '%'},
  phobos: {
    filter: 'blur',
    range: {min: 0, max: 3.0},
    step: 0.1,
    measurementUnit: 'px'},
  heat: {
    filter: 'brightness',
    range: {min: 1, max: 3.0},
    step: 0.1,
    measurementUnit: ''}
};

let currentEffect = INITIAL_EFFECT;

const createEffectSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1.0,
    },
    start: 1.0,
    step: 0.1,
    connect: 'lower',
  });
};

const sliderConnector = () => {
  if (currentEffect !== 'none') {
    const effect = PICTURES_EFFECTS[currentEffect];
    picture.style.filter = `${effect.filter}(${effectLevelSlider.noUiSlider.get()}${effect.measurementUnit})`;
    effectLevelValue.value = `${effectLevelSlider.noUiSlider.get()}${effect.measurementUnit}`;
  } else {
    picture.style.filter = '';
  }
};

const changeEffect = (effect) => {
  if ((currentEffect === 'none') !== (effectLevelSlider.classList.contains('hidden'))){
    effectLevelSlider.classList.toggle('hidden');
  }
  if (currentEffect !== 'none') {
    const effectObj = PICTURES_EFFECTS[effect];
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: effectObj.range.min,
        max: effectObj.range.max,
      },
      start: effectObj.range.max,
      step: effectObj.step
    });
  }
  else {
    picture.style.filter = '';
  }
};

const effectRadiosListener = () => {
  picture.classList.remove(`effects__preview--${currentEffect}`);
  buttons.forEach((button) => {
    if (button.checked) {
      currentEffect = button.value;
      changeEffect(currentEffect);
    }
  });
  picture.classList.add(`effects__preview--${currentEffect}`);
};

export const enableEffectPreview = () => {
  effectsList.addEventListener('click', effectRadiosListener);
  createEffectSlider();
  changeEffect(currentEffect);
  effectLevelSlider.noUiSlider.set(parseFloat(effectLevelValue.value));
  effectLevelSlider.noUiSlider.on('update', sliderConnector);
  if (currentEffect === 'none') {
    effectLevelSlider.classList.add('hidden');
  }
};

export const disableEffectPreview = () => {
  picture.classList.remove(`effects__preview--${currentEffect}`);
  effectsList.removeEventListener('click', effectRadiosListener);
  effectLevelSlider.noUiSlider.destroy();
};

export const resetEffect = () => {
  currentEffect = INITIAL_EFFECT;
  imgUploadForm.reset();
};