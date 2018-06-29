import { Clickable } from './clickable.js';
import { loadImage } from './draw.js';
export class ClickableSprite extends Clickable {
  constructor(url, x, y, width, height, clickablesMap) {
    super(x, y, width, height, null, clickablesMap);
    this.url = url;
    this.img = null;
  }
  async draw(context, clickContext) {
    if (this.img) {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
      super.drawClickable(clickContext);
    } else {
      this.img = await loadImage(this.url);
      this.draw(context, clickContext);
    }
  }
}