import {
    CanvasDeviceType,
    CanvasDeviceTypeEnum
} from "@turbo-cms/store/author";

export const DEVICE_WIDTH_MOBILE = 320;
export const DEVICE_WIDTH_TABLET = 768;
export const DEVICE_WIDTH_DESKTOP = 1278;

export const DEVICE_TYPE_TO_WIDTH_MAP: Record<CanvasDeviceTypeEnum, number> = {
    [CanvasDeviceType.MOBILE]: DEVICE_WIDTH_MOBILE,
    [CanvasDeviceType.TABLET]: DEVICE_WIDTH_TABLET,
    [CanvasDeviceType.DESKTOP]: DEVICE_WIDTH_DESKTOP
};

export const DEFAULT_ZOOM = 100;
export const MIN_ZOOM = 25;
export const MAX_ZOOM = 400;

export const PANEL_MIN_WIDTH = 300;
export const PANEL_MAX_WIDTH = 500;
export const PANEL_DEFAULT_WIDTH = 300;
