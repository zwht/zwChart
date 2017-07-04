/**
 * Created by zhaowei on 17/5/24.
 */
var NumberFormate = require('../tool/numberFormat');
module.exports = {
    init: function (data) {
        var json = {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            chartType = data.chartObj.chartType.name;
        //如果没有x轴，修改触发tooltip
        if (data.chartObj.xAxis.length == 0) json.trigger = "item";

        if (chartType == "barPercentage" || chartType == "barRowPercentage" || chartType == "areaPercentage") {
            json.formatter = function (params, v) {
                var str = params[0].name + '<br/>';
                angular.forEach(params, function (item) {
                    if(item.value!=null&&item.value!=undefined){
                        str += "<i style='display: inline-block; margin: 0 4px; height: 10px; width: 10px; border-radius: 5px;" +
                            " background: " + item.color + "'></i>";
                        str += item.seriesName + ":" + '\&nbsp&nbsp' + item.value + '%<br/>';
                    }
                });
                return str;
            }
        } else if (data.chartObj.xAxis.length != 0) {
            json.formatter = NumberFormate.formatter
        }

        return json;
    }
};
