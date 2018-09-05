import { drawWorldImages, loadWorldImages } from './world/world-view.js';
import { getPos } from './world/world-map.js';
import { worldData } from './world/world-data.js';
import { curry } from './util/functional.js';

(async function main() {
  const BOARD_WIDTH = 300;
  const BOARD_HEIGHT = 300;

  const canvas = document.getElementById('board');
  canvas.width = BOARD_WIDTH;
  canvas.height = BOARD_HEIGHT;

  const context = canvas.getContext('2d');
  var world = worldData;
  var camera = {
    x: 0,
    y: 0
  };

  var images = await loadWorldImages(world.map);
  // images = images.slice(camera.x, camera.x + BOARD_WIDTH);
  // console.log(images);
  // images.forEach((img, idx, arr) => arr[idx] = img.slice(camera.y, camera.y + BOARD_HEIGHT));
  
  drawWorldImages(images, world.width, context);

  // let start = null;
  // update(0);

  // function updateView(time = 0) {
  //   let progress = time - start;
  //   if (!start) start = time;
  //   drawWorld(testWorld, width, context);
  //   window.requestAnimationFrame(update)
  // }
})()