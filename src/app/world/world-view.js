import { compose, curry, map } from '../util/functional.js';
import { getPos, shouldDraw, idxToCoord, worldToScreen } from './world-map.js';

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

export function drawWorldImages(worldImages, width, context) {
  worldImages.forEach((img, idx) => {
    var pos = getPos(width, idx);
    drawImage(img, pos.x * TILE_WIDTH, pos.y * TILE_HEIGHT, context);
  });
}

export function loadWorldImages(worldMap) {
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

export function drawVisibleWorld(camera, context, world) {
  var pos = curry(idxToCoord)(world.cols);
  var shouldDrawIdx = compose(pos, curry(shouldDraw)(camera))
  var imagesToDraw = world.map
    .filter((img, idx) => shouldDrawIdx(idx))
    .forEach((img, idx) =>  drawImage(img, pos(idx).x, pos(idx).y, context));
}
