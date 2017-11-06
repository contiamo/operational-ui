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
            fp_1.forEach.convert({ cap: false })(fp_1.bind(function (method, property) {
                this.customAccessors[property] = method;
            }, this))(accessors);
        };
        Accessors.prototype.propertyAccessor = function (property) {
            return fp_1.bind(function (node) {
                var customAccessor = this.customAccessors[property], defaultAccessor = defaultAccessors[property];
                return customAccessor ? wrapWithDefaultAccessor(customAccessor, defaultAccessor)(node) : defaultAccessor(node);
            }, this);
        };
        Accessors.prototype.buildAccessors = function () {
            return fp_1.reduce.convert({ cap: false })(fp_1.bind(function (memo, defaultAccessor, property) {
                memo[property] = this.propertyAccessor(property);
                return memo;
            }, this), {})(defaultAccessors);
        };
        return Accessors;
    }());
};
exports.default = AccessorsFactory;
//# sourceMappingURL=accessors_factory.js.map