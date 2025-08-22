type Promisify =
    <TArgs extends Array<any>, TReturn>(
        fn: (...args: TArgs) => TReturn
    ) =>
    (...args: TArgs) => Promise<TReturn>;
export const promisify: Promisify =
    (fn) =>
    async (...args) =>
        fn(...args);
