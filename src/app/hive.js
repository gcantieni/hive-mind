import * as constants from './constants.js';

export function drawHives(context, hive) {
  context.fillStyle = '#DAA520';
  context.fillRect(
    hive.pos.x,
    hive.pos.y,
    constants.HIVE_WIDTH,
    constants.HIVE_WIDTH);
}