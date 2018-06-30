import * as constants from './constants.js';
import { ClickableSprite } from './clickable-sprite.js';
import { Vec } from './math.js';

export class Hive extends ClickableSprite {
  constructor(x, y, clickableMap) {
    super('/img/hive-sprite.png',
      x,
      y,
      constants.HIVE_WIDTH,
      constants.HIVE_WIDTH,
      clickableMap);

    this.canBeTarget = true;

    this.center = new Vec(
      this.x + constants.HIVE_WIDTH / 2 - 13,
      this.y + constants.HIVE_WIDTH * (4/5) - 6);

  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}