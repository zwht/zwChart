/**
 * Created by zhaowei on 17/5/23.
 */

module.exports = {
    chartTypeList: [
        {
            name: 'table',
            rules: "0个或多行,0个或多列",
            title: "表格",
            active: true,
            row: [[0, 'n'], [1, 'n'], [1, 'n']],
            col: [[1, 'n'], [0, 'n'], [1, 'n']],
            imgIndex: 0
        },
        {
            name: 'target',
            rules: "0行,1个或2列",
            title: "指标卡",
            row: [[0]],
            col: [[1, 2]],
            imgIndex: 1
        },
        /*{
            name: 'gauge',
            rules: "0行,1列",
            title: "计量图",
            row: [[0]],
            col: [[1]],
            imgIndex: 2
        },*/
        {
            name: 'line',
            rules: "1个或2维度,1个或多列",
            title: "折线图",
            row: [[1]],
            col: [[1, 'n']],
            imgIndex: 3
        },
        {
            name: 'bar',

            rules: "2个以内维度,1个或多列",
            title: "簇状柱形图",
            row: [[0, 1]],
            col: [[1, 'n']],
            imgIndex: 4
        },
        {
            name: 'barPile',
            type: 'bar',
            rules: "1行，2个或多列",
            title: "堆积柱状图",
            row: [[1]],
            col: [[2, 'n']],
            imgIndex: 5
        },
        {
            name: 'barPercentage',
            type: 'bar',
            rules: "1 行，2个或多列",
            title: "百分比堆积柱状图",
            row: [[1]],
            col: [[2, 'n']],
            imgIndex: 6
        },
        {
            name: 'barRow',
            type: 'bar',
            rules: "2个以内维度,1个或多列",
            title: "条形图",
            row: [[0, 1]],
            col: [[1, 'n']],
            imgIndex: 8
        },
        {
            name: 'barRowPile',
            type: 'bar',
            rules: "1行，2个或多列",
            title: "堆积条形图",
            row: [[1]],
            col: [[2, 'n']],
            imgIndex: 9
        },
        {
            name: 'barRowPercentage',
            type: 'bar',
            rules: "1行，2个或多列",
            title: "百分比堆积条形图",
            row: [[1]],
            col: [[2, 'n']],
            imgIndex: 10
        },
        {
            name: 'pie',
            rules: "1 行，1 列； 0 行，多列",
            title: "普通饼图",
            row: [[1], [0]],
            col: [[1], [1, 'n']],
            imgIndex: 16
        },
        {
            name: 'area',
            type: 'line',
            rules: "1维度,1或多列",
            title: "面积图",
            row: [[1]],
            col: [[1, 'n']],
            imgIndex: 12
        },
        {
            name: 'areaPile',
            type: 'line',
            rules: "2 行，1列",
            title: "堆积面积图",
            row: [[1]],
            col: [[2, 'n']],
            imgIndex: 13
        },
        {
            name: 'areaPercentage',
            type: 'line',
            rules: "2 行，1列",
            title: "百分比堆积面积图",
            row: [[1]],
            col: [[2, 'n']],
            imgIndex: 14
        },
        {
            name: 'scatter',
            rules: "1行，3列",
            title: "散点图",
            row: [[1]],
            col: [[3]],
            imgIndex: 15
        },
        {
            name: 'mapAir',
            type: 'map',
            mapName: 'china',
            rules: "1 行(行政区字段)，1列",
            title: "中国地图(面积)",
            row: [[1]],
            col: [[1]],
            imgIndex: 18
        },
        {
            name: 'hotMap',
            type: 'map',
            mapName: 'china',
            rules: "2 行(经纬度)，1列",
            title: "热力图(百度地图)",
            row: [[2]],
            col: [[0,1]],
            imgIndex: 24
        },
        {
            name: 'radar',
            rules: "一行多列,一个或多个对比3个及以上数值",
            title: "雷达图",
            row: [[1], [1, 'n']],
            col: [[1, 'n'], [3, 'n']],
            imgIndex: 19
        },
        {
            name: 'funnel',
            rules: "1行，1列",
            title: "漏斗图",
            row: [[1]],
            col: [[1]],
            imgIndex: 21
        },
        {
            name: 'wordCloud',
            rules: "1行，1列",
            title: "词云",
            row: [[1]],
            col: [[1]],
            imgIndex: 22
        },
        {
            name: 'coil',
            rules: "1行0列，0行1列",
            title: "百分比图",
            row: [[1], [10]],
            col: [[10], [1]],
            imgIndex: 23
        },
        /*{
         name: 'hybridmap',
         rules: "行必须为时间字段，1行，1或多列",
         title: "时间轴图",
         row: [[1]],
         col: [[1, 'n']],
         imgIndex: 25
         }*/
    ],
    getChartType: function (typeObj) {
        var obj = ""
        for (var i = 0; i < this.chartTypeList.length; i++) {
            if (this.chartTypeList[i].name == typeObj) {
                obj = this.chartTypeList[i];
                break;
            }
        }
        if (!obj) alert("没有" + typeObj + "类型图表")
        return obj;
    }
}
