"use strict";
cc._RF.push(module, '5e45b4sIgVFJqmYRU4zf8kG', 'CExFunction');
// coffee_bean/expand/CExFunction.ts

/**
 * 返回一个函数是否绑定过this
 *
 * @returns
 * @memberof Function
 */
Function.prototype.hasBind = function () {
    return this.name.startsWith("bound ") && this["[[BoundThis]]"] && this["[[BoundArgs]]"];
};

cc._RF.pop();