(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/core/CRes.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '04360LJEWdKZY2zLCiVPyEY', 'CRes', __filename);
// coffee_bean/core/CRes.ts

"use strict";
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
/**
 * CoffeeBean
 * 资源管理封装
 *
 * By Leo
 *
 */
/// <reference path ="./CMap.ts"/>
var CLOG_1 = require("../utils/CLOG");
var CGlobal_1 = require("../common/CGlobal");
/**
 * 资源管理类
 */
var CRes = /** @class */ (function () {
    function CRes() {
    }
    /**
     * 异步读取一个目录的资源
     * 并缓存他
     * @param url 要读取得目录
     * @param type 要读取得资源类型
     */
    CRes.loadResDirAsnyc = function (url, type) {
        CLOG_1.default.IF(CGlobal_1.TAG_COFFEE_BEAN, CGlobal_1.SHOW_RESOURCE_LOG, ">>> loader dir resource begin <<<");
        // 处理url
        var stand_url = this.handleResURL(url);
        return new Promise(function (resolve, reject) {
            // 使用 cocos loader 来加载指定目录资源
            cc.loader.loadResDir(stand_url, type, function (err, assets, urls) {
                if (err != null) {
                    CLOG_1.default.EE(CGlobal_1.TAG_COFFEE_BEAN, err);
                    reject();
                }
                CLOG_1.default.IF(CGlobal_1.TAG_COFFEE_BEAN, CGlobal_1.SHOW_RESOURCE_LOG, "    url folder:{0} load successful", stand_url);
                // 加载成功，返回加载的资源
                resolve(assets);
            });
        });
    };
    /**
     * 读取资源
     * 并缓存他
     * @param url 要加载的资源URL
     * @param type 资源类型 cc.SpriteFrame | cc.SpriteAtlas | cc.Texture2D | cc.AudioClip | cc.AnimationClip | cc.TextAsset | cc.JsonAsset | cc.Prefab | cc.Font | cc.BitCMapFont
     * @param cache 是否缓存 默认为缓存
     */
    CRes.loadRes = function (url, type, cache) {
        if (cache === void 0) { cache = true; }
        CLOG_1.default.IF(CGlobal_1.TAG_COFFEE_BEAN, CGlobal_1.SHOW_RESOURCE_LOG, ">>> loader resource begin <<<");
        // 处理url
        var stand_url = this.handleResURL(url);
        return new Promise(function (resolve, reject) {
            // 使用 cocos loader 来加载指定资源
            cc.loader.loadRes(stand_url, type, function (err, assets) {
                if (err != null) {
                    CLOG_1.default.EE(CGlobal_1.TAG_COFFEE_BEAN, err);
                    reject();
                }
                CLOG_1.default.IF(CGlobal_1.TAG_COFFEE_BEAN, CGlobal_1.SHOW_RESOURCE_LOG, "    load successful");
                // 加载成功，返回加载的资源
                resolve(assets);
            }); // loader end
        }); // Promise end
    };
    /**
     * 从缓存中获取一个资源
     * @param url 要获取的URL
     * @param type 资源类型 cc.SpriteFrame | cc.SpriteAtlas | cc.Texture2D | cc.AudioClip | cc.AnimationClip | cc.TextAsset | cc.JsonAsset | cc.Prefab | cc.Font | cc.BitCMapFont
     */
    CRes.getRes = function (url, type) {
        var res = cc.loader.getRes(url, type);
        return res;
    };
    /**
     * 释放一个资源
     * 默认不会释放其依赖资源
     * releaseDepends传true则会释放依赖资源
     *
     * @param url 要释放的资源URL
     * @param releaseDepends 是否释放依赖的资源
     *
     */
    CRes.releaseRes = function (url, releaseDepends) {
        if (releaseDepends === void 0) { releaseDepends = false; }
        if (releaseDepends) {
            // 释放一个 prefab 以及所有它依赖的资源
            var deps = cc.loader.getDependsRecursively(url);
            cc.loader.release(deps);
        }
        else
            cc.loader.release(url);
    };
    /**
     * 处理资源路径
     * 去除resources/ 前缀
     * .文件类型的影响
     * @param url 资源路径
     */
    CRes.handleResURL = function (url) {
        var source_url = url;
        url = url.toLowerCase();
        if (url.startsWith("resources/")) {
            url = url.substring(10);
        }
        var lastpoint = url.lastIndexOf(".");
        var lastgang = url.lastIndexOf("/");
        if (lastpoint > lastgang) {
            url = url.substring(0, lastpoint);
        }
        CLOG_1.default.IF(CGlobal_1.TAG_COFFEE_BEAN, CGlobal_1.SHOW_RESOURCE_LOG, "    url:" + source_url + " => " + url);
        return url;
    };
    /**
     * 异步创建预制体
     */
    CRes.createPrefabAsync = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var prefab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prefab = cc.loader.getRes(url, cc.Prefab);
                        if (prefab != null) {
                            return [2 /*return*/, cc.instantiate(prefab)];
                        }
                        return [4 /*yield*/, this.loadRes(url, cc.Prefab)];
                    case 1:
                        prefab = _a.sent();
                        return [2 /*return*/, cc.instantiate(prefab)];
                }
            });
        });
    };
    /**
     * 同步创建预制体
     */
    CRes.createPrefab = function (url) {
        var prefab = cc.loader.getRes(url, cc.Prefab);
        if (prefab != null) {
            return cc.instantiate(prefab);
        }
        return null;
    };
    /**
     * 获得缓存的JSON对象
     *
     * @static
     * @template T
     * @param url JSON路径
     * @returns
     * @memberof CRes
     */
    CRes.getJson = function (url) {
        var json = this.getRes(url, cc.JsonAsset).json;
        return json;
    };
    /**
     * 获得图集
     *
     * @static
     * @param url 图集地址
     * @returns
     * @memberof CRes
     */
    CRes.getSpriteAtlas = function (url) {
        return this.getRes(url, cc.SpriteAtlas);
    };
    /**
     * 获得精灵帧
     * 注意！！！
     * 一般精灵都会合图
     * 直接调用 CRes.getSpriteFrame(url)
     * 无法获取到正确图片
     *
     * 获取合图中散图的方法
     * CRes.getSpriteAtlas(图集路径).getSpriteFrame(精灵名);
     *
     * @static
     * @param url 精灵地址
     * @returns
     * @memberof CRes
     */
    CRes.getSpriteFrame = function (url) {
        return this.getRes(url, cc.SpriteFrame);
    };
    /**
     * 获得文本资源
     * txt,ini,csv等都属于文本资源
     *
     * @static
     * @param url 文本路径
     * @returns
     * @memberof CRes
     */
    CRes.getText = function (url) {
        return this.getRes(url, cc.TextAsset);
    };
    /**
     * 声音资源
     *
     * @static
     * @param url
     * @returns
     * @memberof CRes
     */
    CRes.getSound = function (url) {
        return this.getRes(url, cc.AudioClip);
    };
    return CRes;
}());
exports.default = CRes;

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
        //# sourceMappingURL=CRes.js.map
        