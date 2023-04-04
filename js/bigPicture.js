import {closeModal, isEscapeKey, openModal} from './util.js';

const COMMENTS_NUMBER_LOAD = 5;

const bigPicture = document.querySelector('.big-picture');
const fullSizePictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('span.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const photoDescription = bigPicture.querySelector('.social__caption');
const socialCommentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bodyContainer = document.querySelector('body');

let shownCommentsCounter = 0;
let actualComments = [];


const closeBigPicture = () => {
  shownCommentsCounter = 0;
  closeModal(bigPicture, bodyContainer);
};

const getClosedByEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    shownCommentsCounter = 0;
    closeBigPicture();
  }
};

const removeCommentsLoader = () => {
  commentsLoader.classList.add('hidden');
};

const removeDefaultSocialComments = () => {
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.lastChild);
  }
};

const makeElementTemplate = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const createSocialCommentsTemplate = (data) => {
  const AVATAR_WIDTH = '35';
  const AVATAR_HEIGHT = '35';
  const socialComment = makeElementTemplate('li', 'social__comment');
  const avatarImage = makeElementTemplate('img', 'social__picture');
  avatarImage.src = data.avatar;
  avatarImage.alt = data.name;
  avatarImage.width = AVATAR_WIDTH;
  avatarImage.height = AVATAR_HEIGHT;
  socialComment.append(avatarImage);
  const paragraphElement = makeElementTemplate('p', 'social__text');
  paragraphElement.textContent = data.message;
  socialComment.appendChild(paragraphElement);
  return socialComment;
};

const getCommentsNumber = (count, totalComments) => {
  let commentsDeclination;
  if (totalComments % 10 === 1 && totalComments % 100 !== 11) {
    commentsDeclination = 'комментария';
  } else {
    commentsDeclination = 'комментариев';
  }
  socialCommentsCounter.innerHTML = `${count} из <span class="comments-count">${totalComments}</span> ${commentsDeclination}`;
};

const getComment = () => {
  const commentFragment = document.createDocumentFragment();
  const currentComments = actualComments.splice(0, COMMENTS_NUMBER_LOAD);
  shownCommentsCounter += currentComments.length;

  currentComments.forEach((comment) => commentFragment.append(createSocialCommentsTemplate(comment)));
  if (actualComments.length < 1) {
    removeCommentsLoader();
  }
  getCommentsNumber(shownCommentsCounter, commentsCount.textContent);
  socialComments.append(commentFragment);
};

export const getBigPicture = (picture) => {
  openModal(bigPicture, bodyContainer);
  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', getComment);
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', getClosedByEscape);
  removeDefaultSocialComments();
  photoDescription.textContent = picture.description;
  fullSizePictureImage.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = String(picture.comments.length);
  actualComments = picture.comments.slice();
  getComment(actualComments);
};