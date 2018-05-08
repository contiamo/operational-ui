"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var legend_1 = require("./legend/legend");
var styles = require("../utils/styles");
var fp_1 = require("lodash/fp");
var legendOptions = [
    { position: "top", float: "left" },
    { position: "top", float: "right" },
    { position: "bottom", float: "left" }
];
var LegendManager = /** @class */ (function () {
    function LegendManager(state, stateWriter, events, els) {
        var _this = this;
        this.legends = { top: {}, bottom: {} };
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        fp_1.forEach(function (option) {
            var el = els[option.position][option.float];
            _this.legends[option.position][option.float] = new legend_1.default(state, stateWriter, events, el);
        })(legendOptions);
    }
    LegendManager.prototype.draw = function () {
        var _this = this;
        fp_1.forEach(function (option) {
            var data = _this.state.current.get("computed").series.dataForLegends[option.position][option.float];
            _this.legends[option.position][option.float].setData(data);
            _this.legends[option.position][option.float].draw();
        })(legendOptions);
        this.arrangeTopLegends();
    };
    // Ensure the 2 top legends (left/right) make sensible use of the available space.
    LegendManager.prototype.arrangeTopLegends = function () {
        var drawingWidth = this.state.current.get("config").width;
        var left = this.legends.top.left;
        var right = this.legends.top.right;
        var leftWidth = left.el.node().getBoundingClientRect().width;
        var rightWidth = right.el.node().getBoundingClientRect().width;
        if (leftWidth + rightWidth <= drawingWidth) {
            return;
        }
        if (leftWidth < drawingWidth / 2) {
            right.setWidth(drawingWidth - leftWidth);
            return;
        }
        if (rightWidth < drawingWidth / 2) {
            left.setWidth(drawingWidth - rightWidth);
            return;
        }
        // Give the legend which takes up more space as much as possible
        var leftIsLonger = leftWidth > rightWidth;
        var longer = leftIsLonger ? left : right;
        var shorter = leftIsLonger ? right : left;
        longer.setWidth(drawingWidth / 2);
        var maxLongerWidth = this.calculateMaxWidth(longer);
        longer.setWidth(maxLongerWidth);
        shorter.setWidth(drawingWidth -
            maxLongerWidth -
            parseInt(shorter.el.style("padding-left"), 10) -
            parseInt(shorter.el.style("padding-right"), 10));
        var maxShorterWidth = this.calculateMaxWidth(shorter);
        shorter.setWidth(maxShorterWidth);
    };
    LegendManager.prototype.calculateMaxWidth = function (legend) {
        var nodes = legend.el.selectAll("div." + styles.seriesLegend).nodes();
        var maxNodeWidth = fp_1.reduce(function (maxWidth, node) {
            return Math.max(maxWidth, node.getBoundingClientRect().width);
        }, 0)(nodes);
        return maxNodeWidth + parseInt(legend.el.style("padding-left"), 10) + parseInt(legend.el.style("padding-left"), 10);
    };
    return LegendManager;
}());
exports.default = LegendManager;
//# sourceMappingURL=legend_manager.js.map