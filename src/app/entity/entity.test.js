const R = require('ramda');
const entity = require('./entity.js');
const entitySize = 0.5

var makeSimpleEntitiesList = () => {
	var ent = new Map();
	var newEnt1, newEnt2;
	var ret1 = entity.addEntity(0, 2, 2, entitySize, ent);
	var ret2 = entity.addEntity(1, 1, 2, entitySize, ent);
	return { entities: ret2.entities, 
			 newEnt1: ret1.newEnt, 
			 newEnt2: ret2.newEnt };
}

test('makeEntity', () => {
	var entlist = makeSimpleEntitiesList();
	var ent = entlist.entities;
	expect(ent.get(0)).toEqual({ id: 0, val:0, x:2, y:2, size: entitySize });
	expect(ent.get(1)).toEqual({ id: 1, val:1, x:1, y:2, size: entitySize });
});

test('filter', () => {
	var cam = makeSimpleCamera();
	var entlist = makeSimpleEntitiesList();
	var ent = entlist.entities;
	
	var expectVisiblePartial = expectVisible(ent, cam);	
	
	expectVisiblePartial([entlist.newEnt1, entlist.newEnt2]);

	cam.x = 1.5;
	cam.y = 1.5;

	// now the first entity's right edge is right on the edge of 
	// the camera, so shouldn't be drawn
	expectVisiblePartial([entlist.newEnt1]);

	cam.x = 2;
	cam.y = 2;

	// even though newEnt1 is at point (2, 2) 
	// it's right side is visible (it has a width  of 0.5)
	// is still visible 
	expectVisiblePartial([entlist.newEnt1]);

	// if either x or y is totally out of sight, the entity
	// is not visible
	cam.y = 2.5;
	expectVisiblePartial([]);
	cam.x = 2;
	cam.y = 2.5;
	expectVisiblePartial([]);
});

var expectVisible = R.curry((ent, cam, visibleEnts) => {
	expect(entity.filterVisibleEntities(cam, Array.from(ent.values())))
		.toEqual(visibleEnts);
});

var makeSimpleCamera = () => {
	return {
		x: 1,
		y: 1,
		width: 2,
		height: 2,
		maxX: 5,
		maxY: 5
	};
}


test('adjust xy', () => {
	var entlist = makeSimpleEntitiesList();
	var ent = entlist.entities;
	var cam = makeSimpleCamera(); // (x, y) = (1, 1)
	var expectXYPartial = expectXY(entlist.newEnt1);

	expectXYPartial(cam, 1, 1);
	
	cam.y = 0;

	expectXYPartial(cam, 1, 2);

	cam.x = 2;
	cam.y = 2;
	expectXYPartial(cam, 0, 0);
});

// given the values cam, and sampleEnt, expect the return value of x,y
var expectXY = R.curry((sampleEnt, cam, x, y) => {
	expect(entity.adjustedEntityXY(cam, sampleEnt).x).toBe(x);
	expect(entity.adjustedEntityXY(cam, sampleEnt).y).toBe(y);
});

