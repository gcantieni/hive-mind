const R = require('ramda'); 

function renderWorld(worldMap, camera, tileAtlas, context, tsize) {
	var colRange = visibleRange(camera.x, camera.width, tsize);
	var rowRange = visibleRange(camera.y, camera.height, tsize);
	var getMapRowCol = getRowCol(worldMap.cols) // now just needs idx
	var offsets = {
		x: offset(colRange.start, camera.x),
		y: offset(rowRange.start, camera.y)
	};
	var filterVisibleMap = filterVisible(rowRange, colRange, getMapRowCol)
	var worldRCtoXY = rowColValToXYVal(tsize, camera, rowRange.start, colRange.start);

	var renderWorldImage = renderImage(tsize, context, tileAtlas); // curried: now takesXYVal
	var a = filterVisibleMap(worldMap.layers)
	return R.compose(
		R.map(renderWorldImage), 
		R.map(worldRCtoXY), 
		filterVisibleMap)(worldMap.layers);
}

var getTileIndex = (row, col, cols) => row*cols + col
// val is not used but needed for 
var getRowCol = R.curry((cols, val, idx) => {
	return { 
		row: Math.floor(idx / cols), 
		col: idx % cols, val: val
	} 
})

var visibleRange = (camStart, camSize, tsize) => {
	return { 
		start: Math.floor(camStart / tsize),
		end: Math.ceil(camStart / tsize) + camSize / tsize
	}
}

var filterVisible = R.curry((rowRange, colRange, idxToRowCol, layer) => 
	R.compose(
		R.filter(
			R.where({
				row: R.both(
					R.gt(R.__, rowRange.start - 1), 
					R.lt(R.__, rowRange.end)),
				col: R.both(
					R.gt(R.__, colRange.start - 1), 
					R.lt(R.__, colRange.end))
			})),
		R.addIndex(R.map)(idxToRowCol))(layer))

var offset = R.curry(
	(tsize, rangeStart, camPos) => 
		-camPos + rangeStart * tsize)


var rowColValToXYVal = R.curry((tsize, cam, startRow, startCol, rowColVal) => {
	var getOffset = offset(tsize)
	return {
		x: (rowColVal.col - startCol) * tsize 
			+ getOffset(startCol, cam.x), 
		y: (rowColVal.row - startRow) * tsize 
			+ getOffset(startRow, cam.y), 
		val: rowColVal.val
	}
})

var renderImage = R.curry((tsize, ctx, tatlas, XYVal) => {
	ctx.fillStyle = tatlas.get(XYVal.val)
	ctx.fillRect(XYVal.x, XYVal.y, tsize, tsize) 
})

module.exports = renderWorld

