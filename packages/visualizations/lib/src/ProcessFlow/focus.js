"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var focus_1 = require("../utils/focus");
var focus_utils_1 = require("../utils/focus_utils");
var fp_1 = require("lodash/fp");
var styles = require("./styles");
// There can only be an element focus in process flow diagrams
var Focus = /** @class */ (function (_super) {
    __extends(Focus, _super);
    function Focus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Focus.prototype.onElementHover = function (payload) {
        // Remove the current focus label, if there is one
        this.remove();
        // Check if focus labels should be displayed for the element type.
        var focusPoint = payload.focusPoint, datum = payload.d, isNode = focusPoint.type === "node", config = this.state.current.get("config");
        if (isNode ? !config.showNodeFocusLabels : !config.showLinkFocusLabels) {
            return;
        }
        // Render the focus label hidden initially to allow placement calculations
        focus_utils_1.default.drawHidden(this.el, "element").style("pointer-events", "none");
        var content = this.el.append("xhtml:ul");
        content
            .append("xhtml:li")
            .attr("class", styles.title)
            .text(datum.label())
            .append("span")
            .text(" (" + datum.size() + ")");
        if (datum.content().length > 0) {
            this.appendContent(content, datum.content());
        }
        if (isNode) {
            this.addNodeBreakdowns(content, datum);
            this.addSingleNodeVisitsComment(content, datum);
        }
        // Get label dimensions (has to be actually rendered in the page to do this) and position label
        var labelDimensions = focus_utils_1.default.labelDimensions(this.el), drawingDimensions = this.getDrawingDimensions(), offset = focusPoint.offset + config.nodeBorderWidth + config.labelOffset;
        focus_utils_1.default.positionLabel(this.el, focusPoint, labelDimensions, drawingDimensions, offset);
    };
    Focus.prototype.appendContent = function (container, content) {
        var contentContainer = container.append("div").attr("class", styles.content);
        fp_1.forEach(function (contentItem) {
            contentContainer
                .append("xhtml:li")
                .attr("class", styles.title)
                .text(contentItem.key + ": ")
                .append("span")
                .text(contentItem.value);
        })(content);
    };
    Focus.prototype.addNodeBreakdowns = function (content, datum) {
        var breakdowns = computeBreakdowns(datum), container = content.append("div").attr("class", styles.breakdownsContainer), inputsTotal = computeBreakdownTotal(breakdowns.inputs), outputsTotal = computeBreakdownTotal(breakdowns.outputs), startsHerePercentage = Math.round(datum.journeyStarts * 100 / outputsTotal), endsHerePercentage = Math.round(datum.journeyEnds * 100 / inputsTotal), startsHereString = !isNaN(startsHerePercentage) ? startsHerePercentage + "% of all outputs" : " ", endsHereString = !isNaN(endsHerePercentage) ? endsHerePercentage + "% of all outputs" : " ";
        // Add "Starts here" breakdown
        fp_1.flow(addBreakdownContainer, addBreakdownTitle("Starts here"), addBreakdownBars(breakdowns.startsHere), addBreakdownComment(startsHereString))(container);
        // Add "Ends here" breakdown
        fp_1.flow(addBreakdownContainer, addBreakdownTitle("Ends here"), addBreakdownBars(breakdowns.endsHere), addBreakdownComment(endsHereString))(container);
        // Add inputs breakdown
        fp_1.flow(addBreakdownContainer, addBreakdownTitle("Inputs", " (" + inputsTotal + ")"), addBreakdownBars(breakdowns.inputs))(container);
        // Add outputs breakdown
        fp_1.flow(addBreakdownContainer, addBreakdownTitle("Outputs", " (" + outputsTotal + ")"), addBreakdownBars(breakdowns.outputs))(container);
    };
    Focus.prototype.addSingleNodeVisitsComment = function (content, datum) {
        if (datum.singleNodeJourneys === 0) {
            return;
        }
        content
            .append("xhtml:li")
            .attr("class", styles.title)
            .text("[!] " + datum.singleNodeJourneys + " single node visits (not included in the above stats)");
    };
    Focus.prototype.getDrawingDimensions = function () {
        var drawingContainer = this.state.current.get("computed").canvas.elRect, config = this.state.current.get("config");
        return {
            xMax: drawingContainer.left + config.width,
            xMin: drawingContainer.left,
            yMax: drawingContainer.top + config.height,
            yMin: drawingContainer.top,
        };
    };
    return Focus;
}(focus_1.default));
// Helper functions
function computeBreakdowns(node) {
    var inputs = fp_1.map(function (link) {
        var size = link.size();
        return {
            label: link.source().label(),
            size: size,
            percentage: Math.round(size * 100 / node.size())
        };
    })(node.targetLinks);
    var outputs = fp_1.map(function (link) {
        var size = link.size();
        return {
            label: link.target().label(),
            size: size,
            percentage: Math.round(size * 100 / node.size())
        };
    })(node.sourceLinks);
    var startsHere = [{
            size: node.journeyStarts,
            percentage: Math.round(node.journeyStarts * 100 / node.size())
        }];
    var endsHere = [{
            size: node.journeyEnds,
            percentage: Math.round(node.journeyEnds * 100 / node.size())
        }];
    return { inputs: inputs, outputs: outputs, startsHere: startsHere, endsHere: endsHere };
}
function computeBreakdownTotal(breakdowns) {
    return fp_1.reduce(function (sum, item) { return sum + item.size; }, 0)(breakdowns);
}
function addBreakdownContainer(content) {
    return content.append("div").attr("class", styles.breakdownContainer);
}
function addBreakdownTitle(title, subtitle) {
    return function (container) {
        container.append("span")
            .attr("class", styles.title)
            .text(title)
            .append("span")
            .text(subtitle);
        return container;
    };
}
function addBreakdownBars(breakdownItems) {
    return function (container) {
        fp_1.forEach(appendBreakdown(container))(breakdownItems);
        return container;
    };
}
function appendBreakdown(container) {
    return function (item) {
        var breakdown = container.append("div")
            .attr("class", styles.breakdown);
        if (item.label) {
            breakdown
                .append("label")
                .attr("class", styles.breakdownLabel)
                .text(item.label);
        }
        var backgroundBar = breakdown.append("div")
            .attr("class", styles.breakdownBackgroundBar);
        backgroundBar.append("div")
            .attr("class", styles.breakdownBar)
            .style("width", item.percentage + "%");
        backgroundBar.append("div")
            .attr("class", styles.breakdownText)
            .text(item.size + " (" + item.percentage + "%)");
    };
}
function addBreakdownComment(comment) {
    return function (container) {
        container.append("label")
            .attr("class", styles.breakdownCommentLabel)
            .text(comment);
        return container;
    };
}
exports.default = Focus;
//# sourceMappingURL=focus.js.map