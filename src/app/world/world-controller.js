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

//var changeInPos = new Map({
//	ArrowRight: {x: 1, y: 0},
//	ArrowLeft:  {x: -1, y: 0},
//	ArrowUp: {x: 0, y: -1},
//	ArrowDown: {x: 0, y: 1}
//});



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

function addScrollingListener(canvas, initialCamVal, camRenderFunc) {
	camera = initialCamVal
	canvas.addEventListener('keydown', 
		(keyEvent) => {
			keyEvent.preventDefault()
			switch(keyEvent.key) {
				case "ArrowRight":
					camera = changeCamX(camera, 5);
					camRenderFunc(camera);
					break;
				case "ArrowLeft":
					camera = changeCamX(camera, -5);
					camRenderFunc(camera);
					break;
				case "ArrowUp":
					camera = changeCamY(camera, -5);
					camRenderFunc(camera);
					break;
				case "ArrowDown":
					camera = changeCamY(camera, 5);
					camRenderFunc(camera);
					break;
			}
		}, false);
	return canvas
}

module.exports = {
	keyDownObservable,
	keyUpObservable
}
