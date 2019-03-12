const R = require('ramda');

// entities are prob symmetrical and thus don't need both width and height
const ENTITY_SIZE = 10;

var entityAtlas = new Map();
entityAtlas.set(0, 'Black'); 

const renderEntities = ( ctx, cam, entities ) => 
    entities
      .filter( isWithinCam( cam ) )
      .forEach( renderEntity( ctx, cam ) );

// any entity with any part visible should return true 
// doesn't check that cam is not misplaced
// i.e. cam could be in a position where the entity
// would be beyond maxX
var isWithinCam = R.curry(
    ( cam, pos ) => 
            pos.x < cam.x + cam.width &&
            pos.x + ENTITY_SIZE > cam.x && 
            pos.y < cam.y + cam.height &&
            pos.y + ENTITY_SIZE > cam.y );

var renderEntity = R.curry(
    ( ctx, cam, entity ) => {
        ctx.fillStyle = entityAtlas.get( entity.val );
        ctx.fillRect( entity.x - cam.x, entity.y - cam.y, ENTITY_SIZE, ENTITY_SIZE ); } );

var update = ( allEntities ) => allEntities.map( updateEntityPos );

var updateEntityPos = function(ent) {
// target shoud be something with x and y values
    var direction = {
            x: ent.target.x - ent.x,
            y: ent.target.y - ent.y
    };
    var distanceToTarget = Math.sqrt(
            direction.x * direction.x + direction.y * direction.y );

    if ( distanceToTarget === 0 )
            return ent;

    // normalize
    direction.x = direction.x / distanceToTarget;
    direction.y = direction.y / distanceToTarget;

    var cpy = Object.assign( {}, ent );
    cpy.x = cpy.x + direction.x * ent.speed;
    cpy.y = cpy.y + direction.y * ent.speed;

    if ( overshotTarget( ent.target.x, ent.x, cpy.x ) ) {
            cpy.x = ent.target.x;	
    }
    if ( overshotTarget( ent.target.y, ent.y, cpy.y ) ) {
            cpy.y = ent.target.y;	
    }

    return cpy;
};

var overshotTarget = ( target, old, updated ) => 
    ( old < target && updated > target ) ||
    ( old > target && updated < target );

module.exports = {
    renderEntities,
    update,
};
