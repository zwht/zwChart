/**
 * Created by zhaowei on 17/5/23.
 */
module.exports = function (data) {

    var myOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{b} <br/>{a} : {c}%"
        },

        series: [
            {
                type: data.chartObj.chartType.name,
                name:data.chartObj.yAxis[0].name,
                data:data.chartObj.yAxis[0].data,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                }
            }
        ]
    };


    var option = Object.assign({}, data.chartObj.rule.theme, myOption);

    data.option = [{
        chartType: data.chartObj.chartType,
        option: option
    }];
}
;
