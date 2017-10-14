"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors.palette[color]) : "white";
    return {
        padding: 0,
        borderBottom: "1px solid",
        borderColor: contiamo_ui_utils_1.darken(backgroundColor)(10),
        "& > input": {
            width: "100%",
            padding: theme.spacing / 2,
            border: 0,
            outline: "none",
            font: "inherit"
        }
    };
});
var SelectFilter = function (_a) {
    var css = _a.css, className = _a.className, _b = _a.placeholder, placeholder = _b === void 0 ? "Filter..." : _b, onChange = _a.onChange;
    return (React.createElement(Container, { css: css, className: className },
        React.createElement("input", { onClick: function (e) { return e.stopPropagation(); }, onChange: onChange, placeholder: placeholder })));
};
exports.default = SelectFilter;
//# sourceMappingURL=SelectFilter.js.map