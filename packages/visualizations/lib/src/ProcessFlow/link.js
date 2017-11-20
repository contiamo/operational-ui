"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var Link = /** @class */ (function () {
    function Link(linkAttributes, accessors) {
        this.accessors = accessors;
        this.assignProperties(linkAttributes);
    }
    Link.prototype.assignProperties = function (linkAttributes) {
        this.attributes = fp_1.extend.convert({ immutable: false })({}, linkAttributes);
    };
    Link.prototype.dash = function () {
        return this.accessors.dash(this.attributes);
    };
    Link.prototype.label = function () {
        return this.accessors.label(this.attributes);
    };
    Link.prototype.size = function () {
        return this.accessors.size(this.attributes);
    };
    Link.prototype.source = function () {
        return this.accessors.source(this.attributes);
    };
    Link.prototype.sourceId = function () {
        return this.accessors.sourceId(this.attributes);
    };
    Link.prototype.stroke = function () {
        return this.accessors.stroke(this.attributes);
    };
    Link.prototype.target = function () {
        return this.accessors.target(this.attributes);
    };
    Link.prototype.targetId = function () {
        return this.accessors.targetId(this.attributes);
    };
    return Link;
}());
exports.default = Link;
//# sourceMappingURL=link.js.map