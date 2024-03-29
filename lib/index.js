"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueHandler = exports.triggerEvent = exports.ObjTolocation = exports.locationToObj = exports.ParamsHandler = void 0;
/** this is the class that is gonna make your life 1% easier, if you're into classes
 * @param window is the window from your virtual dom
*/
var PH = /** @class */ (function () {
    function PH(window) {
        var _this = this;
        this.window = window;
        this._params = {};
        this.specialGetter = function () {
            return decodeURIComponent(_this.window.location.search);
        };
        this.specialSetter = function (newSet) {
            _this.window.history.pushState('page2', 'Title', newSet);
        };
    }
    PH.prototype.triggerListener = function (el, k) {
        triggerEvent(this.window.document, this.window.document, el);
    };
    Object.defineProperty(PH.prototype, "params", {
        get: function () {
            this._params = locationToObj(this.specialGetter());
            return this._params;
        },
        set: function (_np) {
            console.error("You can't set this value, its readonly.. caon't you read??");
            console.info("We might add this feature in the future.");
        },
        enumerable: false,
        configurable: true
    });
    /** this function setts a variable to a value
     * @param name is the name of the variable
     * @param value is the new value for the variable
     * @returns void
    */
    PH.prototype.set = function (name, value) {
        if (value === void 0) { value = true; }
        var _inter = this.specialGetter();
        this._params = locationToObj(_inter);
        // check if unset then don't add it to the query
        // if (value == undefined)
        //     if (!this._params[name]) return;
        this._params[name] = value === true || value === false ? value : encodeURIComponent(value);
        var _outer = ObjTolocation(this._params);
        this.specialSetter(_outer);
        // trigger specific
        this.triggerListener("searchLocationspecific_" + name, value);
        // trigger all
        this.triggerListener("searchLocationChanged", value);
    };
    /** this function gets a variable value
     * @param name is the name of the variable that you wanna get its value
     * @param dif is the default value when its not set
     * @param reverse this will be used to reverse the answer only when its a boolean
     *
     */
    PH.prototype.get = function (name, dif, reverse) {
        if (reverse === void 0) { reverse = false; }
        return valueHandler(locationToObj(this.specialGetter())[name], dif, reverse);
    };
    /** this function checks if a variable exists
     * @param name the name of the variable that you wanna check if it exists
    */
    PH.prototype.exists = function (name) {
        return locationToObj(this.specialGetter())[name] != undefined;
    };
    /** this function for event listeners
     * @param event - can be "change" - when the whole query changes or when a specific one changes
     * @param a - can be the callback function or the name of the variable that you wanna watch
     * @param b - optional can be the callback if a is the name of the variable and not a cb
     */
    PH.prototype.on = function (event, a, b) {
        var _this = this;
        switch (event) {
            case "change":
                if (typeof a == typeof "string") {
                    this.window.document.addEventListener("searchLocationspecific_" + a, function () { return b(_this.params[a], _this); }, false);
                }
                else {
                    this.window.document.addEventListener("searchLocationChanged", function () { return a(_this.params, _this); }, false);
                }
                break;
            default:
                console.error("the event that you specified doens't exists");
                break;
        }
    };
    return PH;
}());
exports.default = PH;
/** this will create the object
 * @param window is the window from your virtual dom
 */
function ParamsHandler(window) {
    var params = {};
    var triggerListener = function (el, k) {
        triggerEvent(window.document, window.document, el);
    };
    var specialGetter = function () {
        return decodeURIComponent(window.location.search);
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
            params[name] = encodeURIComponent(value);
            specialSetter(ObjTolocation(params));
            // trigger specific
            triggerListener("searchLocationspecific_" + name, value);
            // trigger all
            triggerListener("searchLocationChanged", value);
        },
        get: function (name, oud, reverse) {
            if (reverse === void 0) { reverse = false; }
            return valueHandler(locationToObj(specialGetter())[name], oud, reverse);
        },
        exists: function (name) {
            return locationToObj(specialGetter())[name] != undefined;
        },
        on: function (event, a, b) {
            switch (event) {
                case "change":
                    if (typeof a == typeof "string") {
                        window.document.addEventListener("searchLocationspecific_" + a, function () { return b(init.get(a), init); }, false);
                    }
                    else {
                        window.document.addEventListener("searchLocationChanged", function () { return a(init.params, init); }, false);
                    }
                    break;
                default:
                    console.error("the event that you specified doens't exists");
                    break;
            }
        }
    };
    return init;
}
exports.ParamsHandler = ParamsHandler;
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
            lame2 = valueHandler(lame2, false);
            // if (!isNaN(parseFloat(lame2)))
            //     lame2 = parseFloat(lame2)
            // else {
            //     lame2 = lame2 == "true" ? true : decodeURI(lame2);
            //     lame2 = lame2 == "false" ? false : decodeURI(lame2);
            // }
        }
        params[one] = lame2;
    });
    //console.log(params)
    return params;
}
exports.locationToObj = locationToObj;
function ObjTolocation(obj) {
    var arr = [];
    Object.keys(obj).forEach(function (key) {
        if (obj[key] === true)
            arr.push("" + encodeURIComponent(key));
        else
            arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
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
exports.triggerEvent = triggerEvent;
/** handles undefenition */
function valueHandler(prm, oud, reverse) {
    if (reverse === void 0) { reverse = false; }
    // true or false
    if (!isNaN(parseFloat(prm)))
        return parseFloat(prm);
    else {
        if (prm == "true" || prm === true)
            return !reverse;
        if (prm == "false" || prm === false)
            return reverse;
    }
    // undefined means unset
    if (prm === undefined || prm == "undefined")
        return oud;
    // null means it's selected => true
    else if (prm === null)
        return !reverse;
    // on string
    else
        return prm;
}
exports.valueHandler = valueHandler;
