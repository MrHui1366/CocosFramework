/**
 * CoffeeBean
 * 数组 扩展
 *
 * By Leo
 */
interface Array<T> {

    /*** 随机一项返回 ***/
    randItem ( this: Array<T> ): T;

    /**
     * 随机打乱一个数组
     * @param array 泛型数组引用
     */
    shuffle<T> ( array: Array<T> ): void;
}
