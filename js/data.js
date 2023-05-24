const chrome = {
  name: 'chrome',
  filter: 'grayscale',
  min: 0,
  max: 1,
  step: 0.1,
  start: 1,
};

const sepia = {
  name: 'sepia',
  filter: 'sepia',
  min: 0,
  max: 1,
  step: 0.1,
  start: 1,
};

const marvin = {
  name: 'marvin',
  filter: 'invert',
  min: 0,
  max: 100,
  step: 1,
  start: 100,
  symbol: '%',
};

const phobos = {
  name: 'phobos',
  filter: 'blur',
  min: 0,
  max: 3,
  step: 0.1,
  start: 3,
  symbol: 'px',
};

const heat = {
  name: 'heat',
  filter: 'brightness',
  min: 1,
  max: 3,
  step: 0.1,
  start: 3,
};

export const settings = [chrome, sepia, marvin, phobos, heat];
