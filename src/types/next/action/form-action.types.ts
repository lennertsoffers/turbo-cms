export const FormActionStateType = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    INITIAL: "INITIAL"
} as const;

export type SuccessFormActionState<TState extends object> = {
    type: typeof FormActionStateType.SUCCESS;
    data: TState;
};

export type ErrorFromActionState<TFieldValues extends object> = {
    type: typeof FormActionStateType.ERROR;
    formErrors?: string[];
    fieldErrors?: Partial<{
        [TKey in keyof TFieldValues]: string[] | undefined;
    }>;
    fieldValues?: Partial<{
        [TKey in keyof TFieldValues]: string | undefined;
    }>;
};

export type InitialFormActionState<TFieldValues extends object> = {
    type: typeof FormActionStateType.INITIAL;
    fieldValues?: Partial<{
        [TKey in keyof TFieldValues]: string | undefined;
    }>;
};

export type FormActionState<
    TState extends object,
    TFieldValues extends object
> =
  | ErrorFromActionState<TFieldValues>
  | InitialFormActionState<TState>
  | SuccessFormActionState<TState>;

export type FormAction<TState extends object, TFieldValues extends object> = (
    previousState: FormActionState<TState, TFieldValues>,
    formData: FormData,
) => Promise<FormActionState<TState, TFieldValues>>;
