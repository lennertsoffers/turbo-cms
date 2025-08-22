import { CREATED } from "http-status";
import { NextResponse } from "next/server";

import { Turbo } from "@/turbo";
import { Id } from "@/types/domain/id.types";
import { json } from "@/utils/general/response";

type CreateComponentDto = {
    name: string;
    props: Record<string, unknown>;
    children: CreateComponentDto[];
    parentId: Id;
};

export async function POST(req: Request): Promise<NextResponse> {
    const createComponentDto = await json<CreateComponentDto>(req);
    const payload = await Turbo.getPayload();

    const [
        { id },
        { children }
    ] = await Promise.all([
        payload.create({
            collection: "components",
            data: {
                name: createComponentDto.name,
                props: createComponentDto.props,
                children: []
            }
        }),
        payload.findByID({
            collection: "components",
            id: createComponentDto.parentId
        })
    ]);

    const parent = await payload.update({
        collection: "components",
        where: {
            id: {
                equals: createComponentDto.parentId
            }
        },
        data: {
            children: [
                ...children ?? [],
                id
            ]
        },
        depth: 1
    });

    return new NextResponse(
        JSON.stringify(parent),
        {
            status: CREATED
        }
    );
}
