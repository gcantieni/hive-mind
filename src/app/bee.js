import * as constants from './constants.js';
import { Clickable } from './clickable.js';
// import { Organizer } from './organizer.js';
// export class BeeOrganizer extends Organizer {
//   constructor() {
//     super();
//     this.elements = [];
//   }
//
//   add(x, y) {
//     let newBee = new Bee(x, y);
//     this.elements.push(newBee);
//     return newBee;
//   }
//
//   draw(context) {
//     context.fillStyle = constants.BEE_COLOR;
//     this.elements.map(bee =>
//       context.fillRect(bee.x, bee.y,
//         constants.BEE_WIDTH, constants.BEE_WIDTH));
//   }
// }

export class Bee extends Clickable {
  constructor(x, y, width = constants.BEE_WIDTH, height = constants.BEE_HEIGHT, clickablesMap) {
    super(x, y, width, height, clickablesMap);
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}