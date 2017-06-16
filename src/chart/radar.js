/**
 * Created by zhaowei on 17/5/23.
 */
module.exports = function (data) {
    var myOption = {
        tooltip: {},
        radar: {
            shape: 'circle',
            indicator: []
        },
        series: [
            {
                type: 'radar',
                data: []
            }
        ]
    };
    if (data.chartObj.yAxis.length > 2) {
        for (var i = 0; i < data.chartObj.yAxis.length; i++) {
            myOption.radar.indicator.push({
                name: data.chartObj.yAxis[i].name,
                max: data.chartObj.yAxis[i].max * 1.13
            })
        }

        for (var i = 0; i < data.chartObj.xAxis[0].data.length; i++) {
            var json = {
                name: data.chartObj.xAxis[0].data[i],
                value: []
            };
            for (var j = 0; j < data.chartObj.yAxis.length; j++) {
                json.value.push(data.chartObj.yAxis[j].data[i])
            }
            myOption.series[0].data.push(json)
        }
    } else {
        var mm=data.chartObj.yAxis[0].max;
        for (var j = 0; j < data.chartObj.yAxis.length; j++) {
            myOption.series[0].data.push({
                name: data.chartObj.yAxis[j].name,
                value: data.chartObj.yAxis[j].data
            });
            if(mm<data.chartObj.yAxis[j].max) mm=data.chartObj.yAxis[j].max
        }

        for (var i = 0; i < data.chartObj.xAxis[0].data.length; i++) {
            myOption.radar.indicator.push({
                name: data.chartObj.xAxis[0].data[i],
                max: mm * 1.1
            })
        }



    }


    var option = Object.assign({}, data.chartObj.rule.theme, myOption);

    data.option = [{
        chartType: data.chartObj.chartType,
        option: option
    }];
}
;
