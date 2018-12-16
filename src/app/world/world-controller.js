const rxjs = require('rxjs');
const filter = rxjs.operators.filter;
const map = rxjs.operators.map;

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

var camera = null;
var scrolling = false;

var changeInPos = new Map()
changeInPos.set('ArrowRight', {x: 1, y: 0});
changeInPos.set('ArrowLeft',  {x: -1, y: 0});
changeInPos.set('ArrowUp', {x: 0, y: -1});
changeInPos.set('ArrowDown', {x: 0, y: 1});

var keyDownObservable = (canvas) => rxjs.Observable.fromEvent(canvas, 'keydown')
	.pipe(
		filter(e => changeInPos.has(e.key)),
		map(e => {
			e.preventDefault();
			return changeInPos.get(e.key);
		}));

var keyUpObservable = (canvas) => rxjs.Observable.fromEvent(canvas, 'keyup')
	.pipe(
		filter(e => changeInPos.has(e.key)),
		map(e => {
			e.preventDefault();
			return changeInPos.get(e.key);
		}));

// adds together two direction objects
var addDir = (dir1, dir2) => {
	return {x: (dir1.x | dir2.x), y: (dir1.y | dir2.y)}
}

// xors two directions objects 
var remDir = (dir1, dir2) => {
	return {x: (dir1.x ^ dir2.x), y: (dir1.y ^ dir2.y)}
}
var isInBounds = (val, max, min) => val < max && val > min; 
var updateCam = (cam, changeInPos, speed) => {
	var cpy = Object.assign({}, cam);
	var newX = cam.x + (changeInPos.x * speed);
	var newY = cam.y + (changeInPos.y * speed);
	if (isInBounds(newX, cam.maxX, 0)) { 
		cpy.x = newX; 
	}
	if (isInBounds(newY, cam.maxY, 0)) { 
		cpy.y = newY; 
	}
	return cpy;
}

module.exports = {
	keyDownObservable,
	keyUpObservable,
	addDir,
	remDir,
	updateCam
}
