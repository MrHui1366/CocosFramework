(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/component/CLoading.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3b1d3ef5/JDqJXuoFoTU0jZ', 'CLoading', __filename);
// coffee_bean/component/CLoading.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CEnum_1 = require("../common/CEnum");
var CBase64_1 = require("../data/CBase64");
var CUI_1 = require("../utils/CUI");
var CMath_1 = require("../utils/CMath");
var CGlobal_1 = require("../common/CGlobal");
var ccclass = cc._decorator.ccclass;
/** 球的尺寸 ***/
var BALL_SIZE = 12;
/*** 球的数量 ***/
var BALL_COUNT = 12;
/** 小球初始偏移 ***/
var DISTANCE = 32;
/** 移动用时 ***/
var MOVE_TIME = 1.0;
/**
 * 全屏Loading遮罩
 * 使用方法
 *      CLoading.show("haha",ETheme.DARK);
 *      CLoading.show();
 *      CLoading.hide();
 */
var CLoading = /** @class */ (function () {
    function CLoading() {
    }
    /**
     * 隐藏Loading遮罩
     */
    CLoading.hide = function () {
        if (this._uinst == null) {
            return;
        }
        // 激活显示
        this._uinst.active = false;
    };
    /**
     * 显示Loading 遮罩
     * @param content 文字内容
     * @param theme
     */
    CLoading.show = function (content, theme) {
        if (content === void 0) { content = null; }
        if (theme === void 0) { theme = CEnum_1.ETheme.DARK; }
        if (this._uinst == null) {
            this.create(content, theme);
            return;
        }
        // 激活显示
        this._uinst.active = true;
        this._uinst.set_2_Top();
        this.updateTheme(content, theme);
    };
    /*** 更新主题 ***/
    CLoading.updateTheme = function (content, theme) {
        if (content === void 0) { content = null; }
        if (theme === void 0) { theme = CEnum_1.ETheme.DARK; }
        this._uinst.color = theme == CEnum_1.ETheme.DARK ? cc.Color.BLACK : cc.Color.WHITE;
        for (var i = 0; i < this._balls.length; i++) {
            var element = this._balls[i];
            element.color = theme == CEnum_1.ETheme.DARK ? cc.Color.WHITE : cc.Color.BLACK;
        }
        if (this._label == null) {
            this.createText(content, theme);
        }
        else {
            this._label.color = theme == CEnum_1.ETheme.DARK ? cc.Color.WHITE : cc.Color.BLACK;
            this._label.getComponent(cc.Label).string = content;
        }
    };
    /**
     * 创建遮罩
     * @param theme 主题
     */
    CLoading.create = function (content, theme) {
        if (content === void 0) { content = null; }
        if (theme === void 0) { theme = CEnum_1.ETheme.DARK; }
        // 准备资源
        var sp = CBase64_1.CBASE64.createSpriteFrameFromBase64Img(CBase64_1.CBASE64.RECT_SP);
        // 创建背景
        var _a = CUI_1.CUI.createSpriteNode("UI_Loading"), ui = _a[0], spback = _a[1];
        this._uinst = ui;
        this._uinst.setAnchorPoint(0.5, 0.5);
        this._uinst.setContentSize(cc.winSize);
        this._uinst.color = theme == CEnum_1.ETheme.DARK ? cc.Color.BLACK : cc.Color.WHITE;
        this._uinst.opacity = 153;
        // 设置背景遮罩
        spback.spriteFrame = sp;
        spback.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        // 设置阻止层
        this._uinst.addComponent(cc.BlockInputEvents);
        // 创建文本
        (content != null) && this.createText(content, theme);
        // 创建球
        this.createBall(theme);
        // 添加到摄像机上
        cc.Camera.main.node.addChild(this._uinst);
    };
    /**
     * 创建文本
     */
    CLoading.createText = function (content, theme) {
        var _a = CUI_1.CUI.createLabelNode("hint"), node = _a[0], label = _a[1];
        label.string = content;
        label.fontSize = CGlobal_1.FONT_NORMAL;
        node.color = (theme == CEnum_1.ETheme.DARK ? cc.Color.WHITE : cc.Color.BLACK).setA(0.5);
        node.y = 0 - DISTANCE * 2;
        this._label = node;
        this._uinst.addChild(node);
    };
    /**
     * 创建小球
     * 并设置运动
     */
    CLoading.createBall = function (theme) {
        this._ballContainer = new cc.Node("ballContainer");
        this._uinst.addChild(this._ballContainer);
        this._ballContainer.y = DISTANCE;
        // 小球容器不断循环旋转
        var rotation = cc.rotateBy(MOVE_TIME * 1.6, 360).repeatForever();
        this._ballContainer.runAction(rotation);
        // 小球数组
        this._balls = new Array(BALL_COUNT);
        // 创建小球
        for (var i = 0; i < BALL_COUNT; i++) {
            var radian = 360 / BALL_COUNT * i * CMath_1.angle_2_radius;
            var radius = DISTANCE;
            var pos = new cc.Vec2(Math.cos(radian) * radius, Math.sin(radian) * radius);
            var _a = CUI_1.CUI.createSpriteNode("Ball" + (i + 1)), node = _a[0], sp = _a[1];
            sp.spriteFrame = CBase64_1.CBASE64.createSpriteFrameFromBase64Img(CBase64_1.CBASE64.BALL_SP);
            sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            node.setContentSize(BALL_SIZE, BALL_SIZE);
            node.setPosition(pos);
            node.opacity = 153;
            this._ballContainer.addChild(node);
            // 设置运动
            var moveBack = cc.moveTo(MOVE_TIME, pos).easing(cc.easeBackOut());
            var moveCenter = cc.moveTo(MOVE_TIME * 2, 0, 0).easing(cc.easeCubicActionIn());
            var delay = cc.delayTime(MOVE_TIME);
            var seq = cc.sequence(moveCenter, moveBack, delay).repeatForever();
            // 运行运动
            node.runAction(seq);
            this._balls[i] = node;
        }
    };
    /*** 界面 节点 ***/
    CLoading._uinst = null;
    /*** 小球容器 ***/
    CLoading._ballContainer = null;
    /*** 是否已经初始化 ***/
    CLoading._hasInit = false;
    /*** 文字标签 ***/
    CLoading._label = null;
    CLoading = __decorate([
        ccclass
    ], CLoading);
    return CLoading;
}());
exports.CLoading = CLoading;

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
        //# sourceMappingURL=CLoading.js.map
        