(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Sample.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e096aXMwDBC0oVwDmYqyLPK', 'Sample', __filename);
// script/Sample.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CoffeeBean_1 = require("../coffee_bean/CoffeeBean");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 示例类
 */
var Sample = /** @class */ (function (_super) {
    __extends(Sample, _super);
    function Sample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 加载时
     */
    Sample.prototype.onLoad = function () {
        /*** 初始化框架 ***/
        CoffeeBean_1.default.init();
    };
    /**
     * Start
     */
    Sample.prototype.start = function () {
        var a;
        var b;
        var c = true;
    };
    Sample = __decorate([
        ccclass
    ], Sample);
    return Sample;
}(cc.Component));
exports.default = Sample;
var tt = /** @class */ (function () {
    function tt() {
    }
    return tt;
}());

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
        //# sourceMappingURL=Sample.js.map
        