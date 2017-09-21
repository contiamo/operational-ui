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
var Icon_1 = require("../Icon/Icon");
var contiamo_ui_utils_1 = require("contiamo-ui-utils");
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
    var isDisabled = (type === "previous" || type === "first")
        ? !!(selected === 1)
        : !!(selected === pageCount);
    var handler = (function () {
        switch (type) {
            case "previous":
                return handlePrevious;
            case "first":
                return handleFirst;
            case "next":
                return handleNext;
            default:
                return handleLast;
        }
    })();
    return (React.createElement("li", { onClick: handler, className: "control " + type + " " + (isDisabled ? "disabled" : "") }, children));
};
var createPagesFragment = function (_a) {
    var pageCount = _a.pageCount, maxVisible = _a.maxVisible, selected = _a.selected, onChange = _a.onChange;
    var skip = (function () {
        if (selected > maxVisible - 1 && selected < pageCount) {
            return selected - maxVisible + 1;
        }
        else if (selected === pageCount) {
            return selected - maxVisible;
        }
        else {
            return 0;
        }
    })();
    return (Array(maxVisible).fill(null).map(function (_, i) { return skip + i + 1; }).map(function (pageNumber) { return (React.createElement("li", { key: pageNumber, className: "page " + (pageNumber === selected ? "active" : ""), onClick: function () { onChange(pageNumber); } }, pageNumber)); }));
};
var Ul = glamorous_1.default.ul(function (_a) {
    var theme = _a.theme;
    return ({
        display: "flex",
        padding: "0",
        "& li": {
            listStyle: "none",
            width: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            userSelect: "none"
        },
        "& li.page.active": {
            color: contiamo_ui_utils_1.darken(theme.colors.secondary)(5),
            borderRadius: "50%"
        },
        "& li.control": {
            color: theme.colors.primary
        },
        "& li.disabled": {
            cursor: "not-allowed"
        }
    });
});
var Paginator = function (_a) {
    var pageCount = _a.pageCount, _b = _a.maxVisible, maxVisible = _b === void 0 ? 5 : _b, _c = _a.selected, selected = _c === void 0 ? 1 : _c, onChange = _a.onChange;
    var controlProps = { pageCount: pageCount, selected: selected, onChange: onChange };
    return (React.createElement(Ul, null,
        React.createElement(PaginatorControl, __assign({ type: "first" }, controlProps),
            React.createElement(Icon_1.default, { name: "ChevronsLeft", sizeOverride: 17 })),
        React.createElement(PaginatorControl, __assign({ type: "previous" }, controlProps),
            React.createElement(Icon_1.default, { name: "ChevronLeft", sizeOverride: 17 })),
        createPagesFragment({ pageCount: pageCount, maxVisible: maxVisible, selected: selected, onChange: onChange }),
        React.createElement(PaginatorControl, __assign({ type: "next" }, controlProps),
            React.createElement(Icon_1.default, { name: "ChevronRight", sizeOverride: 17 })),
        React.createElement(PaginatorControl, __assign({ type: "last" }, controlProps),
            React.createElement(Icon_1.default, { name: "ChevronsRight", sizeOverride: 17 }))));
};
exports.default = Paginator;
//# sourceMappingURL=Paginator.js.map