import * as constants from './constants.js';

export class Listener {
  constructor(menu, organizers, clickables) {
    this.menu = menu;
    this.organizers = organizers;
    this.clickables = clickables;
    this.addMode = false;

    this.type = null;
  }

  setType(newType) {
    if (this.organizers[newType] === null) {
      throw "Non-recognized type";
    } else {
      this.type = newType;
    }
  }

  changeMode() {
    if (this.addMode) {
      this.addMode = false;
      // TODO replace with something more elegent
      this.type === null;
    } else {
      this.addMode = true;
    }
    console.log(`add mode is now ${this.addMode ? "on" : "off"}`)
  }

  listen(canvas, clickContext) {
    canvas.addEventListener('click', e => {

      const mousePos = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
      };

      const pixelColor = clickContext.getImageData(mousePos.x, mousePos.y, 1, 1).data;
      const color = `rgb(${pixelColor[0]},${pixelColor[1]},${pixelColor[2]})`;
      const clickable = this.clickables.get(color);
      if (clickable) {
        clickable.handleClick(this);
      } else if (this.addMode) {
        this.organizers.get(this.type).add(mousePos.x, mousePos.y);
      }
    });
  }
}

export function getMousePos(canvas, evt) {
  let bound = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - bound.left,
    y: evt.clientY - bound.top
  }
}