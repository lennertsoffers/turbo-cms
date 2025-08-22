import { BasePayload } from "payload";

import { Page } from "@/config/payload/payload.types";
import * as PageService from "@/services/shared/page/page.service";
import { isDefined } from "@/utils/general/object.utils";

type CreateTree =
    (payload: BasePayload) =>
    (segments: string[]) => Promise<Page | undefined>;
export const createTree: CreateTree =
    (payload) =>
    async (segments) => {
        const firstExistingPage = await findFirstExistingPageId(payload)(segments);

        const staringPageIndex = firstExistingPage?.index ?? -1;

        return Array.from(
            {
                length: segments.length - staringPageIndex - 1
            },
            (_, i) => staringPageIndex + i + 1
        )
            .reduce<Promise<Page | undefined>>(
                async (parentPromise, i) => {
                    const parent = await parentPromise;

                    const path = PageService.stringifyPath(segments.slice(
                        0,
                        i + 1
                    ));

                    const title = segments.at(i) ?? "";

                    const page = await payload.create({
                        collection: "pages",
                        data: {
                            path: path,
                            type: "FOLDER",
                            title: title
                        }
                    });

                    if(isDefined(parent)) {
                        await payload.update({
                            collection: "pages",
                            id: parent.id,
                            data: {
                                children: (parent.children ?? []).concat(page.id)
                            }
                        });
                    }

                    return page;
                },
                Promise.resolve(firstExistingPage)
            );
    };

type FindFirstExistingPageId =
    (payload: BasePayload) =>
    (segments: string[], segmentIndex?: number) => Promise<
      {
          index: number;
      } & Page
      | undefined
    >;
const findFirstExistingPageId: FindFirstExistingPageId =
    (payload) =>
    async (segments, segmentIndex = segments.length) => {
        const { docs } = await payload.find({
            collection: "pages",
            where: {
                path: {
                    contains: PageService.stringifyPath(segments.slice(
                        0,
                        segmentIndex
                    ))
                }
            },
            depth: 0
        });

        const page = docs.at(0);
        if(isDefined(page)) {
            return {
                ...page,
                index: segmentIndex - 1
            };
        }

        const nextIndex = segmentIndex - 1;
        if(nextIndex > 0) {
            return await findFirstExistingPageId(payload)(
                segments,
                nextIndex
            );
        }

        return undefined;
    };
