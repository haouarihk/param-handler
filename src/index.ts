import queryString = require('query-string');


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
export class QParamer {
    window: Window
    private _params: any

    /** this is the function that is responsible of getting the queryString
     */
    specialGetter: () => string;

    /** this is the function that is responsible of setting the queryString
     * @param newSet is the new value for window.location.search
     */
    specialSetter: (newSet: string) => void;

    constructor(window: Window) {
        this.window = window
        this._params = {}
        this.specialGetter = () => {
            return decodeURIComponent(this.window.location.search)
        }
        this.specialSetter = (newSet: string) => {
            this.window.history.pushState('page2', 'Title', newSet)
        }
    }

    triggerListener(el: string, k: any) {
        triggerEvent(this.window.document, this.window.document, el)
    }





    get params() {
        this._params = locationToObj(this.specialGetter())
        return this._params
    }

    set params(np) {
        console.error("You can't set this value, its readonly.. caon't you read??")
        console.info("We might add this feature in the future.")
    }

    /** this function setts a variable to a value
     * @param name is the name of the variable
     * @param value is the new value for the variable
     * @returns null
    */
    set(name: string, value: string) {
        this._params = locationToObj(this.specialGetter())
        this._params[name] = encodeURIComponent(value)
        this.specialSetter(ObjTolocation(this._params))
        // trigger specific
        this.triggerListener(`searchLocationspecific_${name}`, value)
        // trigger all
        this.triggerListener("searchLocationChanged", value)
    }

    /** this function gets a variable value
     * @param name is the name of the variable that you wanna get its value
     */
    get(name: string) {
        return locationToObj(this.specialGetter())[name]
    }

    /** this function checks if a variable exists
     * @param name the name of the variable that you wanna check if it exists
    */
    exists(name: string) {
        return locationToObj(this.specialGetter())[name] != undefined
    }

    /** this function for event listeners
     * @param event - can be "change" - when the whole query changes or when a specific one changes
     * @param a - can be the callback function or the name of the variable that you wanna watch
     * @param b - optional can be the callback if a is the name of the variable and not a cb
     */
    on(event: string, a: any, b: any) {
        switch (event) {
            case "change":
                if (typeof a == typeof "string") {
                    this.window.document.addEventListener(`searchLocationspecific_${a}`, () => b(this.params[a], this), false)
                } else {
                    this.window.document.addEventListener("searchLocationChanged", () => a(this.params, this), false)
                }
                break

            default:
                console.error("the event that you specified doens't exists")
                break
        }
    }


}



/** this will create the object
 * @param window is the window from your virtual dom
 */
export function ParamsHandler(window: Window) {
    let params: any = {}
    let triggerListener = (el: string, k: any) => {
        triggerEvent(window.document, window.document, el)
    }

    let specialGetter = () => {
        return decodeURIComponent(window.location.search)
    }

    let specialSetter = (newSet: string) => {
        window.history.pushState('page2', 'Title', newSet)
    }

    let init: Init = {
        get params() {
            params = locationToObj(specialGetter())
            return params
        },
        set params(np) {
            console.error("You can't set this value, its readonly.. caon't you read??")
            console.info("We might add this feature in the future.")
        },

        set: (name: string, value: string) => {
            params = locationToObj(specialGetter())
            params[name] = encodeURIComponent(value)
            specialSetter(ObjTolocation(params))
            // trigger specific
            triggerListener(`searchLocationspecific_${name}`, value)
            // trigger all
            triggerListener("searchLocationChanged", value)
        },
        get: (name: string) => {
            return locationToObj(specialGetter())[name]
        },
        exists: (name: string) => {
            return locationToObj(specialGetter())[name] != undefined
        },
        on: (event: string, a: any, b: any) => {
            switch (event) {
                case "change":
                    if (typeof a == typeof "string") {
                        window.document.addEventListener(`searchLocationspecific_${a}`, () => b(init.get(a), init), false)
                    } else {
                        window.document.addEventListener("searchLocationChanged", () => a(init.params, init), false)
                    }
                    break

                default:
                    console.error("the event that you specified doens't exists")
                    break
            }
        }
    }
    return init
}


export function locationToObj(searchstr: string): any {
    return queryString.parse(searchstr)
}

export function ObjTolocation(obj: any): string {
    let arr: string[] = []
    Object.keys(obj).forEach(key => {
        arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    })

    return `?${arr.join("&")}`
}


export function triggerEvent(document: Document, el: any, type: string) {
    // IE9+ and other modern browsers
    if ('createEvent' in document) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    }
}