"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var AccessorsFactory = function (defaultAccessors) {
    function wrapWithDefaultAccessor(customAccessor, defaultAccessor) {
        return function (node) { return customAccessor(node) || defaultAccessor(node); };
    }
    return /** @class */ (function () {
        function Accessors() {
            this.resetAccessors();
            this.accessors = this.buildAccessors();
        }
        Accessors.prototype.resetAccessors = function () {
            this.customAccessors = {};
        };
        Accessors.prototype.setAccessors = function (accessors) {
            var _this = this;
            fp_1.forEach.convert({ cap: false })(function (method, property) {
                _this.customAccessors[property] = method;
            })(accessors);
        };
        Accessors.prototype.propertyAccessor = function (property) {
            var _this = this;
            return function (node) {
                var customAccessor = _this.customAccessors[property], defaultAccessor = defaultAccessors[property];
                return customAccessor ? wrapWithDefaultAccessor(customAccessor, defaultAccessor)(node) : defaultAccessor(node);
            };
        };
        Accessors.prototype.buildAccessors = function () {
            var _this = this;
            return fp_1.reduce.convert({ cap: false })(function (memo, defaultAccessor, property) {
                memo[property] = _this.propertyAccessor(property);
                return memo;
            }, {})(defaultAccessors);
        };
        return Accessors;
    }());
};
exports.default = AccessorsFactory;
//# sourceMappingURL=accessors_factory.js.map