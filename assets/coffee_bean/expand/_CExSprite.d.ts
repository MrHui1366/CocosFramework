/**
 * CoffeeBean
 * Cocos Sprite扩展
 * 
 * By Leo
 */

namespace cc {

    interface Sprite {
        /**
         * 从远程服务器加载一个URL图片
         * 需要远程服务器添加请求头的支持
         * @param url 要加载的URL
         */
        loadURLImage ( this: cc.Sprite, url: string, sizeMode?: EPicSizeMode, complete_handler?: () => void ): void;
    }
}
