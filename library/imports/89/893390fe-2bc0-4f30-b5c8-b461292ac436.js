"use strict";
cc._RF.push(module, '89339D+K8BPMLXItGEpKsQ2', 'CUI');
// coffee_bean/utils/CUI.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CLOG_1 = require("./CLOG");
var CUI = /** @class */ (function () {
    function CUI() {
    }
    /**
    * 转化画布坐标到屏幕坐标
    * @param pos 要转化的坐标
    */
    CUI.cpos_2_spos = function (pos) {
        var canvas_node = cc.Canvas.instance.node;
        if (canvas_node == null) {
            CLOG_1.default.E("can not find canvas in now scene!!!");
            return;
        }
        var canvas_anchor = canvas_node.getAnchorPoint();
        var canvas_size = canvas_node.getContentSize();
        var offset = new cc.Vec2(canvas_size.width * canvas_anchor.x, canvas_size.height * canvas_anchor.y);
        return pos.add(offset);
    };
    /**
    * 转化屏幕坐标到画布坐标
    * @param pos 要转化的坐标
    */
    CUI.spos_2_cpos = function (pos) {
        var canvas_node = cc.Canvas.instance.node;
        if (canvas_node == null) {
            CLOG_1.default.E("can not find canvas in now scene!!!");
            return;
        }
        var canvas_anchor = canvas_node.getAnchorPoint();
        var canvas_size = canvas_node.getContentSize();
        var offset = new cc.Vec2(canvas_size.width * canvas_anchor.x, canvas_size.height * canvas_anchor.y);
        return pos.sub(offset);
    };
    /**
     * 创建精灵节点
     * 精灵节点可以设置图像
     *
     * @memberof CUI
     */
    CUI.createSpriteNode = function (name) {
        var node = new cc.Node(name);
        var sp = node.addComponent(cc.Sprite);
        return [node, sp];
    };
    /**
     * 创建文本节点
     * 文本节点可以设置文字
     *
     * @static
     * @returns
     * @memberof CUI
     */
    CUI.createLabelNode = function (name) {
        var node = new cc.Node(name);
        var label = node.addComponent(cc.Label);
        return [node, label];
    };
    /**
     * 创建绘图节点
     * 绘图节点可以绘制图像
     *
     * @static
     * @returns
     * @memberof CUI
 */
    CUI.createGraphicNode = function (name) {
        var node = new cc.Node(name);
        var gic = node.addComponent(cc.Graphics);
        return [node, gic];
    };
    return CUI;
}());
exports.CUI = CUI;

cc._RF.pop();