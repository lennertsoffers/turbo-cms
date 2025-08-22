export class GlobalRef<T> {

    private readonly sym: symbol;

    public constructor(name: string) {
        this.sym = Symbol.for(name);
    }

    public get value() {
        return (global as any)[this.sym] as T;
    }

    public set value(value: T) {
        (global as any)[this.sym] = value;
    }

}
