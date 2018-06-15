import * as constants from './constants.js';
import { drawHives } from './hive.js';
import { drawFlowers } from './flowers.js';

const canvas = document.getElementById('board');
const context = board.getContext('2d');

let hive = {
  pos: {x: canvas.width / 2, y: canvas.height / 2}
}

let flower1 = {
  pos: {x: 10, y: 10}
}

var flowers = [flower1];

function draw() {
  drawCanvas();
  drawFlowers(context, flowers);
  drawHives(context, hive);
}

function drawBees() {

}

function drawCanvas() {
  context.fillStyle = '#A1FFD9';
  context.fillRect(0, 0, canvas.width, canvas.height);
}


let lastTime = 0;
function update(time=0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    draw();

    requestAnimationFrame(update);
}


document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    hive.pos.x -= constants.VELOCITY;
  }
  else if (event.keyCode === 38) {
    hive.pos.y -= constants.VELOCITY;
  }
  else if (event.keyCode === 39) {
    hive.pos.x += constants.VELOCITY;
  }
  if (event.keyCode === 40) {
    hive.pos.y += constants.VELOCITY;
  }
});

update();