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
var ButtonGroup_1 = require("../ButtonGroup/ButtonGroup");
var Button_1 = require("../Button/Button");
var CondensedButton = function (props) { return React.createElement(Button_1.default, __assign({ condensed: true }, props)); };
var PaginatorControl = function (_a) {
    var type = _a.type, pageCount = _a.pageCount, page = _a.page, onChange = _a.onChange, children = _a.children;
    var handleFirst = function () {
        if (page > 1) {
            onChange(1);
        }
    };
    var handlePrevious = function () {
        if (page > 1) {
            onChange(page - 1);
        }
    };
    var handleNext = function () {
        if (page < pageCount) {
            onChange(page + 1);
        }
    };
    var handleLast = function () {
        if (page < pageCount) {
            onChange(pageCount);
        }
    };
    var isDisabled = type === "previous" || type === "first" ? page === 1 : page === pageCount;
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
    return React.createElement(CondensedButton, { onClick: handler }, children);
};
var createPagesFragment = function (_a) {
    var pageCount = _a.pageCount, maxVisible = _a.maxVisible, page = _a.page, onChange = _a.onChange;
    var skip;
    if (page > maxVisible - 1 && page < pageCount) {
        skip = page - maxVisible + 1;
    }
    else if (page === pageCount) {
        skip = page - maxVisible;
    }
    else {
        skip = 0;
    }
    // Creates an array of numbers (positive/negative) progressing from `start` up to `end`
    var range = function (start, end, acc) {
        if (acc === void 0) { acc = []; }
        return start > end ? acc : range(start + 1, end, acc.concat([start]));
    };
    var hasEnoughPages = pageCount > maxVisible;
    var adjustedMaxVisible = hasEnoughPages ? maxVisible : pageCount;
    var remainingPages = pageCount - page;
    var isCloseToEnd = remainingPages < adjustedMaxVisible;
    var start = (isCloseToEnd ? pageCount - adjustedMaxVisible : skip + 1) || 1;
    var end = isCloseToEnd ? pageCount : adjustedMaxVisible + skip;
    var fragment = range(start, end).map(function (pageNumber, i) { return (React.createElement(CondensedButton, { key: pageNumber, onClick: function () {
            onChange(pageNumber);
        }, color: pageNumber === page && "success" }, pageNumber)); });
    var renderUpperSeparator = function () {
        return remainingPages >= maxVisible && hasEnoughPages && pageCount - adjustedMaxVisible > 1
            ? [
                React.createElement(CondensedButton, { key: "upper" }, "..."),
                React.createElement(CondensedButton, { key: pageCount, onClick: function () {
                        onChange(pageCount);
                    } }, pageCount)
            ]
            : [];
    };
    return fragment.concat(renderUpperSeparator());
};
var Container = glamorous_1.default.div({
    "& [role=button]": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 25
    }
});
var Paginator = function (_a) {
    var pageCount = _a.pageCount, _b = _a.maxVisible, maxVisible = _b === void 0 ? 5 : _b, _c = _a.page, page = _c === void 0 ? 1 : _c, _d = _a.onChange, onChange = _d === void 0 ? function () { } : _d;
    var controlProps = { pageCount: pageCount, page: page, onChange: onChange };
    return (React.createElement(Container, null,
        React.createElement(ButtonGroup_1.default, { style: { display: "flex", userSelect: "none" } },
            React.createElement(PaginatorControl, __assign({ type: "first" }, controlProps),
                React.createElement(Icon.ChevronsLeft, { size: "11" })),
            React.createElement(PaginatorControl, __assign({ type: "previous" }, controlProps),
                React.createElement(Icon.ChevronLeft, { size: "11" })),
            createPagesFragment({ pageCount: pageCount, maxVisible: maxVisible, page: page, onChange: onChange }),
            React.createElement(PaginatorControl, __assign({ type: "next" }, controlProps),
                React.createElement(Icon.ChevronRight, { size: "11" })),
            React.createElement(PaginatorControl, __assign({ type: "last" }, controlProps),
                React.createElement(Icon.ChevronsRight, { size: "11" })))));
};
exports.default = Paginator;
//# sourceMappingURL=Paginator.js.map