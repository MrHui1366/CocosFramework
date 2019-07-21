/** CoffeeBean
 * UI库
 * 
 * By Leo
 */

import CRes from "../core/CRes";
import CLOG from "../utils/CLOG";
import { TAG_COFFEE_BEAN } from "../common/CGlobal";

/**
* UI基类
*/
export class CUIBase extends cc.Component {

    // 非单例ui组件引用
    protected static _insts: Array<CUIBase> = null;

    // 单例ui组件引用
    protected static _inst: CUIBase = null;

    // 预制体路径
    protected static prefab_url: string;

    // 是否单例
    protected static is_singleton: boolean;

    // 描述
    protected static desc: string;

    // 是否单例
    protected _is_singleton: boolean;

    /*** 类型 ***/
    protected _type: typeof CUIBase;

    /**
     * 获取单例引用
     */
    public static getUInstance<T extends CUIBase> ( this: { new(): T; } & typeof CUIBase ): T {
        return this._inst as T;
    }

    /**
     * 获取非单例引用 们
     */
    public static getUInstances<T extends CUIBase> ( this: { new(): T; } & typeof CUIBase ): Array<CUIBase> {
        return this._insts;
    }


    /*** 销毁时 ***/
    protected onDestroy () {
        // 从UI引用中移除引用
        if ( this._is_singleton ) {
            CLOG.I( TAG_COFFEE_BEAN, "UI:" + this._type.name + " inst => null" );
            this._type._inst = null;

        } else {
            let index = this._type._insts.findIndex( ( value, index, array ) => { return value == this; } );
            if ( index != -1 ) {
                CLOG.I( TAG_COFFEE_BEAN, "UI:" + this._type.name + " insts" + index + "/" + this._type._insts.length + " => null" );
                this._type._insts.splice( index, 1 );
            }
        }
    }

    /**
     * 创建UI
     * @param parentContainer 父节点，为空则自动挂到摄像机下
     */
    public static async createUI<T extends CUIBase> ( this: { new(): T; } & typeof CUIBase, parentContainer: cc.Node = null ): Promise<T> {
        try {
            // 得到 UI预制体
            let prefab: cc.Prefab = CRes.getRes( this.prefab_url, cc.Prefab );

            // 若UI预制体并没有缓存
            if ( prefab == null ) {
                CLOG.E( TAG_COFFEE_BEAN, "ui prefab:{0} is not cached!! please load it first!" );
                return null;
            }

            if ( this.is_singleton ) {
                // 单例UI
                // 只有在单例引用为空时
                // 才能创建
                this._inst == null && this.createUIComponent( prefab, parentContainer );

                // 记录是否类类型，方便释放
                this._inst._is_singleton = true;
                return this._inst as T;

            } else {

                if ( this._insts == null ) {
                    this._insts = new Array<CUIBase>();
                }

                // 非单例UI
                // 每次都可以创建并返回
                let ins = this.createUIComponent( prefab, parentContainer );
                this._insts.push( ins );

                this._inst._is_singleton = false;
                return ins as T;
            }

        } catch ( exception ) {
            CLOG.EE( TAG_COFFEE_BEAN, exception );
            return null;
        }
    }

    /**
     * 创建UI实例
     *
     * @private
     * @returns
     * @memberof CUIBase
     */
    private static createUIComponent ( prefab: cc.Prefab, parentContainer: cc.Node = null ): CUIBase {
        // 实例化预制体
        let node = cc.instantiate( prefab );

        // ui组件实例
        this._inst = node.addComponent( this );

        // 父容器
        if ( parentContainer == null ) {
            cc.Camera.main.node.addChild( node );
        } else {
            parentContainer.addChild( node );
        }

        // 记录UI脚本对象的类型
        // 方便释放
        this._inst._type = this;

        return this._inst;
    }

    /**
     * 销毁UI
     *
     * ！！注意！！
     * 参数 target 为可选参数
     *
     * 当UI为单例UI的情况下
     *     无论传不传 target 都会销毁单例UI
     *
     * 当UI为非单例UI的情况下
     *     传 target 则销毁 特定的非单例UI
     *   不传 target 则销毁 所有的非单例UI
     * 
     * release 释放资源
     * 对于只显示一次的UI
     * 建议在关闭时传true
     * 这样在销毁UI时连带其预制体与UI资源都会一起销毁
     *
     * @static
     * @template T
     * @param this
     * @param [release=false] 是否释放资源
     * @param [target] 销毁目标，可选参数
     * @returns
     * @memberof CUIBase
     */
    public static destoryUI<T extends CUIBase> ( this: { new(): T; } & typeof CUIBase, release: boolean = false, target?: CUIBase ): void {
        if ( this.is_singleton ) {
            this._inst.node.destroy();
            this._inst = null;
        } else {
            if ( target === void 0 ) {
                // 不传参，销毁所有
                for ( let index = 0; index < this._insts.length; index++ ) {
                    this._insts[ index ].node.destroy();
                }

                this._insts = [];
                return;
            } else {
                // 传参，销毁特定
                for ( let index = 0; index < this._insts.length; index++ ) {
                    const element = this._insts[ index ];
                    if ( element == target ) {
                        element.node.destroy();
                        this._insts.splice( index, 1 );
                        break;
                    }
                }
            }
        }

        // 释放资源
        if ( release )
            CRes.releaseRes( this.prefab_url, true );
    }

}