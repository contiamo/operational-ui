"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Progress_1 = require("./Progress");
var constants_1 = require("./constants");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "Layout",
        position: "relative",
        height: "100%",
        display: "grid",
        gridTemplateColumns: constants_1.sidenavWidth + "px auto",
        gridTemplateRows: constants_1.headerHeight + "px auto",
        // Side navigation (1st child is always the spinner or a placeholder)
        "& > *:nth-child(2)": {
            gridColumnStart: "1",
            gridColumnEnd: "span 1",
            gridRowStart: "1",
            gridRowEnd: "span 2"
        },
        // Header
        "& > *:nth-child(3)": {
            width: "100%",
            gridColumnStart: "2",
            gridColumnEnd: "span 1",
            gridRowStart: "1",
            gridRowEnd: "span 1"
        },
        // Content
        "& > *:nth-child(4)": {
            gridColumnStart: "2",
            gridColumnEnd: "span 1",
            gridRowStart: "2",
            gridRowEnd: "span 1"
        }
    });
});
var Layout = function (props) { return (React.createElement(Container, { css: props.css, className: props.className },
    props.loading ? React.createElement(Progress_1.default, null) : React.createElement("div", null),
    props.children)); };
exports.default = Layout;
//# sourceMappingURL=Layout.js.map