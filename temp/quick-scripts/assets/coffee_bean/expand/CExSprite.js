(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/expand/CExSprite.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '02d80SuxTNCIrcdT6Kj+TwV', 'CExSprite', __filename);
// coffee_bean/expand/CExSprite.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CEnum_1 = require("../common/CEnum");
var CLOG_1 = require("../utils/CLOG");
var CGlobal_1 = require("../common/CGlobal");
/**
 * 从Node的儿子中查找组件
 * 支持路径连写
 * @param type 要查找的组件类型
 */
cc.Sprite.prototype.loadURLImage = function (url, sizeMode, complete_handler) {
    var _this = this;
    if (sizeMode === void 0) { sizeMode = CEnum_1.EPicSizeMode.FIT_NODE; }
    if (complete_handler === void 0) { complete_handler = null; }
    CLOG_1.default.I(CGlobal_1.TAG_COFFEE_BEAN, "ready to request remote image: " + url);
    var size = null;
    /*** 加载远程头像 ***/
    cc.loader.load({ url: url, type: 'png' }, function (err, data) {
        if (err != null) {
            CLOG_1.default.E(CGlobal_1.TAG_COFFEE_BEAN, err);
        }
        CLOG_1.default.I(CGlobal_1.TAG_COFFEE_BEAN, "load complete! url= " + url);
        // 确定尺寸
        if (sizeMode == CEnum_1.EPicSizeMode.FIT_PIC)
            size = new cc.Size(data.width, data.height);
        else if (sizeMode == CEnum_1.EPicSizeMode.FIT_NODE)
            size = _this.node.getContentSize();
        _this.spriteFrame = new cc.SpriteFrame(data);
        _this.node.setContentSize(size);
        complete_handler && complete_handler();
    });
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
        //# sourceMappingURL=CExSprite.js.map
        