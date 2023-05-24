/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { getData } from './load.js';
import { renderPhotos } from './render.js';
import { showAlert } from './util.js';
import './validate.js';

getData(renderPhotos, showAlert);
