import CMath from "../utils/CMath";

/**
 * 扩展 Array
 */
/*** 随机返回一项 ***/
Array.prototype.randItem = function () {
    let index = Math.floor( Math.random() * this.length );
    return this[ index ];
}


/**
 * 随机打乱一个数组
 * @param array 泛型数组引用
 */
Array.prototype.shuffle = function <T> ( this: Array<T> ) {
    for ( let i: number = 0; i < this.length; ++i ) {
        let targetPos = CMath.randInt( this.length );
        let temp: T = this[ i ];
        this[ i ] = this[ targetPos ];
        this[ targetPos ] = temp;
        Object
    }
}