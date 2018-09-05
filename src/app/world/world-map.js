import { maybe } from "../util/functional.js";
import { TILE_HEIGHT } from "./world-view.js";

export function validTile(type) {
  return type == 'bee';
}

export function idxToCoord(width, idx) {
  return {
    x: maybe(idx % width),
    y: Math.floor(idx / width) 
  };
}

export function worldToScreen(pos, camera) {
  return {x: pos.x - camera.x, y: pos.y - camera.y};
}

export function screenToWorld(pos, camera) {
  return {x: pos.x + camera.x, y: pos.y + camera.y};
}

export function sliceColsLeft(removeNum, cols, arr) {
  // removeNum = 1, cols = 2, arr = [0, 1, 2, 3]
  return arr.filter((el, idx) => idx % cols >= removeNum);
}

export function sliceWorldCols(removeNum, world) {
  var copy = Object.assign({}, world); 
  copy.map = sliceColsLeft(removeNum, world.cols, copy.map);
  copy.cols -= removeNum;
  return copy;
}

export function shouldDraw(camera, pos) {
  return pos.x >= camera.x && 
    pos.x <= camera.x + camera.width - 1 &&
    pos.y >= camera.y &&
    pos.y <= camera.y + camera.height - 1;
};

export function sliceWorldToSize(start, end, world) {
  var copy = Object.assign({}, world);
  copy.map = copy.map.filter((el, idx) => {
    let pos = idxToCoord(copy.cols, idx);
    return pos.x >= start.x && pos.x <= end.x && pos.y >= start.y && pos.y <= end.y;
  });
  copy.cols -= start.x + (copy.cols - end.x);
  copy.rows -= start.y + (copy.rows - end.y);
  return copy;
}
