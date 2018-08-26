import { compose, curry, flatten, map, composeAsync } from '../util/functional.js';
import { getPos } from './world-map.js';

export const TILE_WIDTH = 20;
export const TILE_HEIGHT = 20;

export function getUrl(type) {
  switch (type) {
    case 'bee':
      return '/img/bee-sprite.png';
    default:
      throw Error('Invalid type');
  }
}

export async function drawWorld(world, width, context) {
  var idxToPos = curry(getPos)(width);
  var world = await loadWorld(world);
  world.forEach((img, idx) => {
    let pos = idxToPos(idx);
    drawImage(img, pos.x * TILE_WIDTH, pos.y * TILE_HEIGHT, context);
  });
}

export function loadWorld(worldMap) {
  var images = map(compose(loadImage, getUrl), worldMap);
  return Promise.all(images);
}

export function loadImage(imageUrl) {
  return new Promise(resolve => {
    var image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = imageUrl;
  });
}

export function drawImage(img, x, y, context) {
  context.drawImage(img, x, y, TILE_WIDTH, TILE_HEIGHT);
}
