"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var contiamo_ui_utils_1 = require("@contiamo/ui-utils");
var style = function (_a) {
    var theme = _a.theme, color = _a.color;
    var backgroundColor = color ? contiamo_ui_utils_1.hexOrColor(color)(theme.colors[color]) : "white";
    return {
        padding: 0,
        borderBottom: "1px solid",
        borderColor: contiamo_ui_utils_1.darken(backgroundColor)(10),
        "& .Select__filter": {
            width: "100%",
            padding: theme.spacing / 2,
            border: 0,
            outline: "none",
            font: "inherit"
        }
    };
};
var SelectFilter = function (_a) {
    var className = _a.className, placeholder = _a.placeholder, onChange = _a.onChange;
    return (React.createElement("div", { className: className },
        React.createElement("input", { onClick: function (e) { return e.stopPropagation(); }, onChange: onChange, className: "Select__filter", placeholder: placeholder })));
};
SelectFilter.defaultProps = {
    placeholder: "Filter..."
};
exports.default = glamorous_1.default(SelectFilter)(style);
//# sourceMappingURL=SelectFilter.js.map