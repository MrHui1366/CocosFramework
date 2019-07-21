(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/expand/CExNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2751eVTewpNL5go0FFGl4me', 'CExNode', __filename);
// coffee_bean/expand/CExNode.ts

/**
 * 从Node的儿子中查找组件
 * 支持路径连写
 * @param type 要查找的组件类型
 */
cc.Node.prototype.findChildComponent = function (relative_path, type) {
    var child = this.getChildByRelativePath(relative_path);
    if (child) {
        var comp = child.getComponent(type);
        return comp;
    }
    else {
        return null;
    }
};
/**
 * 扩展cc.Node类
 * 新增 getChildByRelativePath 方法
 * 可通过相对路径来获得相对于本节点的子节点
 * @param relative_path 相对路径
 */
cc.Node.prototype.getChildByRelativePath = function (relative_path) {
    var childnames = relative_path.split("/");
    var child = this;
    var index = 0;
    while (index < childnames.length) {
        child = child.getChildByName(childnames[index++]);
    }
    if (child == null) {
        cc.log("[WARNING]: the node " + relative_path + " can not find in under node " + this.name);
    }
    return child;
};
/**
 * 强调一个节点
 * @param type 1 放大强调  2 颜色强调 3 闪烁  4 跳1下
 */
cc.Node.prototype.accentNode = function (type) {
    if (type === void 0) { type = 1; }
    switch (type) {
        case 1:
            this.setScale(1.05, 1.05);
            this.runAction(cc.scaleTo(0.3, 1, 1).easing(cc.easeBackOut()));
            break;
        case 2:
            var temp = this.color;
            this.color = cc.Color.BLACK;
            this.runAction(cc.tintTo(1, temp.getR(), temp.getG(), temp.getB()));
            break;
        case 3:
            this.runAction(cc.blink(1, 5));
            break;
        case 4:
            this.runAction(cc.jumpBy(1, 0, 5));
            break;
    }
};
/*** 求一个节点的摄像机坐标 ***/
cc.Node.prototype.getCameraPos = function () {
    if (cc.Camera.main == null) {
        cc.error("the camera is not exist!!!");
        return null;
    }
    var worldPos = this.convertToWorldSpaceAR(cc.Vec2.ZERO);
    return cc.Camera.main.node.convertToNodeSpaceAR(worldPos);
};
/**
 * 设置一个节点为他容器的最顶层
 */
cc.Node.prototype.set_2_Top = function () {
    this.setSiblingIndex(this.getParent().childrenCount - 1);
};
/**
 * 在不改变物体锚点的情况下设置全屏
 * 放大/缩小 调整位置  已适应全屏
 */
cc.Node.prototype.setFullScreen = function () {
    // 防除0错误
    this.width === 0 && (this.width = cc.winSize.width);
    this.height === 0 && (this.height = cc.winSize.height);
    // 计算锚点比例
    var ax = this.anchorX / this.width;
    var ay = this.anchorY / this.height;
    this.setContentSize(cc.winSize);
    this.setPosition(this.width * ax, this.height * ay);
};
/**
 * 重置参数
 * 锚点设为 0.5,0.5
 * 缩放设置为 1,1,1
 *
 * @param this
 * @memberof Node
 */
cc.Node.prototype.reset = function () {
    this.setAnchorPoint(0.5, 0.5);
    this.setScale(1, 1);
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
        //# sourceMappingURL=CExNode.js.map
        