



export var paramsHandler = (p: { specialGetter: () => string, specialSetter: (newSet: string) => void }) => {



    let triggerListener = (el: string, k: any) => {
        document.dispatchEvent(new CustomEvent(el, k));
    }


    let specialGetter = () => {
        return location.search
    }
    if (p.specialGetter != undefined)
        specialGetter = p.specialGetter

    let specialSetter = (newSet: string) => {
        window.history.pushState('page2', 'Title', `?${newSet}`)
    }
    if (p.specialSetter != undefined)
        specialSetter = p.specialSetter


    return {
        set: (name: string, value: string) => {
            let params: any = locationToObj(specialGetter())
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
        on: (event: string, a: any, b: EventListenerOrEventListenerObject) => {
            switch (event) {
                case "change":
                    if (typeof a == typeof "string") {
                        document.addEventListener(`searchLocationspecific_${a}`, b, false)
                    } else
                        document.addEventListener("searchLocationChanged", a, false)
                    break;

                default:
                    console.error("the event that you specified doens't exists")
                    break;
            }
        }
    }
}



export function locationToObj(location: string): any {
    let __k = location.split("?")
    let urlparams: string = __k.slice(1, __k.length).join("") || "";
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
