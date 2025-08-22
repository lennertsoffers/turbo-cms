export type KeyOf<TObject extends object> = keyof TObject;

export type ValueOf<TObject extends object> = TObject[keyof TObject];
