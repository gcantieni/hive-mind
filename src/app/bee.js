import * as constants from './constants.js';
import { Clickable } from './clickable.js';
import { ClickableSprite } from './clickable-sprite.js';
import { Vec } from './math.js';

export class Bee extends ClickableSprite {
  constructor(x, y, clickablesMap) {
    super('/img/bee-sprite.png',
      x,
      y,
      constants.BEE_WIDTH,
      constants.BEE_WIDTH,
      clickablesMap);

    this.target = null;
    this.type = 'bee';
    this.cost = constants.BEE_COST;
  }
  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
  handleClick(listener) {
    listener.selectedBees.push(this);
  }
  harvestHoney(flower) {
    /*
      TODO: go between home hive and 
    */
  }
  update() {
    if (!this.target) return;

    let toTarget = new Vec(
      this.target.x - this.x,
      this.target.y - this.y
    );
    let distance = Math.sqrt(
      toTarget.x * toTarget.x + toTarget.y * toTarget.y);
    let direction = new Vec(
      toTarget.x / distance,
      toTarget.y / distance
    );
    this.x += direction.x * constants.BEE_SPEED;
    this.y += direction.y * constants.BEE_SPEED;
  }
}