(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/coffee_bean/ui/CUIDecorator.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ed2ce6zh0NJWrZlNcFHrIh4', 'CUIDecorator', __filename);
// coffee_bean/ui/CUIDecorator.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UI装饰器
 * @param prefab_url 预制体名字
 * @param is_singleton 是否是单例UI
 * @param desc 描述
 */
function cuinfo(prefab_url, is_singleton, desc) {
    if (desc === void 0) { desc = "这是一个UI"; }
    return function (target) {
        target.prefab_url = prefab_url;
        target.is_singleton = is_singleton;
        target.desc = desc;
    };
}
exports.cuinfo = cuinfo;
/**
 * UI动画装饰器
 *
 * @export
 */
function hideAnim() {
}
exports.hideAnim = hideAnim;

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
        //# sourceMappingURL=CUIDecorator.js.map
        