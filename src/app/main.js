//const { List, Map, Record } = require('immutable'); 
const R = require('ramda');
const render = require('./world/world-map.js');
const controller = require('./world/world-controller.js');
const keyDownObservable = controller.keyDownObservable;
const keyUpObservable = controller.keyUpObservable;
const rxmap = require('rxjs/operator/map');
const rxjs = require('rxjs');

(async function main() {
	const BOARD_WIDTH = 500;
	const BOARD_HEIGHT = 500;
	const TILE_SIZE = 25;
	var canvas = document.getElementById('board');
	canvas.width = BOARD_WIDTH;
	canvas.height = BOARD_HEIGHT;
	var context = canvas.getContext('2d');
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
	var camRender = R.curry(render)(worldMap, tileAtlas, context, TILE_SIZE);
	var keyDown = keyDownObservable(canvas);
	var keyUp = keyUpObservable(canvas);
	var speed = 0.01;
	var curDir = {x:0, y:0};
	var addDir = (dir1, dir2) => {
		return {x: (dir1.x | dir2.x), y: (dir1.y | dir2.y)}
	}
	var remDir = (dir1, dir2) => {
		return {x: (dir1.x ^ dir2.x), y: (dir1.y ^ dir2.y)}
	}
	var isInBounds = (val, max, min) => val < max && val > min; 
	var updateCam = (cam, changeInPos) => {
		var cpy = Object.assign({}, cam);
		if (isInBounds(cam.x + changeInPos.x, cam.maxX, 0)) { 
			cpy.x += changeInPos.x;
		}
		if (isInBounds(cam.y + changeInPos.y, cam.maxY, 0)) { 
			cpy.y += changeInPos.y;
		}
		return cpy;
	}
	keyDown.subscribe(e => {
		curDir = addDir(e, curDir);
	});
	keyUp.subscribe(e => {
		curDir = remDir(curDir, e); 
	});

	var start = null;
	var update = (timestep) => {
		var progress = timestep - start; 
		if (!(curDir.x === 0 && curDir.y === 0)) {
			camera = updateCam(camera, curDir);
		}
		camRender(camera);
		window.requestAnimationFrame(update);
	};
	window.requestAnimationFrame(update);
	//canvas = scroll(canvas, camera, camRender)

	camRender(camera);
})()
