import * as constants from './constants.js';
import { Clickable } from './clickable.js';

export class Hive extends Clickable {
  constructor(x, y, clickableMap) {
    super(x, y, constants.HIVE_WIDTH, constants.HIVE_WIDTH, constants.HIVE_COLOR, clickableMap);
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}