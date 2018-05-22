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
var mixins_1 = require("../utils/mixins");
var Select_Option_1 = require("./Select.Option");
var Select_Filter_1 = require("./Select.Filter");
var utils_1 = require("@operational/utils");
var theme_1 = require("@operational/theme");
var displayOption = function (opt) {
    if (opt.label) {
        return opt.label;
    }
    return String(opt.value);
};
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, color = _a.color, disabled = _a.disabled, style = _a.style;
    var backgroundColor = theme_1.expandColor(theme, color) || theme.colors.white;
    return {
        backgroundColor: backgroundColor,
        label: "select",
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing / 2 + "px " + (theme.spacing * 2 / 3 + 40) + "px " + theme.spacing / 2 + "px " + theme.spacing *
            2 /
            3 + "px ",
        borderRadius: 4,
        width: "fit-content",
        minWidth: 240,
        minHeight: 20,
        border: "1px solid",
        borderColor: theme.colors.inputBorder,
        opacity: disabled ? 0.5 : 1,
        cursor: "pointer",
        color: utils_1.readableTextColor(backgroundColor, ["black", "white"]),
        outline: "none",
        pointerEvents: disabled ? "none" : "all",
        // downward caret.
        "&::after": {
            content: "''",
            position: "absolute",
            top: "50%",
            right: theme.spacing / 2,
            width: 0,
            height: 0,
            border: "4px solid transparent",
            borderTopColor: theme.colors.gray,
            transform: "translateY(calc(-50% + 2px))",
        },
        "&:focus": mixins_1.inputFocus({ theme: theme }),
    };
});
var DisplayValue = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isPlaceholder = _a.isPlaceholder;
    return ({
        color: isPlaceholder ? theme.colors.gray : theme.colors.black,
    });
});
var Options = glamorous_1.default.div({
    position: "absolute",
    // Push it down 6px so it doesn't overlap with the focus shadow,
    // and there's a comfortable 2px gap.
    top: "calc(100% + 6px)",
    left: 0,
    width: "100%",
    overflow: "hidden",
    borderRadius: 4,
    opacity: 0,
    transform: "translateY(-10px)",
    animation: utils_1.fadeIn + " .15s forwards ease,\n    " + utils_1.resetTransform + " .15s forwards ease",
}, function (_a) {
    var theme = _a.theme;
    return ({
        boxShadow: theme.shadows.popup,
        zIndex: theme.baseZIndex + 300,
    });
});
var OptionsList = glamorous_1.default.div(function (_a) {
    var theme = _a.theme;
    return ({
        // whole number + 3/4 ratio here ensures options don't get cut off
        maxHeight: theme.spacing * 12.75,
        overflow: "auto",
    });
});
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false,
            updating: false,
            search: "",
        };
        return _this;
    }
    // This implements "click outside to close" behavior
    Select.prototype.handleClick = function (ev) {
        // if we're clicking on the Select itself,
        if (this.containerNode && this.containerNode.contains(ev.target)) {
            return;
        }
        // if we're clicking outside,
        this.close();
    };
    Select.prototype.handleEsc = function (e) {
        if (e.keyCode === 27) {
            this.close();
        }
    };
    Select.prototype.componentDidMount = function () {
        document.addEventListener("click", this.handleClick.bind(this), true);
        document.addEventListener("keyup", this.handleEsc.bind(this), true);
    };
    Select.prototype.componentWillUnmount = function () {
        document.removeEventListener("click", this.handleClick.bind(this), true);
        document.removeEventListener("keyup", this.handleEsc.bind(this), true);
    };
    Select.prototype.getDisplayValue = function () {
        var _this = this;
        var placeholder = this.props.placeholder;
        if (!this.props.value) {
            return placeholder;
        }
        if (!Array.isArray(this.props.value)) {
            var displayedOption = this.props.options.filter(function (option) { return option.value === _this.props.value; })[0];
            return displayedOption ? displayOption(displayedOption) : placeholder;
        }
        var listDisplay = this.props.options
            .map(function (option) { return (_this.props.value.indexOf(option.value) > -1 ? displayOption(option) : null); })
            .filter(function (a) { return !!a; })
            .join(", ");
        return listDisplay === "" ? this.props.placeholder : listDisplay;
    };
    Select.prototype.selectOption = function (option) {
        var onChange = this.props.onChange;
        if (!onChange) {
            return;
        }
        if (!Array.isArray(this.props.value)) {
            onChange(this.props.value === option.value ? null : option.value);
            return;
        }
        var optionIndex = this.props.value.indexOf(option.value);
        if (optionIndex < 0) {
            onChange(this.props.value.concat([option.value]), option.value);
        }
        else {
            onChange(this.props.value.slice(0, optionIndex).concat(this.props.value.slice(optionIndex + 1)), option.value);
        }
    };
    Select.prototype.isOptionSelected = function (option) {
        if (!Array.isArray(this.props.value)) {
            return this.props.value === option.value;
        }
        return this.props.value.indexOf(option.value) > -1;
    };
    Select.prototype.close = function () {
        this.setState(function () { return ({
            open: false,
        }); });
    };
    Select.prototype.render = function () {
        var _this = this;
        var _a = this.props, id = _a.id, color = _a.color, disabled = _a.disabled, value = _a.value, options = _a.options, filterable = _a.filterable, label = _a.label;
        var _b = this.state, open = _b.open, search = _b.search;
        var selectWithoutLabel = (React.createElement(Container, { id: id, innerRef: function (containerNode) { return (_this.containerNode = containerNode); }, color: color, disabled: disabled, role: "listbox", tabIndex: -2, onClick: function () {
                if (!_this.state.open) {
                    _this.setState(function (prevState) { return ({
                        open: true,
                    }); });
                }
            } },
            React.createElement(DisplayValue, { isPlaceholder: Array.isArray(value) ? value.length === 0 : !value }, this.getDisplayValue()),
            options.length &&
                open && (React.createElement(Options, null,
                filterable && (React.createElement(Select_Filter_1.default, { onChange: function (val) {
                        _this.setState(function (prevState) { return ({
                            search: val,
                        }); });
                    } })),
                React.createElement(OptionsList, null, options.map(function (option) {
                    return (option.label || String(option.value)).match(RegExp(search)) && (React.createElement(Select_Option_1.default, { key: String(option.value), onClick: function () { return _this.selectOption(option); }, selected: _this.isOptionSelected(option) }, option.label || String(option.value)));
                }))))));
        return label ? (React.createElement(mixins_1.Label, null,
            React.createElement(mixins_1.LabelText, null, label),
            selectWithoutLabel)) : (selectWithoutLabel);
    };
    Select.defaultProps = {
        placeholder: "No entries selected",
    };
    return Select;
}(React.Component));
exports.default = Select;
//# sourceMappingURL=Select.js.map