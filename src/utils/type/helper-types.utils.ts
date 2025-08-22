export type RecursiveRecord<TValue> = {
    [key: string]: RecursiveRecord<TValue> | TValue;
};

export type Resolve<TResolve> = (value: PromiseLike<TResolve> | TResolve) => void;
