/**
 * Created by zhaowei on 17/5/10.
 */
var InitTable = require("./chart/table"),
    InitMap = require("./chart/map"),
    InitBar = require("./chart/bar"),
    ChartType = require("./chartType"),
    Util = require('./tool/util'),
    numberFormate = require('./tool/numberFormat'),
    InitTarge = require('./chart/target'),
    InitPie = require('./chart/pie'),
    InitRadar = require('./chart/radar'),
    InitWordCloud = require('./chart/wordCloud'),
    InitFunnel = require('./chart/funnel'),
    InitBdMap = require('./chart/bdMap');
function ChartServer(chartData, chartObj, style) {
    //如果type为字符串,去chartTypeList对象拿到对应多图表类型对象;
    if ((typeof chartObj.chartType) == 'string') chartObj.chartType = ChartType.getChartType(chartObj.chartType);
    this.option = [];
    this.chartObj = chartObj;
    this.style = style;
    this.chartData = chartData;

    this.init(chartData);
}


ChartServer.prototype.init = function (chartData) {
    if(chartData.data&&chartData.data.length){
        initData(chartData, this.chartObj);
        setOption(this);
    }else {
        this.option = ["fuck no data"];
    }

};

function setOption(_this) {

    switch (_this.chartObj.chartType.name) {
        case 'table':
            InitTable(_this);
            break;
        case 'mapAir':
            InitMap(_this);
            break;
        case 'hotMap':
            InitBdMap(_this);
            break;
        case 'bar':
        case 'barPile':
        case 'barPercentage':
        case 'barRow':
        case 'barRowPile':
        case 'barRowPercentage':
        case 'line':
        case 'area':
        case 'areaPile':
        case 'areaPercentage':
        case 'scatter':
            InitBar(_this);
            break;
        case 'target':
            InitTarge(_this);
            break;
        case 'pie':
            InitPie(_this);
            break;
        case 'funnel':
            InitFunnel(_this);
            break;
        case 'radar':
            InitRadar(_this);
            break;
        case 'wordCloud':
            InitWordCloud(_this);
            break;
    }
}

//清洗数据
function initData(data, chartObj) {
    //行列互相转化
    var newData = data.data[0].map(function (col, i) {
        return data.data.map(function (row) {

            return row[i];
        });
    });
    //把数据放到对应x轴y轴
    var index = 0, newDataColMetas = [], f = 0;
    if (data.xAxis && data.xAxis.length) {
        for (var i = 0; i < data.xAxis.length; i++) {
            chartObj.xAxis[i].data = newData[index];
            // 如果是日期格式，而且有时间间隔进入
            if (data.xAxis[i].timeWindow) {
                var newArr = [];
                for (var u = 0; u < newData[index].length; u++) {
                    newArr.push(newData[index][u] + "至" + newData[index+1][u]);
                }
                chartObj.xAxis[i].data = newArr;

                newData.splice(index + 1, 1);
                newData[index] = newArr;
                newDataColMetas.push({
                    id: data.xAxis[i].colId,
                    operatorType: data.xAxis[i].operatorType,
                    name: data.xAxis[i].name,
                    dataType: data.xAxis[i].colDataType
                });
                index++;

            } else {
                for (f = 0; f < data.dataColMetas.length; f++) {
                    if (data.dataColMetas[f].id == data.xAxis[i].colId) {
                        newDataColMetas.push(data.dataColMetas[f]);

                    }
                }
                index++;
            }
        }
    }
    if (data.yAxis && data.yAxis.length) {

        for (var o = 0; o < data.yAxis.length; o++) {
            chartObj.yAxis[o].data = newData[index];
            for (f = 0; f < data.dataColMetas.length; f++) {
                if (data.dataColMetas[f].id == data.yAxis[o].colId) {
                    newDataColMetas.push(data.dataColMetas[f]);

                }
            }
            index++;
        }
    }

    if (data.series && data.series.length) {
        for (var p = 0; p < data.series.length; p++) {
            chartObj.series[p].data = newData[index];
            for (f = 0; f < data.dataColMetas.length; f++) {
                if (data.dataColMetas[f].id == data.series[p].colId) {
                    newDataColMetas.push(data.dataColMetas[f]);

                }
            }
            index++;
        }
    }


    //对比数据清洗设置
    if (chartObj.series && chartObj.series.length && chartObj.xAxis && chartObj.xAxis.length) {
        var newyA = [];
        //一个对比，多个对比还没有做
        if (chartObj.xAxis.length == 1) {
            var oldXdata = chartObj.xAxis[0].data.concat();
            chartObj.xAxis[0].data = chartObj.xAxis[0].data.unique();
            for (var h = 0; h < oldXdata.length; h++) {
                var isName = false;
                for (var u = 0; u < newyA.length; u++) {
                    if (newyA[u].name == chartObj.series[0].data[h]) {
                        isName = true;

                        for (var kh = 0; kh < chartObj.xAxis[0].data.length; kh++) {
                            if (oldXdata[h] == chartObj.xAxis[0].data[kh]) {
                                newyA[u].data[kh] = chartObj.yAxis[0].data[h];
                            }
                        }
                    }
                }
                if (!isName) {
                    var nY = {
                        name: chartObj.series[0].data[h],
                        data: []
                    };
                    for (var kh = 0; kh < chartObj.xAxis[0].data.length; kh++) {
                        if (oldXdata[h] == chartObj.xAxis[0].data[kh]) {
                            nY.data.push(chartObj.yAxis[0].data[h]);
                        } else {
                            nY.data.push(null);
                        }

                    }
                    newyA.push(nY);

                }
            }


        }
        chartObj.yAxis = newyA;
    }


    data.dataColMetas = newDataColMetas;
    data.data = newData[0].map(function (col, i) {
        return newData.map(function (row) {

            return row[i];
        });
    });

    //设置数据显示格式
    if (chartObj.rule && chartObj.rule.numberFormat && chartObj.rule.numberFormat.length){
        numberFormate.numberFormatInitData(chartObj);
    }

    //计算最大最小，列求和
    var nArr = [], xMax = [], dataMax = -10000000000, dataMin = 100000000000000;
    for (var i = 0; i < chartObj.yAxis.length; i++) {
        var max = -100000;
        for (var j = 0; j < chartObj.yAxis[i].data.length; j++) {
            var dd = parseFloat(chartObj.yAxis[i].data[j]);
            if (nArr[j] === undefined) nArr.push(0);
            nArr[j] += dd;
            if (xMax[j] === undefined) xMax.push(-100000);
            if (xMax[j] < dd) xMax[j] = dd;
            if (max < dd) max = dd;
            if (dd > dataMax) dataMax = dd;
            if (dd < dataMin) dataMin = dd;
        }
        chartObj.yAxis[i].max = max;
    }
    chartObj.maxMin = [dataMin, dataMax];
    chartObj.xAxisMax = xMax;


    //使用百分比展示
    if (chartObj.chartType.name == 'barPercentage' || chartObj.chartType.name == 'areaPercentage' || chartObj.chartType.name == 'barRowPercentage' || chartObj.chartType.name == 'areaPercentage') {
        for (var i = 0; i < chartObj.yAxis.length; i++) {
            for (var j = 0; j < chartObj.yAxis[i].data.length; j++) {
                chartObj.yAxis[i].data[j] = (parseFloat(chartObj.yAxis[i].data[j]) / nArr[j]) * 100;
            }
        }
    }
    //如果是pie
    if (chartObj.chartType.name == 'funnel' || chartObj.chartType.name == 'pie' ||
        chartObj.chartType.name == 'wordCloud' || chartObj.chartType.name == 'mapArea' ||
        chartObj.chartType.name == 'mapAir') {
        for (var i = 0; i < chartObj.yAxis.length; i++) {
            for (var j = 0; j < chartObj.yAxis[i].data.length; j++) {
                chartObj.yAxis[i].data[j] = {
                    value: chartObj.yAxis[i].data[j],
                    name: chartObj.xAxis[0] ? chartObj.xAxis[0].data[j] : chartObj.yAxis[i].name
                };
            }
        }
    }

    //设置颜色
    if (chartObj.theme && chartObj.rule.theme) chartObj.rule.theme = Object.assign({}, chartObj.rule.theme, chartObj.theme);
    if (chartObj.rule.theme && chartObj.rule.theme.color) {
        chartObj.rule.theme.color = Util.setColor(chartObj.rule.theme.color);
    } else {
        if (!chartObj.rule) chartObj.rule = {};
        if (!chartObj.rule.theme) chartObj.rule.theme = {};
        chartObj.rule.theme.color = Util.setColor([]);
        if (chartObj.theme && chartObj.theme.color) chartObj.rule.theme.color = Util.setColor(chartObj.theme.color);
    }

}
module.exports = ChartServer;