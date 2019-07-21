(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/core/CMsg.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3b6b3x9M+hGn4vTmGelYFk5', 'CMsg', __filename);
// coffee_bean/core/CMsg.ts

"use strict";
/**
 * CoffeeBean
 * 消息库封装
 *
 * By Leo
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CLOG_1 = require("../utils/CLOG");
var CMap_1 = require("./CMap");
var CGlobal_1 = require("../common/CGlobal");
/**
 * 自定义消息处理器
 *
 * @export
 * @class CMsg
 */
var CMsg = /** @class */ (function () {
    function CMsg() {
    }
    /**
     * 注册一个消息处理
     * @param msg 消息名
     * @param handler 处理函数
     * @param target 目标对象
     * @param once 是否只触发一次
     */
    CMsg.addMsgHandler = function (msg, handler, target, once) {
        if (once === void 0) { once = false; }
        if (msg.isEmptyOrNull()) {
            CLOG_1.default.E(CGlobal_1.TAG_COFFEE_BEAN, "add msg is null or empty");
            return;
        }
        if (target == null || handler == null) {
            CLOG_1.default.E(CGlobal_1.TAG_COFFEE_BEAN, "target or handler is null!!");
            return;
        }
        /*** 若该事件未被注册 ***/
        if (!this.msgHandleList.has(msg)) {
            this.msgHandleList.set(msg, new Array());
        }
        var container = this.msgHandleList.get(msg);
        // 防止反复注册
        for (var i = 0; i < container.length; i++) {
            var item = container[i];
            if (item.handler == handler && item.target == target) {
                return;
            }
        }
        // 注册
        // 为了区分参数和接口属性名而不得以添加引号进行区分
        container.push({ 'handler': handler, 'target': target, 'once': once });
    };
    /**
     * 派发事件
     * @param msg 要派发的事件
     * @param params 参数列表
     */
    CMsg.dispatchMsg = function (msg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        // 安全检查
        if (msg.isEmptyOrNull()) {
            CLOG_1.default.E(CGlobal_1.TAG_COFFEE_BEAN, "dispatch msg is null or empty");
            return;
        }
        // 没有注册该消息时的处理
        if (!this.msgHandleList.has(msg)) {
            return;
        }
        // 得到所有注册的处理
        var handlers = this.msgHandleList.get(msg);
        // 得到数量
        var handler_count = handlers.length;
        // 倒序遍历，防止删除引起的循环异常
        for (var i = handler_count - 1; i >= 0; i--) {
            var item = handlers[i];
            if (item.target != null && item.handler != null) {
                // 存在处理对象才调用
                item.handler.bind(item.target)(params);
                if (item.once) {
                    // 否则移除调用者
                    handlers.splice(i, 1);
                }
            }
            else {
                // 否则移除调用者
                handlers.splice(i, 1);
            }
        }
    };
    /**
     * 移除一个事件监听
     * @param msg 要移除的消息
     * @param handler 要移除的处理函数
     * @param target 目标对象
     */
    CMsg.removeHandler = function (msg, handler, target) {
        if (msg.isEmptyOrNull()) {
            CLOG_1.default.E(CGlobal_1.TAG_COFFEE_BEAN, "add msg is null or empty");
            return;
        }
        if (target == null || handler == null) {
            CLOG_1.default.E(CGlobal_1.TAG_COFFEE_BEAN, "target or handler is null!!");
            return;
        }
        // 没有注册该消息时的处理
        if (!this.msgHandleList.has(msg)) {
            return;
        }
        // 得到所有注册的处理
        var handlers = this.msgHandleList.get(msg);
        // 得到数量
        var handler_count = handlers.length;
        // 倒序遍历，防止删除引起的循环异常
        for (var i = handler_count - 1; i >= 0; i--) {
            var item = handlers[i];
            // 存在处理对象才调用
            if (item.target == target && item.handler == handler) {
                handlers.splice(i, 1);
            }
        }
    };
    /**
     * 移除一个目标身上所有事件监听
     */
    CMsg.removeTargetHandler = function (target) {
        if (target == null) {
            CLOG_1.default.E(CGlobal_1.TAG_COFFEE_BEAN, "removeTargetHandler param is incorrect! target = null");
            return;
        }
        var msgCount = this.msgHandleList.size;
        for (var i = msgCount - 1; i >= 0; i--) {
            var item = this.msgHandleList.getKV(i);
            for (var j = item.value.length - 1; j >= 0; j--) {
                if (item.value[j].target == target) {
                    this.msgHandleList.delete(item.key);
                }
            }
        }
    };
    /**
     * 移除一个事件消息的所有监听
     * @param msg 要移除的消息
     */
    CMsg.removeAllHandler = function (msg) {
        if (this.msgHandleList.has(msg)) {
            this.msgHandleList.delete(msg);
        }
    };
    CMsg.msgHandleList = new CMap_1.CMap();
    return CMsg;
}());
exports.default = CMsg;

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
        //# sourceMappingURL=CMsg.js.map
        