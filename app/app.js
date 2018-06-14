const canvas = document.getElementById('board');
const context = board.getContext('2d');

const HIVE_WIDTH = 20;
const FLOWER_WIDTH = 5;
const BEE_WIDTH = 5;

const VELOCITY = 1;

let hive = {
  pos: {x: canvas.width / 2, y: canvas.height / 2}
}

let flower1 = {
  pos: {x: 10, y: 10}
}

var flowers = [flower1];

function draw() {
  drawCanvas();
  drawFlowers(flowers);
  drawHive(hive);
}

function drawBees() {

}

function drawFlowers(flowers) {
  let i = 0;
  for (i = 0; i < flowers.length; i++) {
    context.fillStyle = 'red';
    context.fillRect(flowers[i].pos.x, flowers[i].pos.x, FLOWER_WIDTH, FLOWER_WIDTH);
  }
}

function drawHive(hive) {
  context.fillStyle = '#DAA520';
  context.fillRect(hive.pos.x, hive.pos.y, HIVE_WIDTH, HIVE_WIDTH);
}

function drawCanvas() {
  context.fillStyle = '#000';
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
    hive.pos.x -= VELOCITY;
  }
  else if (event.keyCode === 38) {
    hive.pos.y -= VELOCITY;
  }
  else if (event.keyCode === 39) {
    hive.pos.x += VELOCITY;
  }
  if (event.keyCode === 40) {
    hive.pos.y += VELOCITY;
  }
});

update();