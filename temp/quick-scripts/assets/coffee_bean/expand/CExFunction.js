(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/expand/CExFunction.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5e45b4sIgVFJqmYRU4zf8kG', 'CExFunction', __filename);
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
        //# sourceMappingURL=CExFunction.js.map
        