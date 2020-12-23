"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjTolocation = exports.locationToObj = exports.paramsHandler = void 0;
var paramsHandler = function (window) {
    var params = {};
    var triggerListener = function (el, k) {
        triggerEvent(window.document, window.document, el);
    };
    var specialGetter = function () {
        return window.location.search;
    };
    var specialSetter = function (newSet) {
        window.history.pushState('page2', 'Title', newSet);
    };
    var init = {
        get params() {
            params = locationToObj(specialGetter());
            return params;
        },
        set params(np) {
            console.error("You can't set this value, its readonly.. caon't you read??");
            console.info("We might add this feature in the future.");
        },
        set: function (name, value) {
            params = locationToObj(specialGetter());
            params[name] = value;
            specialSetter(ObjTolocation(params));
            // trigger specific
            triggerListener("searchLocationspecific_" + name, value);
            // trigger all
            triggerListener("searchLocationChanged", value);
        },
        get: function (name) {
            return locationToObj(specialGetter())[name];
        },
        exists: function (name) {
            return locationToObj(specialGetter())[name] != undefined;
        },
        on: function (event, a, b) {
            switch (event) {
                case "change":
                    if (typeof a == typeof "string") {
                        console.log("type2");
                        window.document.addEventListener("searchLocationspecific_" + a, function () { return b(init); }, false);
                    }
                    else {
                        console.log("type1");
                        window.document.addEventListener("searchLocationChanged", function () { return a(init); }, false);
                    }
                    break;
                default:
                    console.error("the event that you specified doens't exists");
                    break;
            }
        }
    };
    return init;
};
exports.paramsHandler = paramsHandler;
function locationToObj(searchstr) {
    var __k = searchstr.split("?");
    var urlparams = __k.slice(1, __k.length).join("") || "";
    if (urlparams == '')
        return {};
    var urlParams = urlparams.split("&");
    var params = {};
    urlParams.forEach(function (p) {
        var lame = p.split("=");
        var one = lame[0];
        var lame2 = "";
        if (lame.length === 1) {
            lame2 = true;
        }
        else {
            lame2 = lame.splice(1, lame.length - 1).join("=");
            lame2 = lame2 == "true" ? true : decodeURI(lame2);
            lame2 = lame2 == "false" ? false : decodeURI(lame2);
        }
        params[one] = lame2;
    });
    return params;
}
exports.locationToObj = locationToObj;
function ObjTolocation(obj) {
    var arr = [];
    Object.keys(obj).forEach(function (key) {
        arr.push(key + "=" + obj[key]);
    });
    return "?" + arr.join("&");
}
exports.ObjTolocation = ObjTolocation;
function triggerEvent(document, el, type) {
    // IE9+ and other modern browsers
    if ('createEvent' in document) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    }
}
