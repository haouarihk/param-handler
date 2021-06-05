interface Init {
    set: Function;
    get: Function;
    params: any;
    exists: (type: string) => boolean;
    on: (event: string, a: any, b: any) => void;
}
/** this is the class that is gonna make your life 1% easier, if you're into classes
 * @param window is the window from your virtual dom
*/
export default class PH {
    window: Window;
    private _params;
    /** this is the function that is responsible of getting the queryString
     */
    specialGetter: () => string;
    /** this is the function that is responsible of setting the queryString
     * @param newSet is the new value for window.location.search
     */
    specialSetter: (newSet: string) => void;
    constructor(window: Window);
    triggerListener(el: string, k: any): void;
    get params(): any;
    set params(_np: any);
    /** this function setts a variable to a value
     * @param name is the name of the variable
     * @param value is the new value for the variable
     * @returns void
    */
    set(name: string, value?: any): void;
    /** this function gets a variable value
     * @param name is the name of the variable that you wanna get its value
     * @param dif is the default value when its not set
     * @param reverse this will be used to reverse the answer only when its a boolean
     *
     */
    get(name: string, dif?: any, reverse?: boolean): any;
    /** this function checks if a variable exists
     * @param name the name of the variable that you wanna check if it exists
    */
    exists(name: string): boolean;
    /** this function for event listeners
     * @param event - can be "change" - when the whole query changes or when a specific one changes
     * @param a - can be the callback function or the name of the variable that you wanna watch
     * @param b - optional can be the callback if a is the name of the variable and not a cb
     */
    on(event: string, a: any, b: any): void;
}
/** this will create the object
 * @param window is the window from your virtual dom
 */
export declare function ParamsHandler(window: Window): Init;
export declare function locationToObj(searchstr: string): any;
export declare function ObjTolocation(obj: any): string;
export declare function triggerEvent(document: Document, el: any, type: string): void;
/** handles undefenition */
export declare function valueHandler(prm: any, oud?: any, reverse?: boolean): any;
export {};
