//const { List, Map, Record } = require('immutable'); 
const controller = require('./world/world-controller.js');
const entity = require('./entity/entity.js');
const keyDownObservable = controller.keyDownObservable;
const keyUpObservable = controller.keyUpObservable;
const renderer = require('./world/world-map.js');
const rxmap = require('rxjs/operator/map');
const rxjs = require('rxjs');
const R = require('ramda');
const scroll = require('./scroll.js');

(async function main() {
    const BOARD_WIDTH = 500;
    const BOARD_HEIGHT = 500;
    const CAM_WIDTH = 300;
    const CAM_HEIGHT = 300;
    const TILE_SIZE = 25;
    var canvas = document.getElementById('board');
    canvas.width = CAM_WIDTH;
    canvas.height = CAM_HEIGHT;

    var context = canvas.getContext('2d');
    var randomTile = () => Math.floor(Math.random() * 3);
    var rows = 40;
    var cols = 40;

    // a randomly generated 2d array of numbers
    var layer =
        Array.from( { length: rows },
                    () => Array.from( { length: cols }, () => randomTile() ) );

    var worldMap = {
        rows: rows, 
        cols: cols,
        layers: [ layer	]
    };
    var camera = {
        x: 0,
        y: 0,
        width: BOARD_WIDTH,
        height: BOARD_HEIGHT,
        maxX: CAM_WIDTH,
        maxY: CAM_HEIGHT
    };

    var entities = [ {x: 20, y: 20, val: 0, speed: 3, target: {x: 100, y: 100}} ];

    var keyDown = keyDownObservable(canvas);
    var keyUp = keyUpObservable(canvas);
    var speed = 4;
    
    var curDir = { x: 0, y: 0 };
    keyDown.subscribe(e => { curDir = scroll.addDir( e, curDir ); } );
    keyUp.subscribe(e => { curDir = scroll.subDir( curDir, e ); } );

    var start = null;
    var update = (timestep) => {
        var progress = timestep - start; 
        // update the camera if there is any movement
        if ( !( curDir.x === 0 && curDir.y === 0 ) ) {
            camera = scroll.updateCam(camera, curDir, speed);
        }
        //camRender(camera);
        renderer.renderWorld( worldMap, context, camera );
        entity.renderEntities( context, camera, entities );
        entities = entity.update( entities );
        window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update); 
})();


