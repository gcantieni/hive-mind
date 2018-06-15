import * as constants from './constants.js';

export function drawFlowers(context, flowers) {
  let i = 0;
  for (i = 0; i < flowers.length; i++) {
    context.fillStyle = 'red';
    context.fillRect(
      flowers[i].pos.x,
      flowers[i].pos.x,
      constants.FLOWER_WIDTH,
      constants.FLOWER_WIDTH);
  }
}