const canvas = document.getElementById('board');
const context = board.getContext('2d');

context.scale(20,20);

var player = {
  pos: {x: 5, y: 5}
}

var flower1 = {
  pos: {x: 10, y: 10}
}

var flowers = [flower1];

function draw() {
  drawFlowers(this.flowers);
  drawPlayer(this.player);
}

function drawFlowers(flowers) {
  var i = 0;
  for (i = 0; i < flowers.length; i++) {
    context.fillStyle = 'red';
    context.fillRect(flowers[i].pos.x, flowers[i].pos.x, 1, 1);
  }
}

function drawPlayer(player) {
  context.fillStyle = 'yellow';
  context.fillRect(player.pos.x, player.pos.y, 1, 1);
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
    player.pos.x--;
  }
  else if (event.keyCode === 38) {
    player.pos.y--;
  }
  else if (event.keyCode === 39) {
    player.pos.x++;
  }
  if (event.keyCode === 40) {
    player.pos.y++;
  }
});

update();