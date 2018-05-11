"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styles = require("./styles");
var Rules = /** @class */ (function () {
    function Rules(state, el, orientation) {
        this.state = state;
        this.el = el;
        this.orientation = orientation;
        this.yRules = this.orientation === "y";
    }
    Rules.prototype.draw = function () {
        var computedAxes = this.state.current.get("computed").axes.computed;
        var axisComputed = computedAxes[this.orientation + "1"] || computedAxes[this.orientation + "2"];
        var data = axisComputed.ticks;
        var startAttributes = this.startAttributes();
        var attributes = this.attributes();
        var rules = this.el.selectAll("line." + styles.rules).data(data, String);
        rules
            .exit()
            .transition()
            .duration(this.state.current.get("config").duration)
            .attr("x1", attributes.x1)
            .attr("x2", attributes.x2)
            .attr("y1", attributes.y1)
            .attr("y2", attributes.y2)
            .style("opacity", 1e-6)
            .remove();
        rules
            .enter()
            .append("svg:line")
            .attr("class", function (d) { return "rule " + styles.rules + " " + (d === 0 ? "zero" : ""); })
            .attr("x1", startAttributes.x1)
            .attr("x2", startAttributes.x2)
            .attr("y1", startAttributes.y1)
            .attr("y2", startAttributes.y2)
            .merge(rules)
            .transition()
            .duration(this.state.current.get("config").duration)
            .attr("x1", attributes.x1)
            .attr("x2", attributes.x2)
            .attr("y1", attributes.y1)
            .attr("y2", attributes.y2);
    };
    Rules.prototype.startAttributes = function () {
        var previousAxes = this.state.current.get("computed").axes.previous;
        var axisPrevious = previousAxes[this.orientation + "1"] || previousAxes[this.orientation + "2"];
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        return {
            x1: this.yRules ? -this.margin("y1") / 2 : axisPrevious.scale,
            x2: this.yRules ? drawingDims.width + this.margin("y2") / 2 : axisPrevious.scale,
            y1: this.yRules ? axisPrevious.scale : 0,
            y2: this.yRules ? axisPrevious.scale : drawingDims.height,
        };
    };
    Rules.prototype.attributes = function () {
        var computedAxes = this.state.current.get("computed").axes.computed;
        var axisComputed = computedAxes[this.orientation + "1"] || computedAxes[this.orientation + "2"];
        var drawingDims = this.state.current.get("computed").canvas.drawingDims;
        return {
            x1: this.yRules ? -this.margin("y1") / 2 : axisComputed.scale,
            x2: this.yRules ? drawingDims.width + this.margin("y2") / 2 : axisComputed.scale,
            y1: this.yRules ? axisComputed.scale : 0,
            y2: this.yRules ? axisComputed.scale : drawingDims.height,
        };
    };
    Rules.prototype.margin = function (axis) {
        return this.state.current.get("computed").axes.margins[axis] || this.state.current.get("config")[axis].margin;
    };
    Rules.prototype.close = function () {
        this.el.node().remove();
    };
    return Rules;
}());
exports.default = Rules;
//# sourceMappingURL=rules.js.map