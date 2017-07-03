/**
 * Created by zhaowei on 17/5/23.
 */
module.exports = function (data) {
    if (data.chartObj.yAxis.length > 1&&data.chartObj.xAxis.length === 1) {
        for (var i = 0; i < data.chartObj.yAxis.length; i++) {
            var myOption1 = {
                title: {
                    text: data.chartObj.yAxis[i].name,
                    top:10,
                    left:'center'
                },
                tooltip: {
                    trigger: 'item',

                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: []
            };
            var json = {

                type: data.chartObj.chartType.name,
                name: data.chartObj.yAxis[i].name,
                data: data.chartObj.yAxis[i].data
            };
            myOption1.series.push(json);
            var option1 = Object.assign({}, data.chartObj.rule.theme, myOption1);
            data.option.push({
                chartType: data.chartObj.chartType,
                option: option1
            })
        }

    } else {
        var myOption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: []
        };
        myOption.series.push({
            type: data.chartObj.chartType.name,
            name: data.chartObj.yAxis[0].name,
            data: data.chartObj.yAxis[0].data
        });
        if (!data.chartObj.xAxis.length) {
            var dat = [];
            for (var i = 0; i < data.chartObj.yAxis.length; i++) {
                dat.push(data.chartObj.yAxis[i].data[0])
            }
            myOption.series[0].name = "列_";
            myOption.series[0].data = dat;
        }

        var option = Object.assign({}, data.chartObj.rule.theme, myOption);


        data.option.push({
            chartType: data.chartObj.chartType,
            option: option
        })
    }


}
