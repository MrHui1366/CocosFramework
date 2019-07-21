/**
 * 对象扩展
 *
 * @export
 * @class CObject
 */
export default class CObject {
    /**
     * 显示对象的所有组成
     * @param 对象
     */
    public static displayObject ( target: Object, prefixCount: number = 0 ): void {
        let prefix = " ".repeat( prefixCount );
        for ( let key in this ) {
            if ( [ key ] instanceof Object ) {
                this[ key ].displayObject( prefixCount + 4 );
            }
            console.log( prefix + "object key:" + key + "   value:" + this[ key ] );
        }
    }

    /**
     * 拷贝源对象身上的 键值 到目标对象身上
     * 相关规则见例子
     * 源对象   A { k1=10,k2=20,k3=30 };
     * 目标对象 B { k2=50,k3=90,k4=130};
     * 执行后   B { k2=20,k3=30,k4=130};
     * @param sourceObj 源对象
     * @param targetObj 目标对象
     */
    public static copyObjectMixValue = function ( sourceObj: object, targetObj: object ): void {
        for ( let key in sourceObj ) {
            if ( targetObj[ key ] != undefined ) {
                targetObj[ key ] = sourceObj[ key ];
            }
        }
    }

}
