"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("./node");
var node_accessors_1 = require("./node_accessors");
var link_1 = require("./link");
var link_accessors_1 = require("./link_accessors");
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
        this.setNodeAccessors(accessors.node);
        this.setLinkAccessors(accessors.link);
        this.initializeNodes(data);
        this.initializeLinks(data);
        this.layout.computeLayout(this.nodes);
        this.positionNodes();
        return {
            nodes: this.nodes,
            journeys: this.journeys,
            links: this.links,
        };
    };
    DataHandler.prototype.initializeNodes = function (data) {
        var accessors = this.state.current.get("accessors");
        this.nodes = fp_1.map(fp_1.bind(this.addNode, this))(accessors.data.nodes(data));
        fp_1.forEach(function (node) {
            node.sourceLinks = [];
            node.targetLinks = [];
        })(this.nodes);
        this.calculateNodeSizes();
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
    DataHandler.prototype.setNodeAccessors = function (accessors) {
        this.nodeAccessors = new node_accessors_1.default();
        this.nodeAccessors.setAccessors(accessors);
    };
    DataHandler.prototype.addNode = function (attrs) {
        fp_1.extend.convert({ immutable: false })(attrs, { size: 0 });
        return new node_1.default(attrs, this.nodeAccessors.accessors);
    };
    DataHandler.prototype.calculateNodeSizes = function () {
        var _this = this;
        fp_1.forEach(function (journey) {
            fp_1.forEach(function (nodeId) {
                _this.findNode(nodeId).attributes.size += journey.size;
            })(journey.path);
        })(this.journeys);
    };
    DataHandler.prototype.initializeLinks = function (data) {
        this.links = [];
        this.computeLinks();
    };
    // @TODO why is there a type error if the method output has type TLink?
    DataHandler.prototype.findLink = function (sourceId, targetId) {
        var checkIds = function (link) {
            return link.sourceId() === sourceId && link.targetId() === targetId;
        };
        return fp_1.find(checkIds)(this.links);
    };
    DataHandler.prototype.setLinkAccessors = function (accessors) {
        this.linkAccessors = new link_accessors_1.default();
        this.linkAccessors.setAccessors(accessors);
    };
    DataHandler.prototype.addLink = function (attrs) {
        return new link_1.default(attrs, this.linkAccessors.accessors);
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
        var config = this.state.current.get("config"), finiteWidth = isFinite(config.width), xValues = fp_1.map(function (node) { return node.x; })(this.layout.nodes), maxX = xValues.length > 0 ? Math.max.apply(Math, xValues) : 0, spacing = finiteWidth
            ? Math.min(config.width / (maxX + 1), config.horizontalNodeSpacing)
            : config.horizontalNodeSpacing;
        this.stateWriter(["width"], finiteWidth ? config.width : spacing * (maxX + 1));
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
        fp_1.forEach(function (row) {
            fp_1.flow(fp_1.sortBy(function (node) { return node.x; }), fp_1.forEach(function (node) {
                node.x *= xGridSpacing;
            }))(nodesByRow[parseInt(row, 10)]);
        })(rows);
    };
    return DataHandler;
}());
exports.default = DataHandler;
//# sourceMappingURL=data_handler.js.map