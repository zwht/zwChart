/**
 * Created by zhaowei on 17/5/24.
 */
module.exports=function (data) {
    var children=[];
    var yAxis=data.chartObj.yAxis;
    if(yAxis[0]){
        children.push({
            type: 'text',
            z: 100,
            left: 'left',
            top: '20px',
            style: {
                fill: '#099',
                text: yAxis[0].data[0],
                font: '40px Microsoft YaHei'
            }
        });
        children.push({
            type: 'text',
            z: 100,
            left: 'left',
            top: 'middle',
            style: {
                fill: '#253342',
                text:yAxis[0].name,
                font: '22px Microsoft YaHei'
            }
        })
    }
    if(yAxis.length>1){
        for(var i=1;i<yAxis.length;i++){
            children.push({
                type: 'text',
                z: 100,
                left: 'left',
                top: 70,
                style: {
                    fill: '#f68472',
                    text: yAxis[i].name+": "+yAxis[i].data[0],
                    font: '14px Microsoft YaHei'
                }
            });
        }
    }
    var option = {
        series: [],
        graphic: [{
            id: "logo",
            type: 'group',
            left: 'center',
            top: 'center',
            children:children
        }]
    };

    data.option=[{
        chartType: data.chartObj.chartType,
        option: option
    }];
};