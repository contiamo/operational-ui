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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var fp_1 = require("lodash/fp");
var VisualizationWrapperInternal = /** @class */ (function (_super) {
    __extends(VisualizationWrapperInternal, _super);
    function VisualizationWrapperInternal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualizationWrapperInternal.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: this.props.style, className: (this.props.className ? this.props.className + " " : "") + "Visualization", ref: function (containerNode) { return (_this.containerNode = containerNode); } }));
    };
    VisualizationWrapperInternal.prototype.componentDidMount = function () {
        // Work with the theme here
        this.viz = new this.props.facade(this.containerNode);
        this.updateViz();
        this.viz.draw();
    };
    VisualizationWrapperInternal.prototype.componentDidUpdate = function () {
        this.updateViz();
        this.viz.draw();
    };
    VisualizationWrapperInternal.prototype.updateViz = function () {
        var _this = this;
        this.viz.data(this.props.data || {});
        fp_1.forEach.convert({ cap: false })(function (accessors, key) {
            _this.viz.accessors(key, accessors);
        })(this.props.accessors);
        this.viz.config(fp_1.defaults({ palette: this.props.theme.colors.visualizationPalette })(this.props.config || {}));
    };
    VisualizationWrapperInternal.prototype.componentWillUnmount = function () {
        this.viz.close();
    };
    return VisualizationWrapperInternal;
}(React.Component));
var VisualizationWrapper = function (props) { return React.createElement(VisualizationWrapperInternal, __assign({}, props)); };
var WrappedVisualizationWrapper = glamorous_1.withTheme(VisualizationWrapper);
exports.default = WrappedVisualizationWrapper;
//# sourceMappingURL=VisualizationWrapper.js.map