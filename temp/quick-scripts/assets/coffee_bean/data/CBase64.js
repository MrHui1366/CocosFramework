(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/data/CBase64.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '31803wfIDdM9a7GFsO61raW', 'CBase64', __filename);
// coffee_bean/data/CBase64.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CoffeeBean
 * 常用图片的base64封装
 *
 * By Leo
 */
var CBASE64;
(function (CBASE64) {
    /*** 缓存好的精灵集 ***/
    var CachedSpriteFrame = new Map();
    /**
     * 通过base64内嵌图片来创建精灵帧
     * @param url 要创建的base64图片
     */
    function createSpriteFrameFromBase64Img(url) {
        if (CachedSpriteFrame.has(url)) {
            return CachedSpriteFrame.get(url);
        }
        var img = new Image();
        img.src = url;
        var texture = new cc.Texture2D();
        texture.initWithElement(img);
        var spf = new cc.SpriteFrame(texture);
        CachedSpriteFrame.set(url, spf);
        return spf;
    }
    CBASE64.createSpriteFrameFromBase64Img = createSpriteFrameFromBase64Img;
    /*** 白色小球  32x32像素  ***/
    CBASE64.BALL_SP = "data:image/png;base64,\
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
    CBASE64.RECT_SP = "data:image/png;base64,\
                                    iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1\
                                    +/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMS8yMS8xOKG8YTwAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrcy\
                                    BDUzbovLKMAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg==";
})(CBASE64 = exports.CBASE64 || (exports.CBASE64 = {}));

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=CBase64.js.map
        