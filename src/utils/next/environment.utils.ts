type IsClient = () => boolean;
export const isClient: IsClient = () => typeof window !== "undefined";

type IsServer = () => boolean;
export const isServer: IsServer = () => !isClient();
