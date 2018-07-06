import * as app from './app.js';
import { ResourceList } from './resource-list.js';

export const BOARD_WIDTH = 700;
export const BOARD_HEIGHT = 500;

export const BEE_COLOR = '#e2c041';
export const HIVE_COLOR = '#DAA520';
export const FLOWER_COLOR = '#b2157e';
export const BACKGROUND_COLOR = '#A1FFD9';
export const MENU_BAR_COLOr = '#000000';

export const HIVE_WIDTH = 100;
export const FLOWER_WIDTH = 20;
export const BEE_WIDTH = 20;
export const BUTTON_WIDTH = 60;

export const BEE_COST = new ResourceList(0, 10);
export const HIVE_COST = new ResourceList(0, 0, 0, 1000); 

export const MENU_PADDING = 6;

export const RESOURCE_SPACING = 25;

export const BEE_SPEED = 1;