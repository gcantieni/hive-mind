import * as constants from './constants.js';

export class FlowerOrganizer {
  constructor(context) {
    this.flowers = [];
    this.context = context;
  }

  drawFlowers(context) {
    this.context.fillStyle = 'red';
    this.flowers.map((flower) => {
      this.context.fillRect(flower.x, flower.y, constants.FLOWER_WIDTH,constants.FLOWER_WIDTH);
    });
  }

  addFlower(x, y, color) {
    this.flowers.push(new Flower(x, y, color));
  }
}

export class Flower {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}