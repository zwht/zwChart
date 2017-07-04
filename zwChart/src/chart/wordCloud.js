/**
 * Created by zhaowei on 17/5/23.
 */
module.exports = function (data) {

    for(var i=0;i<data.chartObj.yAxis[0].data.length;i++){
        data.chartObj.yAxis[0].data[i].color=data.chartObj.rule.theme.color[i%data.chartObj.rule.theme.color.length]
    }

    var myOption = {
        tooltip : {},
        series: [
            {
                type: 'wordCloud',
                shape: 'circle',
                sizeRange: [12, 40],
                name:data.chartObj.yAxis[0].name,
                data:data.chartObj.yAxis[0].data,
                textStyle: {
                    normal: {
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        color: function (obj) {
                            return obj.data.color
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
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
