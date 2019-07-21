/**
 * CoffeeBean
 * 消息库封装
 * 
 * By Leo
 */

import CLOG from "../utils/CLOG";
import { CMap } from "./CMap";
import { TAG_COFFEE_BEAN } from "../common/CGlobal";

/*** 事件处理 ***/
interface EventHandler {
    /*** 处理函数 ***/
    handler: Function;
    /*** 目标 ***/
    target: object;
    /*** 是否只触发一次 ***/
    once: boolean;
}

/**
 * 自定义消息处理器
 *
 * @export
 * @class CMsg
 */
export default class CMsg {

    private static msgHandleList: CMap<string, Array<EventHandler>> = new CMap<string, Array<EventHandler>>();

    /**
     * 注册一个消息处理
     * @param msg 消息名
     * @param handler 处理函数
     * @param target 目标对象
     * @param once 是否只触发一次
     */
    public static addMsgHandler ( msg: string, handler: Function, target: object, once: boolean = false ): void {
        if ( msg.isEmptyOrNull() ) {
            CLOG.E( TAG_COFFEE_BEAN, "add msg is null or empty" );
            return;
        }

        if ( target == null || handler == null ) {
            CLOG.E( TAG_COFFEE_BEAN, "target or handler is null!!" );
            return;
        }

        /*** 若该事件未被注册 ***/
        if ( !this.msgHandleList.has( msg ) ) {
            this.msgHandleList.set( msg, new Array<EventHandler>() );
        }

        let container = this.msgHandleList.get( msg );

        // 防止反复注册
        for ( let i = 0; i < container.length; i++ ) {
            const item = container[ i ];
            if ( item.handler == handler && item.target == target ) {
                return;
            }
        }

        // 注册
        // 为了区分参数和接口属性名而不得以添加引号进行区分
        container.push( { 'handler': handler, 'target': target, 'once': once } );
    }

    /**
     * 派发事件
     * @param msg 要派发的事件
     * @param params 参数列表
     */
    public static dispatchMsg ( msg: string, ...params: [] ): void {
        // 安全检查
        if ( msg.isEmptyOrNull() ) {
            CLOG.E( TAG_COFFEE_BEAN, "dispatch msg is null or empty" );
            return;
        }

        // 没有注册该消息时的处理
        if ( !this.msgHandleList.has( msg ) ) {
            return;
        }

        // 得到所有注册的处理
        let handlers = this.msgHandleList.get( msg );

        // 得到数量
        let handler_count = handlers.length;

        // 倒序遍历，防止删除引起的循环异常
        for ( let i = handler_count - 1; i >= 0; i-- ) {
            const item = handlers[ i ];

            if ( item.target != null && item.handler != null ) {
                // 存在处理对象才调用
                item.handler.bind( item.target )( params );
                if ( item.once ) {
                    // 否则移除调用者
                    handlers.splice( i, 1 );
                }
            } else {
                // 否则移除调用者
                handlers.splice( i, 1 );
            }
        }

    }

    /**
     * 移除一个事件监听
     * @param msg 要移除的消息
     * @param handler 要移除的处理函数
     * @param target 目标对象
     */
    public static removeHandler ( msg: string, handler: Function, target: any ): void {
        if ( msg.isEmptyOrNull() ) {
            CLOG.E( TAG_COFFEE_BEAN, "add msg is null or empty" );
            return;
        }

        if ( target == null || handler == null ) {
            CLOG.E( TAG_COFFEE_BEAN, "target or handler is null!!" );
            return;
        }


        // 没有注册该消息时的处理
        if ( !this.msgHandleList.has( msg ) ) {
            return;
        }

        // 得到所有注册的处理
        var handlers = this.msgHandleList.get( msg );

        // 得到数量
        var handler_count = handlers.length;

        // 倒序遍历，防止删除引起的循环异常
        for ( let i = handler_count - 1; i >= 0; i-- ) {
            const item = handlers[ i ];

            // 存在处理对象才调用
            if ( item.target == target && item.handler == handler ) {
                handlers.splice( i, 1 );
            }
        }
    }


    /** 
     * 移除一个目标身上所有事件监听
     */
    public static removeTargetHandler ( target: any ): void {
        if ( target == null ) {
            CLOG.E( TAG_COFFEE_BEAN, "removeTargetHandler param is incorrect! target = null" );
            return;
        }

        let msgCount = this.msgHandleList.size;
        for ( let i = msgCount - 1; i >= 0; i-- ) {
            let item = this.msgHandleList.getKV( i );
            for ( let j = item.value.length - 1; j >= 0; j-- ) {
                if ( item.value[ j ].target == target ) {
                    this.msgHandleList.delete( item.key );
                }
            }
        }
    }

    /**
     * 移除一个事件消息的所有监听
     * @param msg 要移除的消息
     */
    public static removeAllHandler ( msg: string ): void {
        if ( this.msgHandleList.has( msg ) ) {
            this.msgHandleList.delete( msg );
        }
    }
}