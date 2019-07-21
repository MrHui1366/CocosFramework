(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/expand/CExString.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '19cffNFwAZCNb18RFtt9Hm8', 'CExString', __filename);
// coffee_bean/expand/CExString.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CMD5_1 = require("../utils/CMD5");
/**
 * MD5字符串
 *
 * @returns MD5加密后的字符串
 * @memberof String
 */
String.prototype.MD5 = function () {
    return CMD5_1.default.hashStr(this);
};
/**
 * 判断一个字符串是否为空
 *
 * @returns
 * @memberof String
 */
String.prototype.isEmptyOrNull = function () {
    return this == null || this.length == 0;
};
/**
 * 函数:格式化字符串
 * 参数：str:字符串模板； data:数据
 * 调用方式:formatString("api/values/{id}/{name}",{id:101,name:"test"});
 *         formatString("api/values/{0}/{1}",101,"test");
 */
String.formatString = function (str) {
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
    if (!str || data == undefined) {
        return str;
    }
    if (str.indexOf("{0}") == -1) {
        for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var item = data_1[_a];
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    str = str.replace(new RegExp("\{" + key + "\}", "g"), item[key]);
                }
            }
        }
    }
    else {
        var args_1 = arguments, reg = new RegExp("\{([0-" + (args_1.length - 1) + "])\}", "g");
        return str.replace(reg, function (match, index) {
            return args_1[index - (-1)];
        });
    }
    return str;
};
/**
 * 将一个字符串省略一定长度，以特定字符替代
 * 如
 *     String.omitStr('asdgadsgdf',3)  =>  'asd...';
 *     String.omitStr('asdgadsgdf',4 ,'*')  =>  'asdg***';
 *     String.omitStr('asdgadsgdf',5 ,'$' ,2)  =>  'asdga$$';
 *
 * @param targetStr 目标字符串
 * @param omitStart 保留长度
 * @param replacestr 替换字符
 * @param replacelen 替换长度
 */
String.omitStr = function (targetStr, omitStart, replacestr, replacelen) {
    if (replacestr === void 0) { replacestr = '.'; }
    if (replacelen === void 0) { replacelen = 3; }
    if (targetStr.length <= omitStart) {
        return targetStr;
    }
    var tail = replacestr.repeat(replacelen);
    return targetStr.substr(0, omitStart) + tail;
};
/**
 * UTF-8数组转字符串
 * @param array utf8数组
 */
String.Utf8ArrayToStr = function (array) {
    var out, i, len, c;
    var char2, char3, char4;
    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        var pre = (c >> 3);
        if (pre >= 0 && pre <= 15) { // 0xxxxxxx
            out += String.fromCharCode(c);
        }
        else if (pre >= 24 && pre <= 27) { // 110x xxxx   10xx xxxx
            char2 = array[i++];
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        }
        else if (pre >= 28 && pre <= 29) { // 1110 xxxx  10xx xxxx  10xx xxxx
            char2 = array[i++];
            char3 = array[i++];
            out += String.fromCharCode(((c & 0x0F) << 12) |
                ((char2 & 0x3F) << 6) |
                ((char3 & 0x3F) << 0));
        }
        else if (pre == 30) { //1111 0xxx  10xx xxxx  10xx xxxx 10xx xxxx
            char2 = array[i++];
            char3 = array[i++];
            char4 = array[i++];
            out += String.fromCharCode(((c & 0x07) << 15) |
                ((char2 & 0x3F) << 12) |
                ((char3 & 0x3F) << 6) |
                ((char4 & 0x3F) << 0));
        }
    }
    return out;
};
/**
 * 十六进制字符串转十进制数字
 *
 * @param hexstring 十六进制字符串
 * @returns 数字
 * @memberof StringConstructor
 */
String.hexStrtoDecNumber = function (hexstring) {
    var num = 0;
    for (var i = 0; i < hexstring.length; i++) {
        var element = hexstring.charAt(i);
        num <<= 4;
        switch (element) {
            case 'A':
            case 'a':
                num += 10;
                break;
            case 'b':
            case 'B':
                num += 11;
                break;
            case 'c':
            case 'C':
                num += 12;
                break;
            case 'd':
            case 'D':
                num += 13;
                break;
            case 'e':
            case 'E':
                num += 14;
                break;
            case 'f':
            case 'F':
                num += 15;
                break;
            default:
                num += parseInt(element);
                break;
        }
    }
    return num;
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=CExString.js.map
        