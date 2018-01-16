"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var theme_1 = require("@operational/theme");
exports.default = function (props) {
    // Only one child is allowed here,
    // see https://reactjs.org/docs/react-api.html#reactchildrenonly
    if (React.Children.count(props.children) > 1) {
        throw new Error("<OperationalUI/> expects a single child inside of it, like React Router's <Router/>. Please remove any additional children. See https://github.com/Contiamo/operational-ui/tree/master/packages/components.");
    }
    return React.createElement(glamorous_1.ThemeProvider, { theme: props.theme || theme_1.operational }, props.children);
};
//# sourceMappingURL=OperationalUI.js.map