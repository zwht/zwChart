/**
 * Created by zhaowei on 17/5/24.
 */

module.exports = {
    init: function (data) {
        var series = [],
            chartType = data.chartObj.chartType.name;

        //设置series
        if(chartType=='scatter'){
            var arrD=[];
            for(var i=0;i<data.chartObj.yAxis.length;i++){
                for(var j=0;j<data.chartObj.yAxis[i].data.length;j++){
                    if(!arrD[j])arrD.push([]);
                    arrD[j].push(data.chartObj.yAxis[i].data[j]);
                }
            }
            for(var i=0;i<data.chartObj.xAxis.length;i++){
                for(var j=0;j<data.chartObj.xAxis[i].data.length;j++){
                    if(!arrD[j])arrD.push([]);
                    arrD[j].push(data.chartObj.xAxis[i].data[j]);
                }
            }

            json = {
                name: data.chartObj.xAxis[0].name,
                type: 'scatter',
                data: arrD,
                symbolSize: function (data) {
                    var d=data[2];
                    if(data[2]<10) d=10;
                    if(data[2]>50) d=50;
                    return d;
                }
            };
            series.push(json)
        }else{
            for (var i = 0; i < data.chartObj.yAxis.length; i++) {
                var item = data.chartObj.yAxis[i],
                    json = {
                        name: item.name,
                        type: data.chartObj.chartType.type || data.chartObj.chartType.name,
                        data: item.data,
                        numberFormat: item.numberFormat,
                        unit: data.chartObj.unit
                    };
                //设置为堆叠图
                if (chartType == "areaPile" || chartType == "areaPercentage" || chartType == "barPile" ||
                    chartType == "barPercentage" || chartType == "barRowPile" || chartType == "barRowPercentage") {
                    json.stack = '总量';
                }
                if (chartType == 'area' || chartType == 'areaPile' || chartType == 'areaPercentage') {
                    json.areaStyle = {normal: {}}
                }

                series.push(json)
            }
        }

        return series;
    }
};
