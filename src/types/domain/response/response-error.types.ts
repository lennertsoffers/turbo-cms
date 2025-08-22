export type ResponseError<TData> = {
    message?: {
        content: string;
        type: "error" | "info" | "warn";
    };
    data?: TData;
};
