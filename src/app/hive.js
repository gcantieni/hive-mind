import * as constants from './constants.js';
import { Organizer } from './organizer.js';


export class HiveOrganizer extends Organizer {
  constructor(context) {
    super(context);
    this.hives = []
  }

  add(x, y) {
    this.hives.push(new Hive(x, y));
  }

  remove(oldHive) {
    var index = this.hives.indexOf(oldHive);
    if (index > -1) {
      this.hives.splice(index, 1);
    }
  }

  draw() {
    this.context.fillStyle = '#DAA520';
    this.hives.map((hive) => {
      this.context.fillRect(hive.x, hive.y,
        constants.HIVE_WIDTH, constants.HIVE_WIDTH);
    });
  }
}

export class Hive {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}