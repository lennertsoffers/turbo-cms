type Json = <TJson>(reqRes: Request | Response) => Promise<TJson>;
export const json: Json = <TJson>(reqRes: Request | Response) => reqRes.json() as Promise<TJson>;
