import {
    PaneType,
    PaneTypeEnum
} from "@/config/panes/enums/pane-type.enum";
import { SearchParams } from "@/types/next/params/search-params.types";
import { values } from "@/utils/general/object.utils";

type IsPane = (pane: string) => pane is PaneTypeEnum;
export const isPane: IsPane =
    (pane): pane is PaneTypeEnum =>
        values(PaneType)
            .some((validPane) => validPane === pane);

type GetOpenPaneSearchParams =
    (searchParams: SearchParams) =>
    (pane: string) => string;
export const getOpenPaneSearchParams: GetOpenPaneSearchParams =
    (searchParams) =>
    (pane) => searchParams;

