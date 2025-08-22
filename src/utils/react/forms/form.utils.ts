import {
    z,
    ZodObject,
    ZodRawShape
} from "zod";

import {
    ErrorFromActionState,
    FormActionState,
    FormActionStateType
} from "@/types/next/action/form-action.types";

type GetAsString =
    (formData: FormData) =>
    (key: string) => string | undefined;
export const getAsString: GetAsString =
    (formData) =>
    (key) => {
        const entry = formData.get(key) ?? undefined;

        if(!entry || typeof entry === "string") return entry;

        return entry.name;
    };

export const validateInput = <TSchema extends ZodObject<ZodRawShape>>(
      schema: TSchema,
      formData: FormData
) => {
    type SchemaType = z.infer<TSchema>;

    const model = Object
        .keys(schema.shape)
        .reduce<Partial<SchemaType>>(
            (partialModel, key) => {
                return {
                    ...partialModel,
                    [key]: formData.get(key)
                };
            },
            {}
        );

    const validatedFields = schema.safeParse(model) as z.SafeParseReturnType<
        SchemaType,
        SchemaType
    >;

    const buildErrorResponse = (
        extraErrors?: Partial<z.typeToFlattenedError<SchemaType>>
      ): ErrorFromActionState<SchemaType> => ({
          type: FormActionStateType.ERROR,
          fieldValues: model,
          formErrors: extraErrors?.formErrors,
          fieldErrors: {
              ...validatedFields.error?.flatten().fieldErrors,
              ...extraErrors?.fieldErrors
          }
      });

    return {
        rawFields: model,
        validatedFields: validatedFields,
        buildErrorResponse: buildErrorResponse
    };
};

export const getStateValues = <
    TState extends object,
    TFieldValues extends object
>(formState: FormActionState<TState, TFieldValues>) => {
    const fieldValues = formState.type !== FormActionStateType.SUCCESS
        ? formState.fieldValues
        : undefined;

    const fieldErrors = formState.type === FormActionStateType.ERROR
        ? formState.fieldErrors
        : undefined;

    const formErrors = formState.type === FormActionStateType.ERROR
        ? formState.formErrors
        : undefined;

    return {
        fieldValues: fieldValues,
        fieldErrors: fieldErrors,
        formErrors: formErrors
    };
};
