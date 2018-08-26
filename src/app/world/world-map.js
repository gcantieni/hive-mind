import { maybe } from "../util/functional.js";

export function validTile(type) {
  return type == 'bee';
}

export function getPos(width, idx) {
  return {
    x: maybe(idx % width),
    y: Math.floor(idx / width) 
  };
}