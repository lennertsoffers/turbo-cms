export const LocalStorageKey = {
    PANE_STATES: "PANE_STATES"
} as const;
export type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey];

export const SessionStorageKey = {} as const;
export type SessionStorageKey = (typeof SessionStorageKey)[keyof typeof SessionStorageKey];
