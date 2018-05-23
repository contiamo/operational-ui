"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var _1 = require("../");
var constants_1 = require("../constants");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isSidenavExpanded = _a.isSidenavExpanded;
    return ({
        label: "Layout",
        position: "relative",
        height: "100%",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: (isSidenavExpanded ? constants_1.sidenavExpandedWidth : theme.box) + "px auto",
        gridTemplateRows: "100%",
        // Side navigation (1st child is always the spinner or a placeholder)
        "& > *:nth-child(2)": {
            gridColumnStart: "1",
            gridColumnEnd: "span 1",
            gridRowStart: "1",
            gridRowEnd: "span 1",
        },
        // Content
        "& > *:nth-child(3)": {
            gridColumnStart: "2",
            gridColumnEnd: "span 1",
            gridRowStart: "1",
            gridRowEnd: "span 1",
        },
    });
});
var Main = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "layout-main",
        display: "block",
        height: "100%",
        overflow: "auto",
        backgroundColor: theme.colors.white,
    });
});
var Layout = function (props) {
    var sidenavProps = React.Children.toArray(props.sidenav)[0].props;
    /*
     * This placeholder element is added to the dom in case there is no
     * <Progress /> element, allowing the CSS to target children by the same
     * nth-child identifier regardless of whether the loader is present.
     * Absolute positioning is required to remove it from document flow
     * so that it doesn't affect the grid.
     */
    var cssPlaceholder = React.createElement(glamorous_1.default.Div, { css: { position: "absolute" } });
    return (React.createElement(Container, { css: props.css, className: props.className, isSidenavExpanded: Boolean(sidenavProps.expanded) },
        props.loading ? React.createElement(_1.Progress, null) : cssPlaceholder,
        props.sidenav,
        React.createElement(Main, null, props.main)));
};
exports.default = Layout;
//# sourceMappingURL=Layout.js.map