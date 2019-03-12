const R = require('ramda');
const entity = require('./entity.js');
const entitySize = 0.5;

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

test('move', () => {
	var entlist = makeSimpleEntitiesList();
	var ent = entlist.entities;
	var originalX = entlist.newEnt1.x;
	var originalY = entlist.newEnt1.y;
	var speed = 3;

	var cam = makeSimpleCamera(); // (x, y) = (1, 1)
	var entityTargets = new Map(); // a map from id to target 
	
	var entid = entlist.newEnt1.id
	entityTargets = entity.setTarget(entid, entlist.newEnt2, entityTargets);
	expect(entityTargets.keys()).toContain(entid);
	expect(entityTargets.get(entid)).toBe(entlist.newEnt2);

	ent = entity.moveTowardTargets(entityTargets, ent, speed);

	// (x, y) of ent1 used to be (2, 2) moving towards (1, 2)
	// thus y shouldn't have changed, and x should be less than it used to be
	expect(ent.get(entid).x).toBeLessThan(originalX);
	expect(ent.get(entid).x).toBeGreaterThanOrEqual(0);
	expect(ent.get(entid).y).toBe(originalY);
	
	// setting target to itself should not divide by zero
	//entityTargets = entity.setTarget(entid, entlist.newEnt2, entlist.newEnt2, entityTargets);

	//expect(entity.moveTowardTargets(entityTargets, ent, speed).get(entlist.newEnt2.id.x)
	
});
