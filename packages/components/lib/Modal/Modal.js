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
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        label: "modal",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: theme.baseZIndex + 100,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, .6)",
    });
});
var Content = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        backgroundColor: theme.colors.white,
        padding: theme.spacing,
        boxShadow: theme.shadows.popup,
    });
});
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Modal.prototype.render = function () {
        var _this = this;
        return (React.createElement(Container, { id: this.props.id, css: this.props.css, className: this.props.className, onClick: function (ev) {
                if (_this.contentNode && !_this.contentNode.contains(ev.target)) {
                    _this.props.onClose && _this.props.onClose();
                }
            } },
            React.createElement(Content, { innerRef: function (contentNode) {
                    _this.contentNode = contentNode;
                }, className: this.props.contentClassName, css: this.props.contentCss }, this.props.children)));
    };
    return Modal;
}(React.Component));
exports.default = Modal;
//# sourceMappingURL=Modal.js.map