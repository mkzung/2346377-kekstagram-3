const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const scaleValue = scaleInput.value;

let scale = scaleValue.substring(0, scaleValue.length - 1);

export const img = document.querySelector('.img-upload__preview').querySelector('img');
const scaleDefault = 100;

export function resetScale() {
  scaleInput.value = `${scaleDefault  }%`;
  img.style.transform = `scale(${scaleDefault / 100})`;
  scale = scaleDefault;
}

buttonSmaller.addEventListener('click', () => {
  if (scale > 25) {
    scale -= 25;
    scaleInput.value = `${scale}%`;
    img.style.transform = `scale(${scale / 100})`;
  }
});

buttonBigger.addEventListener('click', () => {
  if (scale < 100) {
    scale += 25;
    scaleInput.value = `${scale}%`;
    img.style.transform = `scale(${scale / 100})`;
  }
});
