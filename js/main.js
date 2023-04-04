import './drawThumbnails.js';
import './bigPicture.js';
import './validetion.js';
import './loaderForm.js';
import './addEffect.js';
import {drawThumbnails} from './drawThumbnails.js';
import {showAlert} from './util.js';
import {getData} from './api.js';


getData(drawThumbnails,showAlert);