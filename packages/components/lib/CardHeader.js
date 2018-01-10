"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "cardheader",
        display: "flex",
        alignItems: "center",
        height: 36,
        margin: theme.spacing * -1,
        marginBottom: theme.spacing * 4 / 3,
        padding: "0 " + theme.spacing + "px",
        borderBottom: "1px solid " + theme.colors.separator,
        fontWeight: 700,
        lineHeight: 1,
        color: theme.colors.emphasizedText,
        "* + &": {
            marginTop: theme.spacing
        },
        "&:not(:first-child)": {
            borderBottomStyle: "dashed"
        }
    });
});
var CardHeader = function (props) { return (React.createElement(Container, { key: props.id, id: props.domId, css: props.css, className: props.className }, props.children)); };
exports.default = CardHeader;
//# sourceMappingURL=CardHeader.js.map