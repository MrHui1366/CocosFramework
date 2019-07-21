(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/network/CNetwork.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '772710g4GpJ7rrakT22fYNT', 'CNetwork', __filename);
// coffee_bean/network/CNetwork.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CoffeeBean
 * websocket库
 *
 * By Leo
 */
var CLOG_1 = require("../utils/CLOG");
/** 是否显示socket log ***/
var SHOW_SOCKET_LOG = true;
/**
 * 网络模块
 */
var CNetwork = /** @class */ (function () {
    function CNetwork() {
    }
    /**
     * 连接到服务器
     * @param URL 服务器URL
     */
    CNetwork.tryConnect = function (url) {
        CLOG_1.default.IF(SHOW_SOCKET_LOG, "ready to connect to " + URL);
        if (URL !== undefined) {
            // 指派了地址就连接指派的地址
            this.socket = new WebSocket(url);
            //记录当前准备连接的服务器地址
            this.nowConnectServerURL = url;
        }
        //初始化事件
        this.socket.onopen = this.onOpen;
        this.socket.onerror = this.onError;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
    };
    /**
     * Socket连接成功
     * @param event
     */
    CNetwork.onOpen = function (event) {
        CLOG_1.default.IF(SHOW_SOCKET_LOG, "Server: " + this.nowConnectServerURL + " connected successful!");
        this.isConnected = true;
        if (this.onOpenCallback !== null) {
            this.onOpenCallback(event);
        }
    };
    /**
     * Socket 连接错误
     * @param event
     */
    CNetwork.onError = function (event) {
        CLOG_1.default.EF(SHOW_SOCKET_LOG, "Server: " + this.nowConnectServerURL + " connected error!!");
        if (this.onErrorCallback !== null) {
            this.onErrorCallback(event);
        }
    };
    /**
     * Socket关闭事件
     * @param event
     */
    CNetwork.onClose = function (event) {
        CLOG_1.default.IF(SHOW_SOCKET_LOG, "connected close!");
        this.isConnected = false;
        if (this.onCloseCallback !== null) {
            this.onCloseCallback(event);
        }
    };
    /**
     * 收到消息事件
     * @param event
     */
    CNetwork.onMessage = function (event) {
        if (cc.sys.isNative) {
            var buff = new Array(event.data);
            var recStr = String.Utf8ArrayToStr(buff);
            var RecvPacket = JSON.parse(recStr);
            if (SHOW_SOCKET_LOG) {
                CLOG_1.default.I("[RECV] << " + recStr);
            }
        }
        else {
            var reader_1 = new FileReader();
            reader_1.readAsText(event.data, "UTF-8");
            reader_1.onload = function (e) {
                var RecvPacket = JSON.parse(reader_1.result);
                if (SHOW_SOCKET_LOG) {
                    CLOG_1.default.I("[RECV] << " + reader_1.result);
                }
            };
        }
    };
    /**
     * 设置连接成功回调
     * @param callback 连接成功回调
     */
    CNetwork.setOpenCallback = function (callback) {
        this.onOpenCallback = callback;
    };
    /**
     * 连接失败，发送、接收数据失败或者处理数据出现错误 回调
     * @param callback 错误回调
     */
    CNetwork.setErrorCallback = function (callback) {
        this.onErrorCallback = callback;
    };
    /**
     * 设置关闭连接回调
     * @param callback 关闭回调
     */
    CNetwork.setCloseCallback = function (callback) {
        this.onCloseCallback = callback;
    };
    /**
     * 关闭Socket连接
     * @constructor
     */
    CNetwork.Close = function () {
        CLOG_1.default.I("ready to close socket!");
        this.socket.close();
    };
    /** 当前连接的服务器URL ***/
    CNetwork.nowConnectServerURL = "unknown";
    /** WebSocket连接 ***/
    CNetwork.socket = null;
    /** 是否已连接 ***/
    CNetwork.isConnected = false;
    /** 连接成功回调 ***/
    CNetwork.onOpenCallback = null;
    /** 连接异常回调 ***/
    CNetwork.onErrorCallback = null;
    /** 连接关闭回调 ***/
    CNetwork.onCloseCallback = null;
    return CNetwork;
}());
exports.default = CNetwork;

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
        //# sourceMappingURL=CNetwork.js.map
        