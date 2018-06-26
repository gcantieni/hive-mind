import * as constants from './constants.js';
import { Organizer } from './organizer.js';
import { Clickable } from './clickable.js';

export class FlowerOrganizer {
  constructor(clickablesMap) {
    this.clickables = clickablesMap;
    this.elements = [];
    this.width = constants.FLOWER_WIDTH;
  }

  draw(context, clickableContext) {
    context.fillStyle = constants.FLOWER_COLOR;
    this.elements.map((flower) => {
      // this.context.fillStyle = flower.color;
      flower.draw(context);
      flower.drawClickable(clickableContext);
    });
  }

  add(x, y, color = constants.FLOWER_COLOR) {
    let newFlower = new Flower(x, y, color, this.clickables);
    this.elements.push(newFlower);
    return newFlower;
  }
}

export class Flower extends Clickable {
  constructor(x, y, color, clickablesMap) {
    super(clickablesMap);
    this.x = x;
    this.y = y;
    this.width = constants.FLOWER_WIDTH;
    this.height = constants.FLOWER_WIDTH;
    this.color = color;
    this.addClickable();
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(context) {
    context.fillRect(this.x - this.width / 2,
      this.y - this.height / 2,
      constants.FLOWER_WIDTH,
      constants.FLOWER_WIDTH);
  }
}