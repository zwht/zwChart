/**
 * Created by zhaowei on 17/5/23.
 */

module.exports=function (data) {

    var myOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
        },
        visualMap: {
            min: data.chartObj.maxMin[0],
            max:  data.chartObj.maxMin[1],
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true
        },
        series: [
            {
                type:'map',
                mapType: 'china',
                name:data.chartObj.yAxis[0].name,
                data:data.chartObj.yAxis[0].data
            }
        ]
    };

    var option = Object.assign({}, data.chartObj.rule.theme, myOption);

    data.option = [{
        chartType: data.chartObj.chartType,
        option: option
    }];
};
