/**
 * CoffeeBean
 * 全局枚举
 * 包括通用的枚举定义
 * 
 * By Leo
 * PS: 普通枚举在需要用到的地方直接定义导出即可
 *     这里只定义通用枚举
 */



/**
 * 2方向 枚举
 *
 * @export
 * @enum {number}
 */
export enum EDirection_2 {
    /*** 左 ***/
    LEFT,
    /*** 右 ***/
    RIGHT
}

/**
 * 4方向 枚举
 *
 * @export
 * @enum {number}
 */
export enum EDirection_4 {
    /*** 左 ***/
    LEFT = 0,
    /*** 上 ***/
    UP = 1,
    /*** 右 ***/
    RIGHT = 2,
    /*** 下 ***/
    DOWN = 3
}


/**
 * 斜4方向 枚举
 *
 * @export
 * @enum {number}
 */
export enum EDirectionSkew_4 {
    /*** 左上方 ***/
    LEFT_UP = 0,
    /*** 右上方 ***/
    RIGHT_UP = 1,
    /*** 右下方 ***/
    RIGHT_DOWN = 2,
    /*** 左下方 ***/
    LEFT_DOWN = 3
}

/**
 * 弹出框按钮样式
 *
 * @export
 * @enum {number}
 */
export enum EPopupButtonType {
    /*** 只有OK按钮 ***/
    OK_ONLY,
    /*** OK 和 Cancel 按钮都有 ***/
    OK_CANCEL
}

/**
 * 比率类型
 *
 * @export
 * @enum {number}
 */
export enum EPrecentType {
    /*** 百分比 ***/
    PRECENT_100 = 100,
    /*** 千分比 ***/
    PRECENT_1000 = 1000,
    /*** 万分比 ***/
    PRECENT_10000 = 10000
}

/**
 * 色彩主题
 *
 * @export
 * @enum {number}
 */
export enum ETheme {
    /** 暗色主题 ***/
    DARK,
    /** 亮色主题 ***/
    LIGHT
}

/**
 * 运行平台
 *
 * @export
 * @enum {number}
 */
export enum ERuntimePlatform {
    /*** PC 端 ***/
    PC,
    /*** Android 端 ***/
    ANDROID,
    /*** IOS 端 ***/
    IOS
}


/**
 * 图片尺寸模式
 */
export enum EPicSizeMode {
    /**
     * 匹配图片
     * Node 会放大/缩小到图片尺寸
     * 即图片100%显示
     */
    FIT_PIC,
    /**
     * 匹配节点
     * 即图片会缩放到Node大小
     * Node大小维持不变
     */
    FIT_NODE,
}