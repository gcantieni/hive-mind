import * as constants from './constants.js';
import { Organizer } from './organizer.js';

export class BeeOrganizer extends Organizer {
  constructor(context) {
    super(context);
    this.bees = []
    this.context = context;
    // this.canvas = canvas;
  }

  add(x, y) {
    let newBee = new Bee(x, y);
    this.bees.push(newBee);
    return newBee;
  }

  draw() {
    this.context.fillStyle = 'yellow';
    this.bees.map(bee =>
      this.context.fillRect(bee.x, bee.y,
        constants.BEE_WIDTH, constants.BEE_WIDTH));
  }
}

class Bee {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = constants.BEE_WIDTH;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}