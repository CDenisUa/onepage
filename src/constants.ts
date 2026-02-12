import type { TaglineRadius } from "@/types";

export type PanelPosition = { left: number; top: number };
export type MenuPosition = { x: number; y: number };

export const PANEL_MARGIN = 12;
export const PANEL_DEFAULT_POSITION: PanelPosition = {
  left: PANEL_MARGIN,
  top: PANEL_MARGIN,
};

export const DEFAULT_MENU_POSITION: MenuPosition = { x: 0, y: 0 };

export const DND_ACTIVATION_DISTANCE = 4;
export const DND_SCALE_LOCK = 1;
export const DND_DRAG_OPACITY = 0.6;
export const DND_IDLE_OPACITY = 1;

export const NOT_FOUND_INDEX = -1;
export const MIN_INDEX = 0;
export const REMOVE_ONE_ITEM = 1;
export const NO_DELETE_COUNT = 0;
export const MIN_LABEL_LENGTH = 1;
export const PERSIST_DRAFT_DEBOUNCE_MS = 250;
export const MOBILE_MENU_LONG_PRESS_MS = 420;
export const MOBILE_MENU_TOUCH_MOVE_TOLERANCE_PX = 12;

export const CHIP_MAX_WIDTH = 200;

export const DEFAULT_TAGLINE_RADIUS: TaglineRadius = 12;
export const RADIUS_OPTIONS: TaglineRadius[] = [0, 4, 8, 12, 100];
