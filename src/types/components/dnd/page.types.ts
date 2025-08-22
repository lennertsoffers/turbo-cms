import { Page } from "@/config/payload/payload.types";

import { Id } from "../../domain/id.types";

export type FullPage = {
    id: Id;
    children: FullPage[];
} & Omit<Page, "children" | "id">;

