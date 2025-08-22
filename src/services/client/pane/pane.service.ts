import { PaneTypeEnum } from "@/config/panes/enums/pane-type.enum";
import { LocalStorageKey } from "@/services/client/storage/storage.config";
import { Id } from "@/types/domain/id.types";
import { extracting } from "@/utils/general/array.utils";
import {
    entries,
    isDefined
} from "@/utils/general/object.utils";

import * as LocalStorageService from "../storage/localstorage.service";

import { PaneStateRecord } from "./types/pane-state-record.types";
import { PanesState } from "./types/panes-state.types";

type BuildState = (paneStateRecords: (PaneStateRecord<PaneTypeEnum> | undefined)[]) => PanesState;

export const buildState: BuildState = (paneStateRecords) => paneStateRecords.reduce<PanesState>(
    (state, pane) => {
        if(!isDefined(pane)) return state;

        return {
            ...state,
            [pane.id]: pane
        };
    },
    {}
);

type DestructState = (state: PanesState) => PaneStateRecord<PaneTypeEnum>[];

export const destructState: DestructState = (state) => Object.values(state);

type GetState = () => PanesState;

export const getState: GetState = () => {
    const persistedPaneState = LocalStorageService.getObject<PanesState>(
        LocalStorageKey.PANE_STATES
    );

    const persistedPanes = entries(persistedPaneState)
        .map(extracting("1"));

    return buildState(persistedPanes);
};

type SaveState = (state: PanesState) => void;

export const saveState: SaveState = (state) => LocalStorageService.setObject<PanesState>(
    LocalStorageKey.PANE_STATES,
    state
);

type AddPaneStateRecord =
    (panesState: PanesState) =>
    (paneStateRecord: PaneStateRecord) => PanesState;

export const addPaneStateRecord: AddPaneStateRecord =
    (panesState) =>
    (paneStateRecord) => {
        const newPanesState = {
            [paneStateRecord.id]: paneStateRecord
        };

        if(!isDefined(paneStateRecord.parentId)) return newPanesState;

        const parentPaneStateRecord = panesState[paneStateRecord.parentId];
        if(!isDefined(parentPaneStateRecord)) return newPanesState;

        return {
            ...panesState,
            [paneStateRecord.parentId]: {
                ...parentPaneStateRecord,
                childId: paneStateRecord.id
            },
            [paneStateRecord.id]: paneStateRecord
        };
    };

type UpdatePaneStateRecord =
    (panesState: PanesState) =>
    (id: Id, paneStateRecord: Partial<PaneStateRecord>) => PanesState;

export const updatePaneStateRecord: UpdatePaneStateRecord =
    (panesState) =>
    (id, paneStateRecord) => {
        const currentPaneStateRecord = panesState[id];
        if(!isDefined(currentPaneStateRecord)) return panesState;

        return {
            ...panesState,
            [id]: {
                ...currentPaneStateRecord,
                ...paneStateRecord
            }
        };
    };

type GetChildIdsRecursive = (id: Id, childIds?: Id[]) => Id[];

type GetChildIds = (panesState: PanesState) => GetChildIdsRecursive;

export const getChildIds: GetChildIds =
    (panesState) => {
        const getChildIdsRecursive: GetChildIdsRecursive = (
            id,
            childIds = []
        ) => {
            const newChildIds = [
                ...childIds,
                id
            ];

            const paneStateRecord = panesState[id];
            if(!isDefined(paneStateRecord?.childId)) return newChildIds;

            return getChildIdsRecursive(
                paneStateRecord.childId,
                newChildIds
            );
        };

        return getChildIdsRecursive;
    };

type GetParentIdsRecursive = (id: Id, childIds?: Id[]) => Id[];

type GetParentIds = (panesState: PanesState) => GetParentIdsRecursive;

export const getParentIds: GetParentIds =
    (panesState) => {
        const getParentIdsRecursive: GetParentIdsRecursive = (
            id,
            parentIds = []
        ) => {
            const newParentIds = [
                ...parentIds,
                id
            ];

            const paneStateRecord = panesState[id];
            if(!isDefined(paneStateRecord?.parentId)) return newParentIds;

            return getParentIdsRecursive(
                paneStateRecord.parentId,
                newParentIds
            );
        };

        return getParentIdsRecursive;
    };

type GetLastPaneId = () => Id | null;

export const getLastPaneId: GetLastPaneId = () => destructState(getState())
    .find(({ childId }) => childId === null)?.id ?? null;
