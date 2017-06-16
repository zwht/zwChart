/**
 * Created by zhaowei on 17/5/10.
 */
var ChartInit = require("./chartInit"),
    ChartServer = require("./chartServer"),
    ChartType = require("./chartType");
var zwChart = {
    init: function (dom) {
        return new ChartInit(dom);
    },
    chartServer: function (chartData, chartObj, style) {
        return (new ChartServer(chartData, chartObj, style)).option;
    },
    chartType: ChartType
};

window.zwChart = zwChart;
module.exports = zwChart;


if (!Object.assign) {
    Object.defineProperty(Object, "assign", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (target, firstSource) {
            "use strict";
            if (target === undefined || target === null)
                throw new TypeError("Cannot convert first argument to object");
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) continue;
                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
                }
            }
            return to;
        }
    });
}
Array.prototype.sum = function () {
    for (var sum = i = 0; i < this.length; i++)sum += parseInt(this[i]);
    return sum;
};
Array.prototype.maxima = function () {
    for (var i = 0, maxValue = Number.MIN_VALUE; i < this.length; i++)parseInt(this[i]) > maxValue && (maxValue = this[i]);
    return maxValue;
};

Array.prototype.unique = function () {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}
