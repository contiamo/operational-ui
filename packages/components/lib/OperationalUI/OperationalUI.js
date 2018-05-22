"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var theme_1 = require("@operational/theme");
var utils_1 = require("@operational/utils");
var OperationalUI = function (props) {
    return (React.createElement(glamorous_1.ThemeProvider, { theme: props.theme || theme_1.operational },
        React.createElement(React.Fragment, null,
            props.withBaseStyles ? (React.createElement("style", { dangerouslySetInnerHTML: {
                    __html: utils_1.baseStylesheet(props.theme || theme_1.operational),
                } })) : null,
            props.children)));
};
exports.default = OperationalUI;
//# sourceMappingURL=OperationalUI.js.map