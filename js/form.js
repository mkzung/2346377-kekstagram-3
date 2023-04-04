const uploadPicForm = document.querySelector('.img-upload__form');
const overlay = uploadPicForm.querySelector('.img-upload__overlay');

const closeOnButton = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeWindow();
  }
};

function openWindow() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeOnButton);
}

function closeWindow() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeOnButton);
  cleanForm();
}

uploadPicForm.addEventListener('change', (evt) => {
  evt.preventDefault();

  openWindow();
});

const closeButton = uploadPicForm.querySelector('#upload-cancel');

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  closeWindow();
});


function cleanForm() {
  document.querySelector('#upload-file').value = '';
  document.querySelector('.text__hashtags').value = '';
  document.querySelector('.text__description').value = '';
}
