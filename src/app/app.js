import { drawWorld } from './world/world-view.js';
import { map } from './world/map.js';
import { TILE_WIDTH, TILE_HEIGHT } from './world/world-view.js';

(function main() {
  const canvas = document.getElementById('board');
  const context = canvas.getContext('2d');
  var testWorld = map;
  drawWorld(testWorld.map, testWorld.width, context);

  // let start = null;
  // update(0);

  // function updateView(time = 0) {
  //   let progress = time - start;
  //   if (!start) start = time;
  //   drawWorld(testWorld, width, context);
  //   window.requestAnimationFrame(update)
  // }
})()