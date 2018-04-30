"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var focus_utils_1 = require("../utils/focus_utils");
var event_catalog_1 = require("../utils/event_catalog");
var fp_1 = require("lodash/fp");
var styles = require("./styles");
// There can only be an element focus in process flow diagrams
var ProcessFlowFocus = /** @class */ (function () {
    function ProcessFlowFocus(state, stateWriter, events, el) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.events = events;
        this.el = el;
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOVER, this.onElementHover.bind(this));
        this.events.on(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT, this.onElementOut.bind(this));
        this.events.on(event_catalog_1.default.CHART.MOUSEOUT, this.onMouseLeave.bind(this));
    }
    ProcessFlowFocus.prototype.onElementHover = function (payload) {
        // Remove the current focus label, if there is one
        this.remove();
        if (payload.hideLabel) {
            return;
        }
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
            .text(" (" + this.state.current.get("config").numberFormatter(datum.size()) + ")");
        // @TODO remove? Doesn't seem to be doing anything...
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
    ProcessFlowFocus.prototype.appendContent = function (container, content) {
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
    ProcessFlowFocus.prototype.addNodeBreakdowns = function (content, datum) {
        var breakdowns = computeBreakdowns(datum), container = content.append("div").attr("class", styles.breakdownsContainer), inputsTotal = computeBreakdownTotal(breakdowns.inputs), outputsTotal = computeBreakdownTotal(breakdowns.outputs), startsHerePercentage = Math.round(datum.journeyStarts * 100 / outputsTotal), endsHerePercentage = Math.round(datum.journeyEnds * 100 / inputsTotal), startsHereString = !isNaN(startsHerePercentage) ? startsHerePercentage + "% of all outputs" : " ", endsHereString = !isNaN(endsHerePercentage) ? endsHerePercentage + "% of all inputs" : " ", numberFormatter = this.state.current.get("config").numberFormatter;
        // Add "Starts here" breakdown
        fp_1.flow(addBreakdownContainer, addBreakdownTitle("Starts here"), addBreakdownBars(breakdowns.startsHere, numberFormatter), addBreakdownComment(startsHereString))(container);
        // Add "Ends here" breakdown
        fp_1.flow(addBreakdownContainer, addBreakdownTitle("Ends here"), addBreakdownBars(breakdowns.endsHere, numberFormatter), addBreakdownComment(endsHereString))(container);
        // Add inputs breakdown
        fp_1.flow(addBreakdownContainer, addBreakdownTitle("Inputs", " (" + numberFormatter(inputsTotal) + ")"), addBreakdownBars(breakdowns.inputs, numberFormatter))(container);
        // Add outputs breakdown
        fp_1.flow(addBreakdownContainer, addBreakdownTitle("Outputs", " (" + numberFormatter(outputsTotal) + ")"), addBreakdownBars(breakdowns.outputs, numberFormatter))(container);
    };
    ProcessFlowFocus.prototype.addSingleNodeVisitsComment = function (content, datum) {
        if (datum.singleNodeJourneys === 0) {
            return;
        }
        content
            .append("xhtml:li")
            .attr("class", styles.title)
            .text("[!] " + datum.singleNodeJourneys + " single node visits (not included in the above stats)");
    };
    ProcessFlowFocus.prototype.getDrawingDimensions = function () {
        var drawingContainer = this.state.current.get("computed").canvas.elRect, config = this.state.current.get("config");
        return {
            xMax: drawingContainer.left + config.width,
            xMin: drawingContainer.left,
            yMax: drawingContainer.top + config.height,
            yMin: drawingContainer.top
        };
    };
    ProcessFlowFocus.prototype.onElementOut = function () {
        this.remove();
    };
    ProcessFlowFocus.prototype.onMouseLeave = function () {
        this.events.emit(event_catalog_1.default.FOCUS.ELEMENT.MOUSEOUT);
    };
    ProcessFlowFocus.prototype.remove = function () {
        this.el.node().innerHTML = "";
        this.el.style("visibility", "hidden");
    };
    return ProcessFlowFocus;
}());
// Helper functions
function computeBreakdowns(node) {
    var inputs = fp_1.map(function (link) {
        var size = link.size();
        return {
            size: size,
            label: link.source().label(),
            percentage: Math.round(size * 100 / node.size())
        };
    })(node.targetLinks);
    var outputs = fp_1.map(function (link) {
        var size = link.size();
        return {
            size: size,
            label: link.target().label(),
            percentage: Math.round(size * 100 / node.size())
        };
    })(node.sourceLinks);
    var startsHere = [
        {
            size: node.journeyStarts,
            percentage: Math.round(node.journeyStarts * 100 / node.size())
        }
    ];
    var endsHere = [
        {
            size: node.journeyEnds,
            percentage: Math.round(node.journeyEnds * 100 / node.size())
        }
    ];
    return { inputs: inputs, outputs: outputs, startsHere: startsHere, endsHere: endsHere };
}
function computeBreakdownTotal(breakdowns) {
    return fp_1.reduce(function (sum, item) {
        return sum + item.size;
    }, 0)(breakdowns);
}
function addBreakdownContainer(content) {
    return content.append("div").attr("class", styles.breakdownContainer);
}
function addBreakdownTitle(title, subtitle) {
    return function (container) {
        container
            .append("span")
            .attr("class", styles.title)
            .text(title)
            .append("span")
            .text(subtitle);
        return container;
    };
}
function addBreakdownBars(breakdownItems, numberFormatter) {
    var sortedItems = fp_1.sortBy(function (item) { return -item.size; })(breakdownItems);
    return function (container) {
        fp_1.forEach(appendBreakdown(container, numberFormatter))(sortedItems);
        return container;
    };
}
function appendBreakdown(container, numberFormatter) {
    return function (item) {
        var breakdown = container.append("div").attr("class", styles.breakdown);
        if (item.label) {
            breakdown
                .append("label")
                .attr("class", styles.breakdownLabel)
                .text(item.label);
        }
        var backgroundBar = breakdown.append("div").attr("class", styles.breakdownBackgroundBar);
        backgroundBar
            .append("div")
            .attr("class", styles.breakdownBar)
            .style("width", item.percentage + "%");
        backgroundBar
            .append("div")
            .attr("class", styles.breakdownText)
            .text(numberFormatter(item.size) + " (" + item.percentage + "%)");
    };
}
function addBreakdownComment(comment) {
    return function (container) {
        container
            .append("label")
            .attr("class", styles.breakdownCommentLabel)
            .text(comment);
        return container;
    };
}
exports.default = ProcessFlowFocus;
//# sourceMappingURL=focus.js.map