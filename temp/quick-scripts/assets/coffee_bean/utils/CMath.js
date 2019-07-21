(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/utils/CMath.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bb2f8rqlgBIpIXSNa6Mpyz9', 'CMath', __filename);
// coffee_bean/utils/CMath.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CEnum_1 = require("./../common/CEnum");
/*** 任意弧度直接乘 弧度转角度 ***/
exports.radian_2_angle = 57.295779513082320876798154814105;
/*** 任意角度直接乘 角度转弧度 ***/
exports.angle_2_radius = 0.01745329251994329576923690768489;
/**
 * CoffeeBean
 * 数学库封装
 *
 * By Leo
 */
var CMath = /** @class */ (function () {
    function CMath() {
    }
    /**
     * 在一个数字 num 前面补上一定数量的  prefix ，长度 = len
     * 返回字符串
     *
     * 如  fixedNumber(123,5,"0") => "00123";
     * @param num  要补前缀的数字
     * @param len  限定长度
     * @param prefix  前缀字符
     */
    CMath.fixedNumber = function (num, len, prefix) {
        return (Array(len).join(prefix) + num).slice(-len);
    };
    /**
     * 限定一个数字在最小到最大值之间，返回限定后的值
     * @param num 要限定的数值
     * @param min 下限
     * @param max 上限
     */
    CMath.clamp = function (num, min, max) {
        if (num < min)
            num = min;
        else if (num > max)
            num = max;
        return num;
    };
    /**
     * 随机数封装，返回值 [min,max) 介于最小（包含），到最大之间（不包含）
     * @param max 最大值   （不包含）
     * @param min 最小值   （包含）
     */
    CMath.randFloat = function (max, min) {
        if (min === void 0) { min = 0; }
        return Math.random() * (max - min) + min;
    };
    /**
     * 随机数封装，返回值 [Min,Max) 介于最小（包含），到最大之间（不包含）
     * @param max 最大值   （不包含）
     * @param min 最小值   （包含）
     */
    CMath.randInt = function (max, min) {
        if (min === void 0) { min = 0; }
        return Math.floor(Math.random() * (max - min) + min);
    };
    /**
     * 随机数封装，返回 0-1之间的小数
     */
    CMath.rand_0_1 = function () {
        return Math.random();
    };
    /**
     * 让一个角度标准化  归入 [0,360) 度之间
     * @param angle 角度
     */
    CMath.normalizeAngle = function (angle) {
        while (angle >= 360) {
            angle -= 360;
        }
        while (angle < 0) {
            angle += 360;
        }
        return angle;
    };
    /**
     * 把一个数字从当前的 min,max区间映射到 newMin , newMax区间
     * 例如
     *     remap(50,0,100,20,40) ===> 30
     * 释义 原数字 50  原区间 0-100
     * 映射到新区间 20-40
     * 返回数字30
     *
     * @param num 要处理的数字
     * @param min 原缩放区间左值
     * @param max 原缩放区间右值
     * @param newMin 新区间左值
     * @param newMax 新区间右值
     */
    CMath.remap = function (num, min, max, newMin, newMax) {
        if (num <= min) {
            return newMin;
        }
        if (num >= max) {
            return newMax;
        }
        return (num - min) / (max - min) * (newMax - newMin) + newMin;
    };
    /**
     * 检查一个概率是否命中
     * @param ratio 概率
     * @param precentType 概率类型 默认为百分比
     */
    CMath.checkBingo = function (ratio, precentType) {
        if (precentType === void 0) { precentType = CEnum_1.EPrecentType.PRECENT_100; }
        return this.randFloat(0, precentType) <= ratio;
    };
    return CMath;
}());
exports.default = CMath;

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
        //# sourceMappingURL=CMath.js.map
        