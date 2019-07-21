import { EPicSizeMode } from "../common/CEnum";
import CLOG from "../utils/CLOG";
import { TAG_COFFEE_BEAN } from "../common/CGlobal";

/**
 * 从Node的儿子中查找组件
 * 支持路径连写
 * @param type 要查找的组件类型
 */
cc.Sprite.prototype.loadURLImage = function ( this: cc.Sprite, url: string, sizeMode: EPicSizeMode = EPicSizeMode.FIT_NODE, complete_handler: () => void = null ): void {
    CLOG.I( TAG_COFFEE_BEAN, "ready to request remote image: " + url );
    let size: cc.Size = null;

    /*** 加载远程头像 ***/
    cc.loader.load( { url: url, type: 'png' }, ( err: Error, data: cc.Texture2D ) => {
        if ( err != null ) {
            CLOG.E( TAG_COFFEE_BEAN, err );
        }
        CLOG.I( TAG_COFFEE_BEAN, "load complete! url= " + url );

        // 确定尺寸
        if ( sizeMode == EPicSizeMode.FIT_PIC )
            size = new cc.Size( data.width, data.height );
        else if ( sizeMode == EPicSizeMode.FIT_NODE )
            size = this.node.getContentSize();

        this.spriteFrame = new cc.SpriteFrame( data );
        this.node.setContentSize( size );
        complete_handler && complete_handler();
    } );


}