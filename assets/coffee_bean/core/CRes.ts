/**
 * CoffeeBean
 * 资源管理封装
 * 
 * By Leo
 * 
 */
/// <reference path ="./CMap.ts"/>
import CLOG from "../utils/CLOG";
import { TAG_COFFEE_BEAN, SHOW_RESOURCE_LOG } from "../common/CGlobal";

/**
 * 资源管理类
 */
export default class CRes {
    /**
     * 异步读取一个目录的资源
     * 并缓存他
     * @param url 要读取得目录
     * @param type 要读取得资源类型
     */
    public static loadResDirAsnyc<T extends cc.Asset> ( url: string, type: { new(): T; } & typeof cc.Asset ): Promise<T[]> {
        CLOG.IF( TAG_COFFEE_BEAN, SHOW_RESOURCE_LOG, ">>> loader dir resource begin <<<" );

        // 处理url
        let stand_url = this.handleResURL( url );

        return new Promise<T[]>( ( resolve, reject ) => {
            // 使用 cocos loader 来加载指定目录资源
            cc.loader.loadResDir( stand_url, type, ( err: Error, assets: T[], urls: string[] ) => {
                if ( err != null ) {
                    CLOG.EE( TAG_COFFEE_BEAN, err );
                    reject();
                }

                CLOG.IF( TAG_COFFEE_BEAN, SHOW_RESOURCE_LOG, "    url folder:{0} load successful", stand_url );
                // 加载成功，返回加载的资源
                resolve( assets );
            } );

        } );
    }

    /**
     * 读取资源
     * 并缓存他
     * @param url 要加载的资源URL
     * @param type 资源类型 cc.SpriteFrame | cc.SpriteAtlas | cc.Texture2D | cc.AudioClip | cc.AnimationClip | cc.TextAsset | cc.JsonAsset | cc.Prefab | cc.Font | cc.BitCMapFont
     * @param cache 是否缓存 默认为缓存
     */
    public static loadRes<T extends cc.Asset> ( url: string, type: { new(): T; } & typeof cc.Asset, cache: boolean = true ): Promise<T> {
        CLOG.IF( TAG_COFFEE_BEAN, SHOW_RESOURCE_LOG, ">>> loader resource begin <<<" );

        // 处理url
        let stand_url = this.handleResURL( url );

        return new Promise<T>( ( resolve, reject ) => {
            // 使用 cocos loader 来加载指定资源
            cc.loader.loadRes( stand_url, type, ( err: Error, assets: T ) => {
                if ( err != null ) {
                    CLOG.EE( TAG_COFFEE_BEAN, err );
                    reject();
                }
                CLOG.IF( TAG_COFFEE_BEAN, SHOW_RESOURCE_LOG, "    load successful" );
                // 加载成功，返回加载的资源
                resolve( assets );
            } );  // loader end
        } ); // Promise end
    }

    /**
     * 从缓存中获取一个资源
     * @param url 要获取的URL
     * @param type 资源类型 cc.SpriteFrame | cc.SpriteAtlas | cc.Texture2D | cc.AudioClip | cc.AnimationClip | cc.TextAsset | cc.JsonAsset | cc.Prefab | cc.Font | cc.BitCMapFont
     */
    public static getRes<T extends cc.Asset> ( url: string, type?: { new(): T } & typeof cc.Asset ): T {
        let res = cc.loader.getRes( url, type );
        return res as T;
    }

    /**
     * 释放一个资源
     * 默认不会释放其依赖资源
     * releaseDepends传true则会释放依赖资源
     * 
     * @param url 要释放的资源URL
     * @param releaseDepends 是否释放依赖的资源
     * 
     */
    public static releaseRes ( url: string, releaseDepends: boolean = false ) {
        if ( releaseDepends ) {
            // 释放一个 prefab 以及所有它依赖的资源
            var deps = cc.loader.getDependsRecursively( url );
            cc.loader.release( deps );
        } else
            cc.loader.release( url );
    }

    /**
     * 处理资源路径
     * 去除resources/ 前缀
     * .文件类型的影响
     * @param url 资源路径
     */
    private static handleResURL ( url: string ): string {
        let source_url = url;
        url = url.toLowerCase();
        if ( url.startsWith( "resources/" ) ) {
            url = url.substring( 10 );
        }

        const lastpoint = url.lastIndexOf( "." );
        const lastgang = url.lastIndexOf( "/" );
        if ( lastpoint > lastgang ) {
            url = url.substring( 0, lastpoint );
        }

        CLOG.IF( TAG_COFFEE_BEAN, SHOW_RESOURCE_LOG, "    url:" + source_url + " => " + url );
        return url;
    }

    /**
     * 异步创建预制体
     */
    public static async createPrefabAsync ( url: string ): Promise<cc.Node> {
        let prefab: cc.Prefab = cc.loader.getRes( url, cc.Prefab ) as cc.Prefab;

        if ( prefab != null ) {
            return cc.instantiate( prefab );
        }

        prefab = await this.loadRes( url, cc.Prefab );
        return cc.instantiate( prefab );
    }

    /**
     * 同步创建预制体
     */
    public static createPrefab ( url: string ): cc.Node {
        let prefab: cc.Prefab = cc.loader.getRes( url, cc.Prefab ) as cc.Prefab;

        if ( prefab != null ) {
            return cc.instantiate( prefab );
        }

        return null;
    }

    /**
     * 获得缓存的JSON对象
     *
     * @static
     * @template T
     * @param url JSON路径
     * @returns
     * @memberof CRes
     */
    public static getJson<T> ( url: string ): T {
        let json = this.getRes( url, cc.JsonAsset ).json;
        return json as T;
    }

    /**
     * 获得图集
     *
     * @static
     * @param url 图集地址
     * @returns
     * @memberof CRes
     */
    public static getSpriteAtlas ( url: string ): cc.SpriteAtlas {
        return this.getRes( url, cc.SpriteAtlas );
    }

    /**
     * 获得精灵帧
     * 注意！！！ 
     * 一般精灵都会合图
     * 直接调用 CRes.getSpriteFrame(url)
     * 无法获取到正确图片
     * 
     * 获取合图中散图的方法
     * CRes.getSpriteAtlas(图集路径).getSpriteFrame(精灵名);
     * 
     * @static
     * @param url 精灵地址
     * @returns
     * @memberof CRes
     */
    public static getSpriteFrame ( url: string ): cc.SpriteFrame {
        return this.getRes( url, cc.SpriteFrame );
    }


    /**
     * 获得文本资源
     * txt,ini,csv等都属于文本资源
     *
     * @static
     * @param url 文本路径
     * @returns
     * @memberof CRes
     */
    public static getText ( url: string ): cc.TextAsset {
        return this.getRes( url, cc.TextAsset );
    }

    /**
     * 声音资源
     *
     * @static
     * @param url
     * @returns
     * @memberof CRes
     */
    public static getSound ( url: string ): cc.AudioClip {
        return this.getRes( url, cc.AudioClip );
    }
} 