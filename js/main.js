import { generateContent } from './data.js';
import { drawPictures } from './draw.js';
import './form.js';
import './validate.js';
import './addEffect.js';


const content = generateContent(25);
drawPictures(content);
