import { GRAPHQL_POST } from "@payloadcms/next/routes";

import { Turbo } from "@/turbo";

export const POST = GRAPHQL_POST(Turbo.getSanitizedPayloadConfig());
