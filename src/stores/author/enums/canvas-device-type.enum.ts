import { Enum } from "@/utils/type/enum.utils";

export const CanvasDeviceType = {
    MOBILE: "MOBILE",
    TABLET: "TABLET",
    DESKTOP: "DESKTOP"
} as const;

export type CanvasDeviceTypeEnum = Enum<typeof CanvasDeviceType>;
