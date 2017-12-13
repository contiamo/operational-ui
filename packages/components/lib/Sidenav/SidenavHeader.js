"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Icon_1 = require("../Icon/Icon");
var size = 60;
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
        height: size,
        flex: "0 0 " + size + "px",
        backgroundColor: "inherit",
        "&:first-child": {
            borderBottom: "1px solid rgba(255, 255, 255, .1)"
        }
    });
});
var Label = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        width: "fit-content",
        whiteSpace: "pre"
    });
});
var IconContainer = glamorous_1.default.div({
    width: size,
    height: size,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 " + size + "px"
});
var SidenavHeader = /** @class */ (function (_super) {
    __extends(SidenavHeader, _super);
    function SidenavHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isExpanded: false
        };
        return _this;
    }
    SidenavHeader.prototype.render = function () {
        return (React.createElement(Container, { key: this.props.id, css: this.props.css, className: this.props.className },
            React.createElement(IconContainer, null,
                React.createElement(Icon_1.default, { name: this.props.icon, size: 28, color: "#FFF" })),
            React.createElement(Label, null, this.props.label)));
    };
    return SidenavHeader;
}(React.Component));
exports.default = SidenavHeader;
//# sourceMappingURL=SidenavHeader.js.map