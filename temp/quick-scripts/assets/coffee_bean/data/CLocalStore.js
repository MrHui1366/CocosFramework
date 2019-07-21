(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/data/CLocalStore.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '195f2aDSsVIpq99qzqZMKRk', 'CLocalStore', __filename);
// coffee_bean/data/CLocalStore.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CUserData_1 = require("./CUserData");
/**
 * 本地存储类
 */
var CLocalStore = /** @class */ (function () {
    function CLocalStore() {
    }
    /*** 获得真正的key ***/
    CLocalStore.getKey = function (key) {
        return CUserData_1.CUserData.instance().UserInfo.user_id + "_" + key;
    };
    /*** 移除本地记录 ***/
    CLocalStore.removeKey = function (key) {
        key = this.getKey(key);
        cc.sys.localStorage.removeItem(key);
    };
    /**
     * 向本地存储中存储一个整数数字
     */
    CLocalStore.save_int = function (key, value) {
        key = this.getKey(key);
        cc.sys.localStorage.setItem(key, value);
    };
    /**
     * 从本地存储中读取一个整数数字
     */
    CLocalStore.load_int = function (key) {
        key = this.getKey(key);
        return parseInt(cc.sys.localStorage.getItem(key));
    };
    /**
     * 向本地存储中存储一个浮点数字
     */
    CLocalStore.save_float = function (key, value) {
        key = this.getKey(key);
        cc.sys.localStorage.setItem(key, value);
    };
    /**
     * 从本地存储中读取一个浮点数字
     */
    CLocalStore.load_float = function (key) {
        key = this.getKey(key);
        return parseFloat(cc.sys.localStorage.getItem(key));
    };
    /**
     * 向本地存储中存储一个字符串
     */
    CLocalStore.save_string = function (key, value) {
        key = this.getKey(key);
        cc.sys.localStorage.setItem(key, value);
    };
    /**
     * 从本地存储中读取一个字符串
     */
    CLocalStore.load_string = function (key) {
        key = this.getKey(key);
        return cc.sys.localStorage.getItem(key);
    };
    /**
     * 向本地存储中存储一个布尔值
     */
    CLocalStore.save_boolean = function (key, value) {
        key = this.getKey(key);
        value ? this.save_int(key, 1) : this.save_int(key, 0);
    };
    /**
     * 从本地存储中读取一个布尔值
     */
    CLocalStore.load_boolean = function (key) {
        key = this.getKey(key);
        return this.load_int(key) == 1 ? true : false;
    };
    return CLocalStore;
}());
exports.default = CLocalStore;

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
        //# sourceMappingURL=CLocalStore.js.map
        