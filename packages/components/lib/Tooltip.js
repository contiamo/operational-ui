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
var utils_1 = require("@operational/utils");
var Container = glamorous_1.default.div(function (_a) {
    var position = _a.position, theme = _a.theme;
    var backgroundColor = theme.colors.black;
    return __assign({ backgroundColor: backgroundColor, label: "tooltip" }, theme.typography.small, { lineHeight: 1.3, position: "absolute", zIndex: theme.baseZIndex + 101, width: "fit-content", minWidth: 80, maxWidth: 360, whiteSpace: "no-wrap", padding: theme.spacing / 3 + "px " + theme.spacing * 2 / 3 + "px", borderRadius: 2, boxShadow: theme.shadows.popup }, (function () {
        if (position === "top") {
            return {
                left: "50%",
                transform: "translate3d(-50%, calc(-100% - 6px), 0)"
            };
        }
        if (position === "bottom") {
            return {
                left: "50%",
                top: "100%",
                transform: "translate3d(-50%, 6px, 0)"
            };
        }
        if (position === "left") {
            return {
                top: "50%",
                left: -6,
                transform: "translate3d(-100%, -50%, 0)"
            };
        }
        if (position === "right") {
            return {
                top: "50%",
                right: -6,
                transform: "translate3d(100%, -50%, 0)"
            };
        }
        return {};
    })(), { color: utils_1.readableTextColor(backgroundColor, ["black", "white"]), 
        // This pseudo-element extends the clickable area of the far-away tooltip.
        "&::after": {
            content: "''",
            position: "absolute",
            top: 0,
            left: theme.spacing * -2,
            display: "block",
            width: theme.spacing * 2,
            height: "100%"
        }, 
        // They say behind every great tooltip is a great caret.
        "&::before": __assign({ content: "''", position: "absolute", zIndex: theme.baseZIndex - 1, width: 0, height: 0 }, (function () {
            if (position === "top") {
                return {
                    bottom: -4,
                    left: "calc(50% - 6px)",
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "6px solid " + backgroundColor
                };
            }
            if (position === "bottom") {
                return {
                    top: -4,
                    left: "calc(50% - 6px)",
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderBottom: "6px solid " + backgroundColor
                };
            }
            if (position === "left") {
                return {
                    right: -4,
                    top: "calc(50% - 6px)",
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderLeft: "6px solid " + backgroundColor
                };
            }
            if (position === "right") {
                return {
                    left: -4,
                    top: "calc(50% - 6px)",
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderRight: "6px solid " + backgroundColor
                };
            }
            return {};
        })()) });
});
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            bbTop: 0,
            bbLeft: 0,
            bbRight: 0,
            bbBottom: 0
        };
        return _this;
    }
    Tooltip.prototype.render = function () {
        var _this = this;
        var position = "top";
        if (this.props.left) {
            position = "left";
        }
        if (this.props.right) {
            position = "right";
        }
        if (this.props.bottom) {
            position = "bottom";
        }
        if (this.props.smart) {
            // TODO: implement bounding box checks for right- and bottom-placed tooltips.
            // This should be easier once the OperationalUI provides window dimensions in context.
            if (this.state.bbLeft < 0 && String(position) === "left") {
                position = "right";
            }
            if (this.state.bbTop < 0 && String(position) === "top") {
                position = "bottom";
            }
        }
        return (React.createElement(Container, { className: this.props.className, css: this.props.css, position: position, innerRef: function (node) {
                _this.containerNode = node;
            } }, this.props.children));
    };
    Tooltip.prototype.componentDidMount = function () {
        var bbRect = this.containerNode.getBoundingClientRect();
        this.setState(function (prevState) { return ({
            bbTop: bbRect.top,
            bbBottom: bbRect.bottom,
            bbLeft: bbRect.left,
            bbRight: bbRect.right
        }); });
    };
    return Tooltip;
}(React.Component));
exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map