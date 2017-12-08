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
var components_1 = require("@operational/components");
var Container = glamorous_1.default.div({});
var FilterBar = glamorous_1.default.div({
    "& > div": {
        display: "inline-flex"
    }
});
var FormFields = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        "& > label, & > div": {
            margin: theme.spacing + "px 0",
            display: "block"
        }
    });
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
        return (React.createElement(Container, null,
            React.createElement(FilterBar, null,
                React.Children.map(this.props.children, function (child, index) {
                    if (!child.props.start && !child.props.end && !child.props.value) {
                        return null;
                    }
                    var label = child.props.label || child.props.id;
                    var value = "";
                    switch (child.type) {
                        case components_1.Input:
                            value = !!child.props.value || child.props.value === 0 ? String(child.props.value) : "";
                            break;
                        case components_1.Select:
                            value = !!child.props.value || child.props.value === 0 ? String(child.props.value) : "";
                            break;
                        case components_1.DatePicker:
                            value = [child.props.start, child.props.end].filter(function (date) { return !!date; }).join(" - ");
                            break;
                    }
                    if (value === "") {
                        value = "...";
                    }
                    return (React.createElement(components_1.Chip, { onClick: _this.props.onClear
                            ? function () {
                                _this.props.onClear(child.props.id);
                            }
                            : null, symbol: "×" }, label + ": " + value));
                }),
                React.createElement(components_1.Chip, { color: "#efefef", onClick: function () {
                        _this.setState(function (prevState) { return ({
                            isExpanded: true
                        }); });
                    }, symbol: "+" }, "Add filter")),
            this.state.isExpanded ? (React.createElement(components_1.Modal, { onClose: function () {
                    _this.setState(function (prevState) { return ({
                        isExpanded: false
                    }); });
                } },
                React.createElement(FormFields, null, this.props.children))) : null));
    };
    return Filter;
}(React.Component));
exports.default = Filter;
//# sourceMappingURL=Filter.js.map