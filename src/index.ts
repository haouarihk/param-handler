
interface Init{
    set:Function;
    get:Function;
    params:any;
    exists:(type:string)=>boolean;
    on:(event:string,a:any,b:any)=>void;
}

export var paramsHandler = (window: Window) => {
    let params: any = {}
    let triggerListener = (el: string, k: any) => {
        triggerEvent(window.document, window.document, el)
    }

    let specialGetter = () => {
        return window.location.search
    }

    let specialSetter = (newSet: string) => {
        window.history.pushState('page2', 'Title', newSet)
    }

    let init:Init = {
        get params() {
            params = locationToObj(specialGetter())
            return params
        },
        set params(np) {
            console.error("You can't set this value, its readonly.. caon't you read??")
            console.info("We might add this feature in the future.")
        }
        ,
        set: (name: string, value: string) => {
            params = locationToObj(specialGetter())
            params[name] = value;
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
                        console.log("type2")
                        window.document.addEventListener(`searchLocationspecific_${a}`,()=>b(init), false)
                    } else{
                        console.log("type1")
                        window.document.addEventListener("searchLocationChanged", ()=>a(init), false)
                    }
                    break;

                default:
                    console.error("the event that you specified doens't exists")
                    break;
            }
        }
    }
    return init
}


export function locationToObj(searchstr: string): any {
    let __k = searchstr.split("?")
    let urlparams: string = __k.slice(1, __k.length).join("") || "";
    if (urlparams == '') return {}
    let urlParams: string[] = urlparams.split(`&`);

    let params: any = {};
    urlParams.forEach((p) => {
        let lame = p.split(`=`);

        let one = lame[0];
        let lame2: any = "";
        if (lame.length === 1) {
            lame2 = true;
        } else {
            lame2 = lame.splice(1, lame.length - 1).join(`=`);
            lame2 = lame2 == "true" ? true : decodeURI(lame2);
            lame2 = lame2 == "false" ? false : decodeURI(lame2);
        }

        params[one] = lame2
    });
    return params
}

export function ObjTolocation(obj: any): string {

    let arr: string[] = []
    Object.keys(obj).forEach(key => {
        arr.push(`${key}=${obj[key]}`)
    })

    return `?${arr.join("&")}`
}


function triggerEvent(document: Document, el: any, type: string) {
    // IE9+ and other modern browsers
    if ('createEvent' in document) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    }
}