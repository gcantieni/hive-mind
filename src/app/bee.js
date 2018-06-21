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
    this.bees.push(new Bee(x, y));
  }

  draw() {
    this.context.fillStyle = 'yellow';
    this.bees.map(bee =>
      this.context.fillRect(bee.x, bee.y,
        constants.BEE_WIDTH, constants.BEE_WIDTH));
  }

  // listen() {
  //   this.canvas.addEventListener('mousedown', (evt) => {
  //     let pos = getMousePos(this.canvas, evt);
  //
  //     this.addBee(pos.x - constants.BEE_WIDTH / 2,
  //                   pos.y - constants.BEE_WIDTH / 2);
  //   });
  // }
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