import * as constants from './constants.js';
import { Organizer } from './organizer.js';

export class BeeOrganizer extends Organizer {
  constructor() {
    super();
    this.elements = [];
  }

  add(x, y) {
    let newBee = new Bee(x, y);
    this.elements.push(newBee);
    return newBee;
  }

  draw(context) {
    context.fillStyle = constants.BEE_COLOR;
    this.elements.map(bee =>
      context.fillRect(bee.x, bee.y,
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