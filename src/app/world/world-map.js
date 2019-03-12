const R = require('ramda'); 

/*
 * Functions related to rendering the world 
 */
const TILE_SIZE = 25;

var tileAtlas = new Map();
tileAtlas.set(0, 'GreenYellow');
tileAtlas.set(1, 'Yellow');
tileAtlas.set(2, 'Orchid');

const renderWorld = (world, context, camera) => 
    world.layers.forEach(layer => 
        layer.forEach((rowList, row) =>
            rowList.forEach((tile, col) => {
                var tilePos = {
                    x: row * TILE_SIZE,
                    y: col * TILE_SIZE
                };
                if (isVisible(tilePos, camera)) {
                    renderTile(tile, tilePos, camera, context);
                }
            })));

// given position, is it within the camera?
const isVisible = (pos, cam) =>
      pos.x + TILE_SIZE >= cam.x &&
      pos.x < cam.x + cam.maxX &&
      pos.y + TILE_SIZE >= cam.y &&
      pos.y < cam.y + cam.maxY;
                                   
const renderTile = (tile, tilePos, camera, context) => {
    context.fillStyle = tileAtlas.get(tile);
    context.fillRect(tilePos.x - camera.x, tilePos.y - camera.y, TILE_SIZE, TILE_SIZE);
};

module.exports = {
    renderWorld,
};

