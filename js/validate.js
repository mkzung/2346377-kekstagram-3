import {sendData} from './load.js';
import {closeOverlay} from './form.js';
import {createSystemMessage} from './util.js';

const submitButton = document.querySelector('#upload-submit');
const form = document.querySelector('#upload-select-image');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    submitButton.disabled = true;
    sendData(
      () => {
        closeOverlay(false);
        createSystemMessage('success');
        submitButton.disabled = false;
      },
      () => {
        closeOverlay(true);
        createSystemMessage('error');
        submitButton.disabled = false;
      },
      new FormData(evt.target),
    );
  }
});
