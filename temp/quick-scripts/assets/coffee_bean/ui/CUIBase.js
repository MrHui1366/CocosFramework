(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/ui/CUIBase.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0b74cRE/RJDjJs1zXRzxlmD', 'CUIBase', __filename);
// coffee_bean/ui/CUIBase.ts

"use strict";
/** CoffeeBean
 * UI库
 *
 * By Leo
 */
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var CRes_1 = require("../core/CRes");
var CLOG_1 = require("../utils/CLOG");
var CGlobal_1 = require("../common/CGlobal");
/**
* UI基类
*/
var CUIBase = /** @class */ (function (_super) {
    __extends(CUIBase, _super);
    function CUIBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取单例引用
     */
    CUIBase.getUInstance = function () {
        return this._inst;
    };
    /**
     * 获取非单例引用 们
     */
    CUIBase.getUInstances = function () {
        return this._insts;
    };
    /*** 销毁时 ***/
    CUIBase.prototype.onDestroy = function () {
        var _this = this;
        // 从UI引用中移除引用
        if (this._is_singleton) {
            CLOG_1.default.I(CGlobal_1.TAG_COFFEE_BEAN, "UI:" + this._type.name + " inst => null");
            this._type._inst = null;
        }
        else {
            var index = this._type._insts.findIndex(function (value, index, array) { return value == _this; });
            if (index != -1) {
                CLOG_1.default.I(CGlobal_1.TAG_COFFEE_BEAN, "UI:" + this._type.name + " insts" + index + "/" + this._type._insts.length + " => null");
                this._type._insts.splice(index, 1);
            }
        }
    };
    /**
     * 创建UI
     * @param parentContainer 父节点，为空则自动挂到摄像机下
     */
    CUIBase.createUI = function (parentContainer) {
        if (parentContainer === void 0) { parentContainer = null; }
        return __awaiter(this, void 0, Promise, function () {
            var prefab, ins;
            return __generator(this, function (_a) {
                try {
                    prefab = CRes_1.default.getRes(this.prefab_url, cc.Prefab);
                    // 若UI预制体并没有缓存
                    if (prefab == null) {
                        CLOG_1.default.E(CGlobal_1.TAG_COFFEE_BEAN, "ui prefab:{0} is not cached!! please load it first!");
                        return [2 /*return*/, null];
                    }
                    if (this.is_singleton) {
                        // 单例UI
                        // 只有在单例引用为空时
                        // 才能创建
                        this._inst == null && this.createUIComponent(prefab, parentContainer);
                        // 记录是否类类型，方便释放
                        this._inst._is_singleton = true;
                        return [2 /*return*/, this._inst];
                    }
                    else {
                        if (this._insts == null) {
                            this._insts = new Array();
                        }
                        ins = this.createUIComponent(prefab, parentContainer);
                        this._insts.push(ins);
                        this._inst._is_singleton = false;
                        return [2 /*return*/, ins];
                    }
                }
                catch (exception) {
                    CLOG_1.default.EE(CGlobal_1.TAG_COFFEE_BEAN, exception);
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 创建UI实例
     *
     * @private
     * @returns
     * @memberof CUIBase
     */
    CUIBase.createUIComponent = function (prefab, parentContainer) {
        if (parentContainer === void 0) { parentContainer = null; }
        // 实例化预制体
        var node = cc.instantiate(prefab);
        // ui组件实例
        this._inst = node.addComponent(this);
        // 父容器
        if (parentContainer == null) {
            cc.Camera.main.node.addChild(node);
        }
        else {
            parentContainer.addChild(node);
        }
        // 记录UI脚本对象的类型
        // 方便释放
        this._inst._type = this;
        return this._inst;
    };
    /**
     * 销毁UI
     *
     * ！！注意！！
     * 参数 target 为可选参数
     *
     * 当UI为单例UI的情况下
     *     无论传不传 target 都会销毁单例UI
     *
     * 当UI为非单例UI的情况下
     *     传 target 则销毁 特定的非单例UI
     *   不传 target 则销毁 所有的非单例UI
     *
     * release 释放资源
     * 对于只显示一次的UI
     * 建议在关闭时传true
     * 这样在销毁UI时连带其预制体与UI资源都会一起销毁
     *
     * @static
     * @template T
     * @param this
     * @param [release=false] 是否释放资源
     * @param [target] 销毁目标，可选参数
     * @returns
     * @memberof CUIBase
     */
    CUIBase.destoryUI = function (release, target) {
        if (release === void 0) { release = false; }
        if (this.is_singleton) {
            this._inst.node.destroy();
            this._inst = null;
        }
        else {
            if (target === void 0) {
                // 不传参，销毁所有
                for (var index = 0; index < this._insts.length; index++) {
                    this._insts[index].node.destroy();
                }
                this._insts = [];
                return;
            }
            else {
                // 传参，销毁特定
                for (var index = 0; index < this._insts.length; index++) {
                    var element = this._insts[index];
                    if (element == target) {
                        element.node.destroy();
                        this._insts.splice(index, 1);
                        break;
                    }
                }
            }
        }
        // 释放资源
        if (release)
            CRes_1.default.releaseRes(this.prefab_url, true);
    };
    // 非单例ui组件引用
    CUIBase._insts = null;
    // 单例ui组件引用
    CUIBase._inst = null;
    return CUIBase;
}(cc.Component));
exports.CUIBase = CUIBase;

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
        //# sourceMappingURL=CUIBase.js.map
        