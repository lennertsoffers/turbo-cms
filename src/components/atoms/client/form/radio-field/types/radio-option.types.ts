import { IconComponent } from "@/types/components/icon.component";
import { Enum } from "@/utils/type/enum.utils";

export type RadioOption<T extends Record<string, string>> = {
    Icon?: IconComponent;
    label?: string;
    value: Enum<T>;
    defaultChecked?: boolean;
    className?: string;
};
