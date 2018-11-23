//const { List, Map, Record } = require('immutable'); 
const world = require('./world/world-map.js');

(async function main() {
	const BOARD_WIDTH = 100;
	const BOARD_HEIGHT = 100;
	const TILE_SIZE = 50;

	const canvas = document.getElementById('board');
	canvas.width = BOARD_WIDTH;
	canvas.height = BOARD_HEIGHT;

	const context = canvas.getContext('2d');

	var worldMap = {
		rows: 3, 
		cols: 3,
		layers:	[
			1, 1, 1, 
			0, 2, 1,
			0, 1, 2
		]
	}
	var camera = {
		x: 0,
		y: 0,
		width: 100,
		height: 100,
		maxX: 50,
		maxY: 50
	}

	var tileAtlas = new Map()
	tileAtlas.set(0, 'GreenYellow')
	tileAtlas.set(1, 'Yellow')
	tileAtlas.set(2, 'Orchid')
	
	world(worldMap, camera, tileAtlas, context, TILE_SIZE)
})()
