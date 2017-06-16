/**
 * Created by zhaowei on 17/5/23.
 */
module.exports = function (data) {
    data.option=[
        {
            chartType: data.chartObj.chartType,
            option: "table",
            responseData:{
                data:data.chartData.data,
                dataColMetas:data.chartData.dataColMetas
            }
        }
    ]
};
