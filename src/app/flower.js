import * as constants from './constants.js';
import { Organizer } from './organizer.js';

export class FlowerOrganizer extends Organizer {
  constructor() {
    super();
    this.elements = [];
    this.width = constants.FLOWER_WIDTH;
  }

  draw(context) {
    context.fillStyle = constants.FLOWER_COLOR;
    this.elements.map((flower) => {
      // this.context.fillStyle = flower.color;
      context.fillRect(flower.x - constants.FLOWER_WIDTH / 2,
        flower.y- constants.FLOWER_WIDTH / 2,
        constants.FLOWER_WIDTH,
        constants.FLOWER_WIDTH);
    });
  }

  add(x, y, color) {
    let newFlower = new Flower(x, y, color);
    this.elements.push(newFlower);
    return newFlower;
  }
}

export class Flower {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = constants.FLOWER_WIDTH;
    this.color = color;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}