
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

var camera = null

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

module.exports = addScrollingListener
