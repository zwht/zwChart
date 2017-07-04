/**
 * Created by zhaowei on 17/6/1.
 */

module.exports ={
    init:function (data) {
        var legend={
            x: 'right',
            orient:'vertical',
            data: []
        };
        for(var i=0;i<data.length;i++){
            legend.data.push(data[i].name)
        }
        return legend
    }
};