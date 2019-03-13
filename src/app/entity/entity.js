const R = require('ramda');
const common = require('../common.js');

// entities are prob symmetrical and thus don't need both width and height
const ENTITY_SIZE = 10;

var entityAtlas = new Map();
entityAtlas.set(0, 'Black'); 

const renderEntities = ( ctx, cam, entities ) => 
    entities
      .filter( common.isVisible( cam, ENTITY_SIZE ) )
      .forEach( renderEntity( ctx, cam ) );

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
