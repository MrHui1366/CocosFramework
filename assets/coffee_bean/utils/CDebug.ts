export default class CDebug {
    /**
     * 绘制一个圆形到场景
     * @param cpos 画布坐标
     */
    public static debugDrawAnBall ( cpos: cc.Vec2, target: cc.Node = null ): void {
        var node = new cc.Node( "debug ball" );
        let gpc = node.addComponent( cc.Graphics );
        gpc.fillColor = new cc.Color( 255, 0, 0, 255 );
        gpc.circle( 0, 0, 5 );
        gpc.fill();

        node.setPosition( cpos );
        if ( target == null ) {
            cc.Canvas.instance.node.addChild( node );
        } else {
            target.addChild( node );
        }
    }


    /**
     * 绘制节点的外边框
     */
    public static drawBounds ( target: cc.Node, color: cc.Color = cc.color( 255, 0, 0, 153 ) ): void {
        let rect = target.getBoundingBoxToWorld();
        let scene = cc.director.getScene();
        let debug_show = scene.getChildByName( "debug_show" );
        if ( debug_show == null ) {
            debug_show = new cc.Node( "debug_show" );
            scene.addChild( debug_show );
        }

        let gics = debug_show.getComponent( cc.Graphics );
        if ( gics == null ) {
            gics = debug_show.addComponent( cc.Graphics );
        }

        gics.clear();
        gics.fillColor = color;
        gics.fillRect( rect.x, rect.y, rect.width, rect.height );
        gics.fill();
    }

    /**
     * 绘制一个节点的锚点
     */
    public static drawAnchorPoint ( target: cc.Node, color: cc.Color = cc.color( 255, 0, 0, 255 ) ): void {
        let rect = target.getBoundingBoxToWorld();
        let scene = cc.director.getScene();
        let debug_show = scene.getChildByName( "debug_show" );
        if ( debug_show == null ) {
            debug_show = new cc.Node( "debug_show" );
            scene.addChild( debug_show );
        }

        let gics = debug_show.getComponent( cc.Graphics );
        if ( gics == null ) {
            gics = debug_show.addComponent( cc.Graphics );
        }

        let pos = target.convertToWorldSpaceAR( cc.Vec2.ZERO );

        gics.fillColor = color;
        gics.circle( pos.x, pos.y, 10 );
        gics.fill();
    }

}