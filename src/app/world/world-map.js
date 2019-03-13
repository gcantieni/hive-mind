const R = require('ramda'); 
const common = require('../common.js');

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
                if ( common.isVisible( camera, TILE_SIZE, tilePos ) )
                    renderTile( tile, tilePos, camera, context );
            })));
                                   
const renderTile = (tile, tilePos, camera, context) => {
    context.fillStyle = tileAtlas.get(tile);
    context.fillRect(tilePos.x - camera.x, tilePos.y - camera.y, TILE_SIZE, TILE_SIZE);
};

module.exports = {
    renderWorld,
};

