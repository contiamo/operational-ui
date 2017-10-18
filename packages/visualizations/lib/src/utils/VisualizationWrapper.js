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
var React = require("react");
var fp_1 = require("lodash/fp");
var VisualizationWrapper = /** @class */ (function (_super) {
    __extends(VisualizationWrapper, _super);
    function VisualizationWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualizationWrapper.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { className: "Visualization", ref: function (containerNode) { return (_this.containerNode = containerNode); } });
    };
    VisualizationWrapper.prototype.componentDidMount = function () {
        this.viz = new this.props.facade(this.containerNode);
        this.updateViz();
        this.viz.draw();
    };
    VisualizationWrapper.prototype.componentDidUpdate = function () {
        this.updateViz();
        this.viz.draw();
    };
    VisualizationWrapper.prototype.updateViz = function () {
        var _this = this;
        this.viz.data(this.props.data || {});
        fp_1.forEach.convert({ cap: false })(function (accessors, key) {
            _this.viz.accessors(key, accessors);
        })(this.props.accessors);
        this.viz.config(this.props.config || {});
    };
    VisualizationWrapper.prototype.componentWillUnmount = function () {
        this.viz.close();
    };
    return VisualizationWrapper;
}(React.Component));
exports.default = VisualizationWrapper;
//# sourceMappingURL=VisualizationWrapper.js.map