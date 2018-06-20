import * as constants from './constants.js';

export class BeeOrganizer {
  constructor(context) {
    this.bees = []
    this.context = context;
    this.addBee(100, 100);
  }

  addBee(x, y) {
    this.bees.push(new Bee(x, y));
  }

  drawBees() {
    this.context.fillStyle = 'yellow';
    this.bees.map((bee) => {
      this.context.fillRect(bee.x, bee.y,
        constants.BEE_WIDTH, constants.BEE_WIDTH);
    });
  }
}

class Bee {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}