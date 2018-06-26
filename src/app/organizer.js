import { Hive } from './hive.js';
import { Flower } from './flower.js';
import { Bee } from './bee.js';

export class Organizer {
  constructor(type, clickablesMap) {
    this.elements = [];
    this.clickables = clickablesMap;
    if (type !== 'hive' && type !== 'flower' && type !== 'bee') {
      throw `Error, ${type} organizers are not supported`;
    }
    this.type = type;
  }

  add(x, y) {
    switch (this.type) {
      case 'hive':
        this.elements.push(new Hive(x, y, this.clickables));
        break;
      case 'flower':
        this.elements.push(new Flower(x, y, this.clickables));
        break;
      case 'bee':
        this.elements.push(new Bee(x, y, this.clickables));
        break;
      default:

    }
  }
  draw(context, clickContext) {
    this.elements.forEach(el => {
      el.draw(context, clickContext);
    });
  }
  remove(oldElement) {
    var index = this.elements.indexOf(oldElement);
    if (index > -1) {
      this.elements.splice(index, 1);
      return oldElement;
    }
    return null;
  }

}