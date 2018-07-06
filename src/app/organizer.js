import * as constants from './constants.js'
import { Hive } from './hive.js';
import { Flower } from './flower.js';
import { Bee } from './bee.js';
import { ClickableSprite } from './clickable-sprite.js';

export class Organizer {
  constructor(type, clickablesMap) {
    this.elements = [];
    this.clickables = clickablesMap;
    if (type !== 'hive' && type !== 'flower' && type !== 'bee') {
      throw `Error, ${type} organizers are not supported`;
    }
    this.type = type;
    switch (this.type) {
      case 'hive':
        this.cost = constants.HIVE_COST;
        break;
      case 'bee':
        this.cost = constants.BEE_COST;
        break;
      default:
        this.cost = null;
    }
  }

  add(x, y) {
    switch (this.type) {
      case 'hive':
        this.elements.push(
          new Hive(
            x - constants.HIVE_WIDTH / 2,
            y - constants.HIVE_WIDTH / 2,
            this.clickables));
        break;
      case 'flower':
        this.elements.push(new Flower(x - constants.FLOWER_WIDTH / 2, y - constants.FLOWER_WIDTH / 2, this.clickables));
        break;
      case 'bee':
        this.elements.push(
          new Bee(
            x - constants.BEE_WIDTH / 2,
            y - constants.BEE_WIDTH / 2,
            this.clickables));
        break;
      default:

    }
  }
  async loadSprites() {
    return new Promise.all(
      this.elements.map(sprite => loadImage(sprite)))
        .then(loadedSprites => {
          this.elements.forEach((sprite, i) => {
            //TODO check for valididty
            sprite.img = loadedSprites[i];
          });
        });
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
export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    // image.addEventListener('load', () => {
    //   resolve(image);
    // });
    image.onload = () => {
      resolve(image);
    }
    image.onerror = () => {
      resolve(image);
      console.log("error!");
    }
    image.src = url;
  });
}
