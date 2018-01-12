"use strict";
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
var with_label_1 = require("./utils/with-label");
var Container = glamorous_1.default.div({
    label: "checkbox"
});
var OptionLabel = glamorous_1.default.label(function (_a) {
    var theme = _a.theme;
    return ({
        display: "inline-block",
        marginRight: theme.spacing
    });
});
var OptionText = glamorous_1.default.span(function (_a) {
    var theme = _a.theme;
    return (__assign({}, theme.typography.body, { display: "inline-block", marginLeft: theme.spacing / 6 }));
});
var Checkbox = function (props) { return (
// `css` and `className` props are not set, as they are set on the wrapped label container.
// See ./utils/with-label.tsx.
React.createElement(Container, null, props.options.map(function (option, index) { return (React.createElement(OptionLabel, { key: index },
    React.createElement("input", { type: "checkbox", checked: props.selected.indexOf(option) > -1, onChange: function () {
            props.onChange &&
                props.onChange(props.selected.indexOf(option) > -1
                    ? props.selected.filter(function (option_) { return option !== option_; })
                    : props.selected.concat([option]));
        } }),
    React.createElement(OptionText, null, option))); }))); };
exports.default = with_label_1.default(Checkbox);
//# sourceMappingURL=Checkbox.js.map