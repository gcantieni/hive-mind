import * as constants from './constants.js';
import { Hive } from './hive.js';

export class HiveOrganizer {
  constructor(context) {
    this.hives = []
    this.context = context;
  }

  addHive(x, y) {
    this.hives.push(new Hive(x, y));
  }

  removeHive(oldHive) {
    var index = this.hives.indexOf(oldHive);
    if (index > -1) {
      this.hives.splice(index, 1);
    }
  }

  drawHives() {
    this.context.fillStyle = '#DAA520';
    this.hives.map((hive) => {
      this.context.fillRect(hive.x, hive.y,
        constants.HIVE_WIDTH, constants.HIVE_WIDTH);
    });
  }
}