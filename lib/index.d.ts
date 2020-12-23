interface Init {
    set: Function;
    get: Function;
    params: any;
    exists: (type: string) => boolean;
    on: (event: string, a: any, b: any) => void;
}
export declare class QParamer {
    window: Window;
    private _params;
    constructor(window: Window);
    triggerListener(el: string, k: any): void;
    specialGetter(): string;
    specialSetter(newSet: string): void;
    get params(): any;
    set params(np: any);
    set(name: string, value: string): void;
    get(name: string): any;
    exists(name: string): boolean;
    on(event: string, a: any, b: any): void;
}
export declare function ParamsHandler(window: Window): Init;
export declare function locationToObj(searchstr: string): any;
export declare function ObjTolocation(obj: any): string;
export declare function triggerEvent(document: Document, el: any, type: string): void;
export {};
