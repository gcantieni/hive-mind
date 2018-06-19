import * as constants from './constants.js';
import { HiveOrganizer } from './hive-organizer.js';
import { FlowerOrganizer } from './flower-organizer.js';

// let test = function() {
//   console.log(test);
// }
//
// class Test {
//   constructor() { }
//   classTest() {
//     window.requestAnimationFrame(this.classTest);
//   }
// }
// let test1 = new Test();
// test();
// test1.classTest();

export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.lastTime = 0;
    this.hiveOrganizer = new HiveOrganizer(this.context);
    this.flowerOrganizer = new FlowerOrganizer(this.context);

    this.hiveOrganizer.addHive(200, 200);
    this.hiveOrganizer.addHive(300, 300);
    this.flowerOrganizer.addFlower(260,260);

    const that = this;

    function drawCanvas() {
      that.context.fillStyle = '#A1FFD9';
      that.context.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.draw = function() {
      drawCanvas();
      this.hiveOrganizer.drawHives();
      this.flowerOrganizer.drawFlowers();
    };
  }

  show() {
    window.setInterval(() => {
      this.draw();
    }, 25);
  }
  // update(time=0) {
  //   const deltaTime = time - this.lastTime;
  //   this.lastTime = time;
  //
  //   this.draw();
  //
  //   requestAnimationFrame(this.update);
  // }

  // show() {
  //   document.addEventListener('keydown', event => {
  //     if (event.keyCode === 37) {
  //       hive.pos.x -= constants.VELOCITY;
  //     }
  //     else if (event.keyCode === 38) {
  //       hive.pos.y -= constants.VELOCITY;
  //     }
  //     else if (event.keyCode === 39) {
  //       hive.pos.x += constants.VELOCITY;
  //     }
  //     if (event.keyCode === 40) {
  //       hive.pos.y += constants.VELOCITY;
  //     }
  //   });
  //
  //   this.update();
  // }
}



