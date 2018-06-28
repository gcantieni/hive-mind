import * as constants from './constants.js';
import { loadImage } from './draw.js';
import { Clickable } from './clickable.js';

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
    this.resources = {
      nectar : {
        name: 'Nectar',
        value: 0
      },
      honey : {
        name: 'Honey',
        value: 0
      },
      pollen: {
        name: 'Pollen',
        value: 0
      }
    };
    this.resources.honey.value += 1;
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
    drawResources(context, this.resources);
    // context.textBaseline = 'top';
    // context.font = 'bold 14px Courier';
    // context.fillText(`${this.resources.honey.name}: ${this.resources.honey.value}`, 607 , 425);
    // context.fillText(`Nectar: ${this.resources.nectar}`, 600 , 450);
    // context.fillText(`Pollen: ${this.resources.pollen}`, 600 , 475);
  }
}

function drawResources(context, resources) {
  let res;
  let names = Object.getOwnPropertyNames(resources);
  let numEntries = names.length;
  let y = constants.BOARD_HEIGHT - numEntries * constants.RESOURCE_SPACING;

  context.textBaseline = 'top';
  context.fillStyle = '#000';
  context.font = 'bold 14px Courier';

  names.forEach(name => {
    context.fillText(`${resources[name].name}: ${resources[name].value}`, 600, y);
    y += constants.RESOURCE_SPACING;
  });
}

class MenuButton extends Clickable {
  constructor(type, url, x, y, clickablesMap) {
    super(x, y, constants.BUTTON_WIDTH, constants.BUTTON_WIDTH, null, clickablesMap);
    this.type = type;
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
  handleClick(listener) {
    const oldType = listener.type;
    if (listener.addMode === false || oldType === this.type || oldType == null) {
      listener.changeMode();
    }
    listener.setType(this.type);
  }
}