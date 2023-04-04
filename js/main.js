function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

/*
function checkCommentLength(string, requiredLength) {
  if(string.length <= requiredLength) {
    return true;
  } else {
    return false;
  }
}
*/

const button = document.querySelector('.img-upload__label');
button.onclick = function() {
  getRandomInt(1, 100);
  checkCommentLength('sdgs', 3);
  generateContent(25);
};

function generateContent(size) {
  const content = [];
  for(let i = 0; i < size - 1; i++) {
    content[i] = generateObj(i + 1);
  }
  return content;
}

function generateObj(id) {
  const newObj = {
    id: id,
    url: `photos/${id}.jpg`,
    description: '',
    likes: getRandomInt(15, 200),
    comments: getRandomInt(0, 200)
  };
  return newObj;
}
