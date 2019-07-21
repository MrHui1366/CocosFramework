"use strict";
cc._RF.push(module, '3086do9mnpNjLWpneppUrsM', 'CUserData');
// coffee_bean/data/CUserData.ts

"use strict";
/**
 * CoffeeBean
 * 用户数据封装
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
Object.defineProperty(exports, "__esModule", { value: true });
var CSingleton_1 = require("./../core/CSingleton");
var CRes_1 = require("./../core/CRes");
/**
 * 吉祥美大厅返回用户数据结构
 */
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
/**
 * 用户数据管理
 * 提供用户数据的存储和访问
 *
 * @export
 * @class CUserData
 */
var CUserData = /** @class */ (function (_super) {
    __extends(CUserData, _super);
    function CUserData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CUserData.prototype, "UserInfo", {
        /*** 用户信息 ***/
        get: function () { return this._userinfo; },
        enumerable: true,
        configurable: true
    });
    /**
     * 使用本地json来初始化用户信息
     *
     * @memberof CUserData
     */
    CUserData.prototype.initWithLocalData = function () {
        var jsonobj = CRes_1.default.getJson("resources/config/account.json");
        this._userinfo = jsonobj;
    };
    return CUserData;
}(CSingleton_1.CSingleton));
exports.CUserData = CUserData;

cc._RF.pop();