import {getBigPicture} from './bigPicture.js';


const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


function drawThumbnails(photos) {
  photos.forEach((pic) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = pic.url;
    newPicture.querySelector('.picture__likes').textContent = pic.likes;
    newPicture.querySelector('.picture__comments').textContent = pic.comments.length;

    newPicture.addEventListener('click', () => {
      getBigPicture(pic);
    });
    pictureContainer.append(newPicture);
  });
}

export {drawThumbnails};