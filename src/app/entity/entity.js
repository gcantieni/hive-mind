const R = require('ramda');

// entities are prob symmetrical and thus don't need both width and height
const ENTITY_SIZE = 10;
// maps entity id to entity 
const entityAtlas = new Map();

var curEntityID = 0;
//var entities = new Map();

entityAtlas.set(0, 'Black'); 

function addEntity(value, startX, startY, size, entities) {
	var newEnt = { id: curEntityID, val: value, x: startX, y: startY, size };
	entities.set(curEntityID, newEnt);
	curEntityID++;
	return { entities, newEnt };
}

function renderEntities(ctx, cam, entities) {
	var renderEntityPartial = renderEntity(ctx, entityAtlas);
	var adjustedEntityXYPartial = adjustedEntityXY(cam);
	var filterPartial = filterVisibleEntities(cam);

	R.compose(
		R.map(renderEntityPartial), 
		R.map(adjustedEntityXYPartial), 
		filterPartial)(entities);
}

// any entity with any part visible should return true 
// doesn't check that cam is not misplaced
// i.e. cam could be in a position where the entity
// would be beyond maxX
var isWithinCam = R.curry(
	(cam, pos) => {
		return pos.x < cam.x + cam.width &&
			pos.x + pos.size > cam.x && 
			pos.y < cam.y + cam.height &&
			pos.y + pos.size > cam.y;
	});

// [ entities ] --> [ entities within cam ] 
var filterVisibleEntities = R.curry((cam, ent) =>  {
	return R.filter(isWithinCam(cam), ent);
});


var renderEntity = R.curry((ctx, atlas, XYVal) => {
	ctx.fillStyle = atlas.get(XYVal.val);
	ctx.fillRect(XYVal.x, XYVal.y, XYVal.size, XYVal.size);
});

var adjustedEntityXY = R.curry(
	(cam, entity) => {
		var cpy = Object.assign({}, entity);
		cpy.x -= cam.x;
		cpy.y -= cam.y;
		return cpy;
	}
);

module.exports = {
	addEntity,
	filterVisibleEntities,
	adjustedEntityXY,
	renderEntities
}
