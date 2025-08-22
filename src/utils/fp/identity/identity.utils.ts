type Identity = <TValue>(value: TValue) => TValue;
export const identity: Identity = (value) => value;

type IdentityPromise = <TValue>(value: TValue) => Promise<TValue>;
export const identityPromise: IdentityPromise = (value) => Promise.resolve(value);
