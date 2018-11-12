//const { List, Map, Record } = require('immutable'); 
const R = require('ramda'); 

(async function main() {
	const BOARD_WIDTH = 100;
	const BOARD_HEIGHT = 100;
	const TILE_SIZE = 10;

	const canvas = document.getElementById('board');
	canvas.width = BOARD_WIDTH;
	canvas.height = BOARD_HEIGHT;

	const context = canvas.getContext('2d');

	var worldMap = {
		rows: 10, 
		cols: 10,
		layers:	[
			0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
			0, 2, 1, 0, 2, 1, 0, 2, 1, 0,
			0, 1, 2, 0, 1, 2, 0, 1, 2, 0,
			0, 2, 1, 0, 2, 1, 0, 2, 1, 0,
			0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
			0, 2, 2, 0, 2, 2, 0, 2, 2, 0,
			0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
			0, 2, 1, 0, 2, 1, 0, 2, 1, 0,
			0, 1, 2, 0, 1, 2, 0, 1, 2, 0,
			0, 2, 2, 0, 2, 2, 0, 2, 2, 0,
		]
	}
	var camera = {
		x: 0,
		y: 0,
		width: 50,
		height: 50,
		maxX: 90,
		maxY: 90
	}
	var tileAtlas = new Map()
	tileAtlas.set(0, 'GreenYellow')
	tileAtlas.set(1, 'Yellow')
	tileAtlas.set(2, 'Orchid')


	var getTileIndex = (row, col, cols) => row*cols + col
	// val is not used but needed for 
	var getRowCol = (cols, val, idx) => {
		return { 
			row: Math.floor(idx / cols), 
			col: idx % cols, val: val
		} 
	}
	getRowCol = R.curry(getRowCol)(worldMap.cols)

	var visibleRange = (camStart, camSize, tsize) => {
		return { 
			start: Math.floor(camStart / tsize),
			end: Math.floor(camStart / tsize) + camSize / tsize
		}
	}

	var colRange = visibleRange(camera.x, camera.width, TILE_SIZE)
	var rowRange = visibleRange(camera.y, camera.height, TILE_SIZE)
	var filterVisible = R.compose(
		R.filter(
			R.where({
				row: R.both(
					R.gt(R.__, rowRange.start - 1), 
					R.lt(R.__, rowRange.end)),
				col: R.both(
					R.gt(R.__, colRange.start - 1), 
					R.lt(R.__, colRange.end))
			})),
		R.addIndex(R.map)(getRowCol))

	var offset = R.curry(
		(tsize, rangeStart, camPos) => 
			-camPos + rangeStart * tsize)(TILE_SIZE)

	var offsets = {
		x: offset(colRange.start, camera.x),
		y: offset(rowRange.start, camera.y)
	}

	var rowColValToXYVal = R.curry((tsize, cam, startRow, startCol, rowColVal) => {
		return {
			x: (rowColVal.col - startCol) * tsize 
				+ offset(startCol, cam.x), 
			y: (rowColVal.row - startRow) * tsize 
				+ offset(startRow, cam.y), 
			val: rowColVal.val
		}
	})(TILE_SIZE, camera, rowRange.start, colRange.start) 


	var renderImage = R.curry((tsize, ctx, tatlas, XYVal) => {
		ctx.fillStyle = tatlas.get(XYVal.val)
		ctx.fillRect(XYVal.x, XYVal.y, tsize, tsize) 
	})(TILE_SIZE, context, tileAtlas)
	var renderMap = R.compose(
		R.map(renderImage), 
		R.map(rowColValToXYVal), 
		filterVisible)

	renderMap(worldMap.layers)
})()
