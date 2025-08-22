
// State

import { AuthorStore } from "./author.types";

export const getSelections = (store: AuthorStore) => store.selections;

export const getActivePanel = (store: AuthorStore) => store.active;

export const getSelectedComponent = (store: AuthorStore) => store.selections?.lastSelection;

export const getDeviceType = (store: AuthorStore) => store.deviceType;

export const getZoom = (store: AuthorStore) => store.zoom;

export const getComponent = (store: AuthorStore) => store.component;

export const getActiveComponent = (store: AuthorStore) => store.activeComponent;

export const getActiveParent = (store: AuthorStore) => store.activeParent;

export const getOverId = (store: AuthorStore) => store.overId;

export const getHoverId = (store: AuthorStore) => store.hoverId;

export const getHoverParentId = (store: AuthorStore) => store.hoverParentId;

// Actions

export const setSelections = (store: AuthorStore) => store.setSelections;

export const setActivePanel = (store: AuthorStore) => store.setActive;

export const setDeviceType = (store: AuthorStore) => store.setDeviceType;

export const setZoom = (store: AuthorStore) => store.setZoom;

export const setComponent = (store: AuthorStore) => store.setComponent;

export const setActiveComponent = (store: AuthorStore) => store.setActiveComponent;

export const setActiveParent = (store: AuthorStore) => store.setActiveParent;

export const setOverId = (store: AuthorStore) => store.setOverId;

export const setHoverId = (store: AuthorStore) => store.setHoverId;

export const setHoverParentId = (store: AuthorStore) => store.setHoverParentId;

export const changeHover = (store: AuthorStore) => store.changeHover;

export const dragStart = (store: AuthorStore) => store.dragStart;

export const dragCancel = (store: AuthorStore) => store.dragCancel;

export const dragOver = (store: AuthorStore) => store.dragOver;

export const dragEnd = (store: AuthorStore) => store.dragEnd;
