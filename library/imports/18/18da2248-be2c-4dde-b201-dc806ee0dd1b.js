"use strict";
cc._RF.push(module, '18da2JIvixN3rIB3IBu4N0b', 'CMap');
// coffee_bean/core/CMap.ts

"use strict";
/**
 * Map实现
 * 对于ES6来说，内置有Map类
 * 而部分无法使用ES6的程序可以使用本类来替代
 * 因此建议大多数时候使用原生Map类
 *
 * Map 是 ES6的新特性，需要修改tsconfig.json 中 lib 和target 为es6
 * CMap 为框架CMap 适合大多数设备
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*** 自定义Map类 ***/
var CMap = /** @class */ (function () {
    function CMap() {
        this.data = new Array();
    }
    /*** 设置键值对 ***/
    CMap.prototype.set = function (key, value) {
        var index = this.data.findIndex(function (value, index, array) { return value.key == key; });
        if (index != -1) {
            this.data[index].value = value;
        }
        else {
            this.data.push({ "key": key, "value": value });
        }
    };
    /*** 从map中获得数据 ***/
    CMap.prototype.get = function (key) {
        var index = this.data.findIndex(function (value, index, array) { return value.key == key; });
        if (index != -1) {
            return this.data[index].value;
        }
        return null;
    };
    Object.defineProperty(CMap.prototype, "size", {
        /*** 得到数量 ***/
        get: function () {
            return this.data.length;
        },
        enumerable: true,
        configurable: true
    });
    /*** 获得键值对 ***/
    CMap.prototype.getKV = function (index) {
        if (index < 0 || index >= this.data.length) {
            return null;
        }
        return this.data[index];
    };
    /*** 是否拥有此键值对 ***/
    CMap.prototype.has = function (key) {
        var index = this.data.findIndex(function (value, index, array) { return value.key == key; });
        return index != -1;
    };
    /*** 移除一个键 ***/
    CMap.prototype.delete = function (key) {
        var index = this.data.findIndex(function (value, index, array) { return value.key == key; });
        if (index != -1) {
            this.data.splice(index, 1);
        }
        return true;
    };
    return CMap;
}());
exports.CMap = CMap;

cc._RF.pop();