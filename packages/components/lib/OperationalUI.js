"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var theme_1 = require("@operational/theme");
exports.default = function (props) { return (
// Only one child is allowed here,
// see https://reactjs.org/docs/react-api.html#reactchildrenonly
React.createElement(glamorous_1.ThemeProvider, { theme: props.theme || theme_1.operational }, React.Children.only(props.children))); };
//# sourceMappingURL=OperationalUI.js.map