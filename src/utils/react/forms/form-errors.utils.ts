import {
    FieldValues,
    FormState
} from "react-hook-form";

export const createGetError =
    <TFormData extends FieldValues>(formState: FormState<TFormData>) =>
    (name: keyof FormState<TFormData>["errors"]) =>
        formState.errors[name]?.message;
