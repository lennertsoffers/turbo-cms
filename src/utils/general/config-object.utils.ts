type DefaultValue<TValue> = { default: TValue };

export const createConfigObject =
    <TKey extends string | number | symbol, TValue>() =>
    <TConfig extends Partial<Record<TKey, TValue> & DefaultValue<TValue>>>(config: TConfig) =>
    (key: TKey) =>
        (config[key] as TValue | undefined) ??
        (config?.default as TConfig extends DefaultValue<TValue> ? TValue : undefined);

type Config<TResult> = {
    condition: (...args: any) => boolean;
    result: TResult;
};
export const createConditionObject =
    <TResult>(configs: Config<TResult>[]) =>
    <TDefaultValue extends TResult>(defaultValue?: TDefaultValue) =>
    (...args: any) =>
        configs.find(({ condition }) => condition(...args))?.result ??
        (defaultValue as TDefaultValue extends undefined ? TResult | undefined : TResult);
