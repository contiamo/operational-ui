"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var React = require("react");
var glamorous_1 = require("glamorous");
var sleep = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
};
var Marathon = /** @class */ (function (_super) {
    __extends(Marathon, _super);
    function Marathon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tests: [],
            completed: 0
        };
        _this._tests = [];
        _this.setStateAsync = function (updater) {
            return new Promise(function (resolve) {
                _this.setState(updater, function () {
                    resolve();
                });
            });
        };
        _this.test = function (description, fn) {
            _this._tests.push({ description: description, fn: fn, fail: false });
        };
        _this.expect = function (condition) {
            if (!condition) {
                _this.setState(function (_a) {
                    var tests = _a.tests, completed = _a.completed;
                    return ({
                        tests: tests.map(function (test, index) { return (index === completed ? __assign({}, test, { fail: true }) : test); })
                    });
                });
            }
        };
        _this.runNext = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var _a, tests, completed, timeout, test;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.state, tests = _a.tests, completed = _a.completed;
                        timeout = this.props.timeout;
                        test = tests[completed];
                        if (!test) {
                            return [2 /*return*/];
                        }
                        if (!(test.fn.length === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, sleep(timeout)];
                    case 1:
                        _b.sent();
                        test.fn();
                        return [4 /*yield*/, this.setStateAsync(function (prevState) { return ({ completed: prevState.completed + 1 }); })];
                    case 2:
                        _b.sent();
                        this.runNext();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, sleep(timeout)];
                    case 4:
                        _b.sent();
                        test.fn(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.setState(function (prevState) { return ({ completed: prevState.completed + 1 }); })];
                                    case 1:
                                        _a.sent();
                                        this.runNext();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    Marathon.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this, test = _a.test, tests = _a._tests, expect = _a.expect, container = _a.container;
        // Run client-provided test function, injecting test methods (test, expect, ...)
        this.props.test({ test: test, expect: expect, container: container });
        // Pin the test array on state, run first one when ready.
        this.setStateAsync(function (prevState) { return ({ tests: tests }); }).then(function () {
            _this.runNext();
        });
    };
    Marathon.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(TestResults, { tests: this.state.tests, completed: this.state.completed }),
            React.createElement(Content, { innerRef: function (node) {
                    _this.container = node;
                } })));
    };
    Marathon.defaultProps = {
        timeout: 0
    };
    return Marathon;
}(React.Component));
var Content = glamorous_1.default.div({
    padding: 20
}, function (_a) {
    var theme = _a.theme;
    return ({
        backgroundColor: theme.colors.palette.grey10
    });
});
var ListContainer = glamorous_1.default.ul({
    padding: 0
});
var Item = glamorous_1.default.li({
    listStyle: "none",
    margin: 0,
    "&:before": {
        width: 16,
        height: 16,
        borderRadius: "50%",
        display: "inline-block"
    }
}, function (_a) {
    var theme = _a.theme, hasCompleted = _a.hasCompleted, failed = _a.failed;
    var palette = theme.colors.palette;
    return {
        "&:before": {
            content: hasCompleted ? (failed ? "✘" : "✓") : "...",
            color: hasCompleted ? (failed ? palette.error : palette.success) : palette.black
        }
    };
});
var TestResults = function (_a) {
    var tests = _a.tests, completed = _a.completed;
    return (React.createElement(ListContainer, null, tests.map(function (test, index) { return (React.createElement(Item, { hasCompleted: completed > index, failed: test.fail, key: index }, test.description)); })));
};
exports.default = glamorous_1.withTheme(Marathon);
//# sourceMappingURL=Marathon.js.map