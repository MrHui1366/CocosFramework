/** 
 * CoffeeBean
 * websocket库
 * 
 * By Leo
 */
import CLOG from "../utils/CLOG";


/** 是否显示socket log ***/
const SHOW_SOCKET_LOG: boolean = true;

/*** Websocket log 头 ***/
const TAG_SOCKET: string = "Socket";

/**
 * 网络模块
 */
export default class CNetwork {
    /** 当前连接的服务器URL ***/
    private static nowConnectServerURL: string = "unknown";

    /** WebSocket连接 ***/
    private static socket: WebSocket = null;

    /** 是否已连接 ***/
    private static isConnected: boolean = false;

    /** 连接成功回调 ***/
    private static onOpenCallback: Function = null;

    /** 连接异常回调 ***/
    private static onErrorCallback: Function = null;

    /** 连接关闭回调 ***/
    private static onCloseCallback: Function = null;

    /**
     * 连接到服务器
     * @param URL 服务器URL
     */
    public static tryConnect ( url: string ): void {
        CLOG.IF( TAG_SOCKET, SHOW_SOCKET_LOG, "ready to connect to " + URL );

        // 指派了地址就连接指派的地址
        this.socket = new WebSocket( url );

        //记录当前准备连接的服务器地址
        this.nowConnectServerURL = url;

        //初始化事件
        this.socket.onopen = this.onOpen;
        this.socket.onerror = this.onError;
        this.socket.onmessage = this.onMessage
        this.socket.onclose = this.onClose;

    }


    /**
     * Socket连接成功
     * @param event 
     */
    private static onOpen ( event: Event ): void {
        CLOG.IF( TAG_SOCKET, SHOW_SOCKET_LOG, "Server: " + this.nowConnectServerURL + " connected successful!" );
        this.isConnected = true;
        if ( this.onOpenCallback !== null ) {
            this.onOpenCallback( event )
        }
    }

    /**
     * Socket 连接错误
     * @param event
     */
    private static onError ( event: Event ): void {
        CLOG.EF( TAG_SOCKET, SHOW_SOCKET_LOG, "Server: " + this.nowConnectServerURL + " connected error!!" );
        this.isConnected = false;
        if ( this.onErrorCallback !== null ) {
            this.onErrorCallback( event )
        }
    }

    /**
     * Socket关闭事件
     * @param event
     */
    private static onClose ( event: Event ) {
        CLOG.IF( TAG_SOCKET, SHOW_SOCKET_LOG, "connected close!" );
        this.isConnected = false;

        if ( this.onCloseCallback !== null ) {
            this.onCloseCallback( event );
        }
    }

    /**
     * 收到消息事件
     * @param event
     */
    private static onMessage ( event: MessageEvent ) {
        if ( cc.sys.isNative ) {
            let buff: Array<number> = new Array<number>( event.data );
            let recStr = String.Utf8ArrayToStr( buff );

            var RecvPacket = JSON.parse( recStr );

            if ( SHOW_SOCKET_LOG ) {
                CLOG.I( "[RECV] << " + recStr );
            }
        } else {
            let reader = new FileReader();
            reader.readAsText( event.data, "UTF-8" );
            reader.onload = function ( e ) {
                var RecvPacket = JSON.parse( reader.result as string );

                if ( SHOW_SOCKET_LOG ) {
                    CLOG.I( "[RECV] << " + reader.result );
                }
            };
        }
    }

    /**
     * 设置连接成功回调
     * @param callback 连接成功回调
     */
    public static setOpenCallback ( callback: Function ) {
        this.onOpenCallback = callback;
    }

    /**
     * 连接失败，发送、接收数据失败或者处理数据出现错误 回调
     * @param callback 错误回调
     */
    public static setErrorCallback ( callback: Function ) {
        this.onErrorCallback = callback;
    }

    /**
     * 设置关闭连接回调
     * @param callback 关闭回调
     */
    public static setCloseCallback ( callback: Function ) {
        this.onCloseCallback = callback;
    }

    /**
     * 关闭Socket连接
     * @constructor
     */
    public static Close (): void {
        CLOG.I( "ready to close socket!" );
        this.socket.close();
    }
}
