//const { List, Map, Record } = require('immutable'); 
const R = require('ramda')
const render = require('./world/world-map.js');

(async function main() {
	const BOARD_WIDTH = 500;
	const BOARD_HEIGHT = 500;
	const TILE_SIZE = 25;
	const canvas = document.getElementById('board');
	canvas.width = BOARD_WIDTH;
	canvas.height = BOARD_HEIGHT;
	const context = canvas.getContext('2d');
	var tileAtlas = new Map()
	tileAtlas.set(0, 'GreenYellow')
	tileAtlas.set(1, 'Yellow')
	tileAtlas.set(2, 'Orchid')
	var randomTile = () => Math.floor(Math.random() * tileAtlas.size)
	var rows = 40
	var cols = 40
	var layer = Array.from({length: rows*cols}, () => randomTile())
	var worldMap = {
		rows: rows, 
		cols: cols,
		layers: layer 	
	}
	var camera = {
		x: 0,
		y: 0,
		width: BOARD_WIDTH,
		height: BOARD_HEIGHT,
		maxX: 100,
		maxY: 100
	}
	
	//render(worldMap, camera, tileAtlas, context, TILE_SIZE)
	var camRender = R.curry(render)(worldMap, tileAtlas, context, TILE_SIZE)

	var changeCamX = (cam, dx) => {
		if (cam.x + dx > cam.maxX || cam.x + dx < 0) {
			return cam
		}
		var cpy = Object.assign({}, cam)
		cpy.x += dx
		return cpy
	}
	var changeCamY = (cam, dy) => {
		if (cam.y + dy > cam.maxY || cam.y + dy < 0) {
			return cam
		}
		var cpy = Object.assign({}, cam)
		cpy.y += dy
		return cpy
	}
	

	canvas.addEventListener('keydown', 
		(keyEvent) => {
			keyEvent.preventDefault()
			switch(keyEvent.key) {
				case "ArrowRight":
					camera = changeCamX(camera, 5);
					camRender(camera);
					break;
				case "ArrowLeft":
					camera = changeCamX(camera, -5);
					camRender(camera);
					break;
				case "ArrowUp":
					camera = changeCamY(camera, -5);
					camRender(camera);
					break;
				case "ArrowDown":
					camera = changeCamY(camera, 5);
					camRender(camera);
					break;
			}
		}, false);

	camRender(camera)	
})()
