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
    switch (gridType) {
        case "3x2":
            return {
                gridTemplateColumns: "auto auto auto",
                gridTemplateRows: "auto auto"
            };
        case "1x1":
            return {
                gridTemplateColumns: "auto",
                gridTemplateRows: "auto"
            };
        case "2x2":
            return {
                gridTemplateColumns: "auto auto",
                gridTemplateRows: "auto auto"
            };
        case "IDE":
            return {
                gridTemplateColumns: "200px auto",
                gridTemplateRows: "auto"
            };
    }
};
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, gridType = _a.gridType;
    return (__assign({ label: "Grid", width: "100%", height: "100%", display: "grid", padding: theme.spacing, gridColumnGap: theme.spacing, gridRowGap: theme.spacing }, getGridCSSProperties(gridType)));
});
var Grid = function (props) { return React.createElement(Container, { gridType: props.type ? props.type : "3x2" }, props.children); };
exports.default = Grid;
//# sourceMappingURL=Grid.js.map