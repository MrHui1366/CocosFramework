/**
 * CoffeeBean
 * LOG库封装
 * 
 * By Leo
 */
import CTime from './CTime';
import CRes from '../core/CRes';


/*** 游戏名 ***/
const GAME_NAME: string = "travel_hamster";

export default class CLOG {

    /*** 是否已经激活 ***/
    private static _enable: boolean = false;

    /**
     * 启用LOG系统
     */
    public static enable (): void {
        this._enable = true;
    }

    /**
     * 禁用LOG系统
     */
    public static disable (): void {
        this._enable = false;
    }

    /**
     * 得到输出字符串
     * 本函数在LOG前面增加了时间和LOG类型
     * @param args 参数数组
     * @param logType log类型 error 还是 warn 还是 info
     * @param logTag 标识，用于区分LOG
     */
    private static getMsgStr ( args: string[], logType: string, logTag: string ): string {
        let msg;
        switch ( args.length ) {
            case 0:
                return " ";
            case 1:
                msg = args[ 0 ];
                break;
            default:
                msg = String.formatString.apply( null, args );
                break;

        }

        return "[" + CTime.getNowTimeStr() + " |" + logType + "| " + logTag + " ] " + msg;
    };

    /**
       * 输出一个 Info LOG
       * @param tag 标识，用于区分LOG
       * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
       */
    public static I ( tag: string, ...params ): void {
        if ( !this._enable ) return;

        const outStr = this.getMsgStr( params, " INFO", tag );
        cc.log( outStr );
    }

    /**
     * 输出一个 Error LOG
     * @param tag 标识，用于区分LOG
     * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
     */
    public static E ( tag: string, ...params ): void {
        if ( !this._enable ) return;
        const outStr = this.getMsgStr( params, "ERROR", tag );
        cc.error( outStr );
    }

    /**
     * 输出一个 Error LOG
     * @param err 错误对象以及堆栈信息
     */
    public static EE ( tag: string, err: Error ): void {
        if ( !this._enable ) return;
        this.E( tag, "----- " + err.name + "-----" );
        this.E( tag, "message >> " + err.message );
        this.E( tag, "stack   >> " + err.stack );
    }

    /**
     * 输出一个 Warning LOG
     * @param tag 标识，用于区分LOG
     * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
     */
    public static W ( tag: string, ...params ): void {
        if ( !this._enable ) return;
        const outStr = this.getMsgStr( params, " WARN", tag );
        cc.warn( outStr );
    }

    /**
     * 条件为真时输出 Info
     * @param tag 标识，用于区分LOG
     * @param condition 条件
     * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
     */
    public static IF ( tag: string, condition: boolean, ...params ) {
        if ( !this._enable ) return;
        if ( !condition ) return;

        const outStr = this.getMsgStr( params, " INFO", tag );
        cc.log( outStr );
    }

    /**
     * 条件为真时输出 Info
     * @param tag 标识，用于区分LOG
     * @param condition 条件
     * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
     */
    public static EF ( tag: string, condition: boolean, ...params ) {
        if ( !this._enable ) return;
        if ( !condition ) return;

        const outStr = this.getMsgStr( params, "ERROR", tag );
        cc.log( outStr );
    }

    /**
     * 条件为真时输出 Warning
     * @param tag 标识，用于区分LOG
     * @param condition 条件
     * @param params 参数们，可以用来格式化字符串，占位符支持 {0},{1},{2}....
     */
    public static WF ( tag: string, condition: boolean, ...params ) {
        if ( !this._enable ) return;
        if ( !condition ) return;

        const outStr = this.getMsgStr( params, " WARN", tag );
        cc.log( outStr );
    }
}