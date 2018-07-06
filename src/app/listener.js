import * as constants from './constants.js';
import {
  Vec
} from './math.js';

export class Listener {
  constructor(resources, organizers, clickables) {
    this.resources = resources;
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
      let [clickable, mousePos] = this.getClickable(canvas, clickContext, e);
      if (clickable) {
        if (clickable.canBeTarget && this.selectedBees) {
          this.selectedBees.forEach(bee => bee.target = clickable.center);
          this.selectedBees = [];
        }
        clickable.handleClick(this);
      } else if (this.inAddMode) {
        let adder = this.organizers.get(this.addType);
        if (this.resources.canCover(adder.cost)) {
          adder.add(mousePos.x, mousePos.y);
          this.resources.subtract(adder.cost);
        }
      }
    });
  }

  getClickable(canvas, clickContext, event) {
    const mousePos = {
      x: event.clientX - canvas.offsetLeft,
      y: event.clientY - canvas.offsetTop
    };

    const pixelColor = clickContext.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    const color = `rgb(${pixelColor[0]},${pixelColor[1]},${pixelColor[2]})`;
    const clickable = this.clickables.get(color);
    return [clickable, mousePos];
  }
}

// export function getMousePos(canvas, evt) {
//   let bound = canvas.getBoundingClientRect();
//   return {
//     x: evt.clientX - bound.left,
//     y: evt.clientY - bound.top
//   }
// }