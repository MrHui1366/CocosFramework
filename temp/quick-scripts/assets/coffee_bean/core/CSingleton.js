(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/core/CSingleton.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ebb98e4S0lG5Zgm3iLr66h4', 'CSingleton', __filename);
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
        //# sourceMappingURL=CSingleton.js.map
        