/**
 * Created by zhaowei on 17/5/23.
 */
var Theme = require('./theme')
module.exports = {
    setColor: function (color) {
        var dThemeColor = Theme.activeTheme.chartTheme.color.concat();

        if(color.length){
            for (var i = color.length - 1; i >= 0; i--) {
                dThemeColor.unshift(color[i]);
            }
        }
        return dThemeColor;
    },
    deepCopy: function (p, c) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    }
};
