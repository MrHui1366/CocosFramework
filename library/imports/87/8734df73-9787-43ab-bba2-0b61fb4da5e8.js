"use strict";
cc._RF.push(module, '8734d9zl4dDq7uiC2H7TaXo', 'CLOG');
// coffee_bean/utils/CLOG.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CoffeeBean
 * LOG库封装
 *
 * By Leo
 */
var CTime_1 = require("./CTime");
/*** 游戏名 ***/
var GAME_NAME = "travel_hamster";
var CLOG = /** @class */ (function () {
    function CLOG() {
    }
    /**
     * 启用LOG系统
     */
    CLOG.enable = function () {
        this._enable = true;
    };
    /**
     * 禁用LOG系统
     */
    CLOG.disable = function () {
        this._enable = false;
    };
    /**
     * 得到输出字符串
     * 本函数在LOG前面增加了时间和LOG类型
     * @param args 参数数组
     * @param logType log类型 error 还是 warn 还是 info
     * @param logTag 标识，用于区分LOG
     */
    CLOG.getMsgStr = function (args, logType, logTag) {
        var msg;
        switch (args.length) {
            case 0:
                return " ";
            case 1:
                msg = args[0];
                break;
            default:
                msg = String.formatString.apply(null, args);
                break;
        }
        return "[" + CTime_1.default.getNowTimeStr() + " |" + logType + "| " + logTag + " ] " + msg;
    };
    ;
    /**
       * 输出一个 Info LOG
       * @param tag 标识，用于区分LOG
       * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
       */
    CLOG.I = function (tag) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!this._enable)
            return;
        var outStr = this.getMsgStr(params, " INFO", tag);
        cc.log(outStr);
    };
    /**
     * 输出一个 Error LOG
     * @param tag 标识，用于区分LOG
     * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
     */
    CLOG.E = function (tag) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!this._enable)
            return;
        var outStr = this.getMsgStr(params, "ERROR", tag);
        cc.error(outStr);
    };
    /**
     * 输出一个 Error LOG
     * @param err 错误对象以及堆栈信息
     */
    CLOG.EE = function (tag, err) {
        if (!this._enable)
            return;
        this.E(tag, "----- " + err.name + "-----");
        this.E(tag, "message >> " + err.message);
        this.E(tag, "stack   >> " + err.stack);
    };
    /**
     * 输出一个 Warning LOG
     * @param tag 标识，用于区分LOG
     * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
     */
    CLOG.W = function (tag) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!this._enable)
            return;
        var outStr = this.getMsgStr(params, " WARN", tag);
        cc.warn(outStr);
    };
    /**
     * 条件为真时输出 Info
     * @param tag 标识，用于区分LOG
     * @param condition 条件
     * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
     */
    CLOG.IF = function (tag, condition) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        if (!this._enable)
            return;
        if (!condition)
            return;
        var outStr = this.getMsgStr(params, " INFO", tag);
        cc.log(outStr);
    };
    /**
     * 条件为真时输出 Info
     * @param tag 标识，用于区分LOG
     * @param condition 条件
     * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
     */
    CLOG.EF = function (tag, condition) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        if (!this._enable)
            return;
        if (!condition)
            return;
        var outStr = this.getMsgStr(params, "ERROR", tag);
        cc.log(outStr);
    };
    /**
     * 条件为真时输出 Warning
     * @param tag 标识，用于区分LOG
     * @param condition 条件
     * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
     */
    CLOG.WF = function (tag, condition) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        if (!this._enable)
            return;
        if (!condition)
            return;
        var outStr = this.getMsgStr(params, " WARN", tag);
        cc.log(outStr);
    };
    /*** 是否已经激活 ***/
    CLOG._enable = false;
    return CLOG;
}());
exports.default = CLOG;

cc._RF.pop();