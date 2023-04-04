const pictureTemplate = document.querySelector('#picture').content;
const pictureExp = pictureTemplate.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const createPicture = function (data) {
  const newPic = pictureExp.cloneNode(true);

  const newPicImg = newPic.querySelector('.picture__img');
  newPicImg.src = data.url;
  const newPicInfo = newPic.querySelector('.picture__info');
  const newPicComments = newPicInfo.querySelector('.picture__comments');
  newPicComments.textContent = data.comments;
  const newPicLikes = newPicInfo.querySelector('.picture__likes');
  newPicLikes.textContent = data.likes;

  return newPic;
};

export const drawPictures = function (data) {
  for (const elem in data) {
    const newPic = createPicture(elem);
    pictures.appendChild(newPic);
  }
};
