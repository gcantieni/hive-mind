
// add two direction objects together
var addDir = (dir1, dir2) => {
	return {x: (dir1.x | dir2.x), y: (dir1.y | dir2.y)}
}

// subtract two direction objects from one another
var subDir = (dir1, dir2) => {
	return {x: (dir1.x ^ dir2.x), y: (dir1.y ^ dir2.y)}
}
var isInBounds = (val, max, min) => val < max && val > min; 
var updateCam = (cam, changeInPos, speed) => {
	var newX = cam.x + (changeInPos.x * speed);
	var newY = cam.y + (changeInPos.y * speed);
	if (isInBounds(newX, cam.maxX, 0)) { 
		cam.x = newX; 
	}
	if (isInBounds(newY, cam.maxY, 0)) { 
		cam.y = newY; 
	}
	return cam;
}

module.exports = {
	updateCam,
	subDir,
	addDir
};
