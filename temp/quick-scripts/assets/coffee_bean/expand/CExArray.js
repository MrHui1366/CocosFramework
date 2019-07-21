(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/expand/CExArray.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '03be2G1wRlI6IwnoQa/HDMn', 'CExArray', __filename);
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
        //# sourceMappingURL=CExArray.js.map
        