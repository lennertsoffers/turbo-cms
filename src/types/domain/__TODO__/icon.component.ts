import { HugeiconsProps } from "hugeicons-react";
import {
    FC,
    RefAttributes
} from "react";

export type IconComponent = FC<Omit<HugeiconsProps, "ref"> & RefAttributes<SVGSVGElement>>;
