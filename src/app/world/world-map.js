import { maybe } from "../util/functional.js";
import { TILE_HEIGHT, TILE_WIDTH } from "./world-view.js";

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

export function shouldDraw(camera, pos) {
  return pos.x >= Math.floor(camera.x) && 
    pos.x <= Math.ceil(camera.x + camera.width - 1) &&
    pos.y >= Math.floor(camera.y) &&
    pos.y <= Math.ceil(camera.y + camera.height - 1);
};
