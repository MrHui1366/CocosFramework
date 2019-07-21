"use strict";
cc._RF.push(module, 'f952f76kghNKIWKsr5NSnA5', 'CoffeeBean');
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