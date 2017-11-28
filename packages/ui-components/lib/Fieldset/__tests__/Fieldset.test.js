"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Fieldset_1 = require("../Fieldset");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Fieldset = wrap_default_theme_1.default(Fieldset_1.default);
describe("Fieldset Component", function () {
    it("Should render", function () {
        var renderedComponent = enzyme_1.render(React.createElement(Fieldset, { value: "SomeValue" }));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=Fieldset.test.js.map