import * as constants from './constants.js';
import { HiveOrganizer } from './hive.js';
import { FlowerOrganizer } from './flower.js';
import { BeeOrganizer } from './bee.js';

export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.lastTime = 0;
    this.hiveOrganizer = new HiveOrganizer(this.context);
    this.flowerOrganizer = new FlowerOrganizer(this.context);
    this.BeeOrganizer = new BeeOrganizer(this.context);

    const that = this;

    function drawCanvas() {
      that.context.fillStyle = '#A1FFD9';
      that.context.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.draw = function() {
      drawCanvas();
      this.hiveOrganizer.drawHives();
      this.flowerOrganizer.drawFlowers();
      this.BeeOrganizer.drawBees();
    };
  }

  show() {
    window.setInterval(() => {
      this.draw();
    }, 25);
  }
}



