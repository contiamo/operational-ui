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
var glamorous_1 = require("glamorous");
var contiamo_ui_components_1 = require("contiamo-ui-components");
var Container = glamorous_1.default.div({});
var FilterBar = glamorous_1.default.div({
    "& > div": {
        display: "inline-flex"
    }
});
var FormFields = glamorous_1.default.div({
    "& > label, & > div": {
        display: "block"
    }
});
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isExpanded: false
        };
        return _this;
    }
    Filter.prototype.render = function () {
        var _this = this;
        var children = this.props.children;
        return (React.createElement(Container, null,
            React.createElement(FilterBar, null,
                React.Children.map(children, function (child, index) {
                    return React.createElement(contiamo_ui_components_1.Chip, null, (child.props.label || child.props.id) + ": " + child.props.value);
                }),
                React.createElement(contiamo_ui_components_1.Chip, { color: "#efefef", onClick: function () {
                        _this.setState(function (prevState) { return ({
                            isExpanded: true
                        }); });
                    }, symbol: "..." }, "Filter")),
            this.state.isExpanded ? (React.createElement(contiamo_ui_components_1.Modal, { onClose: function () {
                    _this.setState(function (prevState) { return ({
                        isExpanded: false
                    }); });
                } },
                React.createElement(FormFields, null, children))) : null));
    };
    return Filter;
}(React.Component));
exports.default = Filter;
//# sourceMappingURL=Filter.js.map