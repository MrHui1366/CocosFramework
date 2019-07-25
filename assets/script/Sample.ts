import CoffeeBean from "../coffee_bean/CoffeeBean";
import CRes from "../coffee_bean/core/CRes";
import UI_Popup from "./ui/UI_Popup/UI_Popup";
import { Net } from "./netmsgs/msgs";


const { ccclass } = cc._decorator;

/**
 * 示例类
 */
@ccclass
export default class Sample extends cc.Component {
    /**
     * 加载时
     */
    protected onLoad (): void {
        /*** 初始化框架 ***/
        CoffeeBean.init();

    }

    /**
     * Start
     */
    protected async start () {

        await CRes.loadResDirAsnyc( "prefab/ui", cc.Prefab );

        UI_Popup.createUI();

        let t = new Net.Test1();
        t.id = 10;
        t.name = "123";

        let buffer = Net.Test1.encode( t ).finish();
        cc.log( "buffer = " + buffer );
        // cc.log( `buffer = ${ Array.prototype.toString.call( buffer ) }` );
        // ... do something with buffer

        // Decode an Uint8Array (browser) or Buffer (node) to a message
        let decoded = Net.Test1.decode( buffer );
        cc.log( "decoded = " + decoded );
        // cc.log( `decoded = ${ JSON.stringify( decoded ) }` );


    }
}
