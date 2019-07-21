import CLOG from "../coffee_bean/utils/CLOG";
import CoffeeBean from "../coffee_bean/CoffeeBean";
import { CLoading } from "../coffee_bean/component/CLoading";
import { ETheme } from "../coffee_bean/common/CEnum";
import CTime from "../coffee_bean/utils/CTime";


const { ccclass, property } = cc._decorator;

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
    protected start (): void {
        let a;
        let b: number;
        let c: boolean = true;
    }
}

class tt {

}