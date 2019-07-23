
/**
 * CoffeeBean
 * Cocos cc.Node扩展
 * 
 * By Leo
 */
namespace cc {
    interface Node {
        /**
         * 从Node的儿子中查找组件
         * 支持路径连写
         * @param relative_path 要查找的相对路径
         * @param type 要查找的组件类型
         */
        findChildComponent<T extends cc.Component> ( this: cc.Node, relative_path: string, type: { prototype: T } ): T;

        /**
         * 根据相对路径获取儿子
         * @param relative_path 相对路径
         */
        getChildByRelativePath ( this: cc.Node, relative_path: string ): cc.Node;

        /**
         * 获得所有的组件
         */
        getAllComponents ( this: cc.Node ): cc.Component[];

        /**
         * 强调一个节点
         * @param type 1 放大强调  2 颜色强调 3 闪烁  4 跳1下
         */
        accentNode ( this: cc.Node, type?: number ): void;

        /*** 得到一个节点的摄像机坐标 ***/
        getCameraPos ( this: cc.Node ): cc.Vec2;

        /**
         * 设置一个节点为他容器的最顶层
         */
        set_2_Top ( this: cc.Node ): void;

        /*** 设置全屏 ***/
        setFullScreen ( this: cc.Node ): void;

        /**
         * 重置参数
         * 锚点设为 0.5,0.5
         * 缩放设置为 1,1,1
         *
         * @param this
         * @memberof Node
         */
        reset ( this: cc.Node ): void;
    }
}