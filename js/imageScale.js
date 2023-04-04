const imgUploadScaleElement = document.querySelector('.img-upload__scale');
export const scaleControlSmallerElement = imgUploadScaleElement.querySelector('.scale__control--smaller');
export const scaleControlBiggerElement = imgUploadScaleElement.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadScaleElement.querySelector('.scale__control--value');
export const imgUploadPreview = document.querySelector('.img-upload__preview');

const STEP_COUNTER = 0.25;
const MAXIMUM_SCALE_VALUE = 1;
let defaultScaleNumber = 1;

export const resetScaleSettings = () => {
  defaultScaleNumber = 1;
  imgUploadPreview.style.transform = 'scale(1.00)';
};

export const controlScaleButtonHandler = (element, button) => {
  scaleControlValue.value = `${Math.round(defaultScaleNumber * 100)}%`;
  element.addEventListener('click', button);
};

const changeDefaultScaleValue = (defaultNum) => {
  scaleControlValue.value = `${Math.round(defaultNum * 100)}%`;
  imgUploadPreview.style.transform = `scale(${defaultNum})`;
  scaleControlValue.readonly = scaleControlValue.value;
};

export const getScaleDecrease = () => {
  if (defaultScaleNumber !== STEP_COUNTER) {
    defaultScaleNumber -= STEP_COUNTER;
    changeDefaultScaleValue(defaultScaleNumber);
  }
};

export const getScaleIncrease = () => {
  if (defaultScaleNumber !== MAXIMUM_SCALE_VALUE) {
    defaultScaleNumber += STEP_COUNTER;
    changeDefaultScaleValue(defaultScaleNumber);
  }
};