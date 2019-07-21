"use strict";
cc._RF.push(module, '582440pES9MhbJBh6W+ebGS', 'CEnum');
// coffee_bean/common/CEnum.ts

"use strict";
/**
 * CoffeeBean
 * 全局枚举
 * 包括通用的枚举定义
 *
 * By Leo
 * PS: 普通枚举在需要用到的地方直接定义导出即可
 *     这里只定义通用枚举
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 2方向 枚举
 *
 * @export
 * @enum {number}
 */
var EDirection_2;
(function (EDirection_2) {
    /*** 左 ***/
    EDirection_2[EDirection_2["LEFT"] = 0] = "LEFT";
    /*** 右 ***/
    EDirection_2[EDirection_2["RIGHT"] = 1] = "RIGHT";
})(EDirection_2 = exports.EDirection_2 || (exports.EDirection_2 = {}));
/**
 * 4方向 枚举
 *
 * @export
 * @enum {number}
 */
var EDirection_4;
(function (EDirection_4) {
    /*** 左 ***/
    EDirection_4[EDirection_4["LEFT"] = 0] = "LEFT";
    /*** 上 ***/
    EDirection_4[EDirection_4["UP"] = 1] = "UP";
    /*** 右 ***/
    EDirection_4[EDirection_4["RIGHT"] = 2] = "RIGHT";
    /*** 下 ***/
    EDirection_4[EDirection_4["DOWN"] = 3] = "DOWN";
})(EDirection_4 = exports.EDirection_4 || (exports.EDirection_4 = {}));
/**
 * 斜4方向 枚举
 *
 * @export
 * @enum {number}
 */
var EDirectionSkew_4;
(function (EDirectionSkew_4) {
    /*** 左上方 ***/
    EDirectionSkew_4[EDirectionSkew_4["LEFT_UP"] = 0] = "LEFT_UP";
    /*** 右上方 ***/
    EDirectionSkew_4[EDirectionSkew_4["RIGHT_UP"] = 1] = "RIGHT_UP";
    /*** 右下方 ***/
    EDirectionSkew_4[EDirectionSkew_4["RIGHT_DOWN"] = 2] = "RIGHT_DOWN";
    /*** 左下方 ***/
    EDirectionSkew_4[EDirectionSkew_4["LEFT_DOWN"] = 3] = "LEFT_DOWN";
})(EDirectionSkew_4 = exports.EDirectionSkew_4 || (exports.EDirectionSkew_4 = {}));
/**
 * 弹出框按钮样式
 *
 * @export
 * @enum {number}
 */
var EPopupButtonType;
(function (EPopupButtonType) {
    /*** 只有OK按钮 ***/
    EPopupButtonType[EPopupButtonType["OK_ONLY"] = 0] = "OK_ONLY";
    /*** OK 和 Cancel 按钮都有 ***/
    EPopupButtonType[EPopupButtonType["OK_CANCEL"] = 1] = "OK_CANCEL";
})(EPopupButtonType = exports.EPopupButtonType || (exports.EPopupButtonType = {}));
/**
 * 比率类型
 *
 * @export
 * @enum {number}
 */
var EPrecentType;
(function (EPrecentType) {
    /*** 百分比 ***/
    EPrecentType[EPrecentType["PRECENT_100"] = 100] = "PRECENT_100";
    /*** 千分比 ***/
    EPrecentType[EPrecentType["PRECENT_1000"] = 1000] = "PRECENT_1000";
    /*** 万分比 ***/
    EPrecentType[EPrecentType["PRECENT_10000"] = 10000] = "PRECENT_10000";
})(EPrecentType = exports.EPrecentType || (exports.EPrecentType = {}));
/**
 * 色彩主题
 *
 * @export
 * @enum {number}
 */
var ETheme;
(function (ETheme) {
    /** 暗色主题 ***/
    ETheme[ETheme["DARK"] = 0] = "DARK";
    /** 亮色主题 ***/
    ETheme[ETheme["LIGHT"] = 1] = "LIGHT";
})(ETheme = exports.ETheme || (exports.ETheme = {}));
/**
 * 运行平台
 *
 * @export
 * @enum {number}
 */
var ERuntimePlatform;
(function (ERuntimePlatform) {
    /*** PC 端 ***/
    ERuntimePlatform[ERuntimePlatform["PC"] = 0] = "PC";
    /*** Android 端 ***/
    ERuntimePlatform[ERuntimePlatform["ANDROID"] = 1] = "ANDROID";
    /*** IOS 端 ***/
    ERuntimePlatform[ERuntimePlatform["IOS"] = 2] = "IOS";
})(ERuntimePlatform = exports.ERuntimePlatform || (exports.ERuntimePlatform = {}));
/**
 * 图片尺寸模式
 */
var EPicSizeMode;
(function (EPicSizeMode) {
    /**
     * 匹配图片
     * Node 会放大/缩小到图片尺寸
     * 即图片100%显示
     */
    EPicSizeMode[EPicSizeMode["FIT_PIC"] = 0] = "FIT_PIC";
    /**
     * 匹配节点
     * 即图片会缩放到Node大小
     * Node大小维持不变
     */
    EPicSizeMode[EPicSizeMode["FIT_NODE"] = 1] = "FIT_NODE";
})(EPicSizeMode = exports.EPicSizeMode || (exports.EPicSizeMode = {}));

cc._RF.pop();