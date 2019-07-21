"use strict";
cc._RF.push(module, 'ebb98e4S0lG5Zgm3iLr66h4', 'CSingleton');
// coffee_bean/core/CSingleton.ts

"use strict";
/**
 * CoffeeBean
 * 单例封装
 *
 * By Leo
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 普通单例类
 *
 * 示例
 * export class test:CSingleton{
 *     public a:number = 10;
 * }
 * 可以使用
 *     test.instance().a
 * 来访问其成员
 */
var CSingleton = /** @class */ (function () {
    function CSingleton() {
    }
    CSingleton.instance = function () {
        if (this._inst == null)
            this._inst = new this();
        return this._inst;
    };
    CSingleton._inst = null;
    return CSingleton;
}());
exports.CSingleton = CSingleton;

cc._RF.pop();