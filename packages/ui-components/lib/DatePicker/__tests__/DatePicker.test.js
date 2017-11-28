"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var DatePicker_1 = require("../DatePicker");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var DatePicker = wrap_default_theme_1.default(DatePicker_1.default);
describe("DatePicker Component", function () {
    // @todo: this fails because of the way TypeScript imports are handled between Jest and the compiler.
    // Add this back once a stable solution is found.
    xit("Should render", function () {
        var renderedComponent = enzyme_1.render(React.createElement(DatePicker, { date: "2015-11-05" }));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=DatePicker.test.js.map