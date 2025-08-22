import { Size } from "./size.types";

type ToCssValue = (size: Size) => string;
export const toCssValue: ToCssValue = ({ value, unit }) => `${value}${unit}`;
