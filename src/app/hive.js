import * as constants from './constants.js';
import { Organizer } from './organizer.js';


export class HiveOrganizer extends Organizer {
  constructor(context) {
    super(context);
    this.hives = []
  }

  add(x, y) {
    let newHive = new Hive(x, y);
    this.hives.push(newHive);
    return newHive;
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
      this.context.fillRect(hive.x - hive.width / 2,
        hive.y - hive.width / 2,
        hive.width,
        hive.width);
    });
  }
}

export class Hive {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = constants.HIVE_WIDTH;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}