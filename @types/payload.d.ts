import { Config } from "@/config/payload/payload.types";

declare module "payload" {
    export interface GeneratedTypes extends Config {}
}
