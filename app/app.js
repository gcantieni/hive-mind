const canvas = document.getElementById('board');
const context = board.getContext('2d');

context.scale(20,20);

var player = {
  pos: {x: 5, y: 5}
}


function drawPlayer(player) {
  context.fillStyle = 'yellow';
  context.fillRect(player.pos.x, player.pos.y, 1, 1);
}

let lastTime = 0;
function update() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawPlayer(this.player);
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
  console.log(event);
});

update();