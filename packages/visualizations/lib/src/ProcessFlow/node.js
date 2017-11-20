"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var Node = /** @class */ (function () {
    function Node(nodeAttributes, accessors) {
        this.journeyEnds = 0;
        this.journeyStarts = 0;
        this.singleNodeJourneys = 0;
        this.accessors = accessors;
        this.assignProperties(nodeAttributes);
        this.assignAccessors();
    }
    Node.prototype.assignProperties = function (nodeAttributes) {
        this.attributes = fp_1.extend.convert({ immutable: false })({})(nodeAttributes);
    };
    Node.prototype.assignAccessors = function () {
        var _this = this;
        fp_1.forEach.convert({ cap: false })(function (accessor, key) {
            _this[key] = function () { return accessor(_this.attributes); };
        })(this.accessors);
    };
    return Node;
}());
exports.default = Node;
//# sourceMappingURL=node.js.map