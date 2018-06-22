import * as constants from './constants.js';
import { loadImage } from './draw.js';

export class Menu {
  constructor() {
    this.buttons = new Map([
      ['hive', new MenuButton('/img/hive.png', 0, constants.BOARD_HEIGHT - constants.BUTTON_WIDTH)],
      ['bee', new MenuButton('/img/bee.png', constants.BUTTON_WIDTH + constants.MENU_PADDING, constants.BOARD_HEIGHT - constants.BUTTON_WIDTH)]
    ]);
  }
  // draw(context) {
  //   loadImage(this.url).then(image => {
  //     context.drawImage(image, 20, 20);
  //  });
  load() {
    let values = Array.from(this.buttons.values());
    return Promise.all(
      values.map(button => button.load()))
        .then(images => {
          values.map((button, i) => button.img = images[i]);
        });
  }
  draw(context) {
    this.buttons.forEach(button => button.draw(context));
  }
}



class MenuButton {
  constructor(url, x = 0,y = 0,
    width = constants.BUTTON_WIDTH,
    height = constants.BUTTON_WIDTH) {

    this.url = url;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = null;
  }
  draw(context) {
    if (this.img) {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      console.log("error: image not set");
    }
  }
  load() {
    return loadImage(this.url);
  }
}