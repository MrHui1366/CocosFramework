import CLOG from "./CLOG";

export class CUI {
    /**
    * 转化画布坐标到屏幕坐标
    * @param pos 要转化的坐标
    */
    public static cpos_2_spos ( pos: cc.Vec2 ): cc.Vec2 {
        let canvas_node = cc.Canvas.instance.node;
        if ( canvas_node == null ) {
            CLOG.E( "can not find canvas in now scene!!!" );
            return;
        }
        let canvas_anchor = canvas_node.getAnchorPoint();
        let canvas_size = canvas_node.getContentSize();
        let offset = new cc.Vec2( canvas_size.width * canvas_anchor.x, canvas_size.height * canvas_anchor.y );
        return pos.add( offset );
    }

    /**
    * 转化屏幕坐标到画布坐标
    * @param pos 要转化的坐标
    */
    public static spos_2_cpos ( pos: cc.Vec2 ): cc.Vec2 {
        let canvas_node = cc.Canvas.instance.node;
        if ( canvas_node == null ) {
            CLOG.E( "can not find canvas in now scene!!!" );
            return;
        }
        let canvas_anchor = canvas_node.getAnchorPoint();
        let canvas_size = canvas_node.getContentSize();
        let offset = new cc.Vec2( canvas_size.width * canvas_anchor.x, canvas_size.height * canvas_anchor.y );
        return pos.sub( offset );
    }

    /**
     * 创建精灵节点
     * 精灵节点可以设置图像
     *
     * @memberof CUI
     */
    public static createSpriteNode ( name: string ): [ cc.Node, cc.Sprite ] {
        let node = new cc.Node( name );
        let sp = node.addComponent( cc.Sprite );
        return [ node, sp ];
    }

    /**
     * 创建文本节点
     * 文本节点可以设置文字
     *
     * @static
     * @returns
     * @memberof CUI
     */
    public static createLabelNode ( name: string ): [ cc.Node, cc.Label ] {
        let node = new cc.Node( name );
        let label = node.addComponent( cc.Label );
        return [ node, label ];
    }

    /**
     * 创建绘图节点
     * 绘图节点可以绘制图像
     *
     * @static
     * @returns
     * @memberof CUI
 */
    public static createGraphicNode ( name: string ): [ cc.Node, cc.Graphics ] {
        let node = new cc.Node( name );
        let gic = node.addComponent( cc.Graphics );
        return [ node, gic ];
    }
}