/**
 * Created by zhaowei on 17/5/9.
 */
var Theme = require("./tool/theme");


function chartInit(dom) {
    this.option = "";
    this.dom = dom;
    this.theme = Theme.activeTheme.chartTheme;


    this.init();
}
chartInit.prototype.init = function () {
    this.dom.className = 'zwEcharts ' + this.dom.className;

    //创建chart盒子
    this.mainChartDom = createDom('div', 'mainChartDom');
    this.dom.appendChild(this.mainChartDom);
    this.mainChartDom.style.display = 'none';
    this.domSize = this.dom.clientHeight + "-" + this.dom.clientWidth;

    //创建loading动画
    this.loadingDom = createDom('div', 'loading');
    var load2 = createDom('div', 'load2');
    load2.appendChild(createDom('div', 'loader'));
    this.loadingDom.appendChild(load2);
    this.dom.appendChild(this.loadingDom);

    //this.noDataDom = createDom('div', 'noDataDom');
    //this.noDataDom.innerText = "no data";
    //this.dom.appendChild(this.noDataDom);

};
//根据config显示loading，及其它
chartInit.prototype.setConfig = function (config) {
    if (config.dataLoaded) {
        this.loadingDom.style.display = 'none';
        this.mainChartDom.style.display = 'block';
    } else {
        this.mainChartDom.style.display = 'none';
        this.loadingDom.style.display = 'block';
    }
    if (config.theme && Theme.getOneTheme(config.theme)) {
        this.theme = (Theme.getOneTheme(config.theme)).chartTheme;
    }
};
//初始化数据，渲染图表
chartInit.prototype.setOption = function (option) {

    var _this = this;
    //定时判断容器大小是否改变，重新渲染
    if (this.time) clearInterval(this.time);
    this.time = setInterval(function () {
        if (_this.domSize !== _this.dom.clientHeight + "-" + _this.dom.clientWidth) {
            clearInterval(_this.time);
            _this.domSize = _this.dom.clientHeight + "-" + _this.dom.clientWidth;
            _this.setOption(_this.option)
        }
    }, 10);


    this.option = option;
    this.loadingDom.style.display = 'none';
    this.mainChartDom.style.display = 'block';
    this.mainChartDom.innerHTML = "";
    this.chartObj = [];

    for (var item = 0; item < option.length; item++) {
        var cObj = {
            dom: createDom('div'),
            option: option[item],
            id: 'zw' + (new Date() - 0) + Math.floor(Math.random() * 100)
        };
        this.mainChartDom.appendChild(cObj.dom);
        cObj.dom.style.height = option.length == 1 ? "100%" : 100 / (option.length / 2) + "%";
        cObj.dom.style.width = option.length == 1 ? "100%" : "50%";
        if (option.length > 1) cObj.dom.style.float = "left";
        this.chartObj.push(cObj);
        if (cObj.option != "fuck no data" && cObj.option) {
            this.renderOneChart(cObj);
        } else {
            cObj.dom.innerHTML = "<div class='middle chartNoData'><div>没有数据</div></div>"
        }
    }

    return cObj;
};
chartInit.prototype.renderOneChart = function (obj) {
    if (!obj.option.chartType || !obj.option.chartType.name) {
        if (obj.option.typeObj) {
            obj.option.chartType = obj.option.typeObj
        } else {
            return
        }
    }
    this.setTheme(obj.option.theme);
    switch (obj.option.chartType.name) {
        case 'table': {
            this.rendTable(obj);
            break;
        }
        default :
            this.rendChart(obj)
    }
};
chartInit.prototype.setTheme = function (theme) {
    var color = this.theme.color.concat();
    if (theme) {
        if (theme.color) {
            for (var i = 0; i < theme.color.length; i++) {
                color.unshift(theme.color[i]);
            }
        }
        this.newTheme = Object.assign({}, this.theme, theme);
        this.newTheme.color = color;
    } else {
        this.newTheme = theme
    }
};

chartInit.prototype.rendChart = function (obj) {
    obj.dom.className="chart"+obj.option.chartType.name

    switch (obj.option.chartType.name) {
        case 'mapAir': {
            if (!echarts.getMap(obj.option.chartType.mapName)) {
                ajax({
                    type: "GET",
                    url: "./assets/data/map/" + obj.option.chartType.mapName + '.json',
                    dataType: "json",
                    beforeSend: function () {
                    },
                    data: {},
                    success: function (data) {
                        echarts.registerMap(obj.option.chartType.mapName, data);
                        obj.echart = echarts.init(obj.dom, this.newTheme);
                        obj.echart.setOption(obj.option.option);
                    },
                    error: function () {
                        console.log("get map error")
                    }
                });
            } else {
                obj.echart = echarts.init(obj.dom, this.newTheme);
                obj.echart.setOption(obj.option.option);
            }
            break;
        }
        default : {
            obj.echart = echarts.init(obj.dom, this.newTheme);
            obj.echart.setOption(obj.option.option);
        }
    }
};
chartInit.prototype.rendTable = function (obj) {
    var zwChartTableBox = createDom('div', 'zwChartTableBox'),
        zwChartTableHead = createDom('ul', 'zwChartTableHead'),
        zwChartTableHeadTr = createDom('tr', 'th'),
        zwChartTable = createDom('table', 'zwChartTable table');
    for (var i = 0; i < obj.option.responseData.dataColMetas.length; i++) {
        var oneHead = createDom('li'),
            thTd = createDom('td', 'thTd');
        oneHead.innerText = obj.option.responseData.dataColMetas[i].name;
        zwChartTableHead.appendChild(oneHead);
        thTd.innerHTML = "<div><span>" + obj.option.responseData.dataColMetas[i].name + "</span></div>"
        zwChartTableHeadTr.appendChild(thTd)
    }
    zwChartTable.appendChild(zwChartTableHeadTr);

    for (var i = 0; i < obj.option.responseData.data.length; i++) {
        var tr = createDom('tr', 'tr'), item = obj.option.responseData.data[i];
        for (var j = 0; j < item.length; j++) {
            var td = createDom('td', 'td');
            td.innerHTML = "<div><span>" + item[j] + "</span></div>";
            tr.appendChild(td);
        }
        zwChartTable.appendChild(tr);
    }
    zwChartTableBox.appendChild(zwChartTable);
    zwChartTableBox.appendChild(zwChartTableHead);

    obj.dom.appendChild(zwChartTableBox);

    //设置head每一相宽度
    var apdTr = zwChartTableHeadTr.children,
        apdHeadLi = zwChartTableHead.children;
    zwChartTableHead.style.width = zwChartTableHeadTr.clientWidth + 'px';
    for (var u = 0; u < apdTr.length; u++) {
        apdHeadLi[u].style.width = apdTr[u].clientWidth + 'px';
    }

    //创建isCroll
    var IScrollObj = new IScroll(zwChartTableBox,
        {
            scrollbars: true,
            mouseWheel: true,
            preventDefault: false,
            scrollX: true,
            bounce: false,
            probeType: 3,
            interactiveScrollbars: true
        });
    IScrollObj.on("scroll", function (event) {
        zwChartTableHead.style.left = this.x + "px";
    });

};


module.exports = chartInit;

function createDom(type, name) {
    var dom = document.createElement(type);
    if (name) dom.className = name;
    return dom
}


function ajax() {
    var ajaxData = {
        type: arguments[0].type || "GET",
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "text",
        contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend: arguments[0].beforeSend || function () {
        },
        success: arguments[0].success || function () {
        },
        error: arguments[0].error || function () {
        }
    }
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                ajaxData.success(xhr.response)
            } else {
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data) {
    if (typeof data === 'object') {
        var convertResult = "";
        for (var c = 0; c < data.length; c++) {
            convertResult += c + "=" + data[c] + "&";
        }
        convertResult = convertResult.substring(0, convertResult.length - 1);
        return convertResult;
    } else {
        return data;
    }
}
