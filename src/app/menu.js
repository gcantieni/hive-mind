import * as constants from './constants.js';
import {
  MenuButton
} from './menu-button.js';
import {
  ResourceList
} from './resource-list.js';

export class Menu {
  constructor(clickables) {
    this.buttons = new Map([
      ['hive', new MenuButton(
        'hive',
        '/img/hive.png',
        0,
        constants.BOARD_HEIGHT - constants.BUTTON_WIDTH,
        clickables)],
      ['bee', new MenuButton(
        'bee',
        '/img/bee.png',
        constants.BUTTON_WIDTH + constants.MENU_PADDING,
        constants.BOARD_HEIGHT - constants.BUTTON_WIDTH,
        clickables)]
    ]);
    this.resources = new ResourceList(5000, 5000, 5000, 5000);
  }
  load() {
    let values = Array.from(this.buttons.values());
    return Promise.all(
        values.map(button => button.load()))
      .then(images => {
        values.map((button, i) => button.img = images[i]);
        return images;
      });
  }
  draw(context, clickContext) {
    this.buttons.forEach(button => button.draw(context, clickContext));
    drawResources(context, this.resources);
  }
}

function drawResources(context, resourceList) {
  let y = constants.BOARD_HEIGHT - resourceList.values.size * constants.RESOURCE_SPACING;

  context.textBaseline = 'top';
  context.fillStyle = '#000';
  context.font = 'bold 14px Courier';

  resourceList.values.forEach((value, key) => {
    context.fillText(`${key}: ${value}`, constants.RESOURCE_X, y);
    y += constants.RESOURCE_SPACING;
  });
}