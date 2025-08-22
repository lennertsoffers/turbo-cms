import type { MarkOptional } from "ts-essentials";

type BasePayloadType = {
    createdAt: string;
    updatedAt: string;
    id: string;
};

export type PayloadType<TType extends BasePayloadType> = MarkOptional<
    TType,
    "createdAt" | "id" | "updatedAt"
>;
