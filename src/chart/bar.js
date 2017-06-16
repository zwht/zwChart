/**
 * Created by zhaowei on 17/5/23.
 */
var CommonOption = require('./commonOption'),
    SetSeries = require('./setSeries'),
    SetTooltip = require('./setTooltip'),
    setLegend = require('./setLegend');
module.exports = function (data) {
    var chartType = data.chartObj.chartType.name;
    var myOption = {
        tooltip: Object.assign({},CommonOption.bar.tooltip,SetTooltip.init(data)),

        xAxis: [
            {
                type: 'category',
                data: data.chartObj.xAxis[0]?data.chartObj.xAxis[0].data:[],
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: data.chartObj.rule.theme.color[0]
                    }
                },
                axisTick: {
                    alignWithLabel: true
                }

            }
        ],
        yAxis: [
            {
                type: 'value',
                nameTextStyle:{
                    color:'#099'
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: data.chartObj.rule.theme.color[1]
                    }
                },
                name:data.chartObj.unit?'(' + data.chartObj.unit + ')':""
            }
        ],
        series: SetSeries.init(data)
    };

    myOption.legend=setLegend.init(myOption.series);

    //x轴y轴互相转换
    if (chartType == "barRow" || chartType == "barRowPile" || chartType == "barRowPercentage") {
        var x=myOption.xAxis;
        myOption.xAxis = myOption.yAxis;
        myOption.yAxis =x
    }
    //散点图xy设置
    if(chartType=='scatter'){
        myOption.xAxis={
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        };
        myOption.yAxis={
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true
        };
    }


    var option = Object.assign({}, CommonOption.bar, data.chartObj.rule.theme, myOption);

    data.option = [{
        chartType: data.chartObj.chartType,
        option: option
    }];
}
;
