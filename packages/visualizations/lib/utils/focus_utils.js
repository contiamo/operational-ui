"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var styles = require("./styles");
function optimalPosition(possibilities, min, max, dimension) {
    function withinRange(value) {
        return value >= min && value + dimension <= max;
    }
    var optimal = fp_1.find(withinRange)(possibilities);
    return optimal || fp_1.last(possibilities);
}
function getPositionClass(position) {
    switch (position) {
        case "above":
            return styles.focusLegendAbove;
        case "below":
            return styles.focusLegendBelow;
        case "toRight":
            return styles.focusLegendRight;
        case "toLeft":
            return styles.focusLegendLeft;
        default:
            return "";
    }
}
function switchSides(el, from, to) {
    if (!to) {
        return;
    }
    el.classed(getPositionClass(from), false);
    el.classed(getPositionClass(to), true);
}
var xArrowOffsetPosition = {
    above: 0,
    below: 0,
    toLeft: -1,
    toRight: 1,
};
var yArrowOffsetPosition = {
    above: -1,
    below: 1,
    toLeft: 0,
    toRight: 0,
};
// Focus Label Formatting
var FocusUtils = {
    // Public Functions
    // Initial, hidden rendering of the focus label.
    // Allows the dimensions of the focus label to be calculated, and hence allows label positioning,
    // before the label is made visible.
    drawHidden: function (canvasEl, type, position) {
        return canvasEl
            .attr("class", styles.focusLegend + " " + getPositionClass(position) + " focus-legend-" + type)
            .style("visibility", "hidden");
    },
    // Move the focus label to the desired position and make it visible.
    drawVisible: function (focusEl, labelPlacement, position) {
        var arrowOffset = 5;
        var xArrowOffset = arrowOffset * xArrowOffsetPosition[position];
        var yArrowOffset = arrowOffset * yArrowOffsetPosition[position];
        focusEl
            .style("top", labelPlacement.top + yArrowOffset + "px")
            .style("left", labelPlacement.left + xArrowOffset + "px")
            .style("visibility", "visible");
    },
    // Return dimensions of focus label, including width of any margins or borders.
    labelDimensions: function (focusEl) {
        var rect = focusEl.node().getBoundingClientRect();
        return {
            height: rect.height,
            width: rect.width,
        };
    },
    // Position focus label according to desired position relative to focus point.
    // Use label and drawing dimensions to ensure focus label does not overflow drawing.
    positionLabel: function (el, focus, label, drawing, offset, position) {
        if (offset === void 0) { offset = 0; }
        if (position === void 0) { position = "toRight"; }
        var x = {
            farLeft: drawing.xMin + offset,
            farRight: drawing.xMax - offset - label.width,
            left: drawing.xMin + focus.x - offset - label.width,
            right: drawing.xMin + focus.x + offset,
        };
        var y = {
            above: drawing.yMin + focus.y - offset - label.height,
            below: drawing.yMin + focus.y + offset,
            bottom: drawing.yMin + drawing.yMax - offset - label.height,
            top: drawing.yMin + offset,
        };
        var top;
        var left;
        var newPosition;
        switch (position) {
            case "above":
                top = optimalPosition([y.above, y.below, y.top], drawing.yMin, drawing.yMax, label.height);
                left = _this.default.horizontalCenter(focus, label, drawing);
                if (top !== y.above) {
                    newPosition = "below";
                }
                break;
            case "below":
                top = optimalPosition([y.below, y.above, y.bottom], drawing.yMin, drawing.yMax, label.height);
                left = _this.default.horizontalCenter(focus, label, drawing);
                if (top !== y.above) {
                    newPosition = "above";
                }
                break;
            case "toLeft":
                top = _this.default.verticalCenter(focus, label, drawing);
                left = optimalPosition([x.left, x.right, x.farRight], drawing.yMin, drawing.yMax, label.height);
                if (left !== x.left) {
                    newPosition = "toRight";
                }
                break;
            case "toRight":
                top = _this.default.verticalCenter(focus, label, drawing);
                left = optimalPosition([x.right, x.left, x.farLeft], drawing.xMin, drawing.xMax, label.width);
                if (left === x.left) {
                    newPosition = "toLeft";
                }
                break;
            default:
                throw new Error("Invalid label position '" + position + "'.");
        }
        // Finally. Done.
        switchSides(el, position, newPosition || position);
        _this.default.drawVisible(el, { left: left, top: top }, newPosition || position);
    },
    // Finds the y value that centres the focus label vertically (without overflowing the drawing area).
    verticalCenter: function (focus, label, drawing) {
        return Math.min(Math.max(focus.y + drawing.yMin - label.height / 2, drawing.yMin), drawing.yMax);
    },
    horizontalCenter: function (focus, label, drawing) {
        return Math.min(Math.max(focus.x + drawing.xMin - label.width / 2, drawing.xMin), drawing.xMax);
    },
};
exports.default = FocusUtils;
//# sourceMappingURL=focus_utils.js.map