import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation";

import { PaneTypeEnum } from "@/config/panes/enums/pane-type.enum";
import * as EventService from "@/services/client/event/event.service";
import { PaneOpenEvent } from "@/services/client/event/models/pane-open.event";
import { entries } from "@/utils/general/object.utils";

export const usePane = () => {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const openPane = (pane: PaneTypeEnum, extraParams?: Record<string, string | string[]>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.append(
            "panes",
            pane
        );

        entries(extraParams ?? {})
            .forEach(([
                key,
                value
            ]) => {
                if(Array.isArray(value)) {
                    params.delete(key);
                    value.forEach((val) => params.append(
                        key,
                        val
                    ));
                } else {
                    params.set(
                        key,
                        value
                    );
                }
            });

        router.push(`${pathName}?${params}`);

        EventService.dispatch(new PaneOpenEvent(
            pane
        ));

        return {
            pathName: pathName,
            searchParams: params
        };
    };

    const replacePane = (oldPane: PaneTypeEnum, newPane: PaneTypeEnum) => {
        const params = new URLSearchParams(searchParams.toString());
        const panes = params.getAll("panes");

        const paneIndex = panes.indexOf(oldPane);
        params.delete("panes");
        panes.slice(
            0,
            paneIndex
        )
            .forEach((previousPane) => params.append(
                "panes",
                previousPane
            ));

        params.append(
            "panes",
            newPane
        );

        router.push(`${pathName}?${params}`);

        EventService.dispatch(new PaneEvent(
            oldPane,
            "close"
        ));
        EventService.dispatch(new PaneEvent(
            newPane,
            "open"
        ));

        return {
            pathName: pathName,
            searchParams: params
        };
    };

    const closePane = (pane: PaneTypeEnum) => {
        EventService.dispatch(new PaneEvent(
            pane,
            "close"
        ));
    };

    const getLevel = (pane: PaneTypeEnum) => {
        const panes = searchParams
            .getAll("panes");

        const level = searchParams
            .getAll("panes")
            .indexOf(pane);

        return level === -1
            ? panes.length
            : level;
    };

    return {
        // isPaneOpen: isPaneOpen,
        openPane: openPane,
        replacePane: replacePane,
        closePane: closePane,
        getLevel: getLevel
    };
};
