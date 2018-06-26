import * as constants from './constants.js';
import { loadImage } from './draw.js';
import { Clickable } from './clickable.js';

export class Menu {
  constructor(clickables) {
    this.buttons = new Map([
      ['hive', new MenuButton(
          '/img/hive.png',
          0,
          constants.BOARD_HEIGHT - constants.BUTTON_WIDTH,
          clickables)],
      ['bee', new MenuButton(
          '/img/bee.png',
          constants.BUTTON_WIDTH + constants.MENU_PADDING,
          constants.BOARD_HEIGHT - constants.BUTTON_WIDTH,
          clickables)]
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
  draw(context, clickContext) {
    this.buttons.forEach(button => button.draw(context, clickContext));
  }
}



class MenuButton extends Clickable {
  constructor(url, x, y, clickablesMap) {
    super(x, y, constants.BUTTON_WIDTH, constants.BUTTON_WIDTH, null, clickablesMap);
    this.url = url;
    this.img = null;
  }
  draw(context, clickContext) {
    if (this.img) {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
      super.drawClickable(clickContext);
    } else {
      console.log("error: image not set");
    }
  }
  load() {
    return loadImage(this.url);
  }
}