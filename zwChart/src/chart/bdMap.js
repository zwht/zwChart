/**
 * Created by zhaowei on 17/5/23.
 */

module.exports = function (data) {
    var chartType = data.chartObj.chartType.name;
    var ds = [],
        x1=data.chartObj.xAxis[0].data.concat().sort(),
        x2=data.chartObj.xAxis[1].data.concat().sort();

    for (var i = 0; i < data.chartObj.xAxis[0].data.length; i++) {
        var da = [parseFloat(data.chartObj.xAxis[0].data[i]), parseFloat(data.chartObj.xAxis[1].data[i])];
        if (data.chartObj.yAxis.length) da.push(parseFloat(data.chartObj.yAxis[0].data[i]));
        ds.push(da)
    }

    var myOption = {
        animation: false,
        bmap: {
            center: [x1[parseInt(x1.length/2)], x2[parseInt(x2.length/2)]],
            zoom: 14,
            roam: true
        },
        visualMap: {
            show: false,
            top: 'top',
            min: 0,
            max: 5,
            seriesIndex: 0,
            calculable: true,
            inRange: {
                color: ['blue', 'blue', 'green', 'yellow', 'red']
            }
        },
        series: [{
            type: 'heatmap',
            coordinateSystem: 'bmap',
            data: ds,
            pointSize: 5,
            blurSize: 6
        }]
    };


    var option = Object.assign({}, data.chartObj.rule.theme, myOption);

    data.option = [{
        chartType: data.chartObj.chartType,
        option: option
    }];
};
