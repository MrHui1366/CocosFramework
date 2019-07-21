"use strict";
cc._RF.push(module, '43b58rPOxxHOJgr4pCY+PLx', 'CTime');
// coffee_bean/utils/CTime.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CoffeeBean
 * 时间模块
 * 包括常见的各种对时间的操作
 *
 * By Leo
 */
var CMath_1 = require("./CMath");
var CTime = /** @class */ (function () {
    function CTime() {
    }
    /**
     * 根据格式得到当前时间字符串
     * @param formatstr 格式串  "y+"//年份  "M+"//月份  "d+"//日  "h+"//小时  "m+"//分  "s+"//秒  "q+"//季度  "S" //毫秒
     */
    CTime.getNowTimeStr = function (formatstr) {
        if (formatstr === void 0) { formatstr = "yyyy/MM/dd hh:mm:ss.S"; }
        return CTime.formatTime(new Date(), formatstr);
    };
    /**
     * 传入时间戳和时间格式
     * 返回时间字符串
     *
     * @static
     * @param timeStamp 时间戳(毫秒)
     * @param [string="yyyy/MM/dd hh:mm:ss.S"] 时间格式
     * @returns
     * @memberof CTime
     */
    CTime.getTimeStr = function (millTimeStamp, formatstr) {
        if (formatstr === void 0) { formatstr = "yyyy/MM/dd hh:mm:ss.S"; }
        var date = new Date();
        date.setTime(millTimeStamp);
        return CTime.formatTime(date, formatstr);
    };
    /**
     * 格式化时间
     * @param time 时间Date
     * @param formatstr 格式串   "y+"//年份  "M+"//月份  "d+"//日  "h+"//小时  "m+"//分  "s+"//秒  "q+"//季度  "S" //毫秒
     */
    CTime.formatTime = function (time, formatstr) {
        if (formatstr === void 0) { formatstr = "yyyy/MM/dd hh:mm:ss.S"; }
        cc.Node.EventType.MOUSE_ENTER;
        var o = {
            "M+": time.getMonth() + 1,
            "d+": time.getDate(),
            "h+": time.getHours(),
            "m+": time.getMinutes(),
            "s+": time.getSeconds(),
            "q+": Math.floor((time.getMonth() + 3) / 3),
            "S": CMath_1.default.fixedNumber(time.getMilliseconds(), 3, "0"),
        };
        if (/(y+)/.test(formatstr)) {
            formatstr = formatstr.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(formatstr)) {
                formatstr = formatstr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return formatstr;
    };
    /**
     * 异步等待
     * await CTime.waitTime(1000);  //等待1秒
     * @param millsec 等待的毫秒数
     */
    CTime.waitTime = function (millsec) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(); }, millsec);
        });
    };
    /**
     * 得到当前时间戳
     */
    CTime.getNowTimeStamp = function () {
        return (new Date()).getTime();
    };
    return CTime;
}());
exports.default = CTime;

cc._RF.pop();