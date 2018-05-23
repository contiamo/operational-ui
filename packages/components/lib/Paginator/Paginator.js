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
var PaginatorSpan = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, isActive = _a.isActive, isDisabled = _a.isDisabled;
    return (__assign({}, theme.typography.body, { padding: theme.spacing / 4, borderRadius: 2, height: theme.spacing * 1.5, display: "inline-flex", cursor: "pointer", userSelect: "none", alignItems: "center", justifyContent: "center", lineHeight: 1, color: isActive ? theme.colors.info : theme.colors.text, ":hover": {
            backgroundColor: theme.colors.background,
        } }));
});
var PaginatorControl = function (_a) {
    var children = _a.children, onChange = _a.onChange, pageCount = _a.pageCount, page = _a.page, type = _a.type;
    var handleFirst = function () {
        if (page > 1) {
            onChange && onChange(1);
        }
    };
    var handlePrevious = function () {
        if (page > 1) {
            onChange && onChange(page - 1);
        }
    };
    var handleNext = function () {
        if (page < pageCount) {
            onChange && onChange(page + 1);
        }
    };
    var handleLast = function () {
        if (page < pageCount) {
            onChange && onChange(pageCount);
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
    return (React.createElement(PaginatorSpan, { onClick: handler, isDisabled: isDisabled }, children));
};
var createPagesFragment = function (_a) {
    var maxVisible = _a.maxVisible, onChange = _a.onChange, page = _a.page, pageCount = _a.pageCount;
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
    var fragment = range(start, end).map(function (pageNumber, i) { return (React.createElement(PaginatorSpan, { key: pageNumber, onClick: function () {
            onChange && onChange(pageNumber);
        }, isActive: pageNumber === page }, pageNumber)); });
    var renderUpperSeparator = function () {
        return remainingPages >= maxVisible && hasEnoughPages && pageCount - adjustedMaxVisible > 1
            ? [
                React.createElement(PaginatorSpan, { key: "upper", onClick: function () {
                        onChange(page + maxVisible);
                    } }, "..."),
                React.createElement(PaginatorSpan, { key: pageCount, onClick: function () {
                        onChange && onChange(pageCount);
                    } }, pageCount),
            ]
            : [];
    };
    return fragment.concat(renderUpperSeparator());
};
var Container = glamorous_1.default.div({
    label: "paginator",
    "& [role=button]": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 25,
    },
});
var Paginator = function (_a) {
    var _b = _a.maxVisible, maxVisible = _b === void 0 ? 3 : _b, _c = _a.onChange, onChange = _c === void 0 ? function () { } : _c, pageCount = _a.pageCount, _d = _a.page, page = _d === void 0 ? 1 : _d, id = _a.id, css = _a.css, className = _a.className;
    var controlProps = { pageCount: pageCount, page: page, onChange: onChange };
    return (React.createElement(Container, { id: id, css: css, className: className },
        React.createElement(PaginatorControl, __assign({ type: "first" }, controlProps),
            React.createElement(Icon.ChevronsLeft, { size: "11" })),
        React.createElement(PaginatorControl, __assign({ type: "previous" }, controlProps),
            React.createElement(Icon.ChevronLeft, { size: "11" })),
        createPagesFragment({ pageCount: pageCount, maxVisible: maxVisible, page: page, onChange: onChange }),
        React.createElement(PaginatorControl, __assign({ type: "next" }, controlProps),
            React.createElement(Icon.ChevronRight, { size: "11" })),
        React.createElement(PaginatorControl, __assign({ type: "last" }, controlProps),
            React.createElement(Icon.ChevronsRight, { size: "11" }))));
};
exports.default = Paginator;
//# sourceMappingURL=Paginator.js.map