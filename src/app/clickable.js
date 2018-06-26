// import { getMousePos } from './draw.js';
export class Clickable {
  constructor(clickablesMap) {
    //TODO check if a click was within the bounds of this element
    // this.left =
    // this.context = clickContext;
    this.clickables = clickablesMap;
    this.clickColor = null;

  }

  addClickable() {
    while(true) {
      const colorKey = this.getRandomColor();
      const hasKey = this.clickables.get(colorKey);

      if (hasKey) {
        continue;
      }

      this.clickables.set(colorKey, this);
      this.clickColor = colorKey;
      return;
    }
  }

  drawClickable(clickableContext) {
    clickableContext.fillStyle = this.clickColor;
    clickableContext.fillRect(this.x - this.width / 2, this.y - this.width / 2, this.width, this.height);
  }

  getRandomColor() {
   const r = Math.round(Math.random() * 255);
   const g = Math.round(Math.random() * 255);
   const b = Math.round(Math.random() * 255);
   return `rgb(${r},${g},${b})`;
  }
}