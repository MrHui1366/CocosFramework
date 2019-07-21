"use strict";
cc._RF.push(module, 'dc80aBTj1NH6YbGK7MPg7S+', 'CHTTP');
// coffee_bean/network/CHTTP.ts

"use strict";
/**
 * CoffeeBean
 * HTTP库
 * 自动异步队列
 *
 * By Leo
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var CLOG_1 = require("../utils/CLOG");
var CLoading_1 = require("../component/CLoading");
var HTTP_TAG = "HTTP";
/**
 * HTTP 任务
 */
var CHTTPTask = /** @class */ (function () {
    function CHTTPTask() {
    }
    return CHTTPTask;
}());
exports.CHTTPTask = CHTTPTask;
/** CoffeeBean
   * HTTP请求库
   *
   * By Leo
   */
var CHTTP = /** @class */ (function () {
    function CHTTP() {
    }
    /**
     * 发送请求
     * @param URL 请求地址
     * @param data 发送的数据对象
     * @param showWating 是否需要显示Waiting
     * @param handler 回调函数
     */
    CHTTP.Post = function (url, data, showWating, handler) {
        if (showWating === void 0) { showWating = true; }
        var task = new CHTTPTask();
        task.url = url;
        task.data = data;
        task.caller = handler;
        task.showLoading = showWating;
        // 添加到任务队列
        this.taskList.push(task);
        // 若处理器没有启动
        if (!this.hasRun) {
            // 启动他
            this.handleHTTP();
        }
    };
    /**
     * 处理HTTP请求
     */
    CHTTP.handleHTTP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function () {
                            var task, url, data, caller, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this_1.hasRun = true;
                                        task = this_1.taskList.shift();
                                        url = task.url;
                                        data = task.data;
                                        caller = task.caller;
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                // 需要显示Loading则显示
                                                if (task.showLoading) {
                                                    CLoading_1.CLoading.show();
                                                }
                                                CLOG_1.default.I(HTTP_TAG, "== HTTP REQUEST ==");
                                                CLOG_1.default.I(HTTP_TAG, "URL:" + url);
                                                CLOG_1.default.I(HTTP_TAG, "data:" + data);
                                                var http_req = new XMLHttpRequest();
                                                http_req.onreadystatechange = function () {
                                                    if (http_req.readyState == 4) {
                                                        CLOG_1.default.I(HTTP_TAG, "== HTTP RESPONSE ==");
                                                        CLOG_1.default.I(HTTP_TAG, "state:" + http_req.statusText);
                                                        CLOG_1.default.I(HTTP_TAG, "data:" + http_req.responseText);
                                                        // 需要显示Loading则隐藏
                                                        if (task.showLoading) {
                                                            CLoading_1.CLoading.hide();
                                                        }
                                                        if (http_req.status == 200) {
                                                            resolve([true, http_req.responseText]);
                                                        }
                                                        else {
                                                            CLOG_1.default.E(HTTP_TAG, "xmlhttprequest status:" + http_req.status);
                                                            // PopUpView.showUI("网络异常，请稍后重试","好的",null,(isOK)=>{
                                                            //     resolve( [ false, "" ] );
                                                            // });
                                                        }
                                                    }
                                                };
                                                http_req.open("post", url, true);
                                                http_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                                                http_req.send(data);
                                            })];
                                    case 1:
                                        result = _a.sent();
                                        // 异步执行结束，执行回调
                                        if (caller != null) {
                                            caller(result[0], JSON.parse(result[1]));
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 1;
                    case 1:
                        if (!(this.taskList.length > 0)) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        this.hasRun = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 任务队列
     */
    CHTTP.taskList = new Array();
    /**
     * 是否正在运行
     */
    CHTTP.hasRun = false;
    return CHTTP;
}());
exports.CHTTP = CHTTP;

cc._RF.pop();