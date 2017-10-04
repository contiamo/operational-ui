"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var Node = /** @class */ (function () {
    function Node(nodeAttributes, accessors) {
        this.accessors = accessors;
        this.assignProperties(nodeAttributes);
    }
    Node.prototype.assignProperties = function (nodeAttributes) {
        this.attributes = fp_1.extend.convert({ immutable: false })({})(nodeAttributes);
    };
    Node.prototype.color = function () {
        return this.accessors.color(this.attributes);
    };
    Node.prototype.shape = function () {
        return this.accessors.shape(this.attributes);
    };
    Node.prototype.size = function () {
        return this.accessors.size(this.attributes);
    };
    Node.prototype.stroke = function () {
        return this.accessors.stroke(this.attributes);
    };
    Node.prototype.id = function () {
        return this.accessors.id(this.attributes);
    };
    Node.prototype.label = function () {
        return this.accessors.label(this.attributes);
    };
    Node.prototype.labelPosition = function () {
        return this.accessors.labelPosition(this.attributes);
    };
    return Node;
}());
exports.default = Node;
//# sourceMappingURL=node.js.map