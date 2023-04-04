import {openModal, closeModal, isEscapeKey} from './util.js';
import {pristine, validateForm} from './validetion.js';
import {controlScaleButtonHandler, getScaleDecrease, getScaleIncrease,
  scaleControlBiggerElement, scaleControlSmallerElement, resetScaleSettings} from './imageScale.js';
import {enableEffectPreview, disableEffectPreview, resetEffect} from './addEffect.js';
import {sendData} from './api.js';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const closeButton = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionInput = imgUploadForm.querySelector('.text__description');
const uploadFormSubmitButtonElement = imgUploadForm.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('section');
const errorTemplate = document.querySelector('#error').content.querySelector('section');

const propagationStopper = (evt) => evt.stopPropagation();

const closeOverlay = () => {
  closeModal(imgUploadOverlay, body);
  closeButton.removeEventListener('click', closeButtonListener);
  document.removeEventListener('keydown', escListener);
  textHashtagsInput.removeEventListener('keydown', propagationStopper);
  textDescriptionInput.removeEventListener('keydown', propagationStopper);
  resetScaleSettings();
  disableEffectPreview();
};

const renderImageEditor = () => {
  openModal(imgUploadOverlay, body);
  textHashtagsInput.addEventListener('keydown', propagationStopper);
  textHashtagsInput.addEventListener('input', validateForm);
  textDescriptionInput.addEventListener('keydown', propagationStopper);
  closeButton.addEventListener('click', closeButtonListener);
  document.addEventListener('keydown', escListener);
  controlScaleButtonHandler(scaleControlSmallerElement, getScaleDecrease);
  controlScaleButtonHandler(scaleControlBiggerElement, getScaleIncrease);
  enableEffectPreview();
};

function closeButtonListener() {
  closeOverlay();
  resetEffect();
}

function escListener(evt) {
  if (isEscapeKey(evt)) {
    closeOverlay();
    resetEffect();
  }
}

const blockSubmitButton = () => {
  uploadFormSubmitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  uploadFormSubmitButtonElement.disabled = false;
};

const openOrCloseMessage = (message) => {
  body.appendChild(message);
  document.addEventListener('keydown', closeByEsc);
  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', closeByEsc);
  };
  message.addEventListener('click', (evt) => {
    if (evt.target.tagName !== 'DIV' && evt.target.tagName !== 'H2'){
      closeMessage();
    }
  });
  function closeByEsc(evt) {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }
};

const showErrorMessageModal = () => {
  const message = errorTemplate.cloneNode(true);
  openOrCloseMessage(message);
};

const showSuccessMessageModal = () => {
  const message = successTemplate.cloneNode(true);
  openOrCloseMessage(message);
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData (
      () => {
        unblockSubmitButton();
        closeOverlay();
        showSuccessMessageModal();
        resetEffect();
      },
      () => {
        showErrorMessageModal();
        closeOverlay();
        unblockSubmitButton();
        uploadFile.value = '';
      },
      new FormData(imgUploadForm)
    );
  }
});

uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  renderImageEditor();
});