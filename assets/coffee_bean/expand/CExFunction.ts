/**
 * 返回一个函数是否绑定过this
 *
 * @returns
 * @memberof Function
 */
Function.prototype.hasBind = function ( this: Function ): boolean {
    return this.name.startsWith( "bound " ) && this[ "[[BoundThis]]" ] && this[ "[[BoundArgs]]" ];
}