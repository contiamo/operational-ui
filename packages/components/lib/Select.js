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
var mixins_1 = require("./utils/mixins");
var SelectOption_1 = require("./Select/SelectOption");
var SelectFilter_1 = require("./Select/SelectFilter");
var Select_style_1 = require("./Select/Select.style");
var displayOption = function (opt) {
    if (opt.label) {
        return opt.label;
    }
    return String(opt.value);
};
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
        var placeholder = this.props.placeholder || "No entries selected";
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
        return listDisplay === "" ? this.props.placeholder || "No entries selected" : listDisplay;
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
        var selectWithoutLabel = (React.createElement(Select_style_1.Container, { id: id, innerRef: function (containerNode) { return (_this.containerNode = containerNode); }, color: color, disabled: disabled, role: "listbox", tabIndex: -2, onClick: function () {
                if (!_this.state.open) {
                    _this.setState(function (prevState) { return ({
                        open: true,
                    }); });
                }
            } },
            React.createElement(Select_style_1.DisplayValue, { isPlaceholder: Array.isArray(value) ? value.length === 0 : !value }, this.getDisplayValue()),
            options.length &&
                open && (React.createElement(Select_style_1.Options, null,
                filterable && (React.createElement(SelectFilter_1.default, { onChange: function (val) {
                        _this.setState(function (prevState) { return ({
                            search: val,
                        }); });
                    } })),
                React.createElement(Select_style_1.OptionsList, null, options.map(function (option) {
                    return (option.label || String(option.value)).match(RegExp(search)) && (React.createElement(SelectOption_1.default, { key: String(option.value), onClick: function () { return _this.selectOption(option); }, selected: _this.isOptionSelected(option) }, option.label || String(option.value)));
                }))))));
        return label ? (React.createElement(mixins_1.Label, null,
            React.createElement(mixins_1.LabelText, null, label),
            selectWithoutLabel)) : (selectWithoutLabel);
    };
    return Select;
}(React.Component));
exports.default = Select;
//# sourceMappingURL=Select.js.map