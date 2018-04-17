"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3_hierarchy_1 = require("d3-hierarchy");
var fp_1 = require("lodash/fp");
var DataHandler = /** @class */ (function () {
    function DataHandler(state, stateWriter) {
        this.state = state;
        this.stateWriter = stateWriter;
    }
    DataHandler.prototype.assignAccessors = function () {
        var _this = this;
        var accessors = this.state.current.get("accessors").series;
        // In prepared data, original data is saved in d.data, so accessors need to be modified accordingly
        fp_1.forEach.convert({ cap: false })(function (accessor, key) {
            ;
            _this[key] = function (d) { return (d.data ? accessor(d.data) : accessor(d)); };
        })(accessors);
    };
    DataHandler.prototype.prepareData = function () {
        this.assignAccessors();
        var data = this.state.current.get("accessors").data.data(this.state.current.get("data")) || {};
        var sortingFunction = function (a, b) {
            // Empty segments should always be last
            if (a.data.empty) {
                return 1;
            }
            if (b.data.empty) {
                return -1;
            }
            // Sort largest to smallest
            return b.value - a.value;
        };
        var hierarchyData = d3_hierarchy_1.hierarchy(data)
            .each(this.assignColors.bind(this))
            .each(this.assignNames.bind(this))
            .each(this.assignIDs.bind(this))
            .eachAfter(this.assignValues.bind(this))
            .sort(this.state.current.get("config").sort ? sortingFunction : undefined);
        this.total = hierarchyData.value;
        this.topNode = d3_hierarchy_1.partition()(hierarchyData)
            .descendants()
            .find(function (d) { return d.depth === 0; });
        this.stateWriter("topNode", this.topNode);
        this.data = d3_hierarchy_1.partition()(hierarchyData)
            .descendants()
            .filter(function (d) { return !fp_1.isEmpty(d.data); });
        this.checkDataValidity();
        fp_1.forEach(function (d) {
            d.zoomable = d.parent && !!d.children;
        })(this.data);
        this.stateWriter("data", this.data);
        return this.data;
    };
    DataHandler.prototype.assignColors = function (node) {
        if (node.data.empty) {
            node.color = "#fff";
            return;
        }
        var propagateColors = this.state.current.get("config").propagateColors;
        node.color = propagateColors && node.depth > 1 ? node.parent.color : node.depth > 0 ? this.color(node) : undefined;
    };
    DataHandler.prototype.assignNames = function (node) {
        node.name = this.name(node);
    };
    DataHandler.prototype.assignIDs = function (node) {
        node.id = this.id(node);
    };
    DataHandler.prototype.assignValues = function (node) {
        if (this.value(node)) {
            node.value = +this.value(node);
            return;
        }
        var sum = 0;
        var children = node.children;
        var i = children && children.length - 1;
        while (i >= 0) {
            sum += +children[i].value;
            i = i - 1;
        }
        node.value = sum;
    };
    DataHandler.prototype.checkDataValidity = function () {
        // All data points must have a value assigned
        var noValueData = fp_1.filter(function (d) { return !d.value; })(this.data);
        if (noValueData.length > 0) {
            throw new Error("The following nodes do not have values: " + fp_1.map(this.name)(noValueData));
        }
        // Parent nodes cannot be smaller than the sum of their children
        var childrenExceedParent = fp_1.filter(function (d) {
            var childSum = fp_1.reduce(function (sum, child) { return sum + child.value; }, 0)(d.children);
            return d.value < childSum;
        })(this.data);
        if (childrenExceedParent.length > 0) {
            throw new Error("The following nodes are smaller than the sum of their child nodes: " + fp_1.map(this.name)(childrenExceedParent));
        }
    };
    return DataHandler;
}());
exports.default = DataHandler;
//# sourceMappingURL=data_handler.js.map