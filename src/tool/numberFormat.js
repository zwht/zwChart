/**
 * Created by zhaowei on 17/5/24.
 */
var numberFormat = {
    //设置y轴数据格式单位
    formatter: function (v) {
        var str = "";
        if (v.constructor!=Array) {
            v = [v];
            str = "<b style='font-size: 16px; font-weight: bold'>" + v[0].name + '</b><br/>';
        } else {
            str = "<b style='font-size: 16px; font-weight: bold'>" + v[0].name + '</b><br/>';
            for(var i=0;i<v.length;i++){
            		if (v[i].value != null && v[i].value != undefined) {
                    str += "<i style='display: inline-block; margin: 0 4px; height: 10px; width: 10px; border-radius: 5px;" +
                        " background: " + v[i].color + "'></i>";
                    str += v[i].seriesName + ' : ' + setNumberFormat(v[i]) + '<br/>';
                }
            }
           
        }

        return str;
    },
    numberFormatInitData: function (chartObj) {

        for (var i = 0; i < chartObj.yAxis.length; i++) {
            for (var j = 0; j < chartObj.rule.numberFormat.length; j++) {
                if (chartObj.yAxis[i].colId == chartObj.rule.numberFormat[j].analyzeMapId) {
                    chartObj.yAxis[i].numberFormat = chartObj.rule.numberFormat[j];
                }
            }
        }
        if (chartObj.yAxis.length == 1 && chartObj.yAxis[0].numberFormat && chartObj.yAxis[0].numberFormat.unit) {
            chartObj.yAxis[0].data = chartObj.yAxis[0].data.map(function (item) {
                return setValueUnite(item, chartObj.rule.numberFormat[0].unit)
            });
            chartObj.unit = setValueUnite("中文", chartObj.rule.numberFormat[0].unit);
        }
        if (chartObj.yAxis.length > 1) {
            var units = [];
            for (var i = 0; i < chartObj.yAxis.length; i++) {
                if (chartObj.yAxis[i].numberFormat && chartObj.yAxis[i].numberFormat.unit) {
                    units.push(chartObj.yAxis[i].numberFormat.unit);
                }
            }
            if (units.length == chartObj.yAxis.length) {
                var k = true;
                for (var j = 0; j < units.length; j++) {
                    if (units[0] != units[j]) k = false;
                }
                if (k) {
                    for (var o = 0; o < chartObj.yAxis.length; o++) {
                        chartObj.yAxis[o].data = chartObj.yAxis[o].data.map(function (item) {
                            return setValueUnite(item, chartObj.rule.numberFormat[o].unit)
                        });
                    }
                    chartObj.unit = setValueUnite("中文", chartObj.rule.numberFormat[0].unit);
                }
            }
        }


    }

};

function setNumberFormat(item) {
    if (!item.option || !item.option.numberFormat){
        return setValueDecimal(parseFloat(item.value), 2);
    }
    var numberFormat = item.option.numberFormat, value = item.value;
    if (numberFormat.unit && !item.option.unit) value = setValueUnite(value, numberFormat.unit);

    if (numberFormat.decimal) {
        value = setValueDecimal(value, numberFormat.decimal);
    } else {
        value = setValueDecimal(value, 2);
    }
    if (numberFormat.separator) value = setValueSeparator(value);
    if (numberFormat.prefix && numberFormat.prefix != '无') value = numberFormat.prefix + value;
    if (numberFormat.suffix && numberFormat.suffix != '无') value = value + numberFormat.suffix;
    if (numberFormat.unit) value += setValueUnite("中文", numberFormat.unit);
    return value;
}

function setValueUnite(v, type) {
    var cs = 1, unit = "";
    switch (type) {
        case 4:
            cs = 10000;
            unit = '万';
            break;
        case 5:
            cs = 100000;
            unit = '十万';
            break;
        case 6:
            cs = 1000000;
            unit = '百万';
            break;
        case 7:
            cs = 10000000;
            unit = '千万';
            break;
        case 8:
            cs = 100000000;
            unit = '亿';
            break;
    }
    if (v == '中文') {
        return unit;
    } else {
        return parseFloat(v) / cs;
    }

}

//设置数字千分位
function setValueSeparator(v) {
    var nv = (v + "").split("."), length = Math.ceil(nv.length / 4), nnv = "";

    for (var j = 0; j < nv.length; j++) {
        var l = Math.ceil(nv[j].length / 4);
        for (var i = 0; i < l; i++) {
            if (i + 1 == l) {
                nnv += nv[j].slice(i * 4);
            } else {
                nnv += nv[j].slice(i * 4, i * 4 + 4) + ",";
            }
        }
        if (j + 1 < nv.length) nnv += ".";
    }
    return nnv;
}

//设置数字保留多少
function setValueDecimal(v, num) {
    var nv = (v + "").split(".");
    if (nv[1] && nv[1].length > num) {
        return v.toFixed(num);
    } else {
        return v;
    }
}


module.exports = numberFormat;
