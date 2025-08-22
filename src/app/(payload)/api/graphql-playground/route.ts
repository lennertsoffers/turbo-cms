import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";

import { Turbo } from "@/turbo";

export const GET = GRAPHQL_PLAYGROUND_GET(Turbo.getSanitizedPayloadConfig());
