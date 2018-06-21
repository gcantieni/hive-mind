import * as constants from './constants.js';
import { Organizer } from './organizer.js';

export class FlowerOrganizer extends Organizer {
  constructor(context) {
    super(context);
    this.flowers = [];
    this.width = constants.FLOWER_WIDTH;
  }

  draw() {
    this.context.fillStyle = 'red';
    this.flowers.map((flower) => {
      this.context.fillRect(flower.x, flower.y, constants.FLOWER_WIDTH,constants.FLOWER_WIDTH);
    });
  }

  add(x, y, color) {
    let newFlower = new Flower(x, y, color);
    this.flowers.push(newFlower);
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