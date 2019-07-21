import { CUserData } from "./CUserData";

/**
 * 本地存储类
 */
export default class CLocalStore {
    /*** 获得真正的key ***/
    private static getKey ( key: string ): string {
        return CUserData.instance().UserInfo.user_id + "_" + key;
    }

    /*** 移除本地记录 ***/
    public static removeKey ( key: string ): void {
        key = this.getKey( key );
        cc.sys.localStorage.removeItem( key );
    }

    /**
     * 向本地存储中存储一个整数数字
     */
    public static save_int ( key: string, value: number ): void {
        key = this.getKey( key );
        cc.sys.localStorage.setItem( key, value );
    }

    /**
     * 从本地存储中读取一个整数数字
     */
    public static load_int ( key: string ): number {
        key = this.getKey( key );
        return parseInt( cc.sys.localStorage.getItem( key ) );
    }


    /**
     * 向本地存储中存储一个浮点数字
     */
    public static save_float ( key: string, value: number ): void {
        key = this.getKey( key );
        cc.sys.localStorage.setItem( key, value );
    }

    /**
     * 从本地存储中读取一个浮点数字
     */
    public static load_float ( key: string ): number {
        key = this.getKey( key );
        return parseFloat( cc.sys.localStorage.getItem( key ) );
    }


    /**
     * 向本地存储中存储一个字符串
     */
    public static save_string ( key: string, value: string ): void {
        key = this.getKey( key );
        cc.sys.localStorage.setItem( key, value );
    }

    /**
     * 从本地存储中读取一个字符串
     */
    public static load_string ( key: string ): string {
        key = this.getKey( key );
        return cc.sys.localStorage.getItem( key ) as string;
    }

    /**
     * 向本地存储中存储一个布尔值
     */
    public static save_boolean ( key: string, value: boolean ): void {
        key = this.getKey( key );
        value ? this.save_int( key, 1 ) : this.save_int( key, 0 );
    }

    /**
     * 从本地存储中读取一个布尔值
     */
    public static load_boolean ( key: string ): boolean {
        key = this.getKey( key );
        return this.load_int( key ) == 1 ? true : false;
    }


}