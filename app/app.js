const canvas = document.getElementById('board');
const context = board.getContext('2d');
const HIVE_WIDTH = 20;
const VELOCITY = 10

let player = {
  pos: {x: canvas.width / 2, y: canvas.height / 2}
}

let flower1 = {
  pos: {x: 10, y: 10}
}

var flowers = [flower1];

function draw() {
  drawFlowers(flowers);
  drawPlayer(player);
}

function drawFlowers(flowers) {
  let i = 0;
  for (i = 0; i < flowers.length; i++) {
    context.fillStyle = 'red';
    context.fillRect(flowers[i].pos.x, flowers[i].pos.x,HIVE_WIDTH, HIVE_WIDTH);
  }
}

function drawPlayer(player) {
  context.fillStyle = 'yellow';
  context.fillRect(player.pos.x, player.pos.y, HIVE_WIDTH, HIVE_WIDTH);
}

let lastTime = 0;
function update(time=0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    draw();

    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    player.pos.x -= VELOCITY;
  }
  else if (event.keyCode === 38) {
    player.pos.y -= VELOCITY;
  }
  else if (event.keyCode === 39) {
    player.pos.x += VELOCITY;
  }
  if (event.keyCode === 40) {
    player.pos.y += VELOCITY;
  }
});

update();