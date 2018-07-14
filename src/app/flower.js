import * as constants from './constants.js';
// import { Organizer } from './organizer.js';
import { Clickable } from './clickable.js';

export class Flower extends Clickable {
  constructor(x, y, clickablesMap) {
    super(x, y, constants.FLOWER_WIDTH, constants.FLOWER_WIDTH, constants.FLOWER_COLOR, clickablesMap);
    this.canBeTarget = true;
  }
}