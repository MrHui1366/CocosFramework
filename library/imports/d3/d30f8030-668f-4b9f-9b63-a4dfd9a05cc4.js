"use strict";
cc._RF.push(module, 'd30f8AwZo9Ln5tjpN/ZoFzE', 'CDebug');
// coffee_bean/utils/CDebug.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CDebug = /** @class */ (function () {
    function CDebug() {
    }
    /**
     * 绘制一个圆形到场景
     * @param cpos 画布坐标
     */
    CDebug.debugDrawAnBall = function (cpos, target) {
        if (target === void 0) { target = null; }
        var node = new cc.Node("debug ball");
        var gpc = node.addComponent(cc.Graphics);
        gpc.fillColor = new cc.Color(255, 0, 0, 255);
        gpc.circle(0, 0, 5);
        gpc.fill();
        node.setPosition(cpos);
        if (target == null) {
            cc.Canvas.instance.node.addChild(node);
        }
        else {
            target.addChild(node);
        }
    };
    /**
     * 绘制节点的外边框
     */
    CDebug.drawBounds = function (target, color) {
        if (color === void 0) { color = cc.color(255, 0, 0, 153); }
        var rect = target.getBoundingBoxToWorld();
        var scene = cc.director.getScene();
        var debug_show = scene.getChildByName("debug_show");
        if (debug_show == null) {
            debug_show = new cc.Node("debug_show");
            scene.addChild(debug_show);
        }
        var gics = debug_show.getComponent(cc.Graphics);
        if (gics == null) {
            gics = debug_show.addComponent(cc.Graphics);
        }
        gics.clear();
        gics.fillColor = color;
        gics.fillRect(rect.x, rect.y, rect.width, rect.height);
        gics.fill();
    };
    /**
     * 绘制一个节点的锚点
     */
    CDebug.drawAnchorPoint = function (target, color) {
        if (color === void 0) { color = cc.color(255, 0, 0, 255); }
        var rect = target.getBoundingBoxToWorld();
        var scene = cc.director.getScene();
        var debug_show = scene.getChildByName("debug_show");
        if (debug_show == null) {
            debug_show = new cc.Node("debug_show");
            scene.addChild(debug_show);
        }
        var gics = debug_show.getComponent(cc.Graphics);
        if (gics == null) {
            gics = debug_show.addComponent(cc.Graphics);
        }
        var pos = target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        gics.fillColor = color;
        gics.circle(pos.x, pos.y, 10);
        gics.fill();
    };
    return CDebug;
}());
exports.default = CDebug;

cc._RF.pop();