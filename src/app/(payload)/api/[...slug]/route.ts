import {
    REST_DELETE,
    REST_GET,
    REST_OPTIONS,
    REST_PATCH,
    REST_POST
} from "@payloadcms/next/routes";

import { Turbo } from "@/turbo";

export const GET = REST_GET(Turbo.getSanitizedPayloadConfig());
export const POST = REST_POST(Turbo.getSanitizedPayloadConfig());
export const DELETE = REST_DELETE(Turbo.getSanitizedPayloadConfig());
export const PATCH = REST_PATCH(Turbo.getSanitizedPayloadConfig());
export const OPTIONS = REST_OPTIONS(Turbo.getSanitizedPayloadConfig());
