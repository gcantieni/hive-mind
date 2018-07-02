import * as constants from './constants.js';
import { loadImage } from './draw.js';
import { Clickable } from './clickable.js';

export class MenuButton extends Clickable {
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
    const oldType = listener.addType;
    if (listener.inAddMode === false || oldType === this.type || oldType == null) {
      listener.changeMode();
    }
    listener.setType(this.type);
  }
}
