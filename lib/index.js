"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerEvent = exports.ObjTolocation = exports.locationToObj = exports.ParamsHandler = exports.QParamer = void 0;
var queryString = require("query-string");
var QParamer = /** @class */ (function () {
    function QParamer(window) {
        this.window = window;
        this._params = {};
    }
    QParamer.prototype.triggerListener = function (el, k) {
        triggerEvent(this.window.document, this.window.document, el);
    };
    QParamer.prototype.specialGetter = function () {
        return this.window.location.search;
    };
    QParamer.prototype.specialSetter = function (newSet) {
        this.window.history.pushState('page2', 'Title', newSet);
    };
    Object.defineProperty(QParamer.prototype, "params", {
        get: function () {
            this._params = locationToObj(this.specialGetter());
            return this._params;
        },
        set: function (np) {
            console.error("You can't set this value, its readonly.. caon't you read??");
            console.info("We might add this feature in the future.");
        },
        enumerable: false,
        configurable: true
    });
    QParamer.prototype.set = function (name, value) {
        this._params = locationToObj(this.specialGetter());
        this._params[name] = value;
        this.specialSetter(ObjTolocation(this._params));
        // trigger specific
        this.triggerListener("searchLocationspecific_" + name, value);
        // trigger all
        this.triggerListener("searchLocationChanged", value);
    };
    QParamer.prototype.get = function (name) {
        return locationToObj(this.specialGetter())[name];
    };
    QParamer.prototype.exists = function (name) {
        return locationToObj(this.specialGetter())[name] != undefined;
    };
    QParamer.prototype.on = function (event, a, b) {
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
    return QParamer;
}());
exports.QParamer = QParamer;
function ParamsHandler(window) {
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
    return queryString.parse(searchstr);
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
exports.triggerEvent = triggerEvent;
