import * as constants from './constants.js';
import { Vec } from './math.js';

export class Listener {
  constructor(menu, organizers, clickables) {
    this.menu = menu;
    this.organizers = organizers;
    this.clickables = clickables;
    this.inAddMode = false;

    this.addType = null;
    this.selectedBees = [];
  }

  setType(newType) {
    if (this.organizers[newType] === null) {
      throw "Non-recognized type";
    } else {
      this.addType = newType;
    }
  }

  changeMode() {
    if (this.inAddMode) {
      this.inAddMode = false;
      // TODO replace with something more elegent
      this.addType === null;
    } else {
      this.inAddMode = true;
    }
    console.log(`add mode is now ${this.inAddMode ? "on" : "off"}`)
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
        // TODO change this to flower or hive
        if (clickable.type === 'hive' && this.selectedBees) {
          this.selectedBees.forEach(bee => bee.target = new Vec(clickable.x, clickable.y));
          this.selectedBees = [];
        }
        clickable.handleClick(this);
      } else if (this.inAddMode) {
        this.organizers.get(this.addType).add(mousePos.x, mousePos.y);
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