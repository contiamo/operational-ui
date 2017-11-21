"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("./node");
var link_1 = require("./link");
var layout_1 = require("./layout");
var fp_1 = require("lodash/fp");
var DataHandler = /** @class */ (function () {
    function DataHandler(state, stateWriter) {
        this.state = state;
        this.stateWriter = stateWriter;
        this.layout = new layout_1.default(state);
    }
    DataHandler.prototype.prepareData = function () {
        var data = this.state.current.get("data");
        var accessors = this.state.current.get("accessors");
        this.journeys = accessors.data.journeys(data);
        this.initializeNodes(accessors.data.nodes(data));
        this.initializeLinks();
        this.layout.computeLayout(this.nodes);
        this.positionNodes();
        return {
            nodes: this.nodes,
            journeys: this.journeys,
            links: this.links,
        };
    };
    DataHandler.prototype.initializeNodes = function (nodeAttrs) {
        this.nodes = fp_1.map(this.addNode.bind(this))(nodeAttrs);
        fp_1.forEach(function (node) {
            node.sourceLinks = [];
            node.targetLinks = [];
        })(this.nodes);
        this.calculateNodeSizes();
        this.calculateStartsAndEnds();
    };
    DataHandler.prototype.findNode = function (nodeId) {
        var node = fp_1.find(function (node) {
            return node.id() === nodeId;
        })(this.nodes);
        if (!node) {
            throw new Error("No node with id '" + nodeId + "' defined.");
        }
        return node;
    };
    DataHandler.prototype.addNode = function (attrs) {
        fp_1.extend.convert({ immutable: false })(attrs, { size: 0 });
        return new node_1.default(attrs, this.state.current.get("accessors").node);
    };
    DataHandler.prototype.calculateNodeSizes = function () {
        var _this = this;
        fp_1.forEach(function (journey) {
            fp_1.forEach(function (nodeId) {
                _this.findNode(nodeId).attributes.size += journey.size;
            })(journey.path);
        })(this.journeys);
    };
    DataHandler.prototype.calculateStartsAndEnds = function () {
        var _this = this;
        fp_1.forEach(function (journey) {
            if (journey.path.length > 1) {
                _this.findNode(journey.path[0]).journeyStarts += journey.size;
                _this.findNode(journey.path[journey.path.length - 1]).journeyEnds += journey.size;
            }
            else {
                _this.findNode(journey.path[0]).singleNodeJourneys += journey.size;
            }
        })(this.journeys);
    };
    DataHandler.prototype.initializeLinks = function () {
        this.links = [];
        this.computeLinks();
    };
    DataHandler.prototype.findLink = function (sourceId, targetId) {
        function checkIds(link) {
            return link.sourceId() === sourceId && link.targetId() === targetId;
        }
        return fp_1.find(checkIds)(this.links);
    };
    DataHandler.prototype.addLink = function (attrs) {
        return new link_1.default(attrs, this.state.current.get("accessors").link);
    };
    DataHandler.prototype.computeLinks = function () {
        var _this = this;
        fp_1.forEach(function (journey) {
            var path = journey.path;
            var computeLink = function (i) {
                var sourceId = path[i];
                var targetId = path[i + 1];
                var sourceNode = _this.findNode(sourceId);
                var targetNode = _this.findNode(targetId);
                var existingLink = _this.findLink(sourceId, targetId);
                if (existingLink) {
                    existingLink.attributes.size += journey.size;
                }
                else {
                    var linkAttrs = {
                        source: sourceNode,
                        sourceId: sourceNode.id(),
                        target: targetNode,
                        targetId: targetNode.id(),
                        size: journey.size,
                    };
                    var newLink = _this.addLink(linkAttrs);
                    _this.links.push(newLink);
                    sourceNode.sourceLinks.push(newLink);
                    targetNode.targetLinks.push(newLink);
                }
            };
            fp_1.times(computeLink)(path.length - 1);
        })(this.journeys);
    };
    DataHandler.prototype.xGridSpacing = function () {
        var config = this.state.current.get("config"), finiteWidth = isFinite(config.width), xValues = fp_1.map(fp_1.get("x"))(this.layout.nodes), maxX = xValues.length > 0 ? Math.max.apply(Math, xValues) : 0, spacing = finiteWidth
            ? Math.min(config.width / (maxX + 1), config.horizontalNodeSpacing)
            : config.horizontalNodeSpacing;
        this.stateWriter("horizontalNodeSpacing", spacing);
        this.stateWriter("width", finiteWidth ? config.width : spacing * (maxX + 1));
        return spacing;
    };
    DataHandler.prototype.yGridSpacing = function (nRows) {
        var config = this.state.current.get("config"), finiteHeight = isFinite(config.height), spacing = isFinite(config.height)
            ? Math.min(config.height / (nRows + 1), config.verticalNodeSpacing)
            : config.verticalNodeSpacing;
        this.stateWriter(["height"], finiteHeight ? config.height : spacing * (nRows + 1));
        return spacing;
    };
    DataHandler.prototype.positionNodes = function () {
        var nodesByRow = fp_1.groupBy("y")(this.layout.nodes);
        var rows = Object.keys(nodesByRow), xGridSpacing = this.xGridSpacing(), yGridSpacing = this.yGridSpacing(rows.length);
        // Assign y values
        fp_1.forEach(function (node) {
            node.y = (node.y + 1) * yGridSpacing;
        })(this.layout.nodes);
        // Assign x values
        fp_1.forEach(function (row) {
            fp_1.flow(fp_1.sortBy(fp_1.get("x")), fp_1.forEach(function (node) {
                node.x *= xGridSpacing;
            }))(nodesByRow[parseInt(row, 10)]);
        })(rows);
    };
    return DataHandler;
}());
exports.default = DataHandler;
//# sourceMappingURL=data_handler.js.map