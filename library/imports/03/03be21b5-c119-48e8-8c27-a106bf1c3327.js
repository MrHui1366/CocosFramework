"use strict";
cc._RF.push(module, '03be2G1wRlI6IwnoQa/HDMn', 'CExArray');
// coffee_bean/expand/CExArray.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CMath_1 = require("../utils/CMath");
/**
 * 扩展 Array
 */
/*** 随机返回一项 ***/
Array.prototype.randItem = function () {
    var index = Math.floor(Math.random() * this.length);
    return this[index];
};
/**
 * 随机打乱一个数组
 * @param array 泛型数组引用
 */
Array.prototype.shuffle = function () {
    for (var i = 0; i < this.length; ++i) {
        var targetPos = CMath_1.default.randInt(this.length);
        var temp = this[i];
        this[i] = this[targetPos];
        this[targetPos] = temp;
        Object;
    }
};

cc._RF.pop();