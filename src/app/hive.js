import * as constants from './constants.js';
// import { Organizer } from './organizer.js';
import { Clickable } from './clickable.js';


// export class HiveOrganizer extends Organizer {
//   constructor() {
//     super();
//     this.elements = [];
//   }
//
//   add(x, y) {
//     let newHive = new Hive(x, y);
//     this.elements.push(newHive);
//     return newHive;
//   }
//
//   remove(oldHive) {
//     var index = this.elements.indexOf(oldHive);
//     if (index > -1) {
//       this.elements.splice(index, 1);
//     }
//   }
//
//   draw(context) {
//     context.fillStyle = constants.HIVE_COLOR;
//     this.elements.map((hive) => {
//       context.fillRect(
//         hive.x - constants.HIVE_WIDTH / 2,
//         hive.y - constants.HIVE_WIDTH / 2,
//         hive.width,
//         hive.width);
//     });
//   }
// }

export class Hive extends Clickable {
  constructor(x, y, clickableMap) {
    super(x, y, constants.HIVE_WIDTH, constants.HIVE_WIDTH, constants.HIVE_COLOR, clickableMap);
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}