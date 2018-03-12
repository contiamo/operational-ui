"use strict";
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
var getGridCSSProperties = function (gridType) {
    if (gridType === "IDE") {
        return {
            gridTemplateColumns: "200px auto",
            gridTemplateRows: "auto"
        };
    }
    // Handle NxM case
    var gridNumbers = String(gridType).split("x");
    var cols = Number(gridNumbers[0]);
    var rows = Number(gridNumbers[1]);
    if (!isNaN(cols) && !isNaN(rows)) {
        return {
            gridTemplateColumns: "repeat(" + cols + ", 1fr)",
            gridTemplateRows: "repeat(" + rows + ", 1fr)"
        };
    }
    // Because GridType is defines types that all fall into the
    // cases above, this piece of code is never reached.
    // (may change if we start accepting arbitrary NxM values)
    return {};
};
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, gridType = _a.gridType;
    return (__assign({ label: "Grid", width: "100%", height: "100%", display: "grid", padding: theme.spacing, gridColumnGap: theme.spacing, gridRowGap: theme.spacing }, getGridCSSProperties(gridType)));
});
var Grid = function (props) { return React.createElement(Container, { gridType: props.type ? props.type : "3x2" }, props.children); };
exports.default = Grid;
//# sourceMappingURL=Grid.js.map