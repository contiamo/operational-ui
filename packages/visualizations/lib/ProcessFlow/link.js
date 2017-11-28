"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var Link = /** @class */ (function () {
    function Link(linkAttributes, accessors) {
        this.accessors = accessors;
        this.attributes = this.assignAttributes(linkAttributes);
        this.assignAccessors();
    }
    Link.prototype.assignAttributes = function (linkAttributes) {
        return fp_1.extend.convert({ immutable: false })({}, linkAttributes);
    };
    Link.prototype.assignAccessors = function () {
        var _this = this;
        fp_1.forEach.convert({ cap: false })(function (accessor, key) {
            ;
            _this[key] = function () { return accessor(_this.attributes); };
        })(this.accessors);
    };
    return Link;
}());
exports.default = Link;
//# sourceMappingURL=link.js.map