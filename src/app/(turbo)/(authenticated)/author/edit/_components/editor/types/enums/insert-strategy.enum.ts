import { Enum } from "@turbo-cms/utils-type/enum";

export const InsertStrategy = {
    BEFORE: "BEFORE",
    AFTER: "AFTER",
    ON: "ON",
    BETWEEN: "BETWEEN"
} as const;

export type InsertStrategyEnum = Enum<typeof InsertStrategy>;
