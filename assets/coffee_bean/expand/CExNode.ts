
/**
 * 从Node的儿子中查找组件
 * 支持路径连写
 * @param type 要查找的组件类型
 */
cc.Node.prototype.findChildComponent = function <T extends cc.Component> ( this: cc.Node, relative_path: string, type: { prototype: T } ): T {
    let child = this.getChildByRelativePath( relative_path );
    if ( child ) {
        let comp = child.getComponent( type );
        return comp as T;
    } else {

        return null;
    }
}

/**
 * 扩展cc.Node类
 * 新增 getChildByRelativePath 方法
 * 可通过相对路径来获得相对于本节点的子节点
 * @param relative_path 相对路径
 */
cc.Node.prototype.getChildByRelativePath = function ( this: cc.Node, relative_path: string ): cc.Node {
    let childnames = relative_path.split( "/" );
    let child = this;
    let index = 0;
    while ( index < childnames.length ) {
        child = child.getChildByName( childnames[ index++ ] );
    }

    if ( child == null ) {
        cc.log( "[WARNING]: the node " + relative_path + " can not find in under node " + this.name );
    }

    return child;
}



/**
 * 强调一个节点
 * @param type 1 放大强调  2 颜色强调 3 闪烁  4 跳1下
 */
cc.Node.prototype.accentNode = function ( this: cc.Node, type: number = 1 ): void {
    switch ( type ) {
        case 1:
            this.setScale( 1.05, 1.05 );
            this.runAction( cc.scaleTo( 0.3, 1, 1 ).easing( cc.easeBackOut() ) );
            break;
        case 2:
            let temp = this.color;
            this.color = cc.Color.BLACK;
            this.runAction( cc.tintTo( 1, temp.getR(), temp.getG(), temp.getB() ) );
            break;
        case 3:
            this.runAction( cc.blink( 1, 5 ) );
            break;
        case 4:
            this.runAction( cc.jumpBy( 1, 0, 5 ) );
            break;
    }

}


/*** 求一个节点的摄像机坐标 ***/
cc.Node.prototype.getCameraPos = function ( this: cc.Node ): cc.Vec2 {
    if ( cc.Camera.main == null ) {
        cc.error( "the camera is not exist!!!" );
        return null;
    }

    let worldPos = this.convertToWorldSpaceAR( cc.Vec2.ZERO );
    return cc.Camera.main.node.convertToNodeSpaceAR( worldPos );
}

/**
 * 设置一个节点为他容器的最顶层
 */
cc.Node.prototype.set_2_Top = function ( this: cc.Node ): void {
    this.setSiblingIndex( this.getParent().childrenCount - 1 );
}

/**
 * 在不改变物体锚点的情况下设置全屏
 * 放大/缩小 调整位置  已适应全屏
 */
cc.Node.prototype.setFullScreen = function ( this: cc.Node ): void {
    // 防除0错误
    this.width === 0 && ( this.width = cc.winSize.width );
    this.height === 0 && ( this.height = cc.winSize.height );

    // 计算锚点比例
    let ax = this.anchorX / this.width;
    let ay = this.anchorY / this.height;

    this.setContentSize( cc.winSize );
    this.setPosition( this.width * ax, this.height * ay );
}

/**
 * 重置参数
 * 锚点设为 0.5,0.5
 * 缩放设置为 1,1,1
 *
 * @param this
 * @memberof Node
 */
cc.Node.prototype.reset = function ( this: cc.Node ): void {
    this.setAnchorPoint( 0.5, 0.5 );
    this.setScale( 1, 1 );
}