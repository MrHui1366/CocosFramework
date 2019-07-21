"use strict";
cc._RF.push(module, '8f53bu4d9dHKZgiTvE+6X3o', 'CObject');
// coffee_bean/utils/CObject.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 对象扩展
 *
 * @export
 * @class CObject
 */
var CObject = /** @class */ (function () {
    function CObject() {
    }
    /**
     * 显示对象的所有组成
     * @param 对象
     */
    CObject.displayObject = function (target, prefixCount) {
        if (prefixCount === void 0) { prefixCount = 0; }
        var prefix = " ".repeat(prefixCount);
        for (var key in this) {
            if ([key] instanceof Object) {
                this[key].displayObject(prefixCount + 4);
            }
            console.log(prefix + "object key:" + key + "   value:" + this[key]);
        }
    };
    /**
     * 拷贝源对象身上的 键值 到目标对象身上
     * 相关规则见例子
     * 源对象   A { k1=10,k2=20,k3=30 };
     * 目标对象 B { k2=50,k3=90,k4=130};
     * 执行后   B { k2=20,k3=30,k4=130};
     * @param sourceObj 源对象
     * @param targetObj 目标对象
     */
    CObject.copyObjectMixValue = function (sourceObj, targetObj) {
        for (var key in sourceObj) {
            if (targetObj[key] != undefined) {
                targetObj[key] = sourceObj[key];
            }
        }
    };
    return CObject;
}());
exports.default = CObject;

cc._RF.pop();