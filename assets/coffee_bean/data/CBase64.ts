/**
 * CoffeeBean
 * 常用图片的base64封装
 * 
 * By Leo
 */
export namespace CBASE64 {
    /*** 缓存好的精灵集 ***/
    let CachedSpriteFrame: Map<string, cc.SpriteFrame> = new Map<string, cc.SpriteFrame>();

    /**
     * 通过base64内嵌图片来创建精灵帧
     * @param url 要创建的base64图片
     */
    export function createSpriteFrameFromBase64Img ( url: string ): cc.SpriteFrame {
        if ( CachedSpriteFrame.has( url ) ) {
            return CachedSpriteFrame.get( url );
        }

        let img = new Image();
        img.src = url;

        let texture = new cc.Texture2D();
        texture.initWithElement( img );

        let spf = new cc.SpriteFrame( texture );
        CachedSpriteFrame.set( url, spf );

        return spf;
    }


    /*** 白色小球  32x32像素  ***/
    export const BALL_SP: string = "data:image/png;base64,\
                                    iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1\
                                    +/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTEvMj\
                                    EvMTihvGE8AAACT0lEQVRYhcXXTUtbURDG8V+CGosvSEMtlFIoBVvcSP0C0pUbXfWj6saV+AUs3ZS2tAhFhLZYRCPVC\
                                    KaLmas3IWqq3jhwFzk5med/5s7JeU6t0+l4yBgZcF4NDcygiSmM5Th00MYR9nGA0xy/E0ANE3iGV5jL5zkmUc9552hh\
                                    F1/z+Y49HF8Hch3AKGaxgCUspnAT0/pX4FBUYBfb2MJH/MJZ3xVe0QPjeIl3WMZbPE3RQaKNn/iADWxiBye9E/tVYBy\
                                    vsYoVzIty1/rMvSrGRLVmEvwx1vClF6IXYFSsfBXv8SaBbhM10awLooGJynxTeh0jPT+YFWVfuaN4OcYz1wr+iD7Zk4\
                                    1ZL02cSNplUfb7EC9DzGfuhdRSBqiJrbYkGm7yHsWLmMzcS6lVKwM0xD5fFE3zPw03aNQy92JqNcoAMy7/YAbdareJY\
                                    nfMpeYFQDMHmxWKF9GlVQBMJdn0EACmU2uqDDAmmqTK8hfRpVXeBXXVNF9vdGnVr59bfRQAHXGkDsOddGkVAG1xnreH\
                                    ANClVQAciTP8cAgAh6l1VAbYFy5mfwgAXVoFwEEO7qr2NbRd2raDMsCp8HDbwslU0YydzL2dWqdlgI44o7eEjWpVAND\
                                    K3Fuu8APHwkBu4JM+/u0OcZI5N1LjuPii7Ig6wr1uCg/XcD+u6ASfsZ65fym94l5PeCbc61p+vq0plSItsfL1zLmjx5\
                                    73c8Unwr22hYer1JZfdS/ggS8mF9+r+Gp2E0ARdbHqF+Le8ASPdFfgL36LUv8Q1Ti/KfGgAJXFPxIcs793YjOvAAAAA\
                                    ElFTkSuQmCC";

    /*** 白色矩形  1x1像素  ***/
    export const RECT_SP: string = "data:image/png;base64,\
                                    iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1\
                                    +/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMS8yMS8xOKG8YTwAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrcy\
                                    BDUzbovLKMAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg==";


}


