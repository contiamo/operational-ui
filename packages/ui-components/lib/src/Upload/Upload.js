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
var attrAccept = require("attr-accept");
var Upload = /** @class */ (function (_super) {
    __extends(Upload, _super);
    function Upload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Upload.prototype.onChange = function (evt) {
        this.uploadAll(Array.from(evt.target.files));
    };
    Upload.prototype.onClick = function () {
        this.fileInput.click();
    };
    Upload.prototype.onDrop = function (evt) {
        evt.preventDefault();
        if (evt.type === "dragover")
            return;
        var files = Array.from(evt.dataTransfer.files).filter(function (file) { return attrAccept(file); });
        this.uploadAll(files);
    };
    Upload.prototype.uploadAll = function (files) {
        var _this = this;
        files.forEach(function (file) {
            _this.upload(file, files);
        });
    };
    Upload.prototype.upload = function (file, fileList) {
        return __awaiter(this, void 0, void 0, function () {
            var onBeforeUpload, newFile, type, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        onBeforeUpload = this.props.onBeforeUpload;
                        return [4 /*yield*/, onBeforeUpload(file, fileList)];
                    case 1:
                        newFile = _a.sent();
                        type = Object.prototype.toString.call(newFile);
                        if (type === "[object Blob]" || type === "[object File]") {
                            this.postFile(newFile);
                        }
                        else {
                            this.postFile(file);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Upload.prototype.postFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, action, data, headers, name, onStartUpload, onSuccess, onError, _b, request, response, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, action = _a.action, data = _a.data, headers = _a.headers, name = _a.name, onStartUpload = _a.onStartUpload, onSuccess = _a.onSuccess, onError = _a.onError, _b = _a.request, request = _b === void 0 ? defaultRequest : _b;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        onStartUpload(file);
                        return [4 /*yield*/, request({ action: action, data: data, file: file, headers: headers, name: name })];
                    case 2:
                        response = _c.sent();
                        onSuccess(response, file);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _c.sent();
                        onError(error_2, file);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Upload.prototype.render = function () {
        var _this = this;
        var _a = this.props, accept = _a.accept, children = _a.children, disabled = _a.disabled, multiple = _a.multiple;
        var handlers = !disabled
            ? {
                onClick: this.onClick.bind(this),
                onDragOver: this.onDrop.bind(this),
                onDrop: this.onDrop.bind(this)
            }
            : {};
        return (React.createElement("div", __assign({}, handlers),
            React.createElement("input", { style: { display: "none" }, accept: accept, multiple: multiple, onChange: this.onChange.bind(this), ref: function (node) {
                    _this.fileInput = node;
                }, type: "file" }),
            children));
    };
    Upload.defaultProps = {
        accept: "*",
        data: {},
        headers: {},
        multipart: false,
        multiple: false,
        name: "file",
        onBeforeUpload: function () { },
        onStartUpload: function () { },
        onError: function () { },
        onSuccess: function () { }
    };
    return Upload;
}(React.Component));
exports.default = Upload;
function checkStatus(response) {
    if (response.ok) {
        return response;
    }
    else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}
function defaultRequest(_a) {
    var action = _a.action, data = _a.data, file = _a.file, headers = _a.headers, name = _a.name;
    return __awaiter(this, void 0, void 0, function () {
        var formData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = Object
                        .entries(data)
                        .reduce(function (accFormData, _a, i) {
                        var key = _a[0], value = _a[1];
                        if (i === 0)
                            accFormData.append(name, file);
                        accFormData.append(key, value);
                        return accFormData;
                    }, new FormData());
                    return [4 /*yield*/, fetch(action, {
                            method: "POST",
                            headers: new Headers(headers),
                            body: formData,
                            mode: "cors",
                            cache: "default"
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, checkStatus(response).json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=Upload.js.map