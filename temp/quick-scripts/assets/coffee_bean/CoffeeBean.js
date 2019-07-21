(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/CoffeeBean.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f952f76kghNKIWKsr5NSnA5', 'CoffeeBean', __filename);
// coffee_bean/CoffeeBean.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CLOG_1 = require("./utils/CLOG");
/**
 * 框架入口
 *
 * @export
 * @class CoffeeBean
 */
var CoffeeBean = /** @class */ (function () {
    function CoffeeBean() {
    }
    /*** 初始化 ***/
    CoffeeBean.init = function () {
        if (this.hasInit)
            return;
        this.hasInit = true;
        // 启用log系统
        CLOG_1.default.enable();
    };
    /*** 是否已经初始化 ***/
    CoffeeBean.hasInit = false;
    return CoffeeBean;
}());
exports.default = CoffeeBean;

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
        //# sourceMappingURL=CoffeeBean.js.map
        