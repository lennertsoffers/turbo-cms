import { GeneratedTypes } from "payload";
import {
    DeepPartial,
    MarkOptional
} from "ts-essentials";

import { Config } from "@/config/payload/payload.types";

export type PayloadCollectionSlug = keyof GeneratedTypes["collections"];
export type PayloadCollections = GeneratedTypes["collections"];

export type PayloadCollection<TSlug extends PayloadCollectionSlug> = Config["collections"][TSlug];
export type PayloadCollectionTypes = Config["collections"][keyof Config["collections"]];

export type PayloadCollectionCreate<TSlug extends PayloadCollectionSlug> = MarkOptional<
    { sizes: any; } & Config["collections"][TSlug],
    "createdAt" | "id" | "sizes" | "updatedAt"
>;
export type PayloadCollectionUpdate<TSlug extends PayloadCollectionSlug> = DeepPartial<
    Config["collections"][TSlug]
>;
