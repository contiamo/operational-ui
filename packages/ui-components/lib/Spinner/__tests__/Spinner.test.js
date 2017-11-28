"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Spinner_1 = require("../Spinner");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Spinner = wrap_default_theme_1.default(Spinner_1.default);
describe("Spinner Component", function () {
    it("Should render", function () {
        var renderedComponent = enzyme_1.render(React.createElement(Spinner, { value: "SomeValue" }));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=Spinner.test.js.map