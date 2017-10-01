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
var Icon = require("react-feather");
var glamorous_1 = require("glamorous");
var Control = glamorous_1.default.li({
    listStyle: "none"
}, function (_a) {
    var _b = _a.disabled, disabled = _b === void 0 ? false : _b, theme = _a.theme;
    return ({
        cursor: disabled ? "not-allowed" : "pointer"
    });
});
var PaginatorControl = function (_a) {
    var type = _a.type, pageCount = _a.pageCount, selected = _a.selected, onChange = _a.onChange, children = _a.children;
    var handleFirst = function () {
        if (selected > 1) {
            onChange(1);
        }
    };
    var handlePrevious = function () {
        if (selected > 1) {
            onChange(selected - 1);
        }
    };
    var handleNext = function () {
        if (selected < pageCount) {
            onChange(selected + 1);
        }
    };
    var handleLast = function () {
        if (selected < pageCount) {
            onChange(pageCount);
        }
    };
    var isDisabled = type === "previous" || type === "first" ? selected === 1 : selected === pageCount;
    var handler;
    switch (type) {
        case "previous":
            handler = handlePrevious;
            break;
        case "first":
            handler = handleFirst;
            break;
        case "next":
            handler = handleNext;
            break;
        default:
            handler = handleLast;
    }
    return (React.createElement(Control, { onClick: handler, disabled: isDisabled }, children));
};
var PageLink = glamorous_1.default.li({
    listStyle: "none",
    width: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none"
}, function (_a) {
    var _b = _a.active, active = _b === void 0 ? false : _b, theme = _a.theme;
    return ({
        color: active ? theme.colors.palette.success : ""
    });
});
var createPagesFragment = function (_a) {
    var pageCount = _a.pageCount, maxVisible = _a.maxVisible, selected = _a.selected, onChange = _a.onChange;
    var skip;
    if (selected > maxVisible - 1 && selected < pageCount) {
        skip = selected - maxVisible + 1;
    }
    else if (selected === pageCount) {
        skip = selected - maxVisible;
    }
    else {
        skip = 0;
    }
    // Creates an array of numbers (positive/negative) progressing from `start` up to `end`
    var range = function (start, end, acc) {
        if (acc === void 0) { acc = []; }
        return start > end ? acc : range(start + 1, end, acc.concat([start]));
    };
    return range(skip + 1, maxVisible + skip).map(function (pageNumber) { return (React.createElement(PageLink, { key: pageNumber, onClick: function () {
            onChange(pageNumber);
        }, active: pageNumber === selected }, pageNumber)); });
};
var Container = glamorous_1.default.ul({
    display: "flex",
    padding: "0"
}, function (_a) {
    var disabled = _a.disabled;
    return ({
        pointerEvents: disabled ? "none" : "all",
        opacity: disabled ? 0.4 : 1
    });
});
var Paginator = function (_a) {
    var pageCount = _a.pageCount, _b = _a.maxVisible, maxVisible = _b === void 0 ? 5 : _b, _c = _a.selected, selected = _c === void 0 ? 1 : _c, _d = _a.onChange, onChange = _d === void 0 ? function () { } : _d;
    var controlProps = { pageCount: pageCount, selected: selected, onChange: onChange };
    var hasEnoughPages = pageCount > maxVisible;
    maxVisible = hasEnoughPages ? maxVisible : pageCount;
    return (React.createElement(Container, null,
        hasEnoughPages ? (React.createElement(PaginatorControl, __assign({ type: "first" }, controlProps),
            React.createElement(Icon.ChevronsLeft, { size: "17" }))) : null,
        React.createElement(PaginatorControl, __assign({ type: "previous" }, controlProps),
            React.createElement(Icon.ChevronLeft, { size: "17" })),
        createPagesFragment({ pageCount: pageCount, maxVisible: maxVisible, selected: selected, onChange: onChange }),
        React.createElement(PaginatorControl, __assign({ type: "next" }, controlProps),
            React.createElement(Icon.ChevronRight, { size: "17" })),
        hasEnoughPages ? (React.createElement(PaginatorControl, __assign({ type: "last" }, controlProps),
            React.createElement(Icon.ChevronsRight, { size: "17" }))) : null));
};
exports.default = Paginator;
//# sourceMappingURL=Paginator.js.map