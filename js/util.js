export function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

export function checkCommentLength(string, requiredLength) {
  if(string.length <= requiredLength) {
    return true;
  } else {
    return false;
  }
}
