import CLOG from "./utils/CLOG";

/**
 * 框架入口
 *
 * @export
 * @class CoffeeBean
 */
export default class CoffeeBean {
    /*** 是否已经初始化 ***/
    private static hasInit: boolean = false;

    /*** 初始化 ***/
    public static init (): void {
        if ( this.hasInit ) return;
        this.hasInit = true;

        // 启用log系统
        CLOG.enable();
    }
}
