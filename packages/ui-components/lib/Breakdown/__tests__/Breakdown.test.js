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
var enzyme_1 = require("enzyme");
var Breakdown_1 = require("../Breakdown");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Breakdown = wrap_default_theme_1.default(Breakdown_1.default);
describe("Breakdown Component", function () {
    it("Should initialize properly", function () {
        var props = {
            number: 3,
            count: 20,
            percentage: "50%"
        };
        expect(enzyme_1.render(React.createElement(Breakdown, __assign({}, props), "hi"))).toMatchSnapshot();
    });
});
//# sourceMappingURL=Breakdown.test.js.map