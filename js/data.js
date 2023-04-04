import {getRandomInt} from './util.js';

export function generateContent(size) {
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
